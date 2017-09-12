###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Combine census data with ntd data to create spatial
##  objects for carto
##    - 
##    - 
##    - 
##    
## DATE: 09/11/17
## AUTHOR: Simon Kassel
###########################################################################

library(tidyverse)
library(sf)

# ntd descriptor vars
exp <- read.csv("data/ntd/expenses/output/expense_vars.csv", 
                stringsAsFactors = FALSE) %>%
  group_by(ntdid, year) %>%
  summarise(total_expenses = sum(total_expenses)) %>%
  filter(ntdid != "0000")

svc <- read.csv("data/ntd/service/output/service_vars.csv",
                stringsAsFactors = FALSE) 
rev <- read.csv("data/ntd/revenue/output/revenue_vars.csv",
                stringsAsFactors = FALSE) 

# table to reference names of each agency
lookup <- read.csv("data/spatial/output/name_lookup.csv",
                   stringsAsFactors = FALSE)

# join together
ntd_vars <- left_join(exp, svc) %>%
  left_join(rev) %>%
  right_join(lookup, .) %>%
  select(-starts_with("X"))

ntd_vars <- ntd_vars %>%
  mutate(average_speed = revenue_miles / revenue_hours,
         avg_fare = fares / upt,
         farebox_recovery = fares / total_expenses)

write.csv(ntd_vars, "data/r_output/ntd_variables.csv")

# spatial data ------------------------------------------------------------

load("data/spatial/output/spatial_data.Rdata")

ag_sf <- ag_sf %>%
  mutate(ntdid = clean_ntdid(ntdid))

ag_with_ntd <- right_join(ag_sf, ntd_vars)

st_write(ag_with_ntd, "data/r_output/agencies_with_ntd_variables.geojson")


