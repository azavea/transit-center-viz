TCVIZ.Config = {
    map: {
        center: [39.500, -98.35],
        zoom: 4
    },
    SQL: {
        user: 'ridership',
        format: 'geojson',
        api_key: '73537cf8a5e88a4f170a0eda73deab782accaee2'
    },
    zoomThreshold: 7,
    defaultNtdField: 'upt_total',
    defaultCensusField: 'pp_dns_',
    defaultMSA: 56,
    ridershipChartLeftAxisDefault: 'upt_total',
    ridershipChartRightAxisDefault: 'avg_fare',
    nationwide_layers: [{
        text: 'Total Ridership',
        value: 'upt_total',
        render: 'number',
    }, {
        text: 'Bus Ridership',
        value: 'upt_bus',
        render: 'number',
    }, {
        text: 'Rail Ridership',
        value: 'upt_rail',
        render: 'number',
    }, {
        text: 'Average Fare',
        value: 'avg_fare',
        render: 'money',
    }, {
        text: 'Average Speed',
        value: 'average_speed',
        render: 'number',
    }, {
        text: 'Farebox Recovery',
        value: 'farebox_recovery',
        render: 'money',
    }, {
        text: 'Vehicle Revenue Miles',
        value: 'revenue_miles',
        render: 'number',
    }, {
        text: 'Expenses',
        value: 'total_expenses',
        render: 'money',
    }, {
        text: 'Statewide Gas Prices',
        value: 'gas',
        render: 'money',
    }],
    MSA_layers: [{
        text: 'Percent Commute by Driving',
        value: 'drove_c'
    }, {
        text: 'Percent Commute by Public Transit',
        value: 'trnst_c'
    }, {
        text: 'Percent Commute by Carpool',
        value: 'carpl_c'
    }, {
        text: 'Total Employment',
        value: 'emp_c'
    }, {
        text: 'Households with No Vehicle',
        value: 'veh_c'
    }, {
        text: 'Median Household Income',
        value: 'inc_c'
    },{
        text: 'Families in Poverty',
        value: 'fpov_c'
    }, {
        text: 'Population Density',
        value: 'pp_dns_'
    }, {
        text: 'Total Population Foregin Born',
        value: 'forgn_c'
    }, {
        text: 'Percent Black',
        value: 'black_c'
    }, {
        text: 'Percent Asian',
        value: 'asian_c'
    }, {
        text: 'Percent White',
        value: 'white_c'
    }, {
        text: 'Percent Hispanic/Latino of any race',
        value: 'hisp_c'
    }],
    MSA_list: [{
        text: 'National Average',
        value: 'NNNNN'
    }, {
        text: 'Atlanta-Sandy Springs-Roswell, GA',
        value: '12060'
    }, {
        text: 'Austin-Round Rock, TX',
        value: '12420'
    }, {
        text: 'Baltimore-Columbia-Towson, MD',
        value: '12580'
    }, {
        text: 'Birmingham-Hoover, AL',
        value: '13820'
    }, {
        text: 'Boston-Cambridge-Newton, MA-NH',
        value: '14460'
    }, {
        text: 'Buffalo-Cheektowaga-Niagara Falls, NY',
        value: '15380'
    }, {
        text: 'Charlotte-Concord-Gastonia, NC-SC',
        value: '16740'
    }, {
        text: 'Chicago-Naperville-Elgin, IL-IN-WI',
        value: '16980'
    }, {
        text: 'Cincinnati, OH-KY-IN',
        value: '17140'
    }, {
        text: 'Cleveland-Elyria, OH',
        value: '17460'
    }, {
        text: 'Columbus, OH',
        value: '18140'
    }, {
        text: 'Dallas-Fort Worth-Arlington, TX',
        value: '19100'
    }, {
        text: 'Denver-Aurora-Lakewood, CO',
        value: '19740'
    }, {
        text: 'Detroit-Warren-Dearborn, MI',
        value: '19820'
    }, {
        text: 'Grand Rapids-Wyoming, MI',
        value: '24340'
    }, {
        text: 'Hartford-West Hartford-East Hartford, CT',
        value: '25540'
    }, {
        text: 'Houston-The Woodlands-Sugar Land, TX',
        value: '26420'
    }, {
        text: 'Indianapolis-Carmel-Anderson, IN',
        value: '26900'
    }, {
        text: 'Jacksonville, FL',
        value: '27260'
    }, {
        text: 'Kansas City, MO-KS',
        value: '28140'
    }, {
        text: 'Las Vegas-Henderson-Paradise, NV',
        value: '29820'
    }, {
        text: 'Los Angeles-Long Beach-Anaheim, CA',
        value: '31080'
    }, {
        text: 'Louisville/Jefferson County, KY-IN',
        value: '31140'
    }, {
        text: 'Memphis, TN-MS-AR',
        value: '32820'
    }, {
        text: 'Miami-Fort Lauderdale-West Palm Beach, FL',
        value: '33100'
    }, {
        text: 'Milwaukee-Waukesha-West Allis, WI',
        value: '33340'
    }, {
        text: 'Minneapolis-St. Paul-Bloomington, MN-WI',
        value: '33460'
    }, {
        text: 'Nashville-Davidson–Murfreesboro–Franklin, TN',
        value: '34980'
    }, {
        text: 'New Orleans-Metairie, LA',
        value: '35380'
    }, {
        text: 'New York-Newark-Bridgeport, NY-NJ-PA',
        value: '35620'
    }, {
        text: 'Oklahoma City, OK',
        value: '36420'
    }, {
        text: 'Orlando-Kissimmee-Sanford, FL',
        value: '36740'
    }, {
        text: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD',
        value: '37980'
    }, {
        text: 'Phoenix-Mesa-Scottsdale, AZ',
        value: '38060'
    }, {
        text: 'Pittsburgh, PA',
        value: '38300'
    }, {
        text: 'Portland-Vancouver-Hillsboro, OR-WA',
        value: '38900'
    }, {
        text: 'Providence-Warwick, RI-MA',
        value: '39300'
    }, {
        text: 'Raleigh, NC',
        value: '39580'
    }, {
        text: 'Richmond, VA',
        value: '40060'
    }, {
        text: 'Riverside-San Bernardino-Ontario, CA',
        value: '40140'
    }, {
        text: 'Rochester, NY',
        value: '40380'
    }, {
        text: 'Sacramento–Roseville–Arden-Arcade, CA',
        value: '40900'
    }, {
        text: 'Salt Lake City, UT',
        value: '41620'
    }, {
        text: 'San Antonio-New Braunfels, TX',
        value: '41700'
    }, {
        text: 'San Diego-Carlsbad, CA',
        value: '41740'
    }, {
        text: 'San Francisco-Oakland-Hayward, CA',
        value: '41860'
    }, {
        text: 'San Jose-Sunnyvale-Santa Clara, CA',
        value: '41940'
    }, {
        text: 'Seattle-Tacoma-Bellevue, WA',
        value: '42660'
    }, {
        text: 'St. Louis, MO-IL',
        value: '41180'
    }, {
        text: 'Tampa-St. Petersburg-Clearwater, FL',
        value: '45300'
    }, {
        text: 'Tucson, AZ',
        value: '46060'
    }, {
        text: 'Tulsa, OK',
        value: '46140'
    }, {
        text: 'Urban Honolulu, HI',
        value: '46520'
    }, {
        text: 'Virginia Beach-Norfolk-Newport News, VA-NC',
        value: '47260'
    }, {
        text: 'Washington-Arlington-Alexandria, DC-VA-MD-WV',
        value: '47900'
    }],
    /*

     */
    symbol_sizes: [5, 10, 15, 20, 25]
};
