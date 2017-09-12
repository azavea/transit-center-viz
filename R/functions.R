###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Helper functions
##    - 
##    - 
##    - 
##    
## DATE: 09/05/17
## AUTHOR(S): Simon Kassel
###########################################################################

api_key <- function(name) {
  # Get an api key
  #
  # Args:
  #   name: string, name of the user, one of ("simon", )
  #     
  #
  # Returns:
  #   string, an api key
  #   
  
  keys <- list("simon" = "73c4d88a15dc72d1f877a492b68c8013f74ddf79")
  if (! name %in% names(keys)) {
    print("No key available for user")
    return(NULL)
  } else {
    keys[[name]] %>%
      return
  }
}

get_csvs <- function(directory) {
  # Get a vector of filenames of all csvs in a director
  #
  # Args:
  #   directory: string, reltive filepath to search
  #
  # Returns:
  #   a vector of filenames
  #   
  
  dir(directory) %>%
    .[grepl(".csv", .)] %>%
    return
}

# TODO: adapt this to work with decimals
dol_to_numeric <- function(x) {
  # Convert string dollar values to numeric
  #
  # Args:
  #   x: string, dollar value with '$' and/or ',' 
  #
  # Returns:
  #   numeric dollar value
  #   
  
  gsub("[^0-9]", "", x) %>%
    as.numeric %>%
    return
}


download_shapefile <- function(url, path, name) {
  # Download a zipped shapefile from the internet and load it into R as
  #   a sf object
  #
  # Args:
  #   url: string, download url of zipped shapefile
  #   path: string, relative filepath (from wd) to put the shp directory
  #   name: string, name of the directory to store shp in
  #
  # Returns:
  #   an sf object for the downloaded shapefile
  #   
  
  if (grepl("./$", path)) {
    path <- substr(path, 1, nchar(path) - 1)
  }
  
  zip_file <- paste0(name, ".", "zip")
  download.file(url, destfile = paste0(path, "/", zip_file))
  
  ex_dir <- paste0(path, "/", name)
  
  unzip(zipfile = paste0(path, "/", zip_file),
        exdir = ex_dir)
  
  file <- dir(ex_dir) %>% 
    .[grepl(".shp$", .)]
  
  file.remove(paste0(path, "/", zip_file))
  
  sp <- st_read(paste0(ex_dir, "/", file))
  return(sp)
}