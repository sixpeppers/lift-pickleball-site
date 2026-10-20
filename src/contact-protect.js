// Lift Pickleball — lightweight contact-info obfuscation
//
// The email address and phone number are never written as plain text
// anywhere in the HTML source. They're reconstructed here from shifted
// character/digit codes and only inserted into the page after it loads.
// This won't stop a determined human or a bot that runs JavaScript and
// specifically targets this page, but it defeats the vast majority of
// simple scrapers that just regex-scan raw HTML/href attributes for
// "mailto:" links or phone-shaped strings.
(function () {
  // "derric@liftpickleball.com" — each character code shifted by +3
  var EMAIL_CODES = [103, 104, 117, 117, 108, 102, 67, 111, 108, 105, 119, 115, 108, 102, 110, 111, 104, 101, 100, 111, 111, 49, 102, 114, 112];
  var EMAIL_SHIFT = 3;

  // Phone digits, each shifted by +5 (mod 10)
  var PHONE_DIGITS = [3, 8, 6, 7, 2, 3, 7, 9, 8, 3];
  var PHONE_SHIFT = 5;

  function decodeEmail() {
    return EMAIL_CODES.map(function (c) {
      return String.fromCharCode(c - EMAIL_SHIFT);
    }).join('');
  }

  function decodePhoneDigits() {
    return PHONE_DIGITS.map(function (d) {
      return (d - PHONE_SHIFT + 10) % 10;
    }).join('');
  }

  function formatPhone(digits) {
    return '(' + digits.slice(0, 3) + ') ' + digits.slice(3, 6) + '-' + digits.slice(6);
  }

  document.addEventListener('DOMContentLoaded', function () {
    var email = decodeEmail();
    var digits = decodePhoneDigits();
    var phoneFormatted = formatPhone(digits);

    // Elements that should just display the email as text
    document.querySelectorAll('.js-email-text').forEach(function (el) {
      el.textContent = email;
    });
    // Links that should become mailto: links (optionally with data-subject)
    document.querySelectorAll('.js-email-link').forEach(function (el) {
      var subject = el.getAttribute('data-subject');
      el.setAttribute('href', 'mailto:' + email + (subject ? '?subject=' + encodeURIComponent(subject) : ''));
      if (el.hasAttribute('data-fill-text')) {
        el.textContent = email;
      }
    });
    // Elements that should just display the phone as text
    document.querySelectorAll('.js-phone-text').forEach(function (el) {
      el.textContent = phoneFormatted;
    });
    // Links that should become tel: links
    document.querySelectorAll('.js-phone-link').forEach(function (el) {
      el.setAttribute('href', 'tel:+1' + digits);
      if (el.hasAttribute('data-fill-text')) {
        el.textContent = phoneFormatted;
      }
    });
  });
})();
