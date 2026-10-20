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
        form.style.display = 'none'; note(form, T.ok, false);
      }).catch(function () {
        note(form, T.err, true);
      }).then(function () { if (btn) { btn.disabled = false; btn.textContent = label; } });
    });
  });
})();
