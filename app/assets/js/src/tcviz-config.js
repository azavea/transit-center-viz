TCVIZ.Config = {
    zoomThreshold: 7,
    defaultNtdField: 'upt_total',
    defaultCensusField: 'popDensity',
    defaultMSA: 33,
    nationwide_layers: [{
        text: 'Total Ridership',
        value: 'upt_total',
    }, {
        text: 'Bus Ridership',
        value: 'upt_bus',
    }, {
        text: 'Rail Ridership',
        value: 'upt_rail'
    }, {
        text: 'Average Fare',
        value: 'avg_fare'
    }, {
        text: 'Average Speed',
        value: 'average_speed'
    }, {
        text: 'Farebox Recovery',
        value: 'farebox_recovery'
    }, {
        text: 'Vehicle Revenue Miles',
        value: 'revenue_miles'
    }, {
        text: 'Expenses',
        value: 'total_expenses'
    }, {
        text: 'Statewide Gas Prices',
        value: 'gas'
    }],
    MSA_layers: [{
        text: 'Percent Commute by Driving',
        value: 'driving'
    }, {
        text: 'Percent Commute by Public Transit',
        value: 'transit'
    }, {
        text: 'Total Employment',
        value: 'employment'
    }, {
        text: 'Households with No Vehicle',
        value: 'vehicle'
    }, {
        text: 'Median Household Income',
        value: 'medianHH'
    }, {
        text: 'Households Below 200% of Poverty Line',
        value: 'poverty'
    }, {
        text: 'Population Density',
        value: 'popDensity'
    }, {
        text: 'Total Population Foregin Born',
        value: 'foreignBorn'
    }, {
        text: 'Percent Black',
        value: 'pctBlack'
    }, {
        text: 'Percent Asian',
        value: 'pctAsian'
    }, {
        text: 'Percent White',
        value: 'pctWhite'
    }, {
        text: 'Percent Hispanic/Latino of any race',
        value: 'pctHisp'
    }],
    MSA_list: [{
        text: 'Atlanta-Sandy Springs-Roswell, GA',
        value: 1
    }, {
        text: 'Austin-Round Rock, TX',
        value: 2
    }, {
        text: 'Baltimore-Columbia-Towson, MD',
        value: 3
    }, {
        text: 'Birmingham-Hoover, AL',
        value: 4
    }, {
        text: 'Boston-Cambridge-Newton, MA-NH',
        value: 5
    }, {
        text: 'Buffalo-Cheektowaga-Niagara Falls, NY',
        value: 6
    }, {
        text: 'Charlotte-Concord-Gastonia, NC-SC',
        value: 7
    }, {
        text: 'Chicago-Naperville-Elgin, IL-IN-WI',
        value: 8
    }, {
        text: 'Cincinnati, OH-KY-IN',
        value: 9
    }, {
        text: 'Cleveland-Elyria, OH',
        value: 10
    }, {
        text: 'Columbus, OH',
        value: 11
    }, {
        text: 'Dallas-Fort Worth-Arlington, TX',
        value: 12
    }, {
        text: 'Denver-Aurora-Lakewood, CO',
        value: 13
    }, {
        text: 'Detroit-Warren-Dearborn, MI',
        value: 14
    }, {
        text: 'Grand Rapids-Wyoming, MI',
        value: 15
    }, {
        text: 'Hartford-West Hartford-East Hartford, CT',
        value: 16
    }, {
        text: 'Houston-The Woodlands-Sugar Land, TX',
        value: 17
    }, {
        text: 'Indianapolis-Carmel-Anderson, IN',
        value: 18
    }, {
        text: 'Jacksonville, FL',
        value: 19
    }, {
        text: 'Kansas City, MO-KS',
        value: 20
    }, {
        text: 'Las Vegas-Henderson-Paradise, NV',
        value: 21
    }, {
        text: 'Los Angeles-Long Beach-Anaheim, CA',
        value: 22
    }, {
        text: 'Louisville/Jefferson County, KY-IN',
        value: 23
    }, {
        text: 'Memphis, TN-MS-AR',
        value: 24
    }, {
        text: 'Miami-Fort Lauderdale-West Palm Beach, FL',
        value: 25
    }, {
        text: 'Milwaukee-Waukesha-West Allis, WI',
        value: 26
    }, {
        text: 'Minneapolis-St. Paul-Bloomington, MN-WI',
        value: 27
    }, {
        text: 'Nashville-Davidson–Murfreesboro–Franklin, TN',
        value: 28
    }, {
        text: 'New Orleans-Metairie, LA',
        value: 29
    }, {
        text: 'New York-Newark-Bridgeport, NY-NJ-PA',
        value: 30
    }, {
        text: 'Oklahoma City, OK',
        value: 31
    }, {
        text: 'Orlando-Kissimmee-Sanford, FL',
        value: 32
    }, {
        text: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD',
        value: 33
    }, {
        text: 'Phoenix-Mesa-Scottsdale, AZ',
        value: 34
    }, {
        text: 'Pittsburgh, PA',
        value: 35
    }, {
        text: 'Portland-Vancouver-Hillsboro, OR-WA',
        value: 36
    }, {
        text: 'Providence-Warwick, RI-MA',
        value: 37
    }, {
        text: 'Raleigh, NC',
        value: 38
    }, {
        text: 'Richmond, VA',
        value: 39
    }, {
        text: 'Riverside-San Bernardino-Ontario, CA',
        value: 40
    }, {
        text: 'Rochester, NY',
        value: 41
    }, {
        text: 'Sacramento–Roseville–Arden-Arcade, CA',
        value: 42
    }, {
        text: 'Salt Lake City, UT',
        value: 43
    }, {
        text: 'San Antonio-New Braunfels, TX',
        value: 44
    }, {
        text: 'San Diego-Carlsbad, CA',
        value: 45
    }, {
        text: 'San Francisco-Oakland-Hayward, CA',
        value: 46
    }, {
        text: 'San Jose-Sunnyvale-Santa Clara, CA',
        value: 47
    }, {
        text: 'Seattle-Tacoma-Bellevue, WA',
        value: 48
    }, {
        text: 'St. Louis, MO-IL',
        value: 49
    }, {
        text: 'Tampa-St. Petersburg-Clearwater, FL',
        value: 50
    }, {
        text: 'Tucson, AZ',
        value: 51
    }, {
        text: 'Tulsa, OK',
        value: 52
    }, {
        text: 'Urban Honolulu, HI',
        value: 53
    }, {
        text: 'Virginia Beach-Norfolk-Newport News, VA-NC',
        value: 54
    }, {
        text: 'Washington-Arlington-Alexandria, DC-VA-MD-WV',
        value: 55
    }],
    symbol_sizes: [5, 10, 15, 20, 25]
};