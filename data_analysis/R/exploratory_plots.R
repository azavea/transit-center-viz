###########################################################################
## PROJECT: Transit Center
## 
## SCRIPT PURPOSE: Create exploratory plots of NTD data
##    - Passenger trips time series (selectes cities)
##    
## DATE: 09/18/17
## AUTHOR: Simon Kassel
###########################################################################

library(azaveaTheme)
library(tidyverse)
library(ggplot2)

# load msa data
msa_ridership <- read.csv("data/r_output/msas_with_summarized_agency_data_long.csv")

# create dataset with sample cities
toMatch <- c("Baltimore", "Portland-Vancouver", "Denver")
sample <- msa_ridership %>%
  filter(grepl(paste(toMatch,collapse="|"), name))

# create plot
ggplot(sample, aes(x = year, y = upt / 1000000, color = name)) +
    geom_line(size = 1.5) +
    geom_point(size = 3, show.legend = FALSE) +
    geom_point(size = 2, color = "white", show.legend = FALSE) +
    labs(
      x = "Year",
      y = "Yearly UPT (in millions)",
      title = "Ten-year transit ridership trends in selected cities",
      subtitle = "Annual unlinked passenger trips (UPT) in three MSAs: Portland, OR; Denver, CO; and Baltimore, MD",
      caption = "Data Source: The National Transit Database"
    ) +
    scale_color_manual("Metropolitan Area:  ", values = c("#FF6666", "#5D2E8C", "#2EC4B6"), 
                       labels = c("Baltimore, MD", "Denver, CO", "Portland, OR")) +
    scale_x_continuous(breaks = c(2007, 2009, 2011, 2013, 2015), 
                     labels = c("2007", "2009", "2011", "2013", "2015")) +
  theme_minimal() +
  theme(
    plot.title = element_text(color = Bls5[5], size = 11, face = "bold"),
    plot.subtitle = element_text(color = Bls5[4], size = 9),
    axis.title = element_text(face = "italic", hjust = 1, size = 9),
    axis.text = element_text(size = 8),
    plot.caption = element_text(size = 8),
    legend.title = element_text(size = 9, face = "italic"),
    legend.direction = "horizontal",
    legend.position = c(0.7, 0.85),
    legend.text = element_text(size = 8),
    plot.margin = margin(1,1,1,1, unit = "cm")
    )

# save images
for (ext in c(".svg", ".png", ".jpg")) {
  paste0("data/r_output/sample_city_UPT_time_series", ext) %>%
  ggsave
}



