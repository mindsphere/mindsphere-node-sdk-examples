const TimeseriesAggregateClient = require('tsaggregates-sdk').AggregatesClient;
const tokenUtil = require('./tokenUtil');

let timeseriesAggregateClient;

module.exports = {
    getTimeseriesAggregate : function(req, res){
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