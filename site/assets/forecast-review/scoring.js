export const sections=['logic','baseline','updating','management'];
export const groups={logic:['Q01','Q02','Q03','Q04','Q05'],baseline:['Q06','Q07'],updating:['Q08','Q09','Q10','Q11'],management:['Q12','Q13','Q14','Q15']};
const foundation=['Q01','Q08','Q10'];
const order=['Q01','Q08','Q10','Q02','Q03','Q09','Q11','Q06','Q07','Q04','Q05','Q13','Q15','Q12','Q14'];
const category=n=>n>=80?'green':n>=50?'amber':'red';
export function score(answers){
 const ids=sections.flatMap(s=>groups[s]);
 for(const id of ids)if(!['A','B','C','U'].includes(answers[id]))throw Error(`Answer required: ${id}`);
 if(answers.Q06==='C'&&!['C','U'].includes(answers.Q07))throw Error('baseline_consistency');
 const dimensions={};
 for(const section of sections){
  const qids=groups[section],index=100*qids.reduce((n,id)=>n+({A:2,B:1,C:0,U:0}[answers[id]]),0)/(2*qids.length);
  let rating=category(index);
  if(qids.some(id=>foundation.includes(id)&&answers[id]==='C'))rating='red';
  else if(rating==='green'&&qids.some(id=>['C','U'].includes(answers[id])))rating='amber';
  dimensions[section]={index,rating,limits:qids.filter(id=>answers[id]!=='A')};
 }
 const index=sections.reduce((n,s)=>n+dimensions[s].index,0)/4;
 const unknowns=ids.filter(id=>answers[id]==='U').length;
 let rating=category(index);
 if(sections.some(s=>dimensions[s].rating==='red')||unknowns>=3)rating='red';
 else if(rating==='green'&&(sections.some(s=>dimensions[s].rating==='amber')||ids.some(id=>['C','U'].includes(answers[id]))))rating='amber';
 const severity=id=>foundation.includes(id)&&answers[id]==='C'?0:foundation.includes(id)&&answers[id]==='U'?1:answers[id]==='C'?2:answers[id]==='U'?3:answers[id]==='B'?4:5;
 const actions=[...ids].sort((a,b)=>severity(a)-severity(b)||order.indexOf(a)-order.indexOf(b)).slice(0,5).map(id=>({id,type:answers[id]==='A'?'maintain':answers[id]==='U'?'verify':answers[id]==='C'?'correct':'improve'}));
 const hasWeakness=ids.some(id=>['B','C'].includes(answers[id]));
 const basis=unknowns&&hasWeakness?'mixed':unknowns?'unverified':'reported';
 const first=actions[0].id;
 const workflow=['Q01','Q02','Q03','Q04','Q05','Q13'].includes(first)?'logic':['Q06','Q07'].includes(first)?'baseline':['Q08','Q09','Q10','Q11'].includes(first)?'updating':'management';
 return {rating,index,dimensions,unknowns,confirmed:15-unknowns,actions,basis,workflow};
}
