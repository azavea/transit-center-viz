###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Make spatial object out od transit agencies
##    - Geocode transit agencies
##    - Create spatial object with transit agency coords
##    - Pull in MSA and census tract spatial data
##    - Spatially join transit agencies to MSAs and tracts
##    
## DATE: 08/08/17
## AUTHOR: Simon Kassel
###########################################################################

# packages
library(ggmap)
library(sf)
library(tidyverse)
library(tigris)
library(tidycensus)
library(stringr)

source("R/functions.R")

# remove territories
states <- unique(fips_codes$state)[1:51]

# define url to download msas from
msa_url <- "http://www2.census.gov/geo/tiger/TIGER2015/CBSA/tl_2015_us_cbsa.zip"

# load all MSAs
msas <- download_shapefile(
  url = msa_url, 
  path="data/spatial/input", name = "csa")

# load all census tracts
tracts <- reduce(
  map(state, function(st) {
    get_acs(geography = "tract", variables = "B01003_001", 
            state = st, geometry = TRUE)
  }), 
  rbind
)

# remove zip files
for (f in dir() %>% .[grepl("^cb_..*zip$", .)]) {
  file.remove(f)
}

# read and clean agency data
ag <- read.csv("data/spatial/input/agencies.csv") %>%
  select(ntdid, name, city = City, 
         state = State, zip = Zip.Code) %>%
  filter(state %in% states) %>%
  mutate(full_adr = paste0(city, ", ", state, " ", zip),
         ntdid = clean_ntdid(ntdid)) %>%
  group_by(ntdid) %>%
  summarise_all(first)

# geocode transit agencies  
ag <- cbind(ag, geocode(ag$full_adr))
  
# convert data frame to sf
ag_sf = st_as_sf(ag, coords = c("lon", "lat"), crs = 4269) %>%
  st_transform(crs = st_crs(msas))

# join msa data to tracts
ag_with_geo <- st_join(
    ag_sf, msas, 
    join = st_within, 
    suffix = c(".ag", ".msa")) %>%
  st_join(
    tracts, 
    join = st_within, 
    suffix = c(".msa", ".tract")) %>%
  select(ntdid, name, city, state, zip,
         GEOID.msa, GEOID.tract, geometry)

# write msas and tracts
st_write(msas, "data/r_output/all_msas.geojson")
st_write(tracts, "data/r_output/all_tracts.geojson")


save(msas, ag_with_geo, file = "data/spatial/output/spatial_data.Rdata")

