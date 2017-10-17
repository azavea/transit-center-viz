
library(tidyverse)
library(stringr)


fpath <- "data/census/input/cen/"
files <- paste0(fpath, dir(fpath))

# "EST_VC104" - Total population foreign born
# "EST_VC22" - Estimate; COMMUTING TO WORK - Workers 16 years and over - Car, truck, or van -- carpooled

get_names <- function(dat) {
  dat[1, ] %>% 
    t %>%
    data.frame %>%
    return
}

files06 <- files[9:12]
names <- c()
for (i in files06) {
  t <- read.csv(i)
  names <- c(names, names(t)) %>%
    unique
}

read_and_select <- function(file) {
  
  st <- str_locate_all(pattern ='ACS_', files) %>%
    unlist %>% .[2]
  yr <- substr(file, st + 1, st + 2)
  
  dat <- read.csv(file) %>%
    .[-1, ] %>%
    select(one_of(names)) %>%
    mutate(year = yr)
  
  return(dat)
}


all <- plyr::llply(files, read_and_select, .progress = "text")

for (f in all) {
  paste0(f$year[1], ', ncol: ', ncol(f)) %>%
    print
}

names(all[[5]])

files[9]

t <- all[[9]]
head(t)

