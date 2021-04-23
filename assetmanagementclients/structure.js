const StructureClient = require('assetmanagement-sdk').StructureClient;
const tokenUtil = require('../tokenUtil');

let structureClient;


/**
	 * For complete API specification of asset management service refer :
	 * https://developer.mindsphere.io/apis/advanced-assetmanagement/api-assetmanagement-api.html
	 */

     
function listAssetAspects(req, res) {
    /**
	 * @route /listAssetAspects
	 * @return List of all aspects for provided asset id. 
     * @queryparam assetId : Unique identifier of an asset.
	 * @description This method - listAssetAspects internally calls method listAssetAspects of StructureClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assets/{id}/aspects of asset management service.
	 *              
	 * @apiNote Get all static and dynamic aspects of a given asset.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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
    /**
	 * @route /listAssetVariables
	 * @return List of all variables for provided asset id. 
     * @queryparam assetId : Unique identifier of an asset.
	 * @description This method - listAssetVariables internally calls method listAssetVariables of StructureClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assets/{id}/variables of asset management service.
	 *              
	 * @apiNote Get all variables of a given asset including inherited ones.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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