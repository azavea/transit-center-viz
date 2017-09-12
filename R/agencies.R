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

# load all MSAs
msas <- download_shapefile(url = msa_url, path="data/spatial/input", name = "csa")

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
  select(ntdid, name, address = Address.Line.1, city = City, 
         state = State, zip = Zip.Code) %>%
  mutate(full_adr = paste0(address, ", ", city, ", ", state, " ", zip),
         ntdid = clean_ntdid(ntdid)) %>%
  group_by(ntdid) %>%
  summarise_all(first)

ag <- ag %>%
  filter(state %in% states)

# geocode transit agencies  
ag <- cbind(ag, geocode(ag$full_adr))

# clean up the addresses that didn't geocode correctly
ag_g <- ag %>% 
  filter(!is.na(lon))

ag_ng <- ag %>%
  filter(is.na(lon)) %>%
  select(-lon, -lat) %>%
  cbind(., geocode(paste(.$state, .$city, .$zip, sep = ", ")))

# complete gecoded agency db
ag <- rbind(ag_g, ag_ng) %>%
  select(-full_adr)
  
# convert data frame to sf
ag_sf = st_as_sf(ag, coords = c("lon", "lat"), crs = 4269) %>%
  st_transform(crs = st_crs(msas))

# join msa data to tracts
tracts_and_msas <- st_join(
  tracts, msas, 
  join = st_within, 
  suffix = c(".tracts", ".msa"))

# join geographic data to agencies
ag_with_geo <- st_join(ag_sf, tracts_and_msas) %>%
  select(-variable, -estimate, -moe, -CSAFP, -AFFGEOID, -LSAD, -ALAND, -AWATER)

save(tracts, msas, ag_sf, tracts_and_msas, ag_with_geo, file = "data/spatial/output/spatial_data.Rdata")
