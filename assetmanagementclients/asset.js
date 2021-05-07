const AssetsClient = require('assetmanagement-sdk').AssetsClient;
const tokenUtil = require('../tokenUtil');
var logger = require('cf-nodejs-logging-support');
logger.setLoggingLevel("info");

let assetsClient;
/**
	 * For complete API specification of asset management service refer :
	 * https://developer.mindsphere.io/apis/advanced-assetmanagement/api-assetmanagement-api.html
	 */
function listAssets(req, res) {
    /**
	 * @route /assets
	 * @return List all assets available for tenant.
	 * @description This method - listAssets internally calls method listAssets of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assets of asset management service.
	 *              
	 * @apiNote List all assets available for the authenticated user.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assets invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    assetsClient.listAssets(
    ).then((response) => {
        logger.info(`Getting Response successfully for listassets :  ${JSON.stringify(response)}`);
        res.send(response);
    }).catch((err) => {
        logger.info("Getting error"+err);
        res.send(err);
    });
}

let msg = "Please enter the required parameters (assetId).";

async function getAsset(req, res) {
    /**
	 * @route /assetsget/:assetId
     * @param assetId : Unique identifier of an asset.
	 * @return Returns an asset for provided Id.
	 * @description This method - getAsset internally calls method getAsset of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assets/{id} of asset management service.
	 *              
	 * @apiNote Returns an asset.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assetsget/:assetId invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;
    logger.info("AssetId :+"+assetId);
    if (assetId) {
        let IfNoneMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.getAsset({
                'id': assetId,
                'ifNoneMatch': IfNoneMatch
            });
            logger.info(`Getting Response successfully for assetsget :  ${JSON.stringify(response)}`);
            res.send(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        };
    } else {
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

function getRootAsset(req, res) {
    /**
	 * @route /getRootAsset
     
	 * @return Returns root asset for tenant.
	 * @description This method - getRootAsset internally calls method getRootAsset of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assets/root of asset management service.
	 *              
	 * @apiNote Read the root asset of the user, from which the whole asset hierarchy can be rebuilt.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/getRootAsset invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    assetsClient.getRootAsset(
    ).then((response) => {
        logger.info(`Getting Response successfully for getRootAsset :  ${JSON.stringify(response)}`);
        res.send(response);
    }).catch((err) => {
        logger.info("Getting error"+err);
        res.send(err);
    });
}

function createAsset(req, res) {
    /**
	 * @route /assets/:tenantName
     * @param tenantName : Name of tenant for which you wish to create asset.
	 * @return Returns created asset.
	 * @description This method - createAsset internally calls method addAsset of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : POST /api/assetmanagement/v3/assets/{id} of asset management service.
	 *              
	 * @apiNote Creates a new asset with the provided content. Only instantiable types could be used.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assets/:tenantName invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let tenantName = req.params.tenantName;
    let assetType = req.query.assetTypeId;
    let parentId= req.query.parentid;
    if (tenantName) {
        let asset = {
            name: 'DemoAppAsset',
            parentId: parentId,
            t2Tenant: tenantName,
            typeId: assetType,
            description: 'Description added in Demo App'
        };

        assetsClient.addAsset({
            'asset': asset
        }).then((response) => {
            logger.info(`Getting Response successfully for addasset :  ${JSON.stringify(response)}`);
            res.send(response);
        }).catch((err) => {
            logger.info("Getting error"+err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters tenantName";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function updateAsset(req, res) {
    /**
	 * @route /updateAsset
     * @queryparam assetId : Unique identifier for an asset.
     * @param tenantName : Name of tenant for which you wish to update asset.
	 * @return Returns updated asset.
	 * @description This method - updateAsset internally calls method updateAsset of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PATCH /api/assetmanagement/v3/assets/{id} of asset management service.
	 *              
	 * @apiNote Patch an asset with the provided content. Only values can be modified, asset’s structure have to be modified 
     *          in asset’s type.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/updateAsset invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let tenantName = req.query.tenantName;
    logger.info("assetId :"+assetId + " tenantname: "+tenantName );
    if (assetId && tenantName) {
        let ifMatch = await getEtag(assetId);
        let asset = {
            name: 'DemoAppAsset',
            parentId: '078b1908bc9347678168760934465587',
            t2Tenant: tenantName,
            typeId: 'core.basicagent',
            description: 'Description updated in Demo App'
        };
        try {
            let response = await assetsClient.updateAsset({
                'ifMatch': ifMatch,
                'id': assetId,
                'asset': asset
            });
            logger.info(`Getting Response successfully for updateasset :  ${JSON.stringify(response)}`);
            res.send(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId and tenantName).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function replaceAsset(req, res) {
    /**
	 * @route /replaceAsset
     * @queryparam assetId : Unique identifier for an asset.
     * @param tenantName : Name of tenant for which you wish to replace asset.
	 * @return Returns replaced asset.
	 * @description This method - replaceAsset internally calls method replaceAsset of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /api/assetmanagement/v3/assets/{id} of asset management service.
	 *              
	 * @apiNote Update an asset
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/replaceAsset invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let tenantName = req.query.tenantName;
    logger.info("assetId :"+assetId + " tenantname: "+tenantName );
    if (assetId && tenantName) {
        let ifMatch = await getEtag(assetId);

        let asset = {
            name: 'DemoAppAsset',
            parentId: '078b1908bc9347678168760934465587',
            t2Tenant: tenantName,
            typeId: 'core.basicagent',
            description: 'Description replaced in Demo App'
        };
        try {
            let response = await assetsClient.replaceAsset({
                'ifMatch': ifMatch,
                'id': assetId,
                'asset': asset
            });
            logger.info(`Getting Response successfully for replaceAsset :  ${JSON.stringify(response)}`);
            res.send(response);
        } catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId and tenantName).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function deleteAsset(req, res) {
    /**
	 * @route /assetsdelete/:assetId
     * @param assetId : Unique identifier for an asset.
    
	 * @return asset deleted successfully with ID" + <assetId> on successful execution.
	 * @description This method - deleteAsset internally calls method deleteAsset of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : DELETE /api/assetmanagement/v3/assets/{id} of asset management service.
	 *              
	 * @apiNote Deletes an asset
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assetsdelete/:assetId invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;
    logger.info("assetID :"+assetId);

    if (assetId) {
        let ifMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.deleteAsset({
                'ifMatch': ifMatch,
                'id': assetId
            });
            res.write("asset deleted successfully with ID" + assetId);
            logger.info("asset deleted successfully with ID" + assetId);
            res.end(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function moveAsset(req, res) {
    /**
	 * @route /moveAsset
     * @queryparam assetId : Unique identifier for an asset.
     * @queryparam newParentId: New parent Id for an asset.
	 * @return Modified asset on successful execution.
	 * @description This method - moveAsset internally calls method moveAsset of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : POST /api/assetmanagement/v3/assets/{id}/move of asset management service.
	 *              
	 * @apiNote Moves an asset (and all it’s children) in the instance hierarchy.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/moveAsset invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let newParentId = req.query.newParentId;
    logger.info("assetID :"+assetId + " and newParentId :"+newParentId);
    if (assetId && newParentId) {
        let ifMatch = await getEtag(assetId);

        let move = {
            newParentId: newParentId
        };
        try {
            let response = await assetsClient.moveAsset({
                'ifMatch': ifMatch,
                'id': assetId,
                'moveParameters': move
            });
            logger.info(`Getting Response successfully for moveAsset :  ${JSON.stringify(response)}`);
            res.send(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId and newParentId).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function addAssetFileAssignment(req, res) {
    /**
	 * @route /assetfiles/:assetId
     * @param assetId : Unique identifier for an asset.
     * @queryparam fileId: fileId to be assigned to an asset
     * @queryparam key : Keyword for the file to be assigned to an asset or asset type.
	 * @return  asset after added file assignment on successful execution.
	 * @description This method - addAssetFileAssignment internally calls method saveAssetFileAssignment of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /api/assetmanagement/v3/assets/{id}/fileAssignments/{key} of asset management service.
	 *              
	 * @apiNote Save a file assignment to a given asset.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assetfiles/:assetId invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;
    let fileIdValue = req.query.fileId;
    let key = req.query.key;
    logger.info("assetID :"+assetId + " and fileIdValue :"+fileIdValue+ " key: "+key);
    if (assetId && fileIdValue && key) {
        let ifMatch = await getEtag(assetId);

        let assignment = {
            fileId: fileIdValue
        };

        try {
            let response = await assetsClient.saveAssetFileAssignment({
                'id': assetId,
                'key': key,
                'ifMatch': ifMatch,
                'assignment': assignment
            });
            logger.info(`Getting Response successfully for assetfiles :  ${JSON.stringify(response)}`);
            res.send(response);
        } catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        }
    } else {
        let msg = "Please enter the required parameters (assetId , fileId and key).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}


async function removeAssetFileAssignment(req, res) {
    /**
	 * @route /removeAssetFileAssignment
     * @queryparam assetId : Unique identifier for an asset.
     
     * @queryparam key : Keyword for the file to be removed from an asset.
	 * @return  asset after removing file assignment on successful execution.
	 * @description This method - removeAssetFileAssignment internally calls method deleteAssetFileAssigment of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : DELETE /api/assetmanagement/v3/assets/{id}/fileAssignments/{key} of asset management service.
	 *              
	 * @apiNote Deletes a file assignment from an asset.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/removeAssetFileAssignment invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let key = req.query.key;
    logger.info("assetID :"+assetId + " key: "+key);
    if (assetId) {
        let ifMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.deleteAssetFileAssigment({
                'id': assetId,
                'key': key,
                'ifMatch': ifMatch
            });
            logger.info(`Getting Response successfully for removeAssetFileAssignment :  ${JSON.stringify(response)}`);
            res.send(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId , fileId and key).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function deleteAssetConfirmation(req, res) {
    /**
	 * @route /assetsdeleteconfirmation/:assetId
     * @param assetId : Unique identifier for an asset.
     * @return  Deletes an asset and returns a boolean which confirms deletion.
	 * @description This method - deleteAssetConfirmation internally calls method deleteAssetWithConfirmation of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : DELETE /api/assetmanagement/v3/assets/{id} of asset management service.
	 *              
	 * @apiNote Deletes an asset and returns a boolean which confirms deletion. It internally checks existence of the asset after 
     *          we receive a confirmation from server. It retries 3 times for getting the confirmation from server. After deletion 
     *          only users with admin role can read it, but modification is not possible anymore. s not possible to delete an asset 
     *          if it has children.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assetsdeleteconfirmation/:assetId invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;
    logger.info("assetID :"+assetId );
    if (assetId) {
        let ifMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.deleteAssetWithConfirmation({
                'id': assetId,
                'ifMatch': ifMatch
            });
            logger.info(`Getting Response successfully for assetsdeleteconfirmation :  ${JSON.stringify(response)}`);
            res.send(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function getAssetsLike(req, res) {
    /**
	 * @route /assets
	 * @return List all assets available for tenant with provided filter.
     * @queryparam fieldType - specifiy a fields based on which assets should be filtered.(example - name,category, tenandId)
     * @queryparam firstFilterValue - specify the value for fieldType to look for while filtering assets.
     * @queryparam secondFilterValue - specify another value for fieldType to look for while filtering assets.
	 * @description This method - getAssetsLike internally calls method getAssetsLike of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assets of asset management service.
	 *              
	 * @apiNote List all assets available for the authenticated user.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assets invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let firstFilterValue = req.query.firstFilterValue;
    let secondFilterValue = req.query.secondFilterValue;
    logger.info("fieldType : "+fieldType +" firstFilterValue "+firstFilterValue +" secondFilterValue :"+secondFilterValue)
    if (fieldType && (firstFilterValue || secondFilterValue)) {
        try {
            let response = await assetsClient.getAssetsLike(fieldType, firstFilterValue, secondFilterValue);
            logger.info(`Getting Response successfully for getAssetsLike :  ${JSON.stringify(response)}`);
            res.send(response);
        } catch (err) {
            logger.info("Getting error"+err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (fieldType and filterValue).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function getAssetsOfType(req, res) {
    /**
	 * @route /assets
	 * @return List all assets available for tenant with provided filter.
     * @queryparam fieldType - specifiy a asset type name based on which assets should be filtered.
     
	 * @description This method - getAssetsLike internally calls method getAssetsLike of AssetsClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assets of asset management service.
	 *              
	 * @apiNote List all assets available for the authenticated user.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/assets invoked.");
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    logger.info("fieldType : "+fieldType)
    if (fieldType) {
        try {
            let response = await assetsClient.getAssetsOfType(fieldType);
            logger.info(`Getting Response successfully for getAssetsOfType :  ${JSON.stringify(response)}`);
            res.send(response);
        } catch (err) {
            logger.info("Getting error"+err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (fieldType).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function getEtag(assetId) {
    /** This is a helper function used to retrieve etag of an asset. */
    let files = await assetsClient.getAsset({ id: assetId });
    let fileData = JSON.parse(files);
    return fileData['etag'];
}

module.exports = {
    listAssets,
    getAsset,
    getRootAsset,
    createAsset,
    deleteAsset,
    updateAsset,
    moveAsset,
    addAssetFileAssignment,
    removeAssetFileAssignment,
    replaceAsset,
    deleteAssetConfirmation,
    getAssetsLike,
    getAssetsOfType
}