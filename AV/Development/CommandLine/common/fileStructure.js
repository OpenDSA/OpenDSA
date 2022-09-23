import { Directory, File } from "./fileSystemEntity.js";
import { FILE_STATE, GIT_STATE } from "./gitStatuses.js";

const margin = { top: 30, right: 90, bottom: 30, left: 90 };

const rectangleDimensions = { width: 76, height: 30 };
const circleRadius = 21;
const defaultFontSize = 0.9;

const durations = {
  nodes: { enter: 1000, exit: 1000, update: 2000 },
  paths: { enter: 3000, exit: 3000, update: 2000 },
};

const delays = {
  nodes: {},
  paths: {},
};

delays.paths.exit = 0;
delays.nodes.exit = delays.paths.exit + durations.paths.exit - 1000;
delays.paths.update = delays.nodes.exit + durations.nodes.exit - 1000;
delays.nodes.update = delays.paths.update;
delays.nodes.enter = delays.nodes.update + durations.nodes.update - 1000;
delays.paths.enter = delays.nodes.enter + durations.nodes.enter - 1000;

const colors = {
  file: { background: "#add8e6", text: "black" },
  directory: { background: "#0c3762", text: "white" },
  current: { background: "green", text: "white" },
  highlight: { background: "orange", text: "white" },
};

const gitColors = {
  [GIT_STATE.ADDED]: { background: "#1fd665" },
  [GIT_STATE.CHANGED]: { background: "#ff6863" },
};

function renderFileStructureVisualization(data, currDirId, width, height, id) {
  const svgData = renderSVG(width, height, id);
  updateFileStructureVisualization(
    svgData,
    data,
    -1 * delays.nodes.enter,
    currDirId
  );
  colorNode(svgData.group, currDirId, colors.current.background, "");

  return svgData;
}

function renderGitVisualization(
  localHomeDir,
  currDirId,
  gitMethods,
  width,
  height,
  id
) {
  const svgData = renderSVG(width, height, id);
  updateGitVisualization(
    svgData,
    localHomeDir,
    -1 * delays.paths.update,
    currDirId,
    gitMethods
  );

  createVerticalLine(svgData.group, svgData.width / 2, svgData.height);
  createText(svgData.group, "Local", 2, 10, 1);
  createText(svgData.group, "Remote", svgData.width / 2 + 4, 10, 1);

  return svgData;
}

function renderSVG(width, height, id) {
  const svgWidth = width - margin.left - margin.right;
  const svgHeight = height - margin.top - margin.bottom;

  const svg = d3
    .select(id)
    .append("svg")
    .attr("width", width)
    .attr("height", height);

  const svgGroup = svg.append("g");
  // .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");
  // .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

  return { group: svgGroup, width: width, height: height };
}

function selectNode(svgGroup, id, label) {
  return svgGroup.selectAll(".node-" + label).filter(function (d) {
    return d.data.id === id;
  });
}

function colorNode(svgGroup, id, color, label) {
  selectNode(svgGroup, id, label)
    .select("rect")
    .transition()
    .duration(1000)
    .style("fill", color);
}

function highlightNode(svgGroup, id, color, prevColor, prevText) {
  const node = selectNode(svgGroup, id, "");
  node.select("rect").transition().duration(1000).style("fill", color);
  node.select("text").transition().duration(1000).style("fill", "black");
  node
    .select("rect")
    .transition()
    .duration(1000)
    .delay(3000)
    .style("fill", prevColor);
  node
    .select("text")
    .transition()
    .duration(1000)
    .delay(3000)
    .style("fill", prevText);
}

function updateFileStructureVisualization(
  svgData,
  homeDir,
  delayOffset,
  currDirId
) {
  const svgGroup = svgData.group;

  const data = createFileTreeData(
    homeDir,
    0,
    0,
    svgData.width,
    svgData.height,
    5,
    5,
    1
  );

  createFileTree(svgGroup, data, currDirId, false, "", delayOffset, 1);
}

