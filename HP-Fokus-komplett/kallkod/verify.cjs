const fs=require('fs'),vm=require('vm'),assert=require('assert');const nodes={};const el=()=>({innerHTML:'',textContent:'',style:{},value:'',classList:{toggle(){}},onclick:null});const ctx={console,localStorage:{getItem(){return null},setItem(){},removeItem(){}},document:{querySelector(s){return nodes[s]??=el()},body:el(),activeElement:{tagName:'BODY'}},window:{scrollTo(){},addEventListener(){}},setTimeout(){},setInterval(){},clearInterval(){},Date,Math,Blob,URL};vm.createContext(ctx);vm.runInContext(fs.readFileSync('dist/data.js','utf8')+'\n'+fs.readFileSync('dist/app.js','utf8'),ctx);vm.runInContext(`
questions.forEach(q=>{if(!q.o[q.a]||new Set(q.o).size!==q.o.length)throw Error('Invalid question '+q.id)});
Object.keys(names).forEach(go); go('settings');
Object.keys(subjects).forEach(s=>{session=null;start(s);if(session.ids.some(id=>questions.find(q=>q.id===id).s!==s))throw Error('Wrong subject '+s)});
session=null;start('Alla',16);if(new Set(session.ids.map(id=>questions.find(q=>q.id===id).s)).size!==8)throw Error('Missing subjects');
let q=questions.find(q=>q.id===session.ids[0]);choose(q.a);check();if(!state.history.at(-1).ok)throw Error('Grading');let count=state.history.length;check();if(state.history.length!==count)throw Error('Duplicate grade');
go('practice');resume();if(session.at!==0)throw Error('Resume');move(1);q=questions.find(q=>q.id===session.ids[1]);choose((q.a+1)%q.o.length);check();if(!due().some(x=>x.id===q.id))throw Error('Review queue');mark(q.id);if(!state.marks.includes(q.id))throw Error('Bookmark');finish();if(!session.done||state.history.length!==16)throw Error('Finish grading');
session=null;start('Verbalt',20,28);if(session.ids.some(id=>['XYZ','KVA','NOG','DTK'].includes(questions.find(q=>q.id===id).s)))throw Error('Verbal filter');
console.log('Verified',questions.length,'questions,',lessons.length,'lessons, all views, subject filters, balanced diagnosis, grading, resume, bookmarks, review and completion.');
`,ctx);
