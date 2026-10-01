/* Standalone multiple-input parser; receives the editor's JSON production rows. */
(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let productions;
  try {
    productions = JSON.parse(localStorage.getItem('grammars'));
    if (!Array.isArray(productions) || !productions.length || productions.some(p => !Array.isArray(p) || typeof p[0] !== 'string' || !p[0] || typeof p[2] !== 'string')) throw new Error();
  } catch (e) {
    $('message').textContent = 'No valid grammar was supplied. Open Brute Force Parse from the Grammar Editor.';
    ['addinputbutton','deleterowbutton','runinputsbutton','clearbutton'].forEach(id => $(id).disabled = true);
    $('backbutton').onclick = () => { location.href = 'grammarEditor.html'; };
    return;
  }
  function row(body, values) {
    const tr = body.insertRow();
    values.forEach(value => { tr.insertCell().textContent = value; });
    return tr;
  }
  productions.forEach(p => row($('grammar').tBodies[0], [p[0], '→', p[2] || 'λ']));
  let current, count = 0;
  function invalidate() { $('trace').hidden = true; current = null; }
  function addInput() {
    const tr = row($('table').tBodies[0], ['', '']);
    const input = document.createElement('input');
    input.setAttribute('aria-label', 'Input string');
    input.id = 'input' + count++;
    input.addEventListener('input', () => { tr.cells[1].replaceChildren(); invalidate(); });
    tr.cells[0].append(input);
    return input;
  }
  $('addinputbutton').onclick = () => addInput().focus();
  $('deleterowbutton').onclick = () => { const body = $('table').tBodies[0]; if (body.rows.length > 1) body.deleteRow(-1); invalidate(); };
  $('clearbutton').onclick = () => { $('table').tBodies[0].replaceChildren(); for(let i=0;i<3;i++)addInput(); invalidate(); $('message').textContent=''; };
  $('backbutton').onclick = () => { localStorage.setItem('transformedGrammar', JSON.stringify(productions)); location.href='grammarEditor.html'; };
  $('runinputsbutton').onclick = async () => {
    invalidate(); $('message').textContent='Running inputs…';
    const controls = Array.from(document.querySelectorAll('nav button, #table input'));
    controls.forEach(e=>e.disabled=true);
    try {
      for (const tr of Array.from($('table').tBodies[0].rows)) {
        tr.cells[1].replaceChildren();
        const raw=tr.cells[0].querySelector('input').value;
        if (!raw) continue;
        await new Promise(resolve=>setTimeout(resolve,0));
        const input=raw==='!' || raw==='λ' ? '' : raw;
        const result=bruteForceParseGrammar(productions,input);
        if(result.status==='Accept'){
          const button=document.createElement('button');button.textContent='Accept';
          button.onclick=()=>{current=result;countStep=0;$('traceInput').textContent='Input: '+(input||'λ');$('trace').hidden=false;render();};tr.cells[1].append(button);
        } else tr.cells[1].textContent=result.status==='Undetermined'?'Undetermined (search limit reached)':result.status;
      }
      $('message').textContent='Finished. Undetermined means the search limit was reached, not rejection.';
    } finally { controls.forEach(e=>e.disabled=false); }
  };
  let countStep=0;
  ['firstStep','previousStep','nextStep','lastStep'].forEach(id=>$(id).onclick=()=>{if(!current)return;countStep=id==='firstStep'?0:id==='lastStep'?current.steps.length:Math.max(0,Math.min(current.steps.length,countStep+(id==='nextStep'?1:-1)));render();});
  function render(){
    $('stepStatus').textContent='Step '+countStep+' of '+current.steps.length;
    $('firstStep').disabled=$('previousStep').disabled=countStep===0;
    $('nextStep').disabled=$('lastStep').disabled=countStep===current.steps.length;
    const body=$('derivation').tBodies[0];body.replaceChildren();row(body,['Start',current.start]);
    const nodes=[],edges=[];let frontier=[];
    function node(label,level){const n={label,level,id:nodes.length};nodes.push(n);return n;}
    Array.from(current.start).forEach(c=>frontier.push(node(c,0)));
    current.steps.slice(0,countStep).forEach((step,i)=>{
      const p=productions[step.rule];row(body,[p[0]+' → '+(p[2]||'λ'),step.after||'λ']);
      const parents=frontier.slice(step.at,step.at+p[0].length);
      const rhs=p[2]==='λ'?'':p[2];const children=Array.from(rhs||'λ').map(c=>node(c,i+1));
      parents.forEach(a=>children.forEach(b=>edges.push([a,b])));
      frontier.splice(step.at,p[0].length,...(rhs?children:[]));
    });
    const ns='http://www.w3.org/2000/svg';const svg=document.createElementNS(ns,'svg');
    // Give every node its own column so an edge cannot run vertically through an unrelated node.
    nodes.forEach(n=>{n.x=40+n.id*70;n.y=35+n.level*70;});
    svg.setAttribute('width',Math.max(300,nodes.length*70+20));svg.setAttribute('height',(countStep+1)*70);svg.setAttribute('role','img');svg.setAttribute('aria-label','Derivation graph');
    edges.forEach(([a,b])=>{const l=document.createElementNS(ns,'line');[['x1',a.x],['y1',a.y],['x2',b.x],['y2',b.y],['stroke','#555']].forEach(([k,v])=>l.setAttribute(k,v));svg.append(l);});
    nodes.forEach(n=>{const c=document.createElementNS(ns,'circle');c.setAttribute('cx',n.x);c.setAttribute('cy',n.y);c.setAttribute('r',22);c.setAttribute('fill',/[A-Z]/.test(n.label)?'#fff':'#b9edb9');c.setAttribute('stroke','#222');svg.append(c);const t=document.createElementNS(ns,'text');t.setAttribute('x',n.x);t.setAttribute('y',n.y+5);t.setAttribute('text-anchor','middle');t.textContent=n.label;svg.append(t);});
    $('tree').replaceChildren(svg);
  }
  for(let i=0;i<3;i++)addInput();
})();