function updateGitVisualization(
  svgData,
  localHomeDir,
  delayOffset,
  currDirId,
  gitMethods,
  extraVisualizations
) {
  const { group, width, height } = svgData;

  const scale = 0.7;
  const padding = 5;

  let {
    localFileTreeData,
    remoteFileTreeData,
    localCommitTreeData,
    remoteCommitTreeData,
    localBranchData,
    remoteBranchData,
  } = createGitVisualizationData(
    localHomeDir,
    gitMethods.getRemoteHomeDir(),
    gitMethods.getLocalInitialCommit(),
    gitMethods.getRemoteInitialCommit(),
    gitMethods.getLocalCurrBranch(),
    gitMethods.getRemoteCurrBranch(),
    width,
    height,
    padding,
    scale
  );

  if (extraVisualizations) {
    if (extraVisualizations.commit) {
      visualizeCommit(
        group,
        extraVisualizations.commit,
        localFileTreeData,
        localCommitTreeData,
        width,
        height
      );
    }

    if (extraVisualizations.push) {
      ({ remoteFileTreeData, remoteCommitTreeData, remoteBranchData } =
        visualizePush(
          localFileTreeData,
          remoteFileTreeData,
          localCommitTreeData,
          remoteCommitTreeData,
          localBranchData,
          remoteBranchData,
          extraVisualizations.push,
          group,
          0.7
        ));
    }

    if (extraVisualizations.clone) {
      ({ localFileTreeData, localCommitTreeData, localBranchData } =
        visualizeClone(
          localFileTreeData,
          remoteFileTreeData,
          localCommitTreeData,
          remoteCommitTreeData,
          localBranchData,
          remoteBranchData
        ));
    }

    if (extraVisualizations.pull) {
      ({ localFileTreeData, localCommitTreeData, localBranchData } =
        visualizePull(
          localFileTreeData,
          remoteFileTreeData,
          localCommitTreeData,
          remoteCommitTreeData,
          localBranchData,
          remoteBranchData,
          extraVisualizations.pull,
          group,
          0.7
        ));
    }
  }

  createGitVisualization(
    localFileTreeData,
    remoteFileTreeData,
    localCommitTreeData,
    remoteCommitTreeData,
    localBranchData,
    remoteBranchData,
    group,
    delayOffset,
    scale,
    currDirId
  );
}

const createFileTree = (
  svgGroup,
  data,
  currDirId,
  colorGit,
  label,
  delayOffset,
  fileScale
) => {
  // adds the nodes
  const nodes = createFileRectangles(
    svgGroup,
    data,
    label,
    delayOffset,
    rectangleDimensions.width * fileScale,
    rectangleDimensions.height * fileScale,
    defaultFontSize * fileScale + "rem",
    currDirId,
    colorGit
  );

  const links = createFileLinks(svgGroup, data, label, delayOffset);
};

