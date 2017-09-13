## About these datasets

we have agency spatial and tabular data with all ntd variables. Long form datasets have separate sets of rows for each year. Wide format datasets have separate fields for each year denoted with the prefix `y.YYYY`.

#### NTD variables

* *ntdid*: national transit databse id, unique identifier (4 character string), using the legacy id because we needed to match with previous years
* *name*: name of transit agency
* *GEOID.msa*: 5 digit cbsa unique identifier
* *GEOID.tract*: 11 digit tract identifier
* *total_expenses*: total annual expences for the agency
* *revenue_miles*: total annual revenue miles for the agency
* *revenue_hours*: total annual revenue hours for the agency
* *upt*: total number of unlinked passenger trips
* *fares*: total fare revenue
* *average_speed*: revenue service miles / revenue service hours
* *avg_fare*: total fare revenue/unlinked passenger trips
* *farebox_recovery*:  total fare revenue / total operating expenses
* *total_expenses*: total operating expenses
