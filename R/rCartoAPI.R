install.packages("devtools") 
devtools::install_github("dracodoc/rCartoAPI")

library(rCartoAPI)
library(httr)

# Run setup_key to verify connection
setup_key()

# Create Carto setup function
carto_setup <- function(){
  carto_env <- Sys.getenv(c("carto_acc", "carto_api_key"))
  if (identical(sort(names(carto_env)), c("carto_acc", "carto_api_key")) &&
      all(nchar(carto_env) != 0)) {
    return(carto_env)
  } else {
    return(message("Carto user name or API key not found or invalid, check ?rCartoAPI::setup_key for details"))
  }
}

# Check Carto setup function
check_carto_setup <- function(){
  carto_env <- suppressMessages(carto_setup())
  ifelse(typeof(carto_env) == "character",
         paste0("Carto API key for user ", carto_env["carto_acc"],
                " found in environment"),
         "Carto user name or API key not found or invalid, check ?rCartoAPI::setup_key for details")
}

# Create get response function
get_response <- function(res, content_echo = TRUE) {
  httr::stop_for_status(res)
  cat("\n----Request Status:----\n")
  cat(jsonlite::toJSON(httr::http_status(res), pretty = TRUE))
  cat("\n-----------------------\n")
  response <- invisible(jsonlite::prettify(httr::content(res, "text")))
  if (content_echo) {
    response
  }
  return(response)
}

# Build API call base URL
build_url <- function(middle){
  carto_env <- carto_setup()
  base_url <- paste0("https://",
                     carto_env["carto_acc"],
                     ".carto.com/api/v1/",
                     middle,
                     "?api_key=",
                     carto_env["carto_api_key"])
  return(base_url)
}

# Build local_import function to import data frames to Carto
local_import <- function(file_name){
  base_url <- build_url("imports/")
  res <- httr::POST(base_url,
                    encode = "multipart",
                    body = list(file = upload_file(file_name))
  )
  return(get_response(res))
}

local_import("data/spatial/spatial_data.Rdata")