const createFileRectangles = (
  svgGroup,
  data,
  label,
  delayOffset,
  width,
  height,
  fontSize,
  currDirId,
  colorGit
) => {
  return svgGroup
    .selectAll(".node-" + label)
    .data(data, function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "node-" + label)
          .attr("transform", function (d) {
            return (
              "translate(" +
              (d.startX ? d.startX : d.x) +
              "," +
              (d.startY ? d.startY : d.y) +
              ")"
            );
          })
          .style("fill-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          })
          .style("stroke-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          });

        nodes
          .append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("x", -width / 2)
          .attr("y", -height / 2)
          .style("fill", (d) => {
            return getFileColor(
              d.data.id,
              currDirId,
              d.data.gitState,
              d.data.isDirectory,
              colorGit
            );
          })
          .attr("stroke", "black")
          .attr("rx", 5)
          .attr("ry", 5);

        nodes
          .append("text")
          .attr("dy", ".35em")
          .attr("font-size", fontSize)
          .style("fill", (d) => {
            return d.data.isDirectory
              ? colors.directory.text
              : colors.file.text;
          })
          .style("text-anchor", "middle")
          .text(function (d) {
            return d.data.name;
          });

        nodes
          .transition()
          .duration(function (d) {
            return durations.nodes.enter;
          })
          .delay(delays.nodes.enter + delayOffset)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        return nodes;
      },
      function (update) {
        const node = update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        node.select("rect").style("fill", (d) => {
          return getFileColor(
            d.data.id,
            currDirId,
            d.data.gitState,
            d.data.isDirectory,
            colorGit
          );
        });
        // node.select("text").style("fill", colors.directory.text);

        return node;
      },
      function (exit) {
        return exit
          .transition()
          .duration(durations.nodes.exit)
          .delay(delays.nodes.exit + delayOffset)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );
};

const createFileLinks = (svgGroup, data, label, delayOffset) =>
  svgGroup
    .selectAll(".link-" + label)
    .data(data.slice(1), function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("path")
          .lower()
          .attr("class", "link-" + label)
          .attr("d", function (d) {
            return `M ${d.x} , ${d.y} 
                      V ${(d.y + d.parent.y) / 2} 
                      H ${d.parent.x} 
                      V ${d.parent.y}`;
          })
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .transition()
          .delay(delays.paths.enter + delayOffset)
          .duration(durations.paths.enter)
          .attr("stroke-dashoffset", 0);

        return nodes;
      },
      function (update) {
        return update
          .transition()
          .duration(durations.paths.update)
          .delay(delays.paths.update + delayOffset)
          .attr("d", function (d) {
            return `M ${d.x} , ${d.y} 
                    V ${(d.y + d.parent.y) / 2} 
                    H ${d.parent.x} 
                    V ${d.parent.y}`;
          })
          .each(function (d) {
            d.totalLength = 1000;
          })
          .attr("stroke-dasharray", (d) => {
            return d.totalLength + " " + d.totalLength;
          })
          .attr("stroke-dashoffset", 0);
      },
      function (exit) {
        return exit
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", 0)
          .attr("stroke-dashoffset", 0)
          .transition()
          .delay(delays.paths.exit + delayOffset)
          .duration(3000)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .remove();
      }
    );

const createCommitTree = (
  svgGroup,
  data,
  branches,
  label,
  delayOffset,
  scale
) => {
  createCommitCircles(svgGroup, data, label, delayOffset, circleRadius * scale);

  createCommitLinks(svgGroup, data, label, delayOffset);

  createBranchRectangles(
    svgGroup,
    branches,
    label,
    delayOffset,
    rectangleDimensions.width * scale,
    rectangleDimensions.height * scale,
    defaultFontSize * scale + "rem",
    circleRadius * scale
  );
};

const createCommitCircles = (svgGroup, data, label, delayOffset, radius) =>
  svgGroup
    .selectAll(".node-" + label)
    .data(data, function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "node-" + label)
          .attr("transform", function (d) {
            return (
              "translate(" +
              (d.startX ? d.startX : d.x) +
              "," +
              (d.startY ? d.startY : d.y) +
              ")"
            );
          })
          .style("fill-opacity", function (d) {
            return d.startX ? 0 : 1e-6;
          })
          .style("stroke-opacity", function (d) {
            return d.startX ? 0 : 1e-6;
          });

        nodes
          .append("circle")
          .attr("r", radius)
          .attr("x", -radius)
          .attr("y", -radius)
          .style("fill", (d) => {
            return d.isHead ? "purple" : colors.file.background;
          })
          .attr("stroke", "black");

        nodes
          .transition()
          .duration(durations.nodes.enter)
          .delay(delays.nodes.enter + delayOffset + 250)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });
        return nodes;
      },
      function (update) {
        return update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          })
          .select("circle")
          .style("fill", (d) => {
            return d.isHead ? "purple" : colors.file.background;
          });
      },
      function (exit) {
        return exit
          .transition()
          .duration(durations.nodes.exit)
          .delay(delays.nodes.exit + delayOffset)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );

