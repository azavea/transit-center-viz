###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Combine census data with ntd data to create spatial
##  objeects for carto
##    - 
##    - 
##    - 
##    
## DATE: 09/11/17
## AUTHOR: Simon Kassel
###########################################################################

library(tidyverse)
library(sf)

# load data from disparate scripts

read_ntd_vars <- function(file) {
  read.csv(file) %>%
    mutate(ntdid = as.character(ntdid)) %>%
    return
}

# ntd descriptor vars
exp <- read_ntd_vars("data/ntd/expenses/output/expense_vars.csv") %>%
  group_by(ntdid, year) %>%
  summarise(total_expenses = sum(total_expenses)) %>%
  filter(ntdid != "")

svc <- read_ntd_vars("data/ntd/service/output/service_vars.csv") 
rev <- read_ntd_vars("data/ntd/revenue/output/revenue_vars.csv") 

# table to reference names of each agency
lookup <- read_ntd_vars("data/spatial/output/name_lookup.csv")

# join together
ntd_vars <- left_join(exp, svc) %>%
  left_join(rev) %>%
  right_join(lookup, .) %>%
  select(-starts_with("X"))


load("data/spatial/output/spatial_data.Rdata")

head(ag_sf)
