/* PM Tools by a PM — Schedule Checker engine.
   Reads an MS Project XML (MSPDI) file and checks how the schedule is BUILT.
   It never judges whether the construction sequence is right.
   Everything runs in the browser; nothing is uploaded. */
(function (root) {
  'use strict';

  const DAY = 86400000;
  const HARD = { 2: 'MSO', 3: 'MFO', 5: 'SNLT', 7: 'FNLT' };   // Must start on, Must finish on, Start no later than, Finish no later than
  const SOFT = { 4: 'SNET', 6: 'FNET' };                        // Start/Finish no earlier than
  const PROC = /(procur|purchas|order|deliver|fabricat|supply|submittal|approv|permit|long[- ]lead|compra|adquisi|pedido|entrega|suministr|fabricaci|aprobaci|permiso|licencia)/i;

  function kids(el, tag) { return Array.from(el.childNodes).filter(n => n.nodeType === 1 && (n.localName || n.nodeName) === tag); }
  function kid(el, tag) { return kids(el, tag)[0] || null; }
  function txt(el, tag) { const k = kid(el, tag); return k ? (k.textContent || '').trim() : ''; }
  function num(el, tag, d) { const v = parseFloat(txt(el, tag)); return isNaN(v) ? d : v; }
  function isoDay(s) { if (!s) return null; const m = /^(\d{4})-(\d{2})-(\d{2})/.exec(s); return m ? Date.UTC(+m[1], +m[2] - 1, +m[3]) : null; }
  function hours(dur) { // PT160H0M0S
    if (!dur) return 0; const m = /PT(?:(\d+(?:\.\d+)?)H)?(?:(\d+(?:\.\d+)?)M)?(?:(\d+(?:\.\d+)?)S)?/.exec(dur);
    return m ? (+(m[1] || 0)) + (+(m[2] || 0)) / 60 + (+(m[3] || 0)) / 3600 : 0;
  }

  /* ---------- calendar ---------- */
  function makeCalendar(project) {
    const working = [false, true, true, true, true, true, false]; // index by JS getUTCDay (0=Sun)
    const holidays = new Set();
    const cals = kid(project, 'Calendars');
    const uid = txt(project, 'CalendarUID') || '1';
    let cal = null;
    if (cals) cal = kids(cals, 'Calendar').find(c => txt(c, 'UID') === uid) || kids(cals, 'Calendar')[0];
    if (cal) {
      const wds = kid(cal, 'WeekDays');
      if (wds) for (const wd of kids(wds, 'WeekDay')) {
        const t = num(wd, 'DayType', -1), w = txt(wd, 'DayWorking') === '1';
        if (t >= 1 && t <= 7) working[t - 1] = w;
        else if (t === 0 && !w) addRange(wd);           // old-style exception
      }
      const ex = kid(cal, 'Exceptions');
      if (ex) for (const e of kids(ex, 'Exception')) if (txt(e, 'DayWorking') !== '1') addRange(e);
    }
    function addRange(el) {
      const tp = kid(el, 'TimePeriod'); if (!tp) return;
      let a = isoDay(txt(tp, 'FromDate')), b = isoDay(txt(tp, 'ToDate'));
      if (a == null || b == null || b - a > 3 * 366 * DAY) return;
      for (let d = a; d <= b; d += DAY) holidays.add(d);
    }
    const isWork = d => working[new Date(d).getUTCDay()] && !holidays.has(d);
    if (!working.some(Boolean)) working.fill(true);
    return { isWork };
  }

  /* ---------- parse ---------- */
  function parse(xmlText) {
    const doc = new root.DOMParser().parseFromString(xmlText, 'application/xml');
    const project = doc.documentElement;
    if (!project || (project.localName || project.nodeName) !== 'Project' || doc.getElementsByTagName('parsererror').length)
      throw new Error('not-mspdi');
    const minPerDay = num(project, 'MinutesPerDay', 480) || 480;
    const hPerDay = minPerDay / 60;
    const cal = makeCalendar(project);
    const projStart = isoDay(txt(project, 'StartDate'));
    const status = isoDay(txt(project, 'StatusDate'));
    const tasksEl = kid(project, 'Tasks');
    if (!tasksEl) throw new Error('no-tasks');
    const all = [];
    for (const t of kids(tasksEl, 'Task')) {
      const uid = txt(t, 'UID');
      if (uid === '0' || txt(t, 'IsNull') === '1' || txt(t, 'Active') === '0' || txt(t, 'ExternalTask') === '1') continue;
      const dur = hours(txt(t, 'Duration')) / hPerDay;
      const baseline = kids(t, 'Baseline').some(b => txt(b, 'Number') === '0' && (txt(b, 'Start') || txt(b, 'Finish')));
      all.push({
        uid, id: txt(t, 'ID'), name: txt(t, 'Name') || '(no name)',
        wbs: txt(t, 'WBS') || txt(t, 'OutlineNumber'), outline: txt(t, 'OutlineNumber'), level: num(t, 'OutlineLevel', 1),
        summary: txt(t, 'Summary') === '1', milestone: txt(t, 'Milestone') === '1' || dur === 0,
        manual: txt(t, 'Manual') === '1', dur: Math.round(dur * 100) / 100,
        start: isoDay(txt(t, 'Start')), finish: isoDay(txt(t, 'Finish')),
        ctype: num(t, 'ConstraintType', 0), cdate: isoDay(txt(t, 'ConstraintDate')),
        deadline: isoDay(txt(t, 'Deadline')),
        pct: num(t, 'PercentComplete', 0), astart: isoDay(txt(t, 'ActualStart')), afinish: isoDay(txt(t, 'ActualFinish')),
        baseline,
        preds: kids(t, 'PredecessorLink').map(l => ({
          uid: txt(l, 'PredecessorUID'), type: ['FF', 'FS', 'SF', 'SS'][num(l, 'Type', 1)] || 'FS',
          lag: (num(l, 'LagFormat', 7) === 19 || num(l, 'LagFormat', 7) === 20) ? 0 : num(l, 'LinkLag', 0) / 10 / minPerDay,
          pctLag: num(l, 'LagFormat', 7) === 19 || num(l, 'LagFormat', 7) === 20,
          cross: txt(l, 'CrossProject') === '1'
        })).filter(l => !l.cross)
      });
    }
    return { title: txt(project, 'Title') || txt(project, 'Name'), all, cal, projStart, status, hPerDay, saveVersion: txt(project, 'SaveVersion') };
  }

  /* ---------- working-day axis ---------- */
  function axis(cal, origin) {
    const cache = new Map();
    function idx(d) { // working days from origin to the start of day d
      if (d == null) return null; if (cache.has(d)) return cache.get(d);
      let n = 0;
      if (d >= origin) { for (let x = origin; x < d; x += DAY) if (cal.isWork(x)) n++; }
      else { for (let x = d; x < origin; x += DAY) if (cal.isWork(x)) n--; }
      cache.set(d, n); return n;
    }
    function date(n) { // date of the working day at index n (n>=0), i.e. finish day of a task ending at n+1
      let d = origin; let k = -1;
      while (true) { if (cal.isWork(d)) { k++; if (k >= n) return d; } d += DAY; if (d - origin > 40 * 366 * DAY) return d; }
    }
    return { idx, date };
  }

  /* ---------- build the network: leaves only, summary links pushed down ---------- */
  function network(P) {
    const byUid = new Map(P.all.map(t => [t.uid, t]));
    const sorted = P.all.slice();
    const children = new Map(); // summary uid -> leaf uids
    for (let i = 0; i < sorted.length; i++) {
      const t = sorted[i]; if (!t.summary) continue;
      const leaves = [];
      for (let j = i + 1; j < sorted.length && sorted[j].level > t.level; j++) if (!sorted[j].summary) leaves.push(sorted[j].uid);
      children.set(t.uid, leaves);
    }
    const leaves = P.all.filter(t => !t.summary);
    const ids = new Set(leaves.map(t => t.uid));
    const preds = new Map(leaves.map(t => [t.uid, []]));
    const add = (to, l) => { if (ids.has(to) && to !== l.uid) preds.get(to).push(l); };
    for (const t of P.all) for (const l of t.preds) {
      const fromList = children.has(l.uid) ? children.get(l.uid) : (byUid.has(l.uid) ? [l.uid] : []);
      const toList = t.summary ? (children.get(t.uid) || []) : [t.uid];
      for (const f of fromList) if (ids.has(f)) for (const to of toList) add(to, { uid: f, type: l.type, lag: l.lag, pctLag: l.pctLag, direct: !t.summary && !children.has(l.uid) });
    }
    const succs = new Map(leaves.map(t => [t.uid, []]));
    for (const [to, ls] of preds) for (const l of ls) succs.get(l.uid).push({ uid: to, type: l.type, lag: l.lag });
    return { leaves, preds, succs, byUid };
  }

  function topo(leaves, preds) {
    const indeg = new Map(leaves.map(t => [t.uid, 0])), out = new Map(leaves.map(t => [t.uid, []]));
    for (const [to, ls] of preds) for (const l of ls) { indeg.set(to, indeg.get(to) + 1); out.get(l.uid).push(to); }
    const q = leaves.filter(t => indeg.get(t.uid) === 0).map(t => t.uid), order = [];
    while (q.length) { const u = q.shift(); order.push(u); for (const v of out.get(u)) { indeg.set(v, indeg.get(v) - 1); if (!indeg.get(v)) q.push(v); } }
    const loop = order.length < leaves.length;
    if (loop) for (const t of leaves) if (!order.includes(t.uid)) order.push(t.uid);
    return { order, loop };
  }

  /* ---------- CPM in working days, honouring manual tasks, constraints and deadlines like MS Project ---------- */
  function cpm(P, N, ax, extra) {
    const delay = extra && extra.delay || {};
    const { order } = topo(N.leaves, N.preds);
    const T = new Map();
    for (const t of N.leaves) T.set(t.uid, { t, d: t.dur + (delay[t.uid] || 0) });
    const fixedStart = x => {
      const t = x.t;
      if (t.manual && t.start != null) return ax.idx(t.start);
      if (t.ctype === 2 && t.cdate != null) return ax.idx(t.cdate);
      if (t.ctype === 3 && t.cdate != null) return ax.idx(t.cdate) + 1 - x.d;
      return null;
    };
    for (let pass = 0; pass < 2; pass++) for (const u of order) {
      const x = T.get(u); let es = 0;
      for (const l of N.preds.get(u)) {
        const p = T.get(l.uid); if (!p || p.ef == null) continue;
        let v;
        if (l.type === 'FS') v = p.ef + l.lag;
        else if (l.type === 'SS') v = p.es + l.lag;
        else if (l.type === 'FF') v = p.ef + l.lag - x.d;
        else v = p.es + l.lag - x.d;
        es = Math.max(es, v);
      }
      if (x.t.ctype === 4 && x.t.cdate != null) es = Math.max(es, ax.idx(x.t.cdate));
      if (x.t.ctype === 6 && x.t.cdate != null) es = Math.max(es, ax.idx(x.t.cdate) + 1 - x.d);
      const f = fixedStart(x); if (f != null) es = f;
      x.es = es; x.ef = es + x.d;
    }
    const end = Math.max(0, ...[...T.values()].map(x => x.ef));
    for (let pass = 0; pass < 2; pass++) for (let i = order.length - 1; i >= 0; i--) {
      const u = order[i], x = T.get(u); let lf = end;
      for (const s of N.succs.get(u)) {
        const y = T.get(s.uid); if (y.ls == null) continue;
        let v;
        if (s.type === 'FS') v = y.ls - s.lag;
        else if (s.type === 'SS') v = y.ls - s.lag + x.d;
        else if (s.type === 'FF') v = y.lf - s.lag;
        else v = y.lf - s.lag + x.d;
        lf = Math.min(lf, v);
      }
      if (x.t.deadline != null) lf = Math.min(lf, ax.idx(x.t.deadline) + 1);
      if ((x.t.ctype === 7 || x.t.ctype === 3) && x.t.cdate != null) lf = Math.min(lf, ax.idx(x.t.cdate) + 1);
      if ((x.t.ctype === 5 || x.t.ctype === 2) && x.t.cdate != null) lf = Math.min(lf, ax.idx(x.t.cdate) + x.d);
      x.lf = lf; x.ls = lf - x.d; x.tf = Math.round((lf - x.ef) * 100) / 100;
    }
    return { T, end };
  }

  /* ---------- the checks ---------- */
  function analyse(xmlText) {
    const P = parse(xmlText);
    const N = network(P);
    const work = N.leaves;
    if (!work.length) throw new Error('no-tasks');
    const origin = P.projStart != null ? P.projStart : Math.min(...work.map(t => t.start).filter(x => x != null));
    const ax = axis(P.cal, origin);
    const { loop } = topo(N.leaves, N.preds);
    const base = cpm(P, N, ax);
    const T = base.T;
    const name = u => { const t = N.byUid.get(u); return { uid: u, wbs: t.wbs, name: t.name }; };

    const real = work.filter(t => !t.milestone);
    const firstUid = [...work].sort((a, b) => (a.start || 0) - (b.start || 0))[0].uid;
    const pos = new Map(work.map((t, i) => [t.uid, i]));
    const lastT = [...work].sort((a, b) => (T.get(b.uid).ef - T.get(a.uid).ef) || ((b.finish || 0) - (a.finish || 0)) || (pos.get(b.uid) - pos.get(a.uid)))[0];

    const noPred = work.filter(t => !N.preds.get(t.uid).length && t.uid !== firstUid);
    const noSucc = work.filter(t => !N.succs.get(t.uid).length && t.uid !== lastT.uid);
    const notLinked = work.filter(t => noPred.includes(t) || noSucc.includes(t));
    const manual = work.filter(t => t.manual);
    const hard = work.filter(t => HARD[t.ctype]);
    const soft = work.filter(t => SOFT[t.ctype]);
    const linkedShare = 1 - notLinked.length / Math.max(1, work.length);
    const manualShare = manual.length / Math.max(1, work.length);

    let type = 'linked';
    if (linkedShare < 0.5 || manualShare > 0.3) type = 'datelist';
    else if (linkedShare < 0.85 || manualShare > 0.05) type = 'partly';
    const floatValid = type !== 'datelist' && !loop;

    // dates
    const finishDay = lastT.finish != null ? lastT.finish : ax.date(Math.ceil(T.get(lastT.uid).ef) - 1);
    const deadlines = work.filter(t => t.deadline != null).sort((a, b) => b.deadline - a.deadline).map(t => {
      const x = T.get(t.uid);
      return { ...name(t.uid), deadline: t.deadline, finish: t.finish, late: Math.max(0, Math.round(ax.idx(t.finish != null ? t.finish : 0) - ax.idx(t.deadline))), margin: Math.round(ax.idx(t.deadline) - ax.idx(t.finish)), tf: x.tf };
    });

    // checks
    const C = [];
    // 1 typed dates
    C.push({ key: 'typed', status: (manual.length + hard.length) === 0 ? (soft.length ? 'pass' : 'pass') : ((manual.length + hard.length) > Math.max(3, work.length * 0.1) ? 'crit' : 'fix'),
      manual: manual.length, hard: hard.length, soft: soft.length,
      items: [...manual, ...hard].slice(0, 6).map(t => name(t.uid)) });
    // 2 open ends
    C.push({ key: 'open', status: notLinked.length === 0 ? 'pass' : (notLinked.length > work.length * 0.25 ? 'crit' : 'fix'),
      noPred: noPred.length, noSucc: noSucc.length, count: notLinked.length, total: work.length,
      items: notLinked.slice(0, 6).map(t => name(t.uid)) });
    // 3 too long (> 2 monthly updates ≈ 40 working days)
    const long = real.filter(t => t.dur > 40).sort((a, b) => b.dur - a.dur);
    const longest = [...real].sort((a, b) => b.dur - a.dur)[0];
    C.push({ key: 'long', status: long.length ? 'fix' : 'pass', count: long.length,
      longest: longest ? { ...name(longest.uid), dur: Math.round(longest.dur) } : null,
      items: long.slice(0, 6).map(t => ({ ...name(t.uid), dur: Math.round(t.dur) })) });
    // 4 lags
    const lags = []; let lagCount = 0;
    for (const t of work) for (const l of N.preds.get(t.uid)) if (l.direct && (l.lag !== 0 || l.pctLag)) {
      lagCount++; if (Math.abs(l.lag) >= 10 || l.lag < 0) lags.push({ ...name(t.uid), from: name(l.uid), type: l.type, lag: Math.round(l.lag) });
    }
    C.push({ key: 'lags', status: lags.length ? 'fix' : 'pass', count: lagCount, big: lags.length, items: lags.slice(0, 6) });
    // 5 procurement & approvals
    const proc = work.filter(t => PROC.test(t.name));
    const procLoose = proc.filter(t => !N.succs.get(t.uid).length);
    C.push({ key: 'proc', status: !floatValid ? (proc.length ? 'needs' : 'fix') : (!proc.length ? 'fix' : (procLoose.length ? 'fix' : 'pass')),
      count: proc.length, loose: procLoose.length, items: procLoose.slice(0, 6).map(t => name(t.uid)) });
    // 6 negative float
    const neg = work.filter(t => T.get(t.uid).tf < -0.5);
    const worst = neg.length ? Math.min(...neg.map(t => T.get(t.uid).tf)) : 0;
    C.push({ key: 'neg', status: !floatValid ? 'needs' : (neg.length ? 'crit' : 'pass'), count: neg.length, total: work.length, worst: Math.round(worst),
      items: neg.sort((a, b) => T.get(a.uid).tf - T.get(b.uid).tf || T.get(b.uid).es - T.get(a.uid).es).slice(0, 4).map(t => ({ ...name(t.uid), tf: Math.round(T.get(t.uid).tf) })) });
    // 7 float too good
    const span = Math.max(1, base.end);
    const limit = Math.max(40, Math.round(span * 0.25));
    const high = real.filter(t => T.get(t.uid).tf > limit).sort((a, b) => T.get(b.uid).tf - T.get(a.uid).tf);
    C.push({ key: 'high', status: !floatValid ? 'needs' : (high.length ? 'fix' : 'pass'), limit, count: high.length,
      items: high.slice(0, 6).map(t => ({ ...name(t.uid), tf: Math.round(T.get(t.uid).tf) })) });
    // 8 critical path continuity: walk back from the finish through the driving predecessors
    let cpOk = false, cpLen = 0;
    if (floatValid) {
      let u = lastT.uid; const seen = new Set();
      while (u && !seen.has(u)) {
        seen.add(u); cpLen++;
        const x = T.get(u); const ps = N.preds.get(u);
        if (!ps.length) { cpOk = (u === firstUid) || x.es <= 0.01; break; }
        let best = null, bv = -1e9;
        for (const l of ps) { const p = T.get(l.uid); const v = l.type === 'SS' || l.type === 'SF' ? p.es + l.lag : p.ef + l.lag - (l.type === 'FF' ? x.d : 0); if (v > bv) { bv = v; best = l.uid; } }
        if (bv + 0.01 < x.es) { cpOk = false; break; }   // the start is held by something other than a link
        u = best;
      }
    }
    C.push({ key: 'cp', status: !floatValid ? 'crit' : (cpOk ? 'pass' : 'crit'), loop, length: cpLen, start: name(firstUid), end: name(lastT.uid) });
    // 9 baseline
    const hasBaseline = work.some(t => t.baseline);
    C.push({ key: 'base', status: hasBaseline ? 'pass' : 'fix' });
    // 10 status date
    const progress = work.some(t => t.pct > 0 || t.astart != null);
    let wrong = [];
    if (progress && P.status != null) {
      wrong = work.filter(t => (t.astart != null && t.astart > P.status) || (t.afinish != null && t.afinish > P.status) ||
        (t.pct < 100 && t.astart == null && t.start != null && t.start < P.status && !t.summary));
    }
    C.push({ key: 'status', status: !progress ? 'na' : (P.status == null ? 'fix' : (wrong.length ? 'fix' : 'pass')),
      noStatusDate: progress && P.status == null, count: wrong.length, items: wrong.slice(0, 6).map(t => name(t.uid)) });

    /* ---------- the headline ladder ---------- */
    let head = null;
    const finishLate = deadlines.length ? Math.max(...deadlines.map(d => d.late)) : 0;
    const finishDl = deadlines.find(d => d.uid === lastT.uid) || deadlines.sort((a, b) => b.deadline - a.deadline)[0];

    function delayTest(cands) {
      for (const t of cands.slice(0, 15)) {
        const r = cpm(P, N, ax, { delay: { [t.uid]: 15 } });
        const moved = Math.round(r.end - base.end);
        if (moved <= 2) return { ...name(t.uid), days: 15, before: t.finish, after: ax.date(Math.ceil(r.T.get(t.uid).ef) - 1), finishBefore: finishDay, moved };
      }
      return null;
    }
    const early = real.filter(t => t.dur >= 3).sort((a, b) => (a.start || 0) - (b.start || 0));
    const pickEarly = early.slice(Math.floor(early.length * 0.15), Math.floor(early.length * 0.5)).filter(t => !PROC.test(t.name) && !/(review|design|survey|submission|issu|revisi|diseño|levantamiento)/i.test(t.name)).sort((a, b) => b.dur - a.dur);

    if (type === 'datelist') {
      head = { kind: 'datelist', test: delayTest(pickEarly.length ? pickEarly : early) };
    } else if (hard.length + manual.length >= 3) {
      head = { kind: 'typed', count: hard.length + manual.length, test: delayTest([...manual, ...hard].filter(t => !t.milestone && t.dur >= 1).concat(pickEarly)) };
    } else if (floatValid && neg.length) {
      // waiting gap: a task held by a milestone that collects work from several areas,
      // while the last work in the task's own area finished long before
      const LOC = /(km\s*[\d.,]+\s*[–\-]\s*[\d.,]+|\b(?:level|floor|block|zone|area|sector|section|phase|lot|tower|wing|nivel|piso|bloque|zona|sector|tramo|fase|torre|ala)\s*[\w.\-]+|\bL\d+\b)/i;
      const loc = s0 => { const m = LOC.exec(s0); return m ? m[1].toLowerCase().replace(/\s+/g, ' ').replace(/[–\-]/g, '-') : null; };
      const ancestors = (u, depth) => { const out = new Set(), st = [[u, 0]]; while (st.length) { const [v, d] = st.pop(); if (d > depth) continue; for (const l of N.preds.get(v)) if (!out.has(l.uid)) { out.add(l.uid); st.push([l.uid, d + 1]); } } return out; };
      let gap = null;
      for (const t of work) {
        const x = T.get(t.uid); if (x.tf >= -0.5) continue;
        const lt = loc(t.name); if (!lt) continue;
        for (const l of N.preds.get(t.uid)) {
          const m = N.byUid.get(l.uid); const mp = N.preds.get(l.uid);
          if (!m.milestone || mp.length < 2) continue;
          const same = [...ancestors(l.uid, 8)].filter(a => loc(N.byUid.get(a).name) === lt);
          if (!same.length) continue;
          const lastSame = same.sort((a, b) => T.get(b).ef - T.get(a).ef)[0];
          const wait = Math.round(x.es - T.get(lastSame).ef);
          const others = [...ancestors(l.uid, 8)].filter(a => { const o = loc(N.byUid.get(a).name); return o && o !== lt; });
          if (wait >= 10 && others.length && (!gap || wait > gap.wait))
            gap = { task: name(t.uid), taskStart: t.start, tf: Math.round(x.tf), milestone: name(l.uid), area: LOC.exec(t.name)[1],
              ready: name(lastSame), readyFinish: N.byUid.get(lastSame).finish, wait };
        }
      }
      const worstChain = work.filter(t => Math.abs(T.get(t.uid).tf - worst) < 0.5).sort((a, b) => T.get(a.uid).es - T.get(b.uid).es);
      const dlLate = finishDl ? finishDl.late : finishLate;
      head = { kind: 'late', late: dlLate > 0 ? dlLate : Math.round(-worst), dlLate, worstLate: finishLate, finish: finishDay, deadline: finishDl, gap,
        chain: worstChain.slice(-4).map(t => ({ ...name(t.uid), tf: Math.round(T.get(t.uid).tf) })) };
    } else if (floatValid) {
      const near = work.filter(t => T.get(t.uid).tf > 0.5 && T.get(t.uid).tf <= 5);
      const margin = finishDl ? finishDl.margin : null;
      head = { kind: 'ontime', finish: finishDay, deadline: finishDl, margin, near: near.length, nearItems: near.slice(0, 12).map(t => ({ ...name(t.uid), tf: Math.round(T.get(t.uid).tf) })) };
    } else {
      head = { kind: 'datelist', test: delayTest(pickEarly) };
    }

    const tally = { pass: 0, fix: 0, crit: 0, needs: 0, na: 0 };
    for (const c of C) tally[c.status]++;
    return {
      title: P.title, rows: P.all.length, activities: work.length, type, floatValid, loop,
      finish: finishDay, deadlines, checks: C, head, tally,
      linkedShare, manual: manual.length, hard: hard.length, notLinked: notLinked.length
    };
  }

  root.PMChecker = { analyse };
  if (typeof module !== 'undefined') module.exports = { analyse };
})(typeof window !== 'undefined' ? window : globalThis);
