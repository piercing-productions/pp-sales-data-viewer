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
* not sure yet how best to serve data for groups


### New Features

* Sortable table columns
* Total row and/or column
* Deep linking (link with cus_no and year as parameters)
* User roles/restrictions
  * Management:  sees all
  * Sales: only sees their own
* User hints/instructions on how to use the app
* How to handle group data: probably another view entirely within this app


### Optimization/Design/Bugs

* Mobile optimization
* Search autocomplete performance
* Print styles:
  * Smaller charts side-by-side at top
* Add JSON error handlers
* Search input: capitalization issues cause mismatches


### Kinetic

* Create new area in Pipeline
* Create web service(s) to serve JSON
