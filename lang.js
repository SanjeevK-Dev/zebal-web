/*
  Site-wide language switcher.

  Populates the <select id="langSelect"> found near the top of every page
  with every language that currently has real translated content, and jumps
  to the equivalent page in whichever language the visitor picks — so
  choosing Hindi on any page lands on that same page in Hindi, not just the
  homepage.

  Add a new language here once its pages actually exist (e.g. once /ta/...
  is built). Nothing else on any page needs to change — every page's
  dropdown and the URL rewriting below both read from this one list.
*/
(function () {
  var LANGUAGES = [
    { code: 'en', label: 'English', prefix: '' },
    { code: 'hi', label: 'हिंदी',   prefix: '/hi' },
    { code: 'mr', label: 'मराठी',   prefix: '/mr' },
    { code: 'ta', label: 'தமிழ்',   prefix: '/ta' },
    { code: 'te', label: 'తెలుగు',  prefix: '/te' },
    { code: 'kn', label: 'ಕನ್ನಡ',   prefix: '/kn' },
    { code: 'bn', label: 'বাংলা',   prefix: '/bn' },
    { code: 'gu', label: 'ગુજરાતી', prefix: '/gu' }
  ];

  function currentLangAndPage() {
    var path = window.location.pathname;
    for (var i = 0; i < LANGUAGES.length; i++) {
      var prefix = LANGUAGES[i].prefix;
      if (!prefix) continue;
      if (path === prefix || path.indexOf(prefix + '/') === 0) {
        return { lang: LANGUAGES[i].code, page: path.slice(prefix.length) || '/' };
      }
    }
    return { lang: 'en', page: path };
  }

  function urlFor(prefix, page) {
    if (page === '/') return prefix || '/';
    return prefix + page;
  }

  var select = document.getElementById('langSelect');
  if (!select) return;

  var current = currentLangAndPage();

  LANGUAGES.forEach(function (lang) {
    var option = document.createElement('option');
    option.value = lang.code;
    option.textContent = lang.label;
    if (lang.code === current.lang) option.selected = true;
    select.appendChild(option);
  });

  select.addEventListener('change', function () {
    var target = null;
    for (var i = 0; i < LANGUAGES.length; i++) {
      if (LANGUAGES[i].code === select.value) { target = LANGUAGES[i]; break; }
    }
    if (!target) return;
    window.location.href = urlFor(target.prefix, current.page);
  });
})();
