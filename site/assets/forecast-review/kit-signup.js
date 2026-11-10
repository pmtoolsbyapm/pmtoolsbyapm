export const FORMS={en:{id:'10167473',uid:'064f2a4970'},es:{id:'10170401',uid:'187b3b8cdc'}};
const KEY='pmt_forecast_signup_v1',PENDING='pmt_forecast_signup_intent_v1';
const route=lang=>lang==='es'?'/es/revisar-prevision.html':'/forecast-check.html';
const words={en:{eyebrow:'Free access with email signup',title:'Get your guided schedule review.',intro:'Join the PM Tools email list to start your review and see your five priorities. No account or schedule upload is needed.',consent:'I agree to receive occasional PM Tools project-management tips, product news and offers. I can unsubscribe at any time.',permission:'Please confirm the subscription choice before continuing.',loading:'Loading the secure signup form…',fallback:'Open the signup form in Kit',fallbackHelp:'If the form does not load, you can subscribe directly in Kit and return here automatically.',privacy:'Kit stores your email and signup source. Your schedule answers and result stay in your browser. This tab remembers access without storing your email here.',confirm:'Check your inbox for the confirmation email. Confirm your subscription to receive PM Tools updates.',back:'Back to the introduction',email:'Email address'},es:{eyebrow:'Acceso gratuito con registro de correo',title:'Obtén tu revisión guiada del cronograma.',intro:'Únete a la lista de correo de PM Tools para comenzar tu revisión y ver tus cinco prioridades. No necesitas cuenta ni cargar el cronograma.',consent:'Acepto recibir consejos de gestión de proyectos, novedades de productos y ofertas ocasionales de PM Tools. Puedo cancelar la suscripción en cualquier momento.',permission:'Confirma la opción de suscripción antes de continuar.',loading:'Cargando el formulario seguro de registro…',fallback:'Abrir el formulario de registro en Kit',fallbackHelp:'Si el formulario no carga, puedes suscribirte directamente en Kit y volver aquí automáticamente.',privacy:'Kit guarda tu correo y el origen del registro. Las respuestas y el resultado del cronograma permanecen en tu navegador. Esta pestaña recuerda el acceso sin guardar aquí tu correo.',confirm:'Revisa tu bandeja de entrada y confirma la suscripción para recibir novedades de PM Tools.',back:'Volver al inicio',email:'Correo electrónico'}};
export function validateReturn({search,referrer,pending}){
 const query=new URLSearchParams(search),form=query.get('form');
 if(query.get('signup')!=='accepted'||!Object.values(FORMS).some(f=>f.id===form))return false;
 if(pending?.form===form)return true;
 try{const origin=new URL(referrer).origin;return ['https://app.kit.com','https://pm-tools-by-a-pm.kit.com','https://app.convertkit.com'].includes(origin);}catch{return false;}
}
export function notifySignupReturn(){
 let pending=null;try{pending=JSON.parse(sessionStorage.getItem(PENDING)||'null');}catch{}
 if(!validateReturn({search:location.search,referrer:document.referrer,pending}))return false;
 try{sessionStorage.setItem(KEY,'accepted');sessionStorage.removeItem(PENDING);}catch{}
 const form=new URLSearchParams(location.search).get('form'),lang=form===FORMS.es.id?'es':'en';
 history.replaceState(null,'',route(lang));return true;
}
export function createSignupGate({getLanguage,onChange}){
 let accepted=false,consent=false,intent='review',observer=null;
 try{const p=JSON.parse(sessionStorage.getItem(PENDING)||'null');if(p?.intent==='checklist')intent='checklist';}catch{}
 function hasAccess(){try{return accepted||sessionStorage.getItem(KEY)==='accepted';}catch{return accepted;}}
 function rememberIntent(){try{sessionStorage.setItem(PENDING,JSON.stringify({form:FORMS[getLanguage()].id,intent}));}catch{}}
 function note(){const node=document.getElementById('signup-consent-error');if(node){node.hidden=false;node.textContent=words[getLanguage()].permission;}document.getElementById('signup-consent')?.focus();}
 function render(){const w=words[getLanguage()],form=FORMS[getLanguage()];return `<div class="assessment signup-page"><button class="back" data-action="home">← ${w.back}</button><div class="eyebrow">${w.eyebrow}</div><h1>${w.title}</h1><p class="intro">${w.intro}</p><label class="signup-consent"><input id="signup-consent" type="checkbox" required ${consent?'checked':''}><span>${w.consent}</span></label><p class="signup-notice" id="signup-consent-error" role="alert" hidden></p><div id="kit-review-form" class="kit-review-form" data-form-id="${form.id}"><p id="kit-loading" role="status">${w.loading}</p></div><p class="signup-fallback-help">${w.fallbackHelp} <a href="https://pm-tools-by-a-pm.kit.com/${form.uid}" id="kit-hosted-signup">${w.fallback} ↗</a></p><p class="signup-privacy">${w.privacy}</p><p class="signup-privacy">${w.confirm}</p></div>`;}
 function mount(){
  observer?.disconnect();const target=document.getElementById('kit-review-form');if(!target)return;
  const form=FORMS[getLanguage()];if(target.dataset.mounted===form.uid)return;target.dataset.mounted=form.uid;
  function ready(){const input=target.querySelector('input[type=email]');if(input){input.placeholder=words[getLanguage()].email;input.setAttribute('aria-label',words[getLanguage()].email);const loading=document.getElementById('kit-loading');if(loading)loading.hidden=true;}}
  observer=new MutationObserver(ready);observer.observe(target,{childList:true,subtree:true});
  const script=document.createElement('script');script.async=true;script.dataset.uid=form.uid;script.src=`https://pm-tools-by-a-pm.kit.com/${form.uid}/index.js`;script.onerror=()=>{const loading=document.getElementById('kit-loading');if(loading)loading.textContent=words[getLanguage()].fallbackHelp;};target.appendChild(script);
 }
 document.addEventListener('change',event=>{if(event.target.id==='signup-consent'){consent=event.target.checked;const error=document.getElementById('signup-consent-error');if(error)error.hidden=true;}});
 // Capture runs before Kit's own submit handler. No false success or no-cors fallback.
 document.addEventListener('submit',event=>{const holder=document.getElementById('kit-review-form');if(holder?.contains(event.target)){if(!consent){event.preventDefault();event.stopImmediatePropagation();note();}else rememberIntent();}},true);
 document.addEventListener('click',event=>{if(event.target.closest('#kit-hosted-signup')){if(!consent){event.preventDefault();note();}else rememberIntent();}});
 return {hasAccess,render,mount,setIntent:v=>{intent=v==='checklist'?'checklist':'review';},intent:()=>intent,acceptReturn:()=>{accepted=true;}};
}
