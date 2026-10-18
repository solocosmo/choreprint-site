// Like the app: whiteprint from 7 AM to 7 PM, midnight graphite the rest of the night,
// by the visitor's own clock. Without JavaScript the page follows the system setting.
(function () {
  var h = new Date().getHours();
  document.documentElement.setAttribute("data-theme", h >= 7 && h < 19 ? "day" : "night");
})();

// No widows: the last three words of every paragraph and list item stay together (two for
// the big headings, so they never run wider than a phone).
document.addEventListener("DOMContentLoaded", function () {
  function bind(selector, words) {
    var els = document.querySelectorAll(selector);
    for (var i = 0; i < els.length; i++) {
      // A short heading like "Privacy Policy" may wrap; tying all of it together would run off a small phone.
      if (els[i].textContent.trim().split(/\s+/).length <= words) continue;
      var walker = document.createTreeWalker(els[i], NodeFilter.SHOW_TEXT, null);
      var last = null, n;
      while ((n = walker.nextNode())) { if (/\S/.test(n.nodeValue)) last = n; }
      if (!last) continue;
      var v = last.nodeValue.replace(/\s+$/, "");
      var tail = last.nodeValue.slice(v.length);
      // Tie the gaps between the last few words (counting ones already tied).
      var chars = v.split(""), gaps = 0;
      for (var j = chars.length - 1; j > 0 && gaps < words - 1; j--) {
        if (chars[j] === " " || chars[j] === "\u00A0") { chars[j] = "\u00A0"; gaps++; }
      }
      last.nodeValue = chars.join("") + tail;
    }
  }
  bind("p, li, summary, .d, .figures span", 3);
  bind("h1, h2, h3, .t", 2);
});
