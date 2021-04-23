const TimeseriesAggregateClient = require('tsaggregates-sdk').AggregatesClient;
const tokenUtil = require('./tokenUtil');

let timeseriesAggregateClient;

/**
	 * The aggregate service enables querying aggregated time series data for performance assets based on pre-calculated aggregate values.
	 */
	
	/**
	 * For complete API specification of timeseries aggregate service refer :
	 * https://developer.mindsphere.io/apis/iot-iottsaggregates/api-iottsaggregates-api.html
	 */

     
module.exports = {
    getTimeseriesAggregate : function(req, res){

    /**
	 * @route /timeseriesaggregate/get/:entityId/:propertyName
	 * @requestparam entityId - An Asset Id for which aggregates are to be retrieved
	 * @requestparam propertySetName - property setname for which aggregates will be be retrieved.
	 * @queryparam from - Point in time from which aggregates are to be retrieved.
	 * @queryparam to - 	Point in time to which aggregates are to be retrieved.
     * @queryparam intervalValue - Interval duration for the aggregates in intervalUnits.
     * @queryparam intervalUnit  - 	Interval duration unit for the aggregates.
     * @queryparam select - Properties and fields to select. By default all properties and the available fields are returned. 
     *                      Providing a property name selects all fields of a property. 
	 * @note Non existent/Incorrect entityId and propertySetName will result in Error. Also all request parameters are mandatory.
     *       All query parameters except `select` are mandatory.
	 
	 * @return Array of aggregated time series
	 
     * @description This method - getTimeseriesAggregate internally calls method getAggregateTimeseries of 
                    TimeseriesAggregateClient class.
     * 				This class is available as dependency in tsaggregates-sdk-<version-here>.tgz. 
     *  How aggregates are returned?
	 * 	The parameters from, to, intervalUnit, intervalValue, and count are used to determine the time range and interval length 
     *  to return aggregates for. 
	 *  If intervalUnit and intervalValue are not provided, the largest available interval length fitting into the used time range
     *  is chosen.
	 *  If count is not provided, but the other parameters are, count will be derived based on the time range divided by the 
     *  intervalUnit and intervalValue.
	 *  In case parameters from or to are provided but do not coincide with the pre-calculated interval boundaries of the used 
     *  interval, from and to are shifted such that the overall time range contains the provided one and time range boundaries 
     *  coincide with interval boundaries.
	 *  If from, to and count are provided, intervalUnit, intervalValue is determined based on the time range divided by count.
	 * 
	 * 
	 * @apiEndpoint : GET /api/iottsaggregates/v3/aggregates/{entity}/{propertyset} of aggregate service.
	 *              service.
	 * @apiNote Returns a list of aggregates for a given asset and aspect. The time range of the aggregates can be defined by a 
	 * 			combination of parameters; such as from, to, intervalUnit, intervalValue and count. Time range can be specified anywhere 
	 * 			in past or future for which timeseries data is present. In the case no time series data was available for an aggregation 
	 * 			interval, no aggregate will be returned. Pre-computed aggregates are aligned with the tenant's time zone.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 
	 */

        timeseriesAggregateClient = new TimeseriesAggregateClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
        let entityId = req.params.entityId;
        let propertyName = req.params.propertyName;
        let from = req.query.from;
        let to = req.query.to;
        let intervalValue = req.query.intervalValue;
        let intervalUnit = req.query.intervalUnit;
        let select = req.query.select;
        if (from && to && entityId && propertyName && intervalValue && intervalUnit) {
            timeseriesAggregateClient.getAggregateTimeseries({
                'entity':entityId,
                'propertyset':propertyName,
                'from':from,
                'to':to,
                'intervalValue':intervalValue,
                'intervalUnit':intervalUnit,
                'select':select
            }).then((response) => {
                res.send(response);
            }).catch((err) => {
                console.log(err);
                res.send(err);
            });
        } else {
            let msg = "Please enter the required parameters (from , to , entityId , propertyName, intervalValue, intervalUnit and select).";
            res.write(msg);
            res.send();
        }    
    }
}