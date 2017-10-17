library(tidyverse)



mc <- read.csv("data/r_output/mode_categories.csv")
modes <- read.csv("data/r_output/msas_with_summarized_agency_data_long_BYMODE.csv") %>%
  select(-X) %>%
  left_join(mc)
head(modes)

mode_categories <- modes %>%
  group_by(GEOID.msa, name, year, category) %>%
  select(-mode, -average_speed, -avg_fare, 
         -farebox_recovery) %>%
  summarise_all(sum) %>%
  mutate(average_speed = revenue_miles / revenue_hours,
         avg_fare = fares / upt,
         farebox_recovery = fares / total_expenses) %>%
  ungroup

write.csv(mode_categories, "data/r_output/msas_with_summarized_agency_data_long_BYMODE_category.csv")

y06 <- mode_categories %>%
  filter(year == 2006) %>%
  select(-year) 

y15 <- mode_categories %>%
  filter(year == 2015) %>%
  select(-year)

change <- left_join(y15, y06, by = c("GEOID.msa", "name", "category"), 
                    suffix = c('.y15', '.y06'))

names <- gsub('.y15', '', names(change)[4:10])
for (x in names) {
  change[paste0('change.', names)] <- change[paste0(names, '.y15')] - change[paste0(names, '.y06')]
}
change <- change %>%
  select(GEOID.msa, name, category, starts_with('change.'))
head(change)

write.csv(change, "data/r_output/msas_with_summarized_agency_data_long_BYMODE_category_change_over_time.csv")

