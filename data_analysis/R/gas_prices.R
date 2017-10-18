library(readr)
pr_all <- read.csv("C:/Users/dmcglone/Downloads/pr_all.csv")

# Import MGTCK which contains conversion factor for each year in million per BTU barrel
MGTCK_2006_2015 <- read_csv("C:/Users/dmcglone/Downloads/MGTCK_2006-2015.csv")

# Subset only rows in price data frame that contain Motor gasoline prices in
# dollars per million Btu. Called MGTCD (TC stands for total consumption)
pr_subset <- subset(pr_all, MSN=="MGTCD")

# Remove fields for years prior to 2006
pr_2006_2015 <- pr_subset[, -c(4:39)]

# Calculate gas price per gallon  using formula: MGTCD * MGTCK (for each year) / 42
pr_2006_2015$gp_06 <- with(pr_2006_2015, pr_2006_2015$`2006` * 5.191 / 42)

pr_2006_2015$gp_07 <- with(pr_2006_2015, pr_2006_2015$`2007` * 5.155 / 42)

pr_2006_2015$gp_08 <- with(pr_2006_2015, pr_2006_2015$`2008` * 5.126 / 42)

pr_2006_2015$gp_09 <- with(pr_2006_2015, pr_2006_2015$`2009` * 5.101 / 42)

pr_2006_2015$gp_10 <- with(pr_2006_2015, pr_2006_2015$`2010` * 5.078 / 42)

pr_2006_2015$gp_11 <- with(pr_2006_2015, pr_2006_2015$`2011` * 5.068 / 42)

pr_2006_2015$gp_12 <- with(pr_2006_2015, pr_2006_2015$`2012` * 5.063 / 42)

pr_2006_2015$gp_13 <- with(pr_2006_2015, pr_2006_2015$`2013` * 5.062 / 42)

pr_2006_2015$gp_14 <- with(pr_2006_2015, pr_2006_2015$`2014` * 5.060 / 42)

pr_2006_2015$gp_15 <- with(pr_2006_2015, pr_2006_2015$`2015` * 5.060 / 42)

# Write data frame of gas prices to csv in output directory
write.csv(pr_2006_2015, file = "data/r_output/gas_prices_2006-2015.csv")
