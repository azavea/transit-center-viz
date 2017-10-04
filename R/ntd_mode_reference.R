library(tidyverse)

mod <- read.csv("data/r_output/msas_with_summarized_agency_data_long_BYMODE.csv")

head(mod)
nrow(mod)
n_distinct(mod$GEOID.msa) * n_distinct(mod$year)

n_distinct(mod$mode)

unique(mod$mode)

library(rvest)

html <- read_html("http://ntd.transitgis.org/archives/626")

codes <- html %>%
  html_nodes('p') %>%
  html_text(trim = TRUE)


abbr <- gsub("\\..*","", codes)
desc <- substr(codes, 6, nchar(codes))

df <- data.frame(abbr, desc)
write.csv(df, "data/r_output/ntd_mode_reference.csv")

