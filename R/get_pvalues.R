library(tidyverse)

cen <- read.csv("data/r_output/census_vars_metro_areas_long.csv") %>%
  select(-X)

ntd <- read.csv("data/r_output/msas_with_summarized_agency_data_long.csv") %>%
  filter(year %in% unique(cen$year)) %>%
  select(-X) %>%
  filter(is.finite(farebox_recovery))

var_names <- read.csv("data/spatial/input/variables.csv")

j <- left_join(ntd, cen) %>% na.omit


cen_vars <- j %>% select(starts_with("DP"))

ntd_vars <- j %>% 
  select(-starts_with("DP"), -name.msa, -name, -year, -GEOID.msa)

all_ntd <- names(ntd_vars)
all_cen <- names(cen_vars)

get_pvalue <- function(model) {
  summary(model)$coefficients[2,4] %>% return
}

reg_vars <- function(ntd_var, cen_var) {
  df <- cbind(ntd_vars[ntd_var], cen_vars[cen_var])
  names(df) <- c('y', 'x')
  mod <- lm(y ~ x, data = df)
  pv <- get_pvalue(mod)
  c(cen_var, pv) %>%
    return
}


get_all_cen <- function(ntd_var) {
  res <- plyr::ldply(all_cen, reg_vars, ntd_var = ntd_var)
  names(res) <- c("cen_var", ntd_var)
  return(res)
}


all_pvals <- plyr::llply(all_ntd, get_all_cen) %>%
  plyr::join_all()


vn <- var_names %>%
  select(variable, cen_var = table)


aa <- right_join(vn, all_pvals) %>%
  select(-cen_var)

options(scipen=999)
head(aa)
write.csv(aa, "pvalues.csv")
