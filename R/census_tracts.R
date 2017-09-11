###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Pull census tract level data for all variables
##    - 
##    - 
##    - 
##    
## DATE: 09/05/17
## AUTHOR(S): Simon Kassel
###########################################################################

# packages
library(tidycensus)
library(tidyverse)
library(sf)
library(purrr)

# helper functions
source("R/functions.R")

options(tigris_use_cache = TRUE)

# read csv
vars <- read.csv("variables.csv", stringsAsFactors = FALSE)

# set api ket
census_api_key(api_key("simon"))


tract <- get_acs(geography = "tract", variables = vars$table, state = "VT", survey = "acs1")
