###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Load and combine data on total expenses for
##  each transit agency
##    - Load csvs that were downloaded from ntd
##    - Combine into one csv and export
##    
## DATE: 
## AUTHOR: Simon Kassel
###########################################################################


# packages
library(tidyverse)

# define the directory where the csvs are 
directory <- "data/ntd/expenses/input/"

# get names of csvs in directory
files <- get_csvs(directory)

# create a lookup table to add agency names to the whole dataset
name_lookup <- read.csv(paste0(directory, files[9])) %>%
  select(ntdid, name) %>%
  na.omit %>%
  distinct

# write to csv
write.csv(name_lookup, "data/spatial/output/name_lookup.csv")

# read and clean all expenses datasets
read <- function(fname, dir) {
  year <- substr(fname, 5, 8) %>% as.numeric
  fpath <- paste0(directory, fname)
  df <- read.csv(fpath, stringsAsFactors = FALSE) %>%
    select(ntdid, expense_type = exp_type, total_expenses = total) %>%
    mutate(total_expenses = dol_to_numeric(total_expenses),
           ntdid = as.character(ntdid),
           year = year)
  return(df)
}

# apply over all csvs
exp <- map_df(files, read, dir = directory)

# export as one compiled csv
write.csv(exp, "data/ntd/expenses/output/expense_vars.csv")


