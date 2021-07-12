const AspectTypeClient = require('assetmanagement-sdk').AspecttypeClient;
const tokenUtil = require('../tokenUtil');
var logger = require('cf-nodejs-logging-support');
logger.setLoggingLevel("info");

let aspectTypeClient;

/**
	 * For complete API specification of asset management service refer :
	 * https://developer.mindsphere.io/apis/advanced-assetmanagement/api-assetmanagement-api.html
	 */

function listAspectTypes(req, res) {
    /**
	 * @route /listAspectTypes
	 * @return List all aspect types available for tenant.
	 * @description This method - listAspectTypes internally calls method listAspectTypes of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/aspecttypes of asset management service.
	 *              
	 * @apiNote List all aspect types.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/listAspectTypes invoked.");
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    aspectTypeClient.listAspectTypes(
    ).then((response) => {
        logger.info(`Getting Response successfully for listAspectTypes :  ${JSON.stringify(response)}`);
        res.send(response);
    }).catch((err) => {
        logger.info("Getting error"+err);
        res.send(err);
    });
}

async function getAspectType(req, res) {
    /**
	 * @route /getAspectType
     * @queryparam aspectTypeId - The type’s id is a unique identifier.
	 * @return Read an aspect type for provided aspectId.
	 * @description This method - getAspectType internally calls method getAspectType of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/aspecttypes/{id} of asset management service.
	 *              
	 * @apiNote Read an aspect type.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("/assets/getAspectType invoked.");
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let aspectTypeId = req.query.aspectTypeId;
    logger.info("aspectTypeId :"+aspectTypeId);
    if (aspectTypeId) {
        let assetTypeObject = await getAspectTypeByID(aspectTypeId);
        let ifNoneMatch = assetTypeObject['etag']; //ETag hash of previous request to allow caching
        try {
            let response = await aspectTypeClient.getAspectType({
                'id': aspectTypeId,
                'ifNoneMatch': ifNoneMatch
            });
            logger.info(`Getting Response successfully for getAspectType :  ${JSON.stringify(response)}`);
            res.send(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.send(err.message);
        };
    } else {
        let msg = "Please enter the required parameters (aspectTypeId and ifNoneMatch).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}


function putaspecttype(req, res) {
    /**
	 * @route /aspects/:tenantName
     * @param tenantName - Name of the tenant for which you want to create aspect type.
	 * @return Created aspect type information object.
	 * @description This method - createAspectType internally calls method saveAspectType of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /api/assetmanagement/v3/aspecttypes/{id} of asset management service.
	 *              
	 * @apiNote Create or Update an aspect type
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let aspectTypeId = req.params.id;
    let ifmatch = req.params.ifmatch;
    let aspecttype = req.body;   
     
    aspectTypeClient.saveAspectType({
        'id': aspectTypeId,
        'aspecttype': aspecttype,
        'ifMatch': ifmatch
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.write(err.message);
        res.send();
    });
}



function createAspectType(req, res) {
    /**
	 * @route /aspects/:tenantName
     * @param tenantName - Name of the tenant for which you want to create aspect type.
	 * @return Created aspect type information object.
	 * @description This method - createAspectType internally calls method saveAspectType of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /api/assetmanagement/v3/aspecttypes/{id} of asset management service.
	 *              
	 * @apiNote Create or Update an aspect type
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("assets/aspects/:tenantName invoked.");
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let tenantName = req.params.tenantName;
    logger.info("tenantName :"+tenantName);
    if (tenantName) {
        let aspectTypeId = tenantName + "." + Math.floor((Math.random() * 10000) + 1);
        let aspectName = 'mds' + Math.floor((Math.random() * 10000) + 1);
        let aspecttype = {
            name: aspectName,
            category: 'dynamic',
            scope: 'private',
            description: 'Aspect Type added by Demo App',
            variables: [
                {
                    name: 'Temperature',
                    dataType: 'STRING',
                    unit: 'C',
                    searchable: true,
                    length: 3,
                    qualityCode: true
                }
            ]
        };
        aspectTypeClient.saveAspectType({
            'id': aspectTypeId,
            'aspecttype': aspecttype,
            'ifMatch': 0
        }).then((response) => {
            logger.info(`Getting Response successfully for createAspectType :  ${JSON.stringify(response)}`);
            res.send(response);
        }).catch((err) => {
            logger.info("Getting error"+err);
            res.write(err.message);
            res.send();
        });
    } else {
        let msg = "Please enter the required parameters tenantName";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function updateAspectType(req, res) {
    /**
	 * @route /updateAspectType
     * @queryparam aspectTypeId - The type’s id is a unique identifier.
	 * @return The updated aspect type.
	 * @description This method - updateAspectType internally calls method updateAspectType of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PATCH /api/assetmanagement/v3/aspecttypes/{id} of asset management service.
	 *              
	 * @apiNote Patch an aspect type.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("assets/updateAspectType invoked.");
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let aspectTypeId = req.query.aspectTypeId;
    logger.info("aspectTypeId :"+aspectTypeId);
    if (aspectTypeId) {
        let assetTypeObject = await getAspectTypeByID(aspectTypeId);
        let ifMatch = assetTypeObject['etag'];

        let aspecttype = {
            name: assetTypeObject['name'],
            category: 'dynamic',
            scope: 'private',
            description: 'The engine of the Millenium Falcon',
            variables: assetTypeObject['variables']
        };

        try {
            let response = await aspectTypeClient.updateAspectType({
                'ifMatch': ifMatch,
                'id': aspectTypeId,
                'aspecttype': aspecttype
            });
            logger.info(`Getting Response successfully for updateAspectType :  ${JSON.stringify(response)}`);
            res.send(response);
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (aspectTypeId and ifMatch).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function deleteAspectType(req, res) {
     /**
	 * @route /deleteAspectType
     * @queryparam aspectTypeId - The type’s id is a unique identifier.
	 * @return "Successfully deleted aspect type with id " + <aspectTypeId> upon successful execution.
	 * @description This method - deleteAspectType internally calls method deleteAspectType of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : DELETE /api/assetmanagement/v3/aspecttypes/{id} of asset management service.
	 *              
	 * @apiNote Delete an aspect type. Aspect type can only be deleted if there is no asset type using it.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("assets/deleteAspectType invoked.");
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let aspectTypeId = req.query.aspectTypeId;
    logger.info("aspectTypeId :"+aspectTypeId);
    if (aspectTypeId) {
        let assetTypeObject = await getAspectTypeByID(aspectTypeId);
        let ifMatch = assetTypeObject['etag'];
        try {
            let response = await aspectTypeClient.deleteAspectType({
                'ifMatch': ifMatch,
                'id': aspectTypeId
            });
            let msg = "Successfully deleted aspect type with id " + aspectTypeId;
            logger.info("Successfully deleted aspect type with id " + aspectTypeId);
            res.write(msg);
            res.end();
        }
        catch (err) {
            logger.info("Getting error"+err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (aspectTypeId and ifMatch).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function getAspectTypesEqualTo(req, res) {
    /**
	 * @route /aspectsequals
     * @queryparam fieldType - specifiy a fields based on which aspect types should be filtered.(example - name,category, tenandId)
     * @queryparam filterValue - specify the value for fieldType to look for while filtering aspect types.
	 * @return List all aspect types available for tenant with provided filter.
	 * @description This method - getAspectTypesEqualTo internally calls method getAspectTypesEqualTo of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/aspecttypes of asset management service.
	 *              
	 * @apiNote List all aspect types.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("assets/aspectsequals invoked.");
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let filterValue = req.query.filterValue;
    logger.info("Request params are fieldType:"+fieldType +" filterValue :"+filterValue);
    if (fieldType && filterValue) {
        try {
            let response = await aspectTypeClient.getAspectTypesEqualTo(fieldType, filterValue);
            logger.info(`Getting Response successfully for aspectsequals :  ${JSON.stringify(response)}`);
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

async function getAspectTypesContains(req, res) {
    /**
	 * @route /aspectscontains
	 * @return List all aspect types available for tenant with provided filter.
     * @queryparam fieldType - specifiy a fields based on which aspect types should be filtered.(example - name,category, tenandId)
     * @queryparam filterValue - specify the value for fieldType to look for while filtering aspect types.
	 * @description This method - getAspectTypesContains internally calls method getAspectTypesContains of AspectTypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/aspecttypes of asset management service.
	 *              
	 * @apiNote List all aspect types.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    logger.info("assets/aspectscontains invoked.");
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let filterValue = req.query.filterValue;
    logger.info("Request params are fieldType:"+fieldType +" filterValue :"+filterValue);
    if (fieldType && filterValue) {
        try {
            let response = await aspectTypeClient.getAspectTypesContains(fieldType, filterValue);
            logger.info(`Getting Response successfully for aspectscontains :  ${JSON.stringify(response)}`);
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

async function getAspectTypeByID(assetTypeId) {
    /** This is a helper function retrieve aspect type by provided Id. */
    let files = await aspectTypeClient.getAspectType({ 'id': assetTypeId });
    let fileData = JSON.parse(files);
    return fileData;
}

module.exports = {
    putaspecttype,
    listAspectTypes,
    createAspectType,
    updateAspectType,
    getAspectType,
    deleteAspectType,
    getAspectTypesEqualTo,
    getAspectTypesContains
}