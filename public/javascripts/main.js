'use strict';

$(function() {
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