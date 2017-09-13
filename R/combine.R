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
library(stringr)

# helper functions
source("R/functions.R")

# NTD tabular data --------------------------------------------------------

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
  select(-starts_with("X")) %>%
  mutate(average_speed = revenue_miles / revenue_hours,
         avg_fare = fares / upt,
         farebox_recovery = fares / total_expenses)


# spatial data ------------------------------------------------------------

# load spatial data
load("data/spatial/output/spatial_data.Rdata")

# join ntd_vars to geographic agency data
ag_long <- right_join(ag_with_geo, ntd_vars)

# create wide format dataset
ag_wide <- select(
  ag_long, ntdid, GEOID.msa, GEOID.tract, name, city, state, zip) %>%
  unique()
for(y in unique(ag_long$year)) {
  temp <- ag_long %>%
    filter(year == y) %>%
    as.data.frame %>%
    select(ntdid, total_expenses:farebox_recovery)
  names(temp)[2:ncol(temp)] <- paste("y", y, names(temp)[2:ncol(temp)], sep = ".")
  ag_wide <- left_join(ag_wide, temp)
} 


# census data -------------------------------------------------------------

read_census <- function(file, dir, geog) {
  
  table <- paste0(dir, file) %>%
    read.csv(stringsAsFactors = FALSE)
  
  if ("X" %in% names(table)) {
    table <- table %>%
      select(-X)
  }
  
  if (tolower(geog) == "msa") {
    table <- table %>%
      rename(GEOID.msa = metropolitan.statistical.area.micropolitan.statistical.area,
             name.msa = NAME)
  } else if (tolower(geog) == "tract") {
    table <- table %>%
      rename(GEOID.tract = tract) %>%
      select(-NAME, -state, -county)
  } else {
    paste0(geog, " is not a valid geography, please choose either 'msa' or 'tract' ")
    return(NULL)
  } 
  
  year <- substr(file, nchar(file) - 7, nchar(file) - 4)
  
  table <- table %>% 
    mutate(year = year)

  return(table)
}

widen <- function(dat, prefix_col, join_col, remove_cols) {
  
  iter <- dat %>%
    select(starts_with(prefix_col))
  names(iter) <- "subvar"
  
  dat <- cbind(dat, iter) 
  
  iter <- iter[,1] %>%
    unique
  
  init_df <- dat %>%
    select(one_of(join_col)) %>%
    unique()
  
  for (i in iter) {
    temp <- dat %>%
      filter(subvar == i) %>%
      select(-one_of(c(prefix_col, "subvar", remove_cols)))
    names(temp)[-1] <- paste0("y.", i, ".", names(temp)[-1])
    init_df <- left_join(init_df, temp, by = join_col)
  }
  
  return(init_df)
  
}

census_files <- dir("data/census/output/")

cen_met <- census_files[grepl("^metro", census_files)]
cen_trc <- setdiff(census_files, cen_met)

# get metropolitan long
cen_met_long <- map_dfr(
  cen_met, 
  read_census, 
  dir = "data/census/output/", geog="msa")

# get metropolitan wide
cen_met_wide <- widen(
  dat = cen_met_long, 
  prefix_col = "year", 
  join_col = "GEOID.msa", 
  remove_cols = "name.msa")

# get tract long
cen_tract_long <- map_dfr(
  cen_trc, 
  read_census, 
  dir = "data/census/output/", geog="tract")

# get metropolitan wide
# cen_tract_wide <- widen(
#   dat = cen_tract_long, 
#   prefix_col = "year", 
#   join_col = "GEOID.tract", 
#   remove_cols = "year")

# export datasets ---------------------------------------------------------

# write long form agency datasets
st_write(ag_long, "data/r_output/agencies_with_ntd_variables_long.geojson")
write.csv(ag_long, "data/r_output/agencies_with_ntd_variables_long.csv")

# write wide form agency datasets
st_write(ag_wide, "data/r_output/agencies_with_ntd_variables_wide.geojson")
write.csv(ag_wide, "data/r_output/agencies_with_ntd_variables_wide.csv")

# census datasets
write.csv(cen_met_long, "data/r_output/census_vars_metro_areas_long.csv")
write.csv(cen_met_wide, "data/r_output/census_vars_metro_areas_wide.csv")
write.csv(cen_tract_long, "data/r_output/census_vars_tracts_long.csv")

