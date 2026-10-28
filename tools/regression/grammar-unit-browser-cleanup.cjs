// Keep shutdown owned by Playwright; never race a second taskkill against it.
async function bounded(operation, milliseconds, label) {
  let timer;
  try {
    return await Promise.race([
      Promise.resolve().then(operation),
      new Promise((_, reject) => {
        timer = setTimeout(() => reject(new Error(label + ' timed out')), milliseconds);
      })
    ]);
  } finally {
    clearTimeout(timer);
  }
}

async function closeTestBrowser(context, browserServer, options = {}) {
  const contextMs = options.contextMs ?? 30000;
  const gracefulMs = options.gracefulMs ?? 60000;
  const forcedMs = options.forcedMs ?? 15000;
  let contextError;
  if (context) {
    try {
      await bounded(() => context.close(), contextMs, 'Browser context shutdown');
    } catch (error) {
      contextError = error;
    }
  }
  // launchServer/connect creates a separate client connection. Disconnect it
  // before stopping its server, even when closing the context failed.
  let clientError;
  if (options.client) {
    try {
      await bounded(() => options.client.close(), contextMs, 'Browser client disconnect');
      if (options.client.isConnected()) throw new Error('Browser client is still connected');
    } catch (error) {
      clientError = error;
    }
  }
  let mode = 'graceful';
  if (browserServer) {
    try {
      await bounded(() => browserServer.close(), gracefulMs, 'Browser shutdown');
    } catch (closeError) {
      mode = 'forced';
      try {
        await bounded(() => browserServer.kill(), forcedMs, 'Forced browser shutdown');
      } catch (killError) {
        throw new AggregateError([contextError, clientError, closeError, killError].filter(Boolean),
          'Test browser cleanup failed');
      }
    }
    const child = browserServer.process();
    if (child.exitCode === null && child.signalCode === null) {
      throw new Error('Test browser cleanup returned while its process is still running');
    }
  }
  if (contextError || clientError) {
    throw new AggregateError([contextError, clientError].filter(Boolean), "Browser context/client cleanup failed");
  }
  return mode;
}

module.exports = {closeTestBrowser};
