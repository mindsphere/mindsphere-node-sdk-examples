const StructureClient = require('assetmanagement-sdk').StructureClient;
const tokenUtil = require('../tokenUtil');

let structureClient;

function listAssetAspects(req, res) {
    structureClient = new StructureClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;

    if (assetId) {
        structureClient.listAssetAspects(
            assetId, 1, 10
        ).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err.message);
            res.send(err.message);
        });
    } else {
        let msg = "Please enter the required parameters (assetId).";
        res.write(msg);
        res.send();
    }
}

function listAssetVariables(req, res) {
    structureClient = new StructureClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;

    if (assetId) {
        structureClient.listAssetVariables(
            assetId, 1, 10
        ).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err.message);
            res.send(err.message);
        });
    } else {
        let msg = "Please enter the required parameters (assetId).";
        res.write(msg);
        res.send();
    }
}

module.exports = {
    listAssetAspects,
    listAssetVariables
}