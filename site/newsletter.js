/* Newsletter signup → Kit (form 10074070). Keeps the site's own design. */
(function () {
  var ACTION = 'https://app.kit.com/forms/10074070/subscriptions';
  var es = (document.documentElement.lang || '').toLowerCase().indexOf('es') === 0;
  var T = es ? {
    sending: 'Enviando…',
    ok: '¡Listo! Revisa tu correo y confirma tu suscripción.',
    bad: 'Escribe un correo válido.',
    err: 'No se pudo completar. Inténtalo de nuevo o escribe a support@pmtoolsbyapm.com.'
  } : {
    sending: 'Sending…',
    ok: 'Done. Check your inbox and confirm your subscription.',
    bad: 'Please enter a valid email address.',
    err: 'That did not go through. Try again or write to support@pmtoolsbyapm.com.'
  };
  function note(form, text, isErr) {
    var n = form.parentNode.querySelector('.news-status');
    if (!n) { n = document.createElement('div'); n.className = 'news-status'; n.setAttribute('role', 'status'); form.parentNode.insertBefore(n, form.nextSibling); }
    n.textContent = text;
    n.style.cssText = 'margin-top:.85rem;font-weight:500;color:' + (isErr ? '#ffd9d2' : '#ffffff');
  }
  function send(body) {
    return fetch(ACTION, { method: 'POST', body: body, headers: { Accept: 'application/json' } })
      .then(function (r) { return r.json().catch(function () { return {}; }).then(function (j) { if (!r.ok || (j.status && j.status !== 'success')) throw new Error('rejected'); }); })
      .catch(function (e) {
        if (e && e.message === 'rejected') throw e;
        // Network/CORS fallback: the request still reaches Kit; the response is just unreadable.
        return fetch(ACTION, { method: 'POST', body: body, mode: 'no-cors' });
      });
  }
  document.querySelectorAll('form.news-form').forEach(function (form) {
    form.setAttribute('action', ACTION);
    form.setAttribute('method', 'post');
    form.removeAttribute('onsubmit');
    var input = form.querySelector('input[type=email]');
    if (input) input.setAttribute('name', 'email_address');
    var btn = form.querySelector('button');
    form.addEventListener('submit', function (ev) {
      ev.preventDefault();
      var email = input ? input.value.trim() : '';
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { note(form, T.bad, true); return; }
      var label = btn ? btn.textContent : '';
      if (btn) { btn.disabled = true; btn.textContent = T.sending; }
      var body = new FormData(); body.append('email_address', email);
      send(body).then(function () {
        remember(); form.style.display = 'none'; note(form, T.ok, false);
      }).catch(function () {
        note(form, T.err, true);
      }).then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });
  });

  /* ---------- Email gate for free downloads ---------- */
  var KEY = 'pmt_subscribed';
  function known() { try { return localStorage.getItem(KEY) === '1'; } catch (e) { return false; } }
  function remember() { try { localStorage.setItem(KEY, '1'); } catch (e) {} }
  var G = es ? {
    title: 'Tu descarga está lista',
    lead: 'Deja tu correo y la descarga empieza de inmediato. Solo lo pides una vez: las otras descargas quedan abiertas.',
    ph: 'tu@correo.com', btn: 'Descargar', small: 'Recibirás notas ocasionales desde la obra. Sin spam; cancela cuando quieras.',
    close: 'Cerrar'
  } : {
    title: 'Your download is ready',
    lead: 'Enter your email and the download starts straight away. You only do this once; the other downloads stay open.',
    ph: 'your@email.com', btn: 'Download', small: 'You will get the occasional note from the field. No spam; unsubscribe any time.',
    close: 'Close'
  };
  function startDownload(a) {
    var x = document.createElement('a'); x.href = a.href; x.setAttribute('download', ''); document.body.appendChild(x); x.click(); x.remove();
  }
  var dlg;
  function openGate(a) {
    if (!dlg) {
      dlg = document.createElement('div');
      dlg.setAttribute('role', 'dialog'); dlg.setAttribute('aria-modal', 'true');
      dlg.style.cssText = 'position:fixed;inset:0;z-index:1000;display:flex;align-items:center;justify-content:center;padding:16px;background:rgba(23,33,43,.55)';
      dlg.innerHTML =
        '<div style="background:#fff;border-radius:16px;max-width:440px;width:100%;padding:28px 24px;box-shadow:0 24px 60px rgba(0,0,0,.25);position:relative;font-family:inherit">' +
        '<button type="button" data-x aria-label="' + G.close + '" style="position:absolute;top:10px;right:12px;border:0;background:none;font-size:26px;line-height:1;color:#536273;cursor:pointer">&times;</button>' +
        '<h3 style="margin:0 0 .5rem;font-family:Archivo,sans-serif;font-size:1.35rem;color:#17212b">' + G.title + '</h3>' +
        '<p data-file style="margin:0 0 .4rem;color:#6842b8;font-weight:600"></p>' +
        '<p style="margin:0 0 1.1rem;color:#536273;font-size:.95rem">' + G.lead + '</p>' +
        '<form novalidate style="display:flex;flex-direction:column;gap:.6rem">' +
        '<input type="email" name="email_address" required placeholder="' + G.ph + '" aria-label="Email" style="padding:12px 14px;border:1px solid #d8d2c8;border-radius:10px;font-size:1rem">' +
        '<button type="submit" class="btn btn-solid" style="justify-content:center">' + G.btn + '</button>' +
        '</form>' +
        '<p data-msg role="status" style="margin:.7rem 0 0;font-size:.9rem;color:#b3261e"></p>' +
        '<p style="margin:.6rem 0 0;font-size:.78rem;color:#7a8794">' + G.small + '</p></div>';
      document.body.appendChild(dlg);
      dlg.addEventListener('click', function (e) { if (e.target === dlg || e.target.hasAttribute('data-x')) dlg.style.display = 'none'; });
      document.addEventListener('keydown', function (e) { if (e.key === 'Escape' && dlg) dlg.style.display = 'none'; });
      dlg.querySelector('form').addEventListener('submit', function (ev) {
        ev.preventDefault();
        var f = ev.target, input = f.querySelector('input'), b = f.querySelector('button'), msg = dlg.querySelector('[data-msg]');
        var email = input.value.trim();
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { msg.textContent = T.bad; input.focus(); return; }
        msg.textContent = ''; b.disabled = true; var label = b.textContent; b.textContent = T.sending;
        var body = new FormData(); body.append('email_address', email);
        send(body).then(function () {
          remember(); dlg.style.display = 'none'; startDownload(dlg._target);
        }).catch(function () { msg.textContent = T.err; })
          .then(function () { b.disabled = false; b.textContent = label; });
      });
    }
    dlg._target = a;
    var box = a.closest('.dl'); var h = box && box.querySelector('h4');
    dlg.querySelector('[data-file]').textContent = h ? h.textContent : '';
    dlg.querySelector('[data-msg]').textContent = '';
    dlg.style.display = 'flex';
    setTimeout(function () { dlg.querySelector('input').focus(); }, 30);
  }
  document.querySelectorAll('a[download][href*="downloads/"]').forEach(function (a) {
    a.addEventListener('click', function (ev) {
      if (known()) return;            // already subscribed on this device: download directly
      ev.preventDefault(); openGate(a);
    });
  });
})();
