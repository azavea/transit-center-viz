TCVIZ.Carto.SQL = function (element) {
    // properties
    this.element = element;

    this.geojsonClient = new cartodb.SQL({
        user: 'ridership',
        format: 'geojson',
        api_key: '73537cf8a5e88a4f170a0eda73deab782accaee2'
    });

    switch (this.element) {

    /*
        * for this chart, we may want to adjust query to bring in
        * all ntd vars for a given MSA, since the dataset is small
        * that way we would only need to execute another sql query
        * when the user updated the MSA
        */
    case 'timeSeries':
        this.queryElements = {
            table: 'msa_yearly_transit_vars',
            vars: ['name', 'the_geom', 'year', 'upt_total']
        };
        break;

    case 'msaMap':
        this.queryElements = {
            table: 'msa_change_transit_vars',
            vars: ['the_geom', 'name']
        };
        break;

        // this table is not on Carto yet
    case 'censusTracts':
        this.queryElements = {
            table: 'tract_demographic_vars',
            vars: ['the_geom', 'geoid']
        };
        break;

    case 'states':
        this.queryElements = {
            table: 'states_with_gas_prices',
            vars: ['the_geom', 'name']
        };
        break;

    default:
        this.queryElements = null;
    }

    // methods
    this.getSql = function(valueField, msa) {
        var fields = this.queryElements.vars.concat(valueField);

        var sql = 'SELECT ' + fields.join() + ' FROM ' + this.queryElements.table;

        if (msa !== undefined) {
            return sql + ' WHERE name=\'' + msa + '\'';
        } else {
            return sql;
        }
    };

    this.getJson = function(valueField, msa) {
        var sql = this.getSql(valueField, msa)
        return this.geojsonClient.execute(sql);
    };
};
