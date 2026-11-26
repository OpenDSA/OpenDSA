/* Run with NODE_PATH pointing to jsdom. Exercises the real standalone controller. */
const fs = require('node:fs'), path = require('node:path'), assert = require('node:assert/strict');
const {JSDOM} = require('jsdom');
const root = path.resolve(__dirname, '../..'), file = path.join(root, 'AV/OpenFLAP/grammarEditor.html');
(async () => {
 const dom = new JSDOM(fs.readFileSync(file, 'utf8'), {url:'http://localhost/AV/OpenFLAP/grammarEditor.html', runScripts:'dangerously', pretendToBeVisual:true});
 const w=dom.window, errors=[];w.alert=()=>{};w.confirm=()=>true;w.open=()=>{};w.HTMLElement.prototype.scrollIntoView=()=>{};w.HTMLElement.prototype.getClientRects=function(){return this.style.display==='none'?[]:[{width:80,height:30}]};
 w.addEventListener('error', e=>errors.push(e.message));
 for(const tag of [...w.document.querySelectorAll('script[src]')]){const script=w.document.createElement('script');script.textContent=fs.readFileSync(path.resolve(path.dirname(file),tag.getAttribute('src')),'utf8');w.document.body.append(script);}
 await new Promise(resolve=>w.jQuery(resolve));
 const $=w.jQuery, flush=()=>new Promise(resolve=>setTimeout(resolve,0));
 $.expr.pseudos.visible=e=>w.getComputedStyle(e).display!=='none';
 const mode=()=>$('.jsavmatrix').first().hasClass('deleteMode');
 const pressed=id=>$(id).attr('aria-pressed');
 const click=id=>$(id)[0].click();
 try {
  await flush();assert.equal(pressed('#editbutton'),'true');assert.equal($('.jsavsettings').parent().attr('id'),'container');
  click('#deletebutton');await flush();assert(mode());assert.equal(pressed('#deletebutton'),'true');
  click('#deletebutton');await flush();assert(!mode());assert.equal(pressed('#editbutton'),'true');
  // Enter a production with pending RHS input, then switch modes: input must survive.
  $('.jsavmatrix .jsavarray').first().find('.jsavvaluelabel').first()[0].click();
  $('#firstinput').val('S')[0].dispatchEvent(new w.KeyboardEvent('keydown',{key:'Tab',keyCode:9,which:9,bubbles:true,cancelable:true}));
  $('#firstinput').val('ab');click('#deletebutton');await flush();assert.equal(w.arr[0][2],'ab');
  w.confirm=()=>false;$('.jsavmatrix .jsavarray').first().find('.jsavvaluelabel').first()[0].click();await flush();assert(!mode());assert.equal(w.arr[0][2],'ab');
  click('#deletebutton');w.confirm=()=>true;$('.jsavmatrix .jsavarray').first().find('.jsavvaluelabel').first()[0].click();await flush();assert(!mode());assert.equal(pressed('#editbutton'),'true');assert(!w.arr.some(r=>r[0]==='S'));
  // Deleting the last remaining row leaves one editable blank row.
  click('#deletebutton');$('.jsavmatrix .jsavarray').first().find('.jsavvaluelabel').first()[0].click();await flush();assert(!mode());
  assert.equal($('.jsavmatrix .jsavarray').filter(function(){return $(this).css('display')!=='none'}).length,1);
  click('#addrowbutton');await flush();assert.equal(w.document.activeElement.id,'firstinput');assert(!mode());
  assert.equal($('#mode').text(),'');assert.equal($('.jsavoutput').text(),'');assert.deepEqual(errors,[]);
  console.log('PASS grammar settings placement, mode selection/toggle, pending input preservation, cancel/confirm one-row deletion, last-row editing and Add Row.');
 } finally {dom.window.close();}
})().catch(error=>{console.error(error);process.exitCode=1});