const createCommitLinks = (svgGroup, data, label, delayOffset) =>
  svgGroup
    .selectAll(".link-" + label)
    .data(data.slice(1), function (d) {
      return d.data.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("path")
          .lower()
          .attr("class", "link-" + label)
          .attr("d", function (d) {
            return `M ${d.x} , ${d.y} 
                    L ${d.parent.x}, ${d.parent.y}`;
          })
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .transition()
          .delay(delays.paths.enter + delayOffset)
          .duration(durations.paths.enter)
          .attr("stroke-dashoffset", 0);

        return nodes;
      },
      function (update) {
        return update
          .transition()
          .duration(durations.paths.update)
          .delay(delays.paths.update + delayOffset)
          .attr("d", function (d) {
            return `M ${d.x} , ${d.y} 
                    L ${d.parent.x}, ${d.parent.y}`;
          })
          .each(function (d) {
            d.totalLength = 1000;
          })
          .attr("stroke-dasharray", (d) => {
            return d.totalLength + " " + d.totalLength;
          })
          .attr("stroke-dashoffset", 0);
      },
      function (exit) {
        return exit
          .each(function (d) {
            d.totalLength = this.getTotalLength();
          })
          .attr("stroke-dasharray", (d) => d.totalLength + " " + d.totalLength)
          .attr("stroke-dashoffset", 0)
          .attr("stroke-dashoffset", 0)
          .transition()
          .delay(delays.paths.exit + delayOffset)
          .duration(3000)
          .attr("stroke-dashoffset", (d) => d.totalLength)
          .remove();
      }
    );

