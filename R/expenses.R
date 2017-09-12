###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Load and combine data on total expenses for
##  each transit agency
##    - 
##    - 
##    - 
##    
## DATE: 
## AUTHOR: Simon Kassel
###########################################################################


# packages
library(tidyverse)

# define the directory where the csvs are 
directory <- "data/expenses/"

# get names of csvs in directory
files <- get_csvs(directory)

# create a lookup table to add agency names to the whole dataset
name_lookup <- read.csv(paste0(directory, files[9])) %>%
  select(ntdid, name) %>%
  na.omit %>%
  distinct

# read and clean all expenses datasets
read <- function(fname, dir) {
  year <- substr(files[1], 5, 8) %>% as.numeric
  fpath <- paste0(directory, fname)
  df <- read.csv(fpath, stringsAsFactors = FALSE) %>%
    select(ntdid, exp_type, total) %>%
    mutate(total = dol_to_numeric(total),
           ntdid = as.character(ntdid),
           year = year)
  return(df)
}


exp <- map_df(files, read, dir = directory) %>%
  left_join(name_lookup)



