// Chart-Months module
// 'use strict';

(function(){

  var selectedCustomer = '';
  var selectedYear;
  var $el = document.getElementById('chart-months');

  google.load('visualization', '1', {packages: ['corechart', 'bar']});

  // chart options/styles
  var options = {
      height: 425,
      titleTextStyle: {fontSize: 24},
      colors: ['#0FA1D1'],
      chartArea: {width: '85%'},
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
    var newStr = selectedYear.replace(' YTD', ''); // trim YTD
    var jqxhr = $.getJSON('/Commercial/data/' + selectedCustomer + '/' + newStr, function () {
    })
      .done(function(d) {
        for (var i = 0; i < d.length; i++) {
          if (d[i].cus_no === selectedCustomer) {
            render(d[i]);
          }
        }
      });
  }

  function render(d) {
    if ( d ) {

      options.title = 'Monthly Tons Invoiced for ' + selectedYear;

      // the data
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Tons');
      data.addColumn({type: 'string', role: 'annotation'});
      for (var i = 0; i <= 12; i++) {
        if (d[i]) {
          var x = d[i] !== 'NULL' ? parseInt(d[i]) : 0;
          data.addRows([
            [i.toString(), x, numberWithCommas(x)]
          ]);
        }
      }

      var chart = new google.visualization.ColumnChart($el);

      show();

      // draw the chart
      chart.draw(data, options);
    }

  }

  // ideally, these util functions would be in a separate file... alas:
  function show() {
    $el.style.display = '';
  }

  function hide() {
  	$el.style.display = 'none';
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

})();