const createBranchRectangles = (
  svgGroup,
  data,
  label,
  delayOffset,
  width,
  height,
  fontSize,
  radius,
  currBranchId
) =>
  svgGroup
    .selectAll(".branch-" + label)
    .data(data, function (d) {
      return d.id;
    })
    .join(
      function (enter) {
        const nodes = enter
          .append("g")
          .attr("class", "branch-" + label)
          .attr("transform", function (d) {
            return (
              "translate(" +
              (d.startX ? d.startX : d.x) +
              "," +
              (d.startY ? d.startY : d.y) +
              ")"
            );
          })
          .style("fill-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          })
          .style("stroke-opacity", function (d) {
            return d.startX ? 1 : 1e-6;
          });

        nodes
          .append("rect")
          .attr("width", width)
          .attr("height", height)
          .attr("x", -width / 2)
          .attr("y", -height / 2)
          .style("fill", (d) => {
            return d.isCurrBranch ? "purple" : colors.directory.background;
          })
          .attr("stroke", "black")
          .attr("rx", 5)
          .attr("ry", 5);

        nodes
          .append("text")
          .attr("dy", ".35em")
          .attr("font-size", fontSize)
          .style("fill", (d) => {
            return colors.directory.text;
          })
          .style("text-anchor", "middle")
          .text(function (d) {
            return d.name;
          });

        nodes
          .transition()
          .duration(durations.nodes.enter)
          .delay(delays.nodes.enter + delayOffset)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        return nodes;
      },
      function (update) {
        const node = update
          .attr("y", 0)
          .style("fill-opacity", 1)
          .style("stroke-opacity", 1)
          .transition()
          .duration(durations.nodes.update)
          .delay(delays.nodes.update + delayOffset)
          .attr("transform", function (d) {
            return "translate(" + d.x + "," + d.y + ")";
          });

        node.select("rect").style("fill", (d) => {
          return d.isCurrBranch ? "purple" : colors.directory.background;
        });

        return node;
      },
      function (exit) {
        return exit
          .transition()
          .duration(durations.nodes.exit)
          .delay(delays.nodes.exit + delayOffset)
          .style("fill-opacity", 1e-6)
          .style("stroke-opacity", 1e-6)
          .remove();
      }
    );

const createText = (svgGroup, text, x, y, fontSize) =>
  svgGroup
    .append("text")
    .attr("dy", ".35em")
    .attr("x", x)
    .attr("y", y)
    .attr("font-size", fontSize + "rem")
    .text(text);

const createVerticalLine = (svgGroup, x, length) =>
  svgGroup
    .append("path")
    .attr("class", "line")
    .attr("d", function (d) {
      return `M ${x} , ${0} 
          V ${x} , ${length}
          `;
    });

const getFileColor = (id, currDirId, gitState, isDirectory, colorGit) => {
  if (currDirId === id) {
    return colorGit ? "purple" : colors.current.background;
  }
  if (isDirectory) {
    return colors.directory.background;
  }
  if (colorGit) {
    const color = gitColors[gitState];
    if (color) {
      return color.background;
    }
  }
  return colors.file.background;
};

const createCommitTreeData = (
  initialCommit,
  currBranch,
  x,
  y,
  width,
  height,
  paddingX,
  paddingY,
  scale
) => {
  const rectangleWidth = rectangleDimensions.width * scale;
  const rectangleHeight = rectangleDimensions.height * scale;
  const adjustedWidth = width - rectangleWidth - 2 * paddingX;
  const adjustedHeight = height - rectangleHeight - 2 * paddingY;

  const xOffset = x + rectangleWidth / 2 + paddingX;
  const yOffset = y + paddingY;
  //todo figure out height
  const treemap = d3.tree().size([adjustedHeight, adjustedWidth]);

  const hierarchyData = d3.hierarchy(initialCommit);

  const treeData = treemap(hierarchyData);

  const descendants = treeData.descendants();

  const currGap =
    descendants.length > 1 ? descendants[1].y - descendants[0].y : null;

  const desiredGap = 100;

  const useDesiredGap = currGap === null || desiredGap < currGap;

  return descendants.map((commit) => ({
    ...commit,
    x: (useDesiredGap ? commit.depth * desiredGap : commit.y) + xOffset,
    y: commit.x + yOffset,
    isHead: currBranch.commit.id === commit.data.id,
    parent: commit.parent
      ? {
          ...commit.parent,
          x:
            (useDesiredGap
              ? commit.parent.depth * desiredGap
              : commit.parent.y) + xOffset,
          y: commit.parent.x + yOffset,
        }
      : null,
  }));
};

const createBranchData = (commits, currBranchId, scale) =>
  commits.flatMap((commit) =>
    commit.data.branches.map((branch, index) => ({
      ...branch,
      x: commit.x,
      y:
        commit.y +
        2 * circleRadius * scale +
        index * rectangleDimensions.height * scale,
      index: index,
      isCurrBranch: branch.id === currBranchId,
    }))
  );

const createFileTreeData = (
  directory,
  x,
  y,
  width,
  height,
  paddingX,
  paddingY,
  scale
) => {
  const rectangleWidth = rectangleDimensions.width * scale;
  const rectangleHeight = rectangleDimensions.height * scale;
  const adjustedWidth = width - rectangleWidth - 2 * paddingX;
  const adjustedHeight = height - rectangleHeight - 2 * paddingY;
  const xOffset = rectangleWidth / 2 + x + paddingX;
  const yOffset = rectangleHeight / 2 + y + paddingY;

  const treemap = d3.tree().size([adjustedWidth, adjustedHeight]);

  const hierarchyData = d3.hierarchy(directory.mapToD3());

  const treeData = treemap(hierarchyData);

  const descendants = treeData.descendants();

  return descendants.map((file) => ({
    ...file,
    x: file.x + xOffset,
    y: file.y + yOffset,
    parent: file.parent
      ? {
          ...file.parent,
          x: file.parent.x + xOffset,
          y: file.parent.y + yOffset,
        }
      : null,
  }));
};

const createGitVisualizationData = (
  localHomeDir,
  remoteHomeDir,
  localInitialCommit,
  remoteInitialCommit,
  localCurrBranch,
  remoteCurrBranch,
  width,
  height,
  padding,
  scale
) => {
  const localFileTreeData = localHomeDir
    ? createFileTreeData(
        localHomeDir,
        0,
        0,
        width / 2,
        height / 2,
        padding,
        padding,
        scale
      )
    : null;

  const remoteFileTreeData = createFileTreeData(
    remoteHomeDir,
    width / 2,
    0,
    width / 2,
    height / 2,
    padding,
    padding,
    scale
  );

  const localCommitTreeData = localInitialCommit
    ? createCommitTreeData(
        localInitialCommit,
        localCurrBranch,
        0,
        height / 2,
        width / 2,
        height / 2,
        padding,
        padding,
        scale
      )
    : null;

  const remoteCommitTreeData = createCommitTreeData(
    remoteInitialCommit,
    remoteCurrBranch,
    width / 2,
    height / 2,
    width / 2,
    height / 2,
    padding,
    padding,
    scale
  );

  const localBranchData = localCommitTreeData
    ? createBranchData(localCommitTreeData, localCurrBranch.id, scale)
    : null;

  const remoteBranchData = createBranchData(
    remoteCommitTreeData,
    remoteCurrBranch.id,
    scale
  );

  return {
    localFileTreeData,
    remoteFileTreeData,
    localCommitTreeData,
    remoteCommitTreeData,
    localBranchData,
    remoteBranchData,
  };
};

const createGitVisualization = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData,
  svgGroup,
  delayOffset,
  scale,
  currDirId
) => {
  if (localFileTreeData) {
    createFileTree(
      svgGroup,
      localFileTreeData,
      currDirId,
      true,
      "local",
      delayOffset,
      scale
    );
  }

  createFileTree(
    svgGroup,
    remoteFileTreeData,
    null,
    true,
    "remote",
    delayOffset,
    scale
  );

  if (localCommitTreeData) {
    createCommitTree(
      svgGroup,
      localCommitTreeData,
      localBranchData,
      "local-commit",
      delayOffset,
      scale
    );
  }

  createCommitTree(
    svgGroup,
    remoteCommitTreeData,
    remoteBranchData,
    "remote-commit",
    delayOffset,
    scale
  );
};

