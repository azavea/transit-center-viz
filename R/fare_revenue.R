###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Get fare revenue data from ntd
##    - Download fare revenue summary reports
##    - Read them in and combine into one dataset
##    
## DATE: 09/11/17
## AUTHOR: Simon Kassel
###########################################################################

# packages
library(tidyverse)
library(readxl)
library(RCurl)
library(stringr)

# helper functions
source("R/functions.R")

# url prefix for all files from ntd
url_start <- "https://www.transit.dot.gov/sites/fta.dot.gov/files/"

# needed to manually extract the names of each excel file
file <- c(
  "2006_Fare_Revenues_Earned_By_Mode.xlsx",
  "2007_Fare_Revenues_Earned_By_Mode.xlsx",
  "2008_Fare_Revenue_Earned_By_Mode.xlsx",
  "Fare_Revenue_Earned_By_Mode.xls",
  "2010_Fare_Revenue_Earned_By_Mode.xlsx",
  "2011_Fare_Revenue_Earned_By_Mode.xlsx",
  "2012_Fare_Revenue_Earned_By_Mode_0.xlsx",
  "2013%20Fare%20Revenue%20Earned%20By%20Mode.xlsx",
  "2014%20Fare%20Revenue.xlsx",
  "2015_Fare_Revenue.xlsx"
)

urls <- paste0(url_start, file)

fnames <- c(2006:2015) %>%
  paste0("revenue_", ., ".xlsx")

fnames[4] <- gsub("x$", "", fnames[4])

for (i in c(1:length(urls))) {
  download.file(
    urls[i],
    destfile = paste0("./data/ntd/revenue/input", fnames[i]),
    mode = "wb",
    quiet = TRUE)
}

files <- dir("data/ntd/revenue/input")

read_excel_revenue <- function(file) {
  
  # define file path
  file_path <- paste0("data/ntd/revenue/input/", file)
  
  # extract year as a string
  year <- substr(file, 9, 12)
  
  # read file
  ex <- read_excel(file_path, col_types = "text")
  
  # make all variable names lower case to make string matching easier
  names(ex) <- tolower(names(ex))
  
  # matching all datasets
  if ("fund_amt" %in% names(ex)) {
    ex <- ex %>% rename("fares_earned" = fund_amt)
  }
  
  if ("5 digit ntdid" %in% names(ex)) {
    
    ex <- ex %>%
      select(ntdid = `4 digit ntdid`,
             mode = `mode`,
             fares = `fares`)
    
    } else if ("ntdid" %in% names(ex)) {
      
      ex <- ex %>%
        select(ntdid = `ntdid`,
               mode = `mode`,
               fares = `fare revenue earned`)
      
    } else if ("legacy ntd id" %in% names(ex)) {
      
      ex <- ex %>%
        select(ntdid = `legacy ntd id`,
               mode = `mode`,
               fares = `fares`)
      
    } else {
      
      ex <- ex %>%
        select(ntdid = `trs_id`,
               mode = `mode_cd`,
               fares = `fares_earned`)
      }
  
  # add year field, unique id as character var, fares as numeric
  ex <- ex %>%
    mutate(year = year, 
           ntdid = as.character(ntdid),
           fares = as.numeric(fares))
  
  return(ex)
}


# apply function over each file
all_revenue <- map_df(dir("data/ntd/revenue/input/"), read_excel_revenue) %>%
  mutate(ntdid = clean_ntdid(ntdid)) %>%
  group_by(ntdid, year) %>%
  summarise(fares = sum(fares))

# export as csv
write_csv(all_revenue, "data/ntd/revenue/output/revenue_vars.csv")
