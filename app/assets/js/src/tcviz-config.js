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
    defaultMSA: 'NNNNN',
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
    circle_sizes: [10, 12.5, 15, 17.5, 20, 22.5, 25, 27.5, 30, 32.5, 35],
    symbol_style: {
        upt_total: {
            colors: ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
            colorBreaks: [-0.25,-0.1,0.0,0.5,1]
        },
        upt_bus: {
            colors: ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
            colorBreaks: [-0.25,-0.1,0.0,0.5,1]
        },
        upt_rail: {
            colors: ['#f3e79b', '#fab27f', '#eb7f86', '#b95e9a', '#5c53a5'],
            colorBreaks: [-0.25,-0.1,0.0,0.5,1]
        },
        avg_fare: {
            colors: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'],
            colorBreaks: [-0.25,-0.1,0.0,0.1,0.5]
        },
        farebox_recovery: {
            colors: ['#d7191c', '#fdae61', '#ffffbf', '#a6d96a', '#1a9641'],
            colorBreaks: [-0.05,-0.025,0.0,0.025,0.05]
        },
        total_expenses: {
            colors: ['#dfe8b8', '#f4dd9e', '#ffab5a', '#ff6161', '#ff1717'],
            colorBreaks: [0,0.25,0.5,0.75,1]
        },
        average_speed: {
            colors: ['#008837', '#a6dba0', '#f7f7f7', '#c2a5cf', '#7b3294'],
            colorBreaks: [-0.5,-0.25,0.0,0.5,1]
        },
        revenue_miles: {
            colors: ['#009b9e', '#7cc5c6', '#f1f1f1', '#dda9cd', '#c75dab'],
            colorBreaks: [-0.025,0,0.25,0.5,.75]
        },
        revenue_hours: {
            colors: ['#009b9e', '#f3e0f7', '#d1afe8', '#9f82ce', '#63589f'],
            colorBreaks: [-0.025,0.1,0.5,0.75,1]
        },
        //   TODO: missing cartography for: 
        //      gas (change in gas prices)
        gas: {
            colors: [],
            colorBreaks: []
        }
    },

    polygon_style: {
        forgn_c: {
            colors: ['#c75dab', '#dda9cd', '#F1F1F1', '#7cc5c6', '#009b9e'],
            colorBreaks: [-5,-3,0,3,10]
        },
        drove_c: {
            colors: ['#7b3294', '#c2a5cf', '#f7f7f7', '#a6dba0', '#008837'],
            colorBreaks: [-10,-5,0,5,10]
        },
        carpl_c: {
            colors: ['#7b3294', '#c2a5cf', '#f7f7f7', '#a6dba0', '#008837'],
            colorBreaks: [-5,-2,0,2,5]
        },
        trnst_c: {
            colors: ['#7b3294', '#c2a5cf', '#f7f7f7', '#a6dba0', '#008837'],
            colorBreaks: [-5,-2,0,2,5]
        },
        emp_c: {
            colors: ['#a16928', '#caa873', '#edeac2', '#98b7b2', '#2887a1'],
            colorBreaks: [-5,-2,0,2,5]
        },

        inc_c: {
            colors: ['#d01c8b', '#f1b6da', '#f7f7f7', '#b8e186', '#4d9221'],
            colorBreaks: [10000,-5000,0,5000,10000]
        },
        //   TODO: missing cartography for: 
        //      pp_dns_ (population density)
        //      veh_c (households no vehicle)
        //      ppov_c (households below 200% of poverty line)
        //      fpov_c (undefined ?)
        //      black_c (Pct Black)
        //      asian_c (Pct Asian)
        //      hisp_c (Pct Hispanic)
        //      white_c (Pct white)
        pp_dns_: {
            colors: [],
            colorBreaks: []
        },
        veh_c: {
            colors: [],
            colorBreaks: []
        },
        ppov_c: {
            colors: [],
            colorBreaks: []
        },
        fpov_c: {
            colors: [],
            colorBreaks: []
        },
        black_c: {
            colors: [],
            colorBreaks: []
        },
        asian_c: {
            colors: [],
            colorBreaks: []
        },
        hisp_c: {
            colors: [],
            colorBreaks: []
        },
        white_c: {
            colors: [],
            colorBreaks: []
        }
    }
    
};