function visualizeCommit(svgGroup, commit, fileTreeData, commitTreeData) {
  //create a rectangle for each file
  //transition from filetreedata location to committreedatalocation
  const rectangleWidth = 0.7 * rectangleDimensions.width;
  const rectangleHeight = 0.7 * rectangleDimensions.height;

  const existingCommit = commitTreeData.find(
    (value) => value.data.gitId === commit.gitId
  );

  const files = commit.files.flatMap((file) => file.flatten());

  //TODO maybe add animation for deleted
  const filesData = files
    .filter((file) => file.getState().fileState !== FILE_STATE.DELETED)
    .map((file) => {
      const existingFile = fileTreeData.find(
        (value) => value.data.gitId === file.gitId
      );
      return {
        ...file,
        startX: existingFile.x,
        startY: existingFile.y,
        endX: existingCommit.x,
        endY: existingCommit.y,
        isDirectory: file instanceof Directory,
      };
    });

  return showFilesMoving(svgGroup, filesData, 0.7, "commit-files");
}

const showFilesMoving = (svgGroup, files, scale, className, delay) => {
  const rectangleWidth = rectangleDimensions.width * scale;
  const rectangleHeight = rectangleDimensions.height * scale;
  return svgGroup
    .selectAll("." + className)
    .data(files, function (d) {
      return d.id;
    })
    .join(function (enter) {
      const nodes = enter
        .append("g")
        .attr("class", className)
        .attr("transform", function (d) {
          return "translate(" + d.startX + "," + d.startY + ")";
        });

      nodes
        .append("rect")
        .attr("width", rectangleWidth)
        .attr("height", rectangleHeight)
        .attr("x", -rectangleWidth / 2)
        .attr("y", -rectangleHeight / 2)
        .style("fill", (d) => {
          return d.isDirectory
            ? colors.directory.background
            : colors.file.background;
        })
        .attr("stroke", "black")
        .attr("rx", 5)
        .attr("ry", 5);

      nodes
        .append("text")
        .attr("dy", ".35em")
        .attr("font-size", scale * defaultFontSize + "rem")
        .style("fill", (d) => {
          return d.isDirectory ? colors.directory.text : colors.file.text;
        })
        .style("text-anchor", "middle")
        .text(function (d) {
          return d.name;
        });

      nodes
        .transition()
        .duration(durations.nodes.enter)
        .delay(delay ? delay : 0)
        .attr("transform", function (d) {
          return "translate(" + d.endX + "," + d.endY + ")";
        })
        .transition()
        .duration(1000)
        .delay(0)
        .style("fill-opacity", 1e-6)
        .style("stroke-opacity", 1e-6)
        .remove();
      return nodes;
    });
};

const addLocation = (src, dst, idPath) =>
  dst.map((dstValue) => {
    const srcValue = src.find(
      (value) =>
        followPropertyPath(value, idPath) ===
        followPropertyPath(dstValue, idPath)
    );
    return {
      ...dstValue,
      startX: srcValue ? srcValue.x : null,
      startY: srcValue ? srcValue.y : null,
    };
  });

const followPropertyPath = (value, path) => {
  const pathSplit = path.split(".");
  let curr = value;
  pathSplit.forEach((name) => {
    curr = curr[name];
  });
  return curr;
};

const visualizePush = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData,
  push,
  svgGroup,
  scale
) => {
  remoteCommitTreeData = addLocation(
    localCommitTreeData,
    remoteCommitTreeData,
    "data.gitId"
  );

  remoteBranchData = addLocation(localBranchData, remoteBranchData, "gitId");

  if (push.commitPath) {
    remoteFileTreeData = addLocation(
      localFileTreeData,
      remoteFileTreeData,
      "data.gitId"
    );

    visualizeModifiedFiles(
      localFileTreeData,
      remoteFileTreeData,
      push.commitPath,
      svgGroup,
      scale,
      delays.nodes.update + 1000
    );
  }

  return { remoteFileTreeData, remoteBranchData, remoteCommitTreeData };
};

const visualizePull = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData,
  pull,
  svgGroup,
  scale
) => {
  localCommitTreeData = addLocation(
    remoteCommitTreeData,
    localCommitTreeData,
    "data.gitId"
  );

  localBranchData = addLocation(remoteBranchData, localBranchData, "gitId");

  if (pull.commitPath) {
    localFileTreeData = addLocation(
      remoteFileTreeData,
      localFileTreeData,
      "data.gitId"
    );

    visualizeModifiedFiles(
      remoteFileTreeData,
      localFileTreeData,
      pull.commitPath,
      svgGroup,
      scale,
      delays.nodes.update + 1000
    );
  }

  return { localFileTreeData, localBranchData, localCommitTreeData };
};

const visualizeModifiedFiles = (
  localFileTreeData,
  remoteFileTreeData,
  commitPath,
  svgGroup,
  scale,
  delay
) => {
  const modifiedFiles = commitPath
    .filter((value) => value.action !== "nothing")
    .flatMap((value) => value.commit.files)
    .filter(
      (file) =>
        file.getState().fileState === FILE_STATE.MODIFIED &&
        remoteFileTreeData.find((value) => value.data.gitId === file.gitId)
    )
    .flatMap((file) => file.flatten())
    .map((file) => {
      const localFile = localFileTreeData.find(
        (value) => value.data.gitId === file.gitId
      );
      const remoteFile = remoteFileTreeData.find(
        (value) => value.data.gitId === file.gitId
      );
      return {
        ...file,
        startX: localFile.x,
        startY: localFile.y,
        endX: remoteFile.x,
        endY: remoteFile.y,
        isDirectory: file instanceof Directory,
      };
    });
  showFilesMoving(svgGroup, modifiedFiles, scale, "push-files", delay);
};

const visualizeClone = (
  localFileTreeData,
  remoteFileTreeData,
  localCommitTreeData,
  remoteCommitTreeData,
  localBranchData,
  remoteBranchData
) => {
  localCommitTreeData = addLocation(
    remoteCommitTreeData,
    localCommitTreeData,
    "data.gitId"
  );

  localBranchData = addLocation(remoteBranchData, localBranchData, "gitId");

  localFileTreeData = addLocation(
    remoteFileTreeData,
    localFileTreeData,
    "data.gitId"
  );

  return { localFileTreeData, localBranchData, localCommitTreeData };
};

export {
  renderFileStructureVisualization,
  updateFileStructureVisualization,
  renderGitVisualization,
  updateGitVisualization,
  highlightNode,
  colorNode,
  colors,
  delays,
};
