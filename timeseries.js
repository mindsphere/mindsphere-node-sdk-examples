const TimeseriesClient = require('timeseries-sdk').TimeSeriesClient;
const tokenUtil = require('./tokenUtil');

let timeseriesClient;

function getTimeseries(req, res) {
    timeseriesClient = new TimeseriesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let from = req.query.from;
    let to = req.query.to;
    let entityId = req.params.entityId;
    let propertyName = req.params.propertySetName;
    if (from && to) {
        timeseriesClient.getTimeseries({
            'entity': entityId,
            'propertysetname': propertyName,
            'from': from,
            'to': to
        }).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters (entityId, propertyName, from and to).";
        res.write(msg);
        res.send();
    }
}

function putTimeseries(req, res) {
    timeseriesClient = new TimeseriesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.params.entityId;
    let propertyName = req.params.propertySetName;
    let datetime = new Date();
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

    let from = req.query.from;
    let to = req.query.to;
    let entityId = req.params.entityId;
    let propertyName = req.params.propertySetName;
    timeseriesClient = new TimeseriesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));

    if (from && to) {
        timeseriesClient.deleteTimeseries({
            'entity': entityId,
            'propertysetname': propertyName,
            'from': from,
            'to': to
        }).then((response) => {
            res.write("Deleted timeseries between " + from + " and " + to);
            res.end(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    } else {
        console.log("Please enter the required parameters (from , to , entity and propertyName).");
        res.send("Please enter the required parameters (from , to , entity and propertyName).");
    }
}

module.exports = {
    getTimeseries,
    putTimeseries,
    deleteTimeseries
}