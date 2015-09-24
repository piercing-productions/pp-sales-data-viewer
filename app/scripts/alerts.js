// alerts module

(function(){

  // first, hide any alerts
  $('.alert').hide();

  // bind events
  events.on('alert', render);

  function render() {
    // console.log('New alert received.');
    $('.alert').show();
  };

})();
