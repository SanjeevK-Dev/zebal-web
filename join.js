/*
  Pull the group id out of the link and show it, so a new user can join
  manually after installing. Written defensively because this page is
  reached from links shared through chat apps, which sometimes mangle URLs.

  Moved out of join-index.html into this external file so the site's
  Content-Security-Policy can require script-src 'self' without allowing
  inline scripts.
*/
(function () {
  var el = document.getElementById('groupCode');
  try {
    var id = new URLSearchParams(window.location.search).get('groupId');
    if (id) {
      // The app's join dialog asks for the 6-character part, adding the
      // "GRP-" prefix itself, so strip it here to match what it expects.
      el.textContent = id.replace(/^GRP-/i, '');
    } else {
      el.textContent = 'Not found in this link';
    }
  } catch (e) {
    el.textContent = 'Not found in this link';
  }
})();
