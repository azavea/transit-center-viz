library(devtools)
devtools::install_github("hrecht/censusapi")
# setwd("C:/Users/dmcglone/Documents/transit-center-viz/")

# Add key to .Renviron
Sys.setenv(CENSUS_KEY='73dd49cc89bd9740b7579eb0adc9e9863b577ff5')
# Reload .Renviron
readRenviron("~/.Renviron")
# Check to see that the expected key is output in your R console
Sys.getenv("CENSUS_KEY")

# Load censusapi library
library(censusapi)

# Create variable data frame from csv file
myvars <- read.csv('variables.csv', header = TRUE)

# Create metadata key for ACS-1 year data
censusacsmetadata <- listCensusMetadata(name="2015/acs1/subject", type="geography")

# Download MSA population and Median Age for 2015 1-year
metro_summaries <- getCensus(name="2015/acs1/subject",
                       vars=c("NAME", "S2504_C01_027E", "S2504_C01_028E", "S2504_C01_029E", "S2504_C01_030E", "S0501_C01_026E", "S1101_C01_016E", "S1101_C01_017E"), 
                       region="metropolitan statistical area/micropolitan statistical area:*")
head(metro_summaries)

# Download 2015 MSA population profile tables
metro_profile_2015 <- getCensus(name="2015/acs/acs1/profile",
                                vars=myvars[,3], 
                                region="metropolitan statistical area/micropolitan statistical area:*")
head(metro_profile_2015)

# Download 2014 MSA population profile tables
metro_profile_2014 <- getCensus(name="2014/acs1/profile",
                       vars=myvars[,3], 
                       region="metropolitan statistical area/micropolitan statistical area:*")
head(metro_profile_2014)

# Download 2013 MSA population profile tables
metro_profile_2013 <- getCensus(name="2013/acs1/profile",
                                vars=myvars[,3], 
                                region="metropolitan statistical area/micropolitan statistical area:*")
head(metro_profile_2013)

# Download 2012 MSA population profile tables
metro_profile_2012 <- getCensus(name="2012/acs1/profile",
                                vars=myvars[,3], 
                                region="metropolitan statistical area/micropolitan statistical area:*")
head(metro_profile_2012)

# Download 2011 MSA population profile tables
metro_profile_2011 <- getCensus(name="2011/acs1/profile",
                                vars=myvars[,3], 
                                region="metropolitan statistical area/micropolitan statistical area:*")
head(metro_profile_2011)

# Get FIPS codes for 50 states plus DC
load("~/transit-center-viz/fips.RData")

# Create 2015 Tracts template
tracts_profile_2015 <- NULL

# Loop through FIPS codes, download and generate tract tables for 2015
for (f in fips) {
  stateget <- paste("state:", f, sep="")
  temp <- getCensus(name="2015/acs5/profile",
  vars=myvars[,3], region="tract:*",
  regionin=stateget)
  tracts_profile_2015 <- rbind(tracts_profile_2015, temp)
}
head(tracts_profile_2015)

# Create 2014 Tracts template
tracts_profile_2014 <- NULL

# Loop through FIPS codes, download and generate tract tables for 2014
for (f in fips) {
  stateget <- paste("state:", f, sep="")
  temp <- getCensus(name="2014/acs5/profile",
                    vars=myvars[,3], region="tract:*",
                    regionin=stateget)
  tracts_profile_2014 <- rbind(tracts_profile_2014, temp)
}
head(tracts_profile_2014)

# Create 2013 Tracts template
tracts_profile_2013 <- NULL

# Loop through FIPS codes, download and generate tract tables for 2013
for (f in fips) {
  stateget <- paste("state:", f, sep="")
  temp <- getCensus(name="2013/acs5/profile",
                    vars=myvars[,3], region="tract:*",
                    regionin=stateget)
  tracts_profile_2013 <- rbind(tracts_profile_2013, temp)
}
head(tracts_profile_2013)

# # Create 2013 Tracts template
# tracts_profile_2012 <- NULL
# 
# # Loop through FIPS codes, download and generate tract tables for 2013
# for (f in fips) {
#   stateget <- paste("state:", f, sep="")
#   temp <- getCensus(name="2012/acs5/profile",
#                     vars=myvars[,3], region="tract:*",
#                     regionin=stateget)
#   tracts_profile_2012 <- rbind(tracts_profile_2012, temp)
# }
# head(tracts_profile_2012)

# # Create 2013 Tracts template
# tracts_profile_2011 <- NULL
# 
# # Loop through FIPS codes, download and generate tract tables for 2013
# for (f in fips) {
#   stateget <- paste("state:", f, sep="")
#   temp <- getCensus(name="2011/acs5",
#                     vars="B04_0058PE", region="tract:*",
#                     regionin=stateget)
#   tracts_profile_2011 <- rbind(tracts_profile_2011, temp)
# }
# head(tracts_profile_2011)


# Create csvlist from census data vectors
csvlist <- list(metro_profile_2012 = metro_profile_2012, metro_profile_2013 = metro_profile_2013, metro_profile_2014 = metro_profile_2014, metro_profile_2015 = metro_profile_2015, tracts_profile_2013 = tracts_profile_2013, tracts_profile_2014 = tracts_profile_2014, tracts_profile_2015 = tracts_profile_2015)

# Loop through and paste data frames to csvs
for(i in names(csvlist)){
  write.csv(csvlist[[i]], paste0(i,".csv"))
}
