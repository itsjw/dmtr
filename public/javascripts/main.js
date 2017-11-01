'use strict';

$(function() {

  // Select all links with hashes
  $('a[href*="#"]')
  // Remove links that don't actually link to anything
  .not('[href="#"]')
  .not('[href="#0"]')
  .click(function(event) {
    // On-page links
    if (
      location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') 
      && 
      location.hostname == this.hostname
    ) {
      // Figure out element to scroll to
      var target = $(this.hash);
      target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
      // Does a scroll target exist?
      if (target.length) {
        // Only prevent default if animation is actually gonna happen
        event.preventDefault();
        $('html, body').animate({
          scrollTop: target.offset().top
        }, 1000, function() {
          // Callback after animation
          // Must change focus!
          var $target = $(target);
          $target.focus();
          if ($target.is(":focus")) { // Checking if the target was focused
            return false;
          } else {
            $target.attr('tabindex','-1'); // Adding tabindex for elements not focusable
            $target.focus(); // Set focus again
          };
        });
      }
    }
  });

  $('#messageForm').submit(function(e) {
    e.preventDefault();

    var msg = $('#msg');
    msg.hide();
    msg.removeClass('is-info is-danger');

    var submit = $('button[type="submit"]');
    var loading = $('#loading');
    submit.hide();
    loading.show();

    $.post('/', $(this).serializeArray()).success(function(data) {
      msg.text(data.message);
      msg.addClass('is-info');
      msg.show();

      submit.show();
      loading.hide();
    }).error(function(err) {
      msg.text(err.message);
      msg.addClass('is-danger');
      msg.show();

      submit.show();
      loading.hide();
    });
  });
});