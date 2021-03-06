###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Create variable lookup table
##    - read raw text file with variables and descriptions
##    - format and label DF
##    - export as csv
##    
## DATE: 09/05/17
## AUTHOR(S): Simon Kassel
###########################################################################

# packages
library(tidyverse)

# read .txt
vars <- read.csv("data/spatial/inputvariables.txt", sep = ":", header = FALSE, stringsAsFactors = FALSE)

# change names
names(vars) <- c("variable", "table")

# clean table name
vars <- vars %>%
  mutate(table = gsub("Table", "", table)) %>%
  mutate_all(trimws)

# write to csv
write.csv(vars, "data/spatial/input/variables.csv")
