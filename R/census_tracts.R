###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Pull census tract level data for all variables
##    - 
##    - 
##    - 
##    
## DATE: 09/05/17
## AUTHOR: Simon Kassel
###########################################################################

# packages
library(tidycensus)

# read .txt
vars <- read.csv("variables.csv", stringsAsFactors = FALSE)


