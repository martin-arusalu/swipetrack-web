// Google Analytics 4 with Consent Mode v2.
// Storage stays denied until the visitor accepts, so GA sets no cookies before then
// and only sends cookieless pings. The choice is kept in localStorage.
// Any element with data-cookie-settings reopens the choice bar.
(function () {
  var GA_ID = 'G-Y4HZWKE305';
  var KEY = 'st-analytics-consent';

  function stored() {
    try { return localStorage.getItem(KEY); } catch (e) { return null; }
  }
  function store(v) {
    try { localStorage.setItem(KEY, v); } catch (e) {}
  }

  window.dataLayer = window.dataLayer || [];
  function gtag() { window.dataLayer.push(arguments); }
  window.gtag = gtag;

  var choice = stored();
  gtag('consent', 'default', {
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    analytics_storage: choice === 'granted' ? 'granted' : 'denied',
    wait_for_update: 500
  });
  gtag('set', 'ads_data_redaction', true);
  gtag('js', new Date());
  gtag('config', GA_ID);

  var s = document.createElement('script');
  s.async = true;
  s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA_ID;
  document.head.appendChild(s);

  function setChoice(v) {
    store(v);
    gtag('consent', 'update', { analytics_storage: v });
    hide();
  }

  var bar;
  function hide() { if (bar) { bar.remove(); bar = null; } }

  function show() {
    if (bar) return;
    bar = document.createElement('div');
    bar.setAttribute('role', 'dialog');
    bar.setAttribute('aria-label', 'Analytics cookies');
    bar.style.cssText = [
      'position:fixed', 'left:16px', 'right:16px', 'bottom:16px', 'z-index:9999',
      'max-width:560px', 'margin:0 auto', 'padding:14px 16px',
      'display:flex', 'flex-wrap:wrap', 'align-items:center', 'gap:12px',
      'background:#15191F', 'color:#F6F8FA', 'border:1px solid #2C333C', 'border-radius:14px',
      'box-shadow:0 10px 30px rgba(0,0,0,.45)',
      'font:500 14px/1.4 Outfit,Inter,system-ui,-apple-system,sans-serif'
    ].join(';');

    var text = document.createElement('p');
    text.style.cssText = 'margin:0;flex:1 1 240px;color:#A4B0BC';
    text.innerHTML = 'Can we count your visit with Google Analytics cookies? ' +
      '<a href="/privacy.html#website" style="color:#F88E14">Privacy</a>';

    function button(label, primary, v) {
      var b = document.createElement('button');
      b.type = 'button';
      b.textContent = label;
      b.style.cssText = 'cursor:pointer;padding:9px 16px;border-radius:10px;font:700 14px Outfit,Inter,system-ui,sans-serif;' +
        (primary ? 'background:#F88E14;color:#18110A;border:0'
                 : 'background:transparent;color:#F6F8FA;border:1px solid #2C333C');
      b.addEventListener('click', function () { setChoice(v); });
      return b;
    }

    var buttons = document.createElement('div');
    buttons.style.cssText = 'display:flex;gap:8px;margin-left:auto';
    buttons.appendChild(button('Decline', false, 'denied'));
    buttons.appendChild(button('Accept', true, 'granted'));

    bar.appendChild(text);
    bar.appendChild(buttons);
    document.body.appendChild(bar);
  }

  function init() {
    if (!choice) show();
    document.addEventListener('click', function (e) {
      var t = e.target.closest && e.target.closest('[data-cookie-settings]');
      if (t) { e.preventDefault(); show(); }
    });
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init);
  else init();
})();
