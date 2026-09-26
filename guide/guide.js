/*
  Reveals a screenshot only once its image has successfully loaded.

  Screenshots are added to these guides over time. Without this, every figure
  whose image had not been supplied yet would render as a broken-image icon and
  an empty gap, which looks worse than having no screenshot at all.

  Every figure.shot therefore starts hidden in CSS. This shows it when the
  image loads, and removes it entirely if the image is missing — so the guide
  reads cleanly as text either way, and pictures appear on their own as they
  are uploaded.

  Marked async in the HTML: nothing here affects the text, so it must never
  delay the page rendering.
*/
(function () {
  function reveal(figure) {
    figure.style.display = 'block';
  }

  document.querySelectorAll('figure.shot').forEach(function (figure) {
    var img = figure.querySelector('img');
    if (!img) return;

    // An image cached by the browser can finish loading before this script
    // runs, in which case no load event will fire — so check first.
    if (img.complete) {
      if (img.naturalWidth > 0) reveal(figure);
      else figure.remove();
      return;
    }

    img.addEventListener('load', function () { reveal(figure); });
    img.addEventListener('error', function () { figure.remove(); });
  });
})();