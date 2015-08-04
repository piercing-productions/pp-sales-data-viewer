// Chart-Years module
'use strict';

(function(){

  var selectedCustomer = '';
  var selectedYear;
  var $el = document.getElementById('chart-months');

  google.load('visualization', '1', {packages: ['corechart', 'bar']});

  // chart options/styles
  var options = {
      height: 300,
      titleTextStyle: {fontSize: 20},
      colors: ['#0FA1D1'],
      chartArea: {width: '80%'},
      bar: { groupWidth: '75%' },
      legend: { position: 'none' },
      vAxis: { minValue: 0 }
  };

  // bind events
  events.on('getMonthChart', init);
  events.on('pickingCustomer', hide);

  function init(a) {
    if (a) {

      selectedCustomer = a[0];
      selectedYear = a[1];

      loadJSON();

    }
  }

  function loadJSON() {
    var jqxhr = $.getJSON( 'data/' + selectedYear + '.json', function() {
      // console.log( 'success' );
    })
      .done(function(d) {
        // console.log( 'second success' );
        for (var i = 0; i < d.length; i++) {
          if (d[i].cus_no == selectedCustomer) {
            // console.log('Found the record for ' + d[i].cus_no);
            render(d[i]);
          }
        }
      });
  }

  function render(d) {
    if ( d ) {

      options.title = 'Monthly Tons for ' + selectedYear;

      // the data
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Tons');
      for (var i = 0; i <= 12; i++) {
        if (d[i]) {
          var x = d[i] !== "NULL" ? parseInt(d[i]) : 0;
          data.addRows([
            [i.toString(), x]
          ]);
        }
      }

      var chart = new google.visualization.ColumnChart($el);

      show();

      // draw the chart
      chart.draw(data, options);
    }

  }

  function show() {
    $el.style.display = '';
  }

  function hide() {
  	$el.style.display = 'none';
  }

})();
