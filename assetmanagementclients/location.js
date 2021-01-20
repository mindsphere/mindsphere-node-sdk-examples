const LocationsClient = require('assetmanagement-sdk').LocationsClient;
const AssetsClient = require('assetmanagement-sdk').AssetsClient;
const tokenUtil = require('../tokenUtil');

let locationsClient;
let assetClient;

async function addAssetLocation(req, res) {
    locationsClient = new LocationsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;
    let location = {
        country: 'Austria',
        region: 'dd 2',
        locality: 'Innsbruck',
        longitude: '53.5125546',
        latitude: '9.9763411'
    };

    if (assetId) {
        let ifMatch = await getEtag(assetId,req);
        try {
            let response = await locationsClient.saveAssetLocation({
                'ifMatch': ifMatch,
                'id': assetId,
                'location': location
            });
            res.send(response);
        }
        catch (err) {
            console.log(err.message);
            res.send(err.message);
        };
    } else {
        let msg = "Please enter the required parameters (assetId).";
        res.write(msg);
        res.send();
    }
}

async function deleteAssetLocation(req, res) {
    locationsClient = new LocationsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    assetClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;

    if (assetId) {
        let ifMatch = await getEtag(assetId);

        try {
            let response = await locationsClient.deleteAssetLocation({
                'ifMatch': ifMatch,
                'id': assetId
            });
            res.send(response);
        }
        catch (err) {
            console.log(err.message);
            res.send(err.message);
        };
    } else {
        let msg = "Please enter the required parameters (assetId).";
        res.write(msg);
        res.send();
    }
}

async function getEtag(id,req) {
    assetClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetData = await assetClient.getAsset({ 'id': id });
    let assetObject = JSON.parse(assetData);
    return assetObject['etag'];
}

module.exports = {
    addAssetLocation,
    deleteAssetLocation
}