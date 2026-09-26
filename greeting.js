/*
  Time-of-day greeting, based on the VISITOR's own device clock — not the
  server's — so someone browsing at 9pm in India sees "evening" even if
  the server itself is somewhere else entirely.

  Shared across every language's homepage (previously this was a separate
  inline <script> block duplicated on each /xx/index.html with its own
  translated strings — moved here as one external file so the site's
  Content-Security-Policy can require script-src 'self' without allowing
  inline scripts). Reads the greeting text for the current page's
  <html lang="..."> attribute from the table below and falls back to
  English if a lang code isn't listed yet.

  Add a new language's greeting strings here once its /xx/index.html exists.
*/
(function () {
  var GREETINGS = {
    en: { morning: 'Good morning', afternoon: 'Good afternoon', evening: 'Good evening', suffix: ', welcome to Zebal! 👋' },
    hi: { morning: 'सुप्रभात', afternoon: 'शुभ दोपहर', evening: 'शुभ संध्या', suffix: ', Zebal में आपका स्वागत है! 👋' },
    mr: { morning: 'शुभ सकाळ', afternoon: 'शुभ दुपार', evening: 'शुभ संध्याकाळ', suffix: ', झेबलमध्ये आपले स्वागत आहे! 👋' },
    ta: { morning: 'காலை வணக்கம்', afternoon: 'மதிய வணக்கம்', evening: 'மாலை வணக்கம்', suffix: ', ஜெபலுக்கு வரவேற்கிறோம்! 👋' },
    te: { morning: 'శుభోదయం', afternoon: 'శుభ మధ్యాహ్నం', evening: 'శుభ సాయంత్రం', suffix: ', Zebalకి స్వాగతం! 👋' },
    kn: { morning: 'ಶುಭೋದಯ', afternoon: 'ಶುಭ ಮಧ್ಯಾಹ್ನ', evening: 'ಶುಭ ಸಂಜೆ', suffix: ', Zebalಗೆ ಸ್ವಾಗತ! 👋' },
    bn: { morning: 'শুভ সকাল', afternoon: 'শুভ অপরাহ্ন', evening: 'শুভ সন্ধ্যা', suffix: ', Zebal-তে স্বাগতম! 👋' },
    gu: { morning: 'શુભ સવાર', afternoon: 'શુભ બપોર', evening: 'શુભ સાંજ', suffix: ', Zebal માં આપનું સ્વાગત છે! 👋' }
  };

  var lang = document.documentElement.lang || 'en';
  var t = GREETINGS[lang] || GREETINGS.en;

  var hour = new Date().getHours();
  var greeting = hour < 12 ? t.morning : (hour < 17 ? t.afternoon : t.evening);

  var el = document.getElementById('greeting');
  if (!el) return;
  el.textContent = greeting + t.suffix;
  el.style.display = 'block';
})();
