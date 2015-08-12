# Still To-Do

### JSON/API Strategy


Need to fully flesh out the strategy for the web service(s) that will return JSON.  Execute stored procedures that query Data.vw_RawSalesHistory5FullYearsPlusYTD, which has tons invoiced data for five full years plus the current YTD by customer and ShipTo.

* /customers
  * `exec spGetCustomerList`
  * return unique list of cus_nos
* /tonsInvoiced [cus_no, year(optional)]
  * `exec spGetTonsByCustomer` (with parameters)
  * if (year) return monthly data for year
  * else return annual data by ShipTo.


### Features

* Sortable table columns
* Total row and/or column
* Deep linking (link with cus_no and year as parameters)
* User roles/restrictions
  * Management:  sees all
  * Sales: only sees their own


### Optimization/Design

* Mobile optimization
* Search autocomplete performance
* Print styles:
  * Hide search bar
  * Smaller charts side-by-side at top
* JSON error handlers


### Kinetic

* Create new area in Pipeline
* Create web service(s) to serve JSON
