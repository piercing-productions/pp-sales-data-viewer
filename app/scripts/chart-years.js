// Chart-Years module
'use strict';

(function(){

  var selectedCustomer = '';

  google.load('visualization', '1', {packages: ['corechart', 'bar']});
  // var chart = new google.visualization.ColumnChart(document.getElementById('chart'));

  // dynamically get array of current year + 5 previous calendar years
  var year = new Date().getFullYear(), years = [], timePeriod = 5;
  for (var i = timePeriod; i >= 0; i--) {
    years.push((year - i).toString());
  }

  // chart options/styles
  var options = {
      height: 300,
      titleTextStyle: {fontSize: 32},
      colors: ['#1b9e77'],
      chartArea: {width: '80%'},
      bar: { groupWidth: '75%' },
      legend: { position: 'none' },
      vAxis: { minValue: 0 }
  };

  // bind events
  events.on('customerChanged', render);

  //google.setOnLoadCallback(render);

  function render(d) {
    if ( d ) {

      selectedCustomer = d[0];
      var newTons = d[1];

      options.title = 'Annual Tons for ' + selectedCustomer;

      // the data
      var data = new google.visualization.DataTable();
      data.addColumn('string', 'Year');
      data.addColumn('number', 'Tons');
      for (var i = 0; i < years.length; i++) {
        data.addRows([
          [years[i], newTons[i]]
        ]);
      }

      var chart = new google.visualization.ColumnChart(document.getElementById('chart-years'));

      // define handler for user selection
      function selectHandler() {
        var selectedItem = chart.getSelection()[0];
        if (selectedItem) {
          //
          var label = data.getValue(selectedItem.row, 0);
          //console.log('The user selected ' + label);
          events.emit('getMonthChart', [selectedCustomer, label]);
        }
      }
      // add the selection handler
      google.visualization.events.addListener(chart, 'select', selectHandler);

      // draw the chart
      chart.draw(data, options);
    }

  }

})();