const TimeseriesClient = require('timeseries-sdk').TimeSeriesClient;
const tokenUtil = require('./tokenUtil');


let timeseriesClient;
var logger = require('cf-nodejs-logging-support');
logger.setLoggingLevel("info");

/**
	 * Time Series Service : Create, update, and query time series data with a precision of 1 millisecond.
*/
	
	/**
	 * For complete API specification of timeseries service refer :
	 * https://developer.mindsphere.io/apis/iot-iottimeseries/api-iottimeseries-api.html
	 */

function getTimeseries(req, res) {

    /**
	 * @route /timeseries/get/:entityId/:propertySetName
	 * @param entityId - unique identifier of the asset (entity)
	 * @param propertySetName - Name of the aspect (property set).
    *  @queryparam from - Beginning of the time range to be retrieved (exclusive).
    *  @queryparam to - End of the time range to be retrieved (inclusive).
	 * @return Timeseries data on successful execution.
	
	 * @description This method - getTimeseries internally calls method getTimeseries of
	 *              TimeseriesClient class. This class is available as dependency
	 *              in timeseries-sdk-<version-here>.tgz.
	 *              entityId and propertySetName are passed in request object as given by user(path variables) 
	 *              and hence incorrect/non-existent values will result in Error.
	 *              
	 * @apiEndpoint : GET /api/iottimeseries/v3/timeseries/{entityId}/{propertySetName} of timeseries service.
	 *              service. service.
	 * @apiNote Retrieve time series data for one combination of an asset (entity) and an(a) aspect (property set). 
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	 
	 */
    logger.info("/timeseries/get/:entityId/:propertySetName invoked")
    logger.info("/timeseries/get/:entityId/:propertySetName invoked");
    timeseriesClient = new TimeseriesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let from = req.query.from;
    let to = req.query.to;
    let entityId = req.params.entityId;
    let propertyName = req.params.propertySetName;
    logger.info(`TimeSeriesClient.getTimeseries()--> Input parameters - entity : ${entityId},
            propertysetname : ${propertyName},
            from : ${from},
            to : ${to}`);


    logger.info("Request params are entityId:"+entityId +" propertyName :"+propertyName +" and from :"+from +" and to:"+to); 
    if (from && to) {
        timeseriesClient.getTimeseries({
            'entity': entityId,
            'propertysetname': propertyName,
            'from': from,
            'to': to
        }).then((response) => {
            console.log(response);
            logger.info(`Getting Response successfully for gettimeseries : ${response}`);
            res.send(response);
        }).catch((err) => {
            logger.info(`Getting error for gettimeseries : ${err}`);
           // console.logger.info(err);
            logger.info(`Getting Response successfully for gettimeseries :  ${JSON.stringify(response)}`);
            res.send(response);
        }).catch((err) => {
            logger.info("Getting Error :"+err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters (entityId, propertyName, from and to).";
        logger.info(msg)
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

function putTimeseries(req, res) {
    /**
	 * @route /timeseries/create/:entityId/:propertySetName
	 * @param entityId - unique identifier of the asset (entity)
	 * @param propertySetName - Name of the aspect (property set).
	 
	 * @return "Put done for time " + datetime.toISOString()

	 * @description This method - createOrUpdateTimeseriesData internally calls method createOrUpdateTimeseries of
	 *              TimeseriesClient class. This class is available as dependency
	 *              in timeseries-sdk-<version-here>.tgz. 
	 
	 *  Creation of timeseries requires `timeseries` data structure to be passed in request body.
	 * @apiEndpoint : PUT /api/iottimeseries/v3/timeseries of timeseries service.
	 *                service.
	 * @apiNote Create or update time series data for mutiple unique asset-aspect (entity-property set) combinations.
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	
	 */
    logger.info("/timeseries/create/:entityId/:propertySetName invoked.");
    timeseriesClient = new TimeseriesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.params.entityId;
    let propertyName = req.params.propertySetName;
    let datetime = new Date();
    logger.info("Request params are entityId:"+entityId +" propertyName :"+propertyName);
    if (entityId && propertyName) {
        let timeseriesData = [
            {
                FRWheel: '5.0',
                FLWheel: '78.0',
                RLWheel: '60.0',
                RRWheel: '10.0',
                _time: datetime.toISOString()
            }
        ];
        timeseriesClient.putTimeseries({
            'entity': entityId,
            'propertysetname': propertyName,
            'timeseries': timeseriesData
        }).then((response) => {
            res.write("Put done for time " + datetime.toISOString());
            logger.info(`Getting Response successfully for puttimeseries :  ${JSON.stringify(response)}`);
            res.send(response);
        }).catch((err) => {
            logger.info("Getting Error :"+err);
            res.send(err);
        });
    }
    else {
        let msg = "Please enter the required parameters entity and propertyName";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

function putTimeseriesdata(req, res) {
    /**
	 * @route /timeseries/create/:entityId/:propertySetName
	 * @param entityId - unique identifier of the asset (entity)
	 * @param propertySetName - Name of the aspect (property set).
	 
	 * @return "Put done for time " + datetime.toISOString()

	 * @description This method - createOrUpdateTimeseriesData internally calls method createOrUpdateTimeseries of
	 *              TimeseriesClient class. This class is available as dependency
	 *              in timeseries-sdk-<version-here>.tgz. 
	 
	 *  Creation of timeseries requires `timeseries` data structure to be passed in request body.
	 * @apiEndpoint : PUT /api/iottimeseries/v3/timeseries of timeseries service.
	 *                service.
	 * @apiNote Create or update time series data for mutiple unique asset-aspect (entity-property set) combinations.
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	
	 */
    timeseriesClient = new TimeseriesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.params.entityid;
    let propertyName = req.params.prpertysetname;
    let timeseriesData = req.body;
    if (entityId && propertyName) {
        timeseriesClient.putTimeseries({
            'entity': entityId,
            'propertysetname': propertyName,
            'timeseries': timeseriesData
        }).then((response) => {
            let datetime = new Date();
            console.log("Put done for time " + datetime.toISOString());
            res.write("Put done for time " + datetime.toISOString());
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    }
    else {
        let msg = "Please enter the required parameters entity and propertyName";
        res.write(msg);
        res.send();
    }
}



function deleteTimeseries(req, res) {

    /**
	 * @route /timeseries/delete/:entityId/:propertySetName
	 * @param entityId - unique identifier of the asset (entity), (required)
	 * @param propertySetName - Name of the aspect (property set), (required)
	 * @queryparam from - beginning of the timerange to delete (exclusive), (required)
	 * @queryparam to - end of the timerange to delete (inclusive),   (required)
	 
	 * @return "Deleted timeseries between " + <from> + " and " + <to> on successful execution.
	 
	 * @description This method - deleteTimeseries internally calls method deleteTimeseries of
	 *              TimeseriesClient class. This class is available as dependency
	 *              in timeseries-sdk-<version-here>.tgz. 
	 *              entityId and propertySetName are passed in DeleteUpdatedTimeseriesRequest's object as given by user and 
     *              hence incorrect/non-existent values will result in Error.
	 * @apiEndpoint : DELETE /api/iottimeseries/v3/timeseries/{entityId}/{propertySetName} of timeseries service.
	 *              service.
	 * @apiNote Delete time series data for one combination of an asset (entity) and an(a) aspect (property set). 
	 * 			All property values within the given time range are deleted.
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	
	 */
    logger.info("/timeseries/delete/:entityId/:propertySetName invoked.");
    let from = req.query.from;
    let to = req.query.to;
    let entityId = req.params.entityId;
    let propertyName = req.params.propertySetName;
    timeseriesClient = new TimeseriesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    logger.info("Request params are entityId:"+entityId +" propertyName :"+propertyName);
    if (from && to) {
        timeseriesClient.deleteTimeseries({
            'entity': entityId,
            'propertysetname': propertyName,
            'from': from,
            'to': to
        }).then((response) => {
            res.write("Deleted timeseries between " + from + " and " + to);
            logger.info("Deleted timeseries between " + from + " and " + to);
            res.end(response);
        }).catch((err) => {
            logger.info("Getting Error :"+err);
            res.send(err);
        });
    } else {
        logger.info("Please enter the required parameters (from , to , entity and propertyName).");
        res.send("Please enter the required parameters (from , to , entity and propertyName).");
    }
}

module.exports = {
    putTimeseriesdata,
    getTimeseries,
    putTimeseries,
    deleteTimeseries
}