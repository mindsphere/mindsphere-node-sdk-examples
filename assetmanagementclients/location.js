const LocationsClient = require('assetmanagement-sdk').LocationsClient;
const AssetsClient = require('assetmanagement-sdk').AssetsClient;
const tokenUtil = require('../tokenUtil');

let locationsClient;
let assetClient;


/**
	 * For complete API specification of asset management service refer :
	 * https://developer.mindsphere.io/apis/advanced-assetmanagement/api-assetmanagement-api.html
	 */

async function addAssetLocation(req, res) {
    /**
	 * @route /assetlocation/:assetId
     * @param assetId : Unique identifier of an asset.
    
	 * @return An asset with updated/created location on successful execution.
	 * @description This method - addAssetLocation internally calls method saveAssetLocation of LocationsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /api/assetmanagement/v3/assets/{id}/location of asset management service.
	 *              
	 * @apiNote Create or Update location assigned to given asset.
     *          If the given asset has own location, this endpoint will update that location.
     *          If the given asset has no location, this endpoint will create a new location and update the given asset.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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
    /**
	 * @route /deleteAssetLocation
     * @queryparam assetId : Unique identifier of an asset.
    
	 * @return An asset with deleted location information on successful execution.
	 * @description This method - deleteAssetLocation internally calls method deleteAssetLocation of LocationsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : DELETE /api/assetmanagement/v3/assets/{id}/location of asset management service.
	 *              
	 * @apiNote Delete location assigned to given asset.
     *          Only those locations can be deleted here which assigned to the given asset.
    
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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