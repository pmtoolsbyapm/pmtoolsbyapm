/* PM Tools by a PM — Schedule Checker page. Uses PMChecker.analyse from core.js. */
(function () {
  'use strict';
  const ES = (document.documentElement.lang || '').toLowerCase().startsWith('es');
  const L = (en, es) => ES ? es : en;
  const $ = s => document.querySelector(s);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const fmt = new Intl.DateTimeFormat(ES ? 'es' : 'en-GB', { day: 'numeric', month: 'short', year: 'numeric', timeZone: 'UTC' });
  const D = ms => ms == null ? '—' : fmt.format(new Date(ms)).replace('.', '').replace('Sept', 'Sep');
  const n = (k, one, many) => k === 1 ? one : many;
  const act = a => `${esc(a.wbs ? a.wbs + ' ' : '')}${esc(a.name)}`;
  const list = items => items && items.length ? `<div class="acts">${items.map(act).join(' · ')}</div>` : '';
  const days = k => `${k} ${n(Math.abs(k), L('day', 'día'), L('days', 'días'))}`;
  const wdays = k => `${k} ${n(Math.abs(k), L('working day', 'día laborable'), L('working days', 'días laborables'))}`;

  const ST = { pass: L('PASS', 'CORRECTO'), fix: L('FIX', 'CORREGIR'), crit: L('CRITICAL', 'CRÍTICO'), needs: L('NEEDS LINKS', 'FALTAN RELACIONES'), na: 'N/A' };
  const TYPE = { linked: L('Linked schedule', 'Cronograma relacionado'), partly: L('Partly linked', 'Parcialmente relacionado'), datelist: L('Date list, not a linked schedule', 'Lista de fechas, no un cronograma relacionado') };
  const NAMES = {
    typed: L('Typed-in dates and hard constraints', 'Fechas escritas a mano y restricciones'),
    open: L('Open ends', 'Cabos sueltos en la lógica'),
    long: L('Activities too long', 'Actividades demasiado largas'),
    lags: L('Lags hiding work', 'Desfases que esconden trabajo'),
    proc: L('Procurement and approvals', 'Compras y aprobaciones'),
    neg: L('Negative float, no action', 'Holgura negativa sin acción'),
    high: L('Float that looks too good', 'Holgura que parece demasiado buena'),
    cp: L('Broken critical path', 'Ruta crítica rota'),
    base: L('Baseline missing', 'Línea base inexistente'),
    status: L('Dates vs the status date', 'Fechas frente a la fecha de corte')
  };

  function detail(c, r) {
    switch (c.key) {
      case 'typed':
        if (c.status === 'pass') return L('No manually scheduled activities and no hard constraints. Dates are driven by links.', 'Sin actividades programadas manualmente ni restricciones rígidas. Las fechas las determinan las relaciones.') + (c.soft ? ' ' + L(`${c.soft} “start/finish no earlier than” constraints: confirm each one has a reason.`, `${c.soft} restricciones “no comenzar/terminar antes de”: confirma que cada una tiene un motivo.`) : '');
        return `<b>${L(`${c.manual} manually scheduled ${n(c.manual, 'activity', 'activities')} and ${c.hard} hard ${n(c.hard, 'constraint', 'constraints')}.`, `${c.manual} ${n(c.manual, 'actividad programada', 'actividades programadas')} manualmente y ${c.hard} ${n(c.hard, 'restricción rígida', 'restricciones rígidas')}.`)}</b> ${L('These dates will not react when work runs late.', 'Estas fechas no reaccionan cuando el trabajo se atrasa.')}${list(c.items)}`;
      case 'open':
        if (c.status === 'pass') return L('Every activity has a predecessor and a successor, apart from the start and the finish.', 'Toda actividad tiene predecesora y sucesora, salvo el inicio y el fin.');
        return `<b>${L(`${c.count} of ${c.total} activities have no predecessor, no successor, or neither.`, `${c.count} de ${c.total} actividades no tienen predecesora, sucesora o ninguna de las dos.`)}</b> ${L('Delays stop travelling where the links stop.', 'Los retrasos dejan de propagarse donde terminan las relaciones.')}${list(c.items)}`;
      case 'long':
        if (c.status === 'pass') return c.longest ? L(`Longest activity: ${c.longest.dur} days (${act(c.longest)}), within two monthly update periods.`, `Actividad más larga: ${c.longest.dur} días (${act(c.longest)}), dentro de dos períodos mensuales de actualización.`) : '';
        return `<b>${L(`${c.count} ${n(c.count, 'activity runs', 'activities run')} longer than two monthly updates (40 working days).`, `${c.count} ${n(c.count, 'actividad dura', 'actividades duran')} más de dos actualizaciones mensuales (40 días laborables).`)}</b> ${L('Progress on them becomes a guess.', 'Su avance se vuelve una suposición.')}<div class="acts">${c.items.map(a => `${act(a)} (${a.dur} ${L('days', 'días')})`).join(' · ')}</div>`;
      case 'lags':
        if (c.status === 'pass') return c.count ? L(`${c.count} short ${n(c.count, 'lag', 'lags')}, none longer than 10 days and no leads.`, `${c.count} ${n(c.count, 'desfase corto', 'desfases cortos')}, ninguno mayor de 10 días y sin adelantos.`) : L('No lags found.', 'No se encontraron desfases.');
        return `<b>${L(`${c.big} ${n(c.big, 'lag is', 'lags are')} 10 days or longer, or negative.`, `${c.big} ${n(c.big, 'desfase es', 'desfases son')} de 10 días o más, o negativos.`)}</b> ${L('A long lag is usually real work with no name: curing, approvals, mobilisation.', 'Un desfase largo suele ser trabajo real sin nombre: curado, aprobaciones, movilización.')}<div class="acts">${c.items.map(a => `${act(a)} (${a.type}${a.lag > 0 ? '+' : ''}${a.lag} ${L('d', 'd')})`).join(' · ')}</div>`;
      case 'proc':
        if (c.status === 'needs') return L('Procurement and approval activities exist, but they are not linked to the work they feed, so their effect on site cannot be checked.', 'Existen actividades de compras y aprobaciones, pero no están relacionadas con el trabajo que habilitan, así que no se puede comprobar su efecto en obra.');
        if (!c.count) return `<b>${L('No procurement or approval activities found.', 'No se encontraron actividades de compras ni de aprobaciones.')}</b> ${L('Most delays start before site: submittals, approvals, long-lead items.', 'La mayoría de los retrasos empiezan antes de la obra: entregables, aprobaciones, equipos de largo plazo.')}`;
        if (c.status === 'pass') return L(`${c.count} procurement and approval activities found, all linked to the work that follows.`, `${c.count} actividades de compras y aprobaciones, todas relacionadas con el trabajo que sigue.`);
        return `<b>${L(`${c.loose} of ${c.count} procurement or approval activities lead nowhere.`, `${c.loose} de ${c.count} actividades de compras o aprobaciones no conducen a ningún trabajo.`)}</b> ${L('A late delivery would not move anything.', 'Una entrega tardía no movería nada.')}${list(c.items)}`;
      case 'neg':
        if (c.status === 'needs') return L('Float cannot be calculated without links. Any float shown in this file has no meaning yet.', 'La holgura no se puede calcular sin relaciones. Cualquier holgura que muestre el archivo todavía no tiene significado.');
        if (c.status === 'pass') return L('No negative float: every deadline in the file can be met by the current logic.', 'Sin holgura negativa: la lógica actual cumple todas las fechas límite del archivo.');
        return `<b>${L(`${c.count} of ${c.total} activities have negative float.`, `${c.count} de ${c.total} actividades tienen holgura negativa.`)}</b> ${L(`Worst: ${c.worst} days.`, `La peor: ${c.worst} días.`)}<div class="acts">${c.items.map(a => `${act(a)} (${a.tf} d)`).join(' · ')}</div>`;
      case 'high':
        if (c.status === 'needs') return L('Same reason: float has no meaning until the activities are linked.', 'Por el mismo motivo: la holgura no tiene significado hasta relacionar las actividades.');
        if (c.status === 'pass') return L(`No activity shows more than ${c.limit} days of float.`, `Ninguna actividad muestra más de ${c.limit} días de holgura.`);
        return `<b>${L(`${c.count} ${n(c.count, 'activity shows', 'activities show')} more than ${c.limit} days of float.`, `${c.count} ${n(c.count, 'actividad muestra', 'actividades muestran')} más de ${c.limit} días de holgura.`)}</b> ${L('Large float on real work usually means missing logic, not spare time.', 'Mucha holgura en trabajo real suele indicar lógica faltante, no tiempo de sobra.')}<div class="acts">${c.items.map(a => `${act(a)} (${a.tf} d)`).join(' · ')}</div>`;
      case 'cp':
        if (c.loop) return `<b>${L('The links form a loop.', 'Las relaciones forman un ciclo.')}</b> ${L('An activity ends up depending on itself, so no critical path can be calculated.', 'Una actividad termina dependiendo de sí misma, así que no se puede calcular la ruta crítica.')}`;
        if (!r.floatValid) return `<b>${L('No continuous path drives the finish date.', 'Ningún camino continuo determina la fecha de fin.')}</b> ${L('Nobody can say which work controls completion.', 'Nadie puede decir qué trabajo controla la finalización.')}`;
        if (c.status === 'pass') return L(`One continuous driving path from ${act(c.start)} to ${act(c.end)}.`, `Una ruta continua de ${act(c.start)} a ${act(c.end)}.`);
        return `<b>${L('The path to the finish breaks.', 'La ruta hacia el fin se interrumpe.')}</b> ${L('Somewhere along it, a date is held by something other than a link: a constraint or a typed date.', 'En algún punto, una fecha la retiene algo distinto de una relación: una restricción o una fecha escrita a mano.')}`;
      case 'base':
        return c.status === 'pass' ? L('A baseline is saved.', 'Hay una línea base guardada.') : `<b>${L('No baseline is saved.', 'No hay línea base guardada.')}</b> ${L('Without one you cannot show what changed later, or who caused it.', 'Sin ella no puedes demostrar qué cambió después ni quién lo causó.')}`;
      case 'status':
        if (c.status === 'na') return L('No progress recorded yet. This check runs once the schedule is updated.', 'Aún no hay avance registrado. Esta comprobación se activa cuando se actualiza el cronograma.');
        if (c.noStatusDate) return `<b>${L('Progress is recorded, but no status date is set.', 'Hay avance registrado, pero no hay fecha de corte.')}</b>`;
        if (c.status === 'pass') return L('Actual dates sit before the status date and remaining work after it.', 'Las fechas reales están antes de la fecha de corte y el trabajo pendiente después.');
        return `<b>${L(`${c.count} ${n(c.count, 'activity is', 'activities are')} on the wrong side of the status date.`, `${c.count} ${n(c.count, 'actividad está', 'actividades están')} del lado equivocado de la fecha de corte.`)}</b>${list(c.items)}`;
    }
    return '';
  }

  function headline(r) {
    const h = r.head;
    if (h.kind === 'datelist') return {
      h1: L('Your finish date is <span>typed, not calculated.</span>', 'Tu fecha de fin está <span>escrita, no calculada.</span>'),
      p: L(`${r.notLinked} of ${r.activities} activities are not fully linked, and ${r.manual} are manually scheduled. The schedule shows ${D(r.finish)} because someone wrote it, not because the work adds up to it. When anything runs late, the dates will not move.`,
        `${r.notLinked} de ${r.activities} actividades no están completamente relacionadas y ${r.manual} están programadas manualmente. El cronograma muestra ${D(r.finish)} porque alguien lo escribió, no porque el trabajo sume esa fecha. Cuando algo se atrase, las fechas no se moverán.`) };
    if (h.kind === 'typed') return {
      h1: L(`<span>${h.count} typed dates</span> are holding your schedule.`, `<span>${h.count} fechas escritas a mano</span> sostienen tu cronograma.`),
      p: L('Most of the schedule is linked, but these dates are fixed by hand or by hard constraints. Wherever they sit, delays stop travelling.', 'La mayor parte del cronograma está relacionada, pero estas fechas están fijadas a mano o con restricciones rígidas. Donde están, los retrasos dejan de propagarse.') };
    if (h.kind === 'late') return {
      h1: L(`Your schedule finishes <span>${wdays(h.late)} late.</span>`, `Tu cronograma termina <span>${h.late} ${n(h.late, 'día laborable', 'días laborables')} tarde.</span>`),
      p: h.deadline ? L(`${esc(h.deadline.name)} calculates to ${D(h.deadline.finish)}. Its deadline is ${D(h.deadline.deadline)}. ${r.checks[5].count} of ${r.activities} activities are already behind their required dates.`, `${esc(h.deadline.name)} se calcula para el ${D(h.deadline.finish)}. Su fecha límite es el ${D(h.deadline.deadline)}. ${r.checks[5].count} de ${r.activities} actividades ya están detrás de sus fechas requeridas.`) : '' };
    if (h.kind === 'ontime') return {
      h1: h.margin != null ? L(`Your finish date holds, <span class="ok">with ${days(h.margin)} to spare.</span>`, `Tu fecha de fin se cumple, <span class="ok">con ${days(h.margin)} de margen.</span>`) : L('Your finish date is <span class="ok">calculated by links.</span>', 'Tu fecha de fin está <span class="ok">calculada por relaciones.</span>'),
      p: h.margin != null ? L(`Finish ${D(h.finish)} against a deadline of ${D(h.deadline.deadline)}. ${h.near} ${n(h.near, 'activity has', 'activities have')} 5 days of float or less: those decide whether the margin survives.`, `Fin el ${D(h.finish)} frente a una fecha límite del ${D(h.deadline.deadline)}. ${h.near} ${n(h.near, 'actividad tiene', 'actividades tienen')} 5 días de holgura o menos: de ellas depende que el margen se mantenga.`) : L(`No deadline is set in the file, so the checker cannot say whether ${D(h.finish)} meets your contract. Add a deadline to the finish milestone and check again.`, `El archivo no tiene fecha límite, así que no se puede saber si el ${D(h.finish)} cumple tu contrato. Añade una fecha límite al hito final y vuelve a revisar.`) };
  }

  function finding(r) {
    const h = r.head;
    const box = (lab, h2, p, side) => `<section class="find"><div><div class="lab">${lab}</div><h2>${h2}</h2><p>${p}</p></div>${side ? `<div class="gap">${side}</div>` : ''}</section>`;
    const row = (a, b) => `<div class="gaprow"><span>${a}</span><b>${b}</b></div>`;
    if ((h.kind === 'datelist' || h.kind === 'typed') && h.test) {
      const t = h.test;
      return box(L('WE TESTED IT FOR YOU', 'LO PROBAMOS POR TI'),
        L(`We delayed ${esc(t.name)} by ${t.days} working days. Your finish date ${t.moved ? 'barely moved' : 'did not move'}.`, `Atrasamos ${esc(t.name)} ${t.days} días laborables. Tu fecha de fin ${t.moved ? 'casi no se movió' : 'no se movió'}.`),
        L('That is what a typed schedule does: it keeps reporting on time while the site falls behind. The first question a client or an Engineer will ask is “what does this delay do to the finish?”, and this file cannot answer it.', 'Eso hace un cronograma con fechas escritas: sigue diciendo que va a tiempo mientras la obra se atrasa. Lo primero que preguntará un cliente o el Ingeniero es “¿qué le hace este retraso al fin?”, y este archivo no puede responderlo.'),
        row(`${act(t)} ${L('finish', 'fin')}`, D(t.before)) + `<div class="wait">${L(`Delayed by ${t.days} working days`, `Atrasada ${t.days} días laborables`)}</div>` + row(`${act(t)} ${L('finish', 'fin')}`, D(t.after)) + row(L('Project finish, before', 'Fin del proyecto, antes'), D(t.finishBefore)) + row(L('Project finish, after', 'Fin del proyecto, después'), t.moved ? `+${t.moved} d` : D(t.finishBefore)));
    }
    if (h.kind === 'late' && h.gap) {
      const g = h.gap;
      return box(L('WORTH CHECKING FIRST', 'VALE LA PENA REVISAR PRIMERO'),
        L(`${esc(g.area)} is ready on ${D(g.readyFinish)}. ${esc(g.task.name)} starts on ${D(g.taskStart)}.`, `${esc(g.area)} está listo el ${D(g.readyFinish)}. ${esc(g.task.name)} empieza el ${D(g.taskStart)}.`),
        L(`${act(g.task)} is linked to “${esc(g.milestone.name)}”, a milestone that collects work from other areas, so it waits ${g.wait} working days after the last work in ${esc(g.area)}. If that link is what you intend, keep it. If it isn’t, this is where your time is, and no duration needs to change.`,
          `${act(g.task)} está relacionada con “${esc(g.milestone.name)}”, un hito que reúne trabajo de otras zonas, así que espera ${g.wait} días laborables después del último trabajo en ${esc(g.area)}. Si esa relación es intencional, mantenla. Si no lo es, aquí está tu tiempo, sin cambiar ninguna duración.`),
        row(`${act(g.ready)} ${L('finishes', 'termina')}`, D(g.readyFinish)) + `<div class="wait">${L(`${g.wait} working days waiting`, `${g.wait} días laborables de espera`)}</div>` + row(`${act(g.task)} ${L('starts', 'empieza')}`, D(g.taskStart)));
    }
    if (h.kind === 'late') {
      return box(L('WHERE TO LOOK FIRST', 'DÓNDE MIRAR PRIMERO'),
        L(`The chain with the most negative float misses its date by ${Math.abs(r.checks[5].worst)} days.`, `La cadena con la holgura más negativa incumple su fecha por ${Math.abs(r.checks[5].worst)} días.`),
        L('Look for work that waits on links it may not need, before you shorten any duration. Shortened durations promise production nobody has planned.', 'Busca trabajo que espera por relaciones que quizá no necesita, antes de acortar duraciones. Una duración recortada promete una producción que nadie ha planificado.'),
        h.chain.map(a => row(act(a), `${a.tf} d`)).join(''));
    }
    if (h.kind === 'ontime' && h.near) {
      return box(L('WATCH THESE', 'VIGILA ESTAS'),
        L(`${h.near} ${n(h.near, 'activity is', 'activities are')} one bad week away from becoming critical.`, `${h.near} ${n(h.near, 'actividad está', 'actividades están')} a una mala semana de volverse críticas.`),
        L('The critical path is rarely where the next delay comes from. It comes from the activity that had five days of float last month and two this month. List these at every update.', 'La ruta crítica rara vez es de donde viene el próximo retraso. Viene de la actividad que tenía cinco días de holgura el mes pasado y dos este mes. Revísalas en cada actualización.'),
        h.nearItems.map(a => row(act(a), `${a.tf} d`)).join(''));
    }
    return '';
  }

  function tiles(r) {
    const t = (k, v, s, bad) => `<div class="tile"><div class="k">${k}</div><div class="v ${bad || ''}">${v}</div><div class="s">${s}</div></div>`;
    const out = [];
    if (r.type === 'datelist') {
      out.push(t(L('Activities not fully linked', 'Actividades sin relacionar del todo'), `${r.notLinked} ${L('of', 'de')} ${r.activities}`, L('No predecessor, no successor, or both', 'Sin predecesora, sin sucesora o ambas'), 'bad'));
      out.push(t(L('Manually scheduled', 'Programadas manualmente'), r.manual, L('Dates fixed by hand', 'Fechas fijadas a mano'), r.manual ? 'bad' : ''));
      out.push(t(L('Hard constraints', 'Restricciones rígidas'), r.hard, L('“Must start/finish on” and similar', '“Debe comenzar/terminar el” y similares'), r.hard ? 'bad' : ''));
    } else {
      for (const d of r.deadlines.slice(0, 3)) out.push(t(esc(d.name), d.late ? `−${d.late} ${L('days', 'días')}` : `+${d.margin} ${L('days', 'días')}`, `${D(d.finish)} ${L('vs deadline', 'frente a fecha límite')} ${D(d.deadline)}`, d.late ? 'bad' : 'good'));
      if (!r.deadlines.length) out.push(t(L('Calculated finish', 'Fin calculado'), D(r.finish), L('No deadline set in the file', 'Sin fecha límite en el archivo')));
    }
    const ran = 10 - r.tally.na - r.tally.needs;
    out.push(t(L('Red flags checked', 'Señales revisadas'), `${r.tally.pass} ${L('of', 'de')} ${ran} ${L('pass', 'correctas')}`, [r.tally.fix + r.tally.crit ? `${r.tally.fix + r.tally.crit} ${L('to fix', 'por corregir')}` : '', r.tally.needs ? `${r.tally.needs} ${L('need links first', 'requieren relaciones')}` : '', r.tally.na ? `${r.tally.na} ${L('not applicable yet', 'aún no aplican')}` : ''].filter(Boolean).join(' · ')));
    return `<div class="tiles">${out.join('')}</div>`;
  }

  function nextCards(r) {
    const c = (h, p, a, href, primary) => `<div class="card"><h4>${h}</h4><p>${p}</p>${href === '#print' ? `<button class="btn ${primary ? 'primary' : 'ghost'}" type="button" data-print>${a}</button>` : `<a class="btn ${primary ? 'primary' : 'ghost'}" href="${href}">${a}</a>`}</div>`;
    const sched = ES ? '/es/planificador.html' : '/scheduler.html';
    const cards = [
      c(L('Turn it into a real schedule', 'Conviértelo en un cronograma real'), L('Import this file into Scheduler. It keeps your activities and durations, and helps you link them, without an MS Project or P6 course.', 'Importa este archivo en Scheduler. Conserva tus actividades y duraciones, y te ayuda a relacionarlas sin un curso de MS Project o P6.'), L('See Scheduler', 'Ver Scheduler'), sched, r.type !== 'linked'),
      c(L('Download this report', 'Descarga este informe'), L('A printable summary with every finding and activity ID, ready for your next progress meeting.', 'Un resumen imprimible con cada hallazgo e ID de actividad, listo para tu próxima reunión de avance.'), L('Download PDF report', 'Descargar informe PDF'), '#print', r.type === 'linked'),
      c(L('Check the sequence too', 'Revisa también la secuencia'), L('This checker reads how the file is built. The free Guided Schedule Review walks you through the questions only you can answer about the work itself.', 'Este verificador lee cómo está construido el archivo. La Revisión Guiada gratuita te lleva por las preguntas que solo tú puedes responder sobre el trabajo.'), L('Free Guided Review', 'Revisión guiada gratuita'), ES ? '/es/revisar-prevision.html' : '/forecast-check.html'),
      c(L('Want a planner to look at it?', '¿Quieres que lo revise un planificador?'), L('A professional Schedule Health Review: findings, corrections and a short written report.', 'Una revisión profesional del cronograma: hallazgos, correcciones y un breve informe escrito.'), L('Ask for a review', 'Solicitar una revisión'), 'mailto:support@pmtoolsbyapm.com?subject=' + encodeURIComponent(L('Schedule review', 'Revisión de cronograma')))
    ];
    return `<div class="next">${cards.join('')}</div>`;
  }

  const SCOPE = `<section class="scope">
    <div><div class="lab">${L('WHAT THIS CHECKER LOOKS AT', 'QUÉ REVISA ESTE VERIFICADOR')}</div><p>${L('How your schedule is <b>built</b>: links, typed dates and constraints, lags, durations, float, the critical path, the baseline and the status date. It reads the file exactly as it is.', 'Cómo está <b>construido</b> tu cronograma: relaciones, fechas escritas y restricciones, desfases, duraciones, holguras, ruta crítica, línea base y fecha de corte. Lee el archivo exactamente como está.')}</p></div>
    <div><div class="lab">${L('WHAT IT DOES NOT JUDGE', 'QUÉ NO EVALÚA')}</div><p>${L('Whether your <b>sequence is right for the job</b>. Gypsum walls linked before the building is watertight will pass every check here, because the link exists. The construction sequence is your planning judgement: Scheduler’s guided builder and a professional review cover that.', 'Si tu <b>secuencia es correcta para la obra</b>. Unas paredes de yeso relacionadas antes de que el edificio esté cerrado pasarán todas estas comprobaciones, porque la relación existe. La secuencia constructiva es tu criterio de planificación: el asistente guiado de Scheduler y una revisión profesional se ocupan de eso.')}</p></div>
  </section>`;

  function render(r, fileName) {
    const hl = headline(r);
    const checks = r.checks.map((c, i) => `<div class="ck"><div class="num">${i + 1}</div><div class="name">${NAMES[c.key]}</div><div class="st ${c.status}">${ST[c.status]}</div><div class="det">${detail(c, r)}</div></div>`).join('');
    $('#result').innerHTML = `
      <div class="file">
        <span>${L('File', 'Archivo')}: <b>${esc(fileName)}</b> (MS Project)</span>
        <span><b>${r.rows}</b> ${L('rows', 'filas')} · <b>${r.activities}</b> ${L('activities', 'actividades')}</span>
        <span>${L('Schedule type', 'Tipo de cronograma')}: <b class="${r.type === 'linked' ? '' : 'bad'}">${TYPE[r.type]}</b></span>
        <span>${L('Your file never left this computer', 'Tu archivo nunca salió de esta computadora')}</span>
        <button class="btn ghost again noprint" type="button" data-again>${L('Check another file', 'Revisar otro archivo')}</button>
      </div>
      <section class="hero"><h1>${hl.h1}</h1><p>${hl.p}</p></section>
      ${tiles(r)}
      ${finding(r)}
      <div class="sec"><h3>${L('The 10 red flags in your schedule', 'Las 10 señales de alerta de tu cronograma')}</h3><span>${r.tally.needs ? L('Some checks need links to run. We tell you which, and why.', 'Algunas comprobaciones necesitan relaciones. Te decimos cuáles y por qué.') : L('Each finding names the activities, so you can go straight to them.', 'Cada hallazgo nombra las actividades, para que vayas directo a ellas.')}</span></div>
      <div class="checks">${checks}</div>
      ${SCOPE}
      <div class="sec noprint"><h3>${L('What to do next', 'Qué hacer ahora')}</h3><span>${L('The report is free. Everything else is optional.', 'El informe es gratuito. Todo lo demás es opcional.')}</span></div>
      ${nextCards(r)}`;
    $('#intro').classList.add('hide'); $('#result').classList.remove('hide');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function fail(code) {
    const msg = {
      'not-mspdi': L('This file is not an MS Project XML file. In MS Project, use File › Save As and choose “XML Format (*.xml)”. An .mpp file cannot be read directly.', 'Este archivo no es un XML de MS Project. En MS Project, usa Archivo › Guardar como y elige “Formato XML (*.xml)”. Un archivo .mpp no se puede leer directamente.'),
      'no-tasks': L('The file has no activities to check.', 'El archivo no tiene actividades que revisar.'),
      'xer': L('Primavera P6 (.xer) files are coming soon. For now, export from P6 to MS Project XML, or check an MS Project file.', 'Los archivos de Primavera P6 (.xer) llegan pronto. Por ahora, exporta desde P6 a XML de MS Project o revisa un archivo de MS Project.')
    }[code] || L('The file could not be read. Check that it is an MS Project XML file.', 'No se pudo leer el archivo. Comprueba que sea un XML de MS Project.');
    const e = $('#err'); e.textContent = msg; e.classList.remove('hide');
  }

  function run(text, name) {
    $('#err').classList.add('hide');
    try { render(window.PMChecker.analyse(text), name); }
    catch (e) { console.error(e); fail(e && e.message); }
  }

  function readFile(f) {
    if (!f) return;
    if (/\.xer$/i.test(f.name)) return fail('xer');
    if (/\.mpp$/i.test(f.name)) return fail('not-mspdi');
    const rd = new FileReader(); rd.onload = () => run(String(rd.result), f.name); rd.onerror = () => fail(); rd.readAsText(f);
  }

  const drop = $('#drop'), input = $('#file');
  input.addEventListener('change', () => readFile(input.files[0]));
  ['dragenter', 'dragover'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.add('over'); }));
  ['dragleave', 'drop'].forEach(ev => drop.addEventListener(ev, e => { e.preventDefault(); drop.classList.remove('over'); }));
  drop.addEventListener('drop', e => readFile(e.dataTransfer.files[0]));
  document.addEventListener('click', e => {
    const s = e.target.closest('[data-sample]');
    if (s) { fetch(s.dataset.sample).then(r => r.text()).then(t => run(t, s.dataset.name)).catch(() => fail()); }
    if (e.target.closest('[data-print]')) window.print();
    if (e.target.closest('[data-again]')) { $('#result').classList.add('hide'); $('#intro').classList.remove('hide'); input.value = ''; window.scrollTo({ top: 0 }); }
  });
})();
