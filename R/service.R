###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Read and compile excel files of annual service reports
##    - must download each individual service summary table from database
##    - read in each excel file
##    - extract necessary variables
##    - create uniform variable names
##    - Compile each year into one long dataset
##    
## DATE: 09/11/17
## AUTHOR: Simon Kassel
###########################################################################

# packages
library(readxl)
library(tidyverse)
library(stringr)

# helper functions
source("R/functions.R")

read_excel_service <- function(file) {
  # Process service data for one year
  #
  # Args:
  #   file: string, name of excel file
  #
  # Returns:
  #   df with appropriately named fields
  #   
  
  # define file path
  file_path <- paste0("data/ntd/service/input/", file)
  
  # extract year as a string
  year <- substr(file, 1, 4)
  
  # determine whether or not to skip a row
  if (year %in% c("2013", "2014")) {
    skip <- 1
  } else {
    skip <- 0
  }
  
  # read file
  ex <- read_excel(file_path, skip = skip)
  
  # make all variable names lower case to make string matching easier
  names(ex) <- tolower(names(ex))
  
  # create uniform variable names
  if ("5 digit ntd id" %in% names(ex)) {
    
    ex <- ex %>%
        select(ntdid = `legacy ntd id`, 
               time_period = `time period`, 
               revenue_miles = `actual vehicles/ passenger car  revenue miles`, 
               revenue_hours = `actual vehicles/ passenger car revenue hours`, 
               upt = `unlinked passenger trips (upt)`)

    } else if ("5 digit ntdid" %in% names(ex)) {
      
      ex <- ex %>%
        select(ntdid = `4 digit ntdid`,
               time_period = `time period`, 
               revenue_miles = `total actual revenue miles__1`, 
               revenue_hours = `total actual revenue hours__1`,
               upt = `unlinked passenger trips (upt)`)
      
    } else if ("agency" %in% names(ex)) {
      
      ex <- ex %>%
        select(ntdid = `ntdid`,
               time_period = `time period`, 
               revenue_miles = `vehicle revenue miles`, 
               revenue_hours = `vehicle revenue hours`,
               upt = `unlinked passenger trips`)
      
    } else if ("legacy ntd id" %in% names(ex)) {
      
      ex <- ex %>%
        select(ntdid = `legacy ntd id`,
               time_period = `time period`, 
               revenue_miles = `total actual revenue miles`, 
               revenue_hours = `total actual revenue hours`,
               upt = `unlinked passenger trips (upt)`)
      
    } else if ("pass_car_rev_miles_num" %in% names(ex)) {

      ex <- ex %>%
        select(ntdid = `trs_id`,
               time_period = `time_period_desc`, 
               revenue_miles = `pass_car_rev_miles_num`, 
               revenue_hours = `pass_car_rev_hrs_num`,
               upt = `unl_pass_trips_num`)
  
    } else {
    
      ex <- ex %>%
        select(ntdid = `trs_id`,
             time_period = `time_period_desc`, 
             revenue_miles = `vehicle_or_train_rev_miles`, 
             revenue_hours = `vehicle_or_train_rev_hours`,
             upt = `unlinked_passenger_trips`)
      
    }
  
  # add year field, unique ad a character var
  ex <- ex %>%
    mutate(year = year, ntdid = as.character(ntdid))
  
  return(ex)
}


# apply function over each file
all_service <- map_df(dir("data/ntd/service/input/"), read_excel_service) %>%
  filter(time_period == "Annual Total") %>%
  select(-time_period) %>%
  mutate(ntdid = clean_ntdid(ntdid)) %>%
  group_by(ntdid, year) %>%
  summarise_all(sum) 

# export as csv
write_csv(all_service, "data/ntd/service//output/service_vars.csv")
