const AssettypeClient = require('assetmanagement-sdk').AssettypeClient;
const tokenUtil = require('../tokenUtil');

let assettypeClient;


/**
	 * For complete API specification of asset management service refer :
	 * https://developer.mindsphere.io/apis/advanced-assetmanagement/api-assetmanagement-api.html
	 */


function listAssetTypes(req, res) {
    /**
	 * @route /listAssetTypes
	 * @return List all asset types available for tenant.
	 * @description This method - listAssetTypes internally calls method listAssetTypes of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assettypes of asset management service.
	 *              
	 * @apiNote List all asset types
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    assettypeClient.listAssetTypes(
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

function getAssetType(req, res) {
    /**
	 * @route /getAssetType
	 * @return Get asset type information for provided Id.
	 * @description This method - getAssetType internally calls method getAssetType of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assettypes/{id} of asset management service.
	 *              
	 * @apiNote List all asset types
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetTypeId = req.query.assetTypeId;

    if (assetTypeId) {
        assettypeClient.getAssetType({
            'id': assetTypeId
        }).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters (assetTypeId and ifNoneMatch).";
        res.write(msg);
        res.send();
    }
}

function createAssetType(req, res) {
    /**
	 * @route /assettype/:tenantName
     * @param tenantName : Name of tenant for which you wish to create asset type.
     * @queryparam aspectName : Name of an aspect type which you wish to associate with asset type.
     * @queryparam  aspectId : Id of an aspect which you wish to associate with asset type.
	 * @return Created asset type.
	 * @description This method - createAssetType internally calls method saveAssetType of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /api/assetmanagement/v3/assettypes/{id} of asset management service.
	 *              
	 * @apiNote Create or Update an asset type.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let tenantName = req.params.tenantName;
    let aspectName = req.query.aspectName;
    let aspectId = req.query.aspectId;
    if (tenantName) {
        let assetTypeId = tenantName + '.' + Math.floor((Math.random() * 10000) + 1);
        let assetName = 'mds' + Math.floor((Math.random() * 10000) + 1);
        let assettype = {
            name: assetName,
            description: 'Demo App Asset Type',
            parentTypeId: 'core.basicdevice',
            instantiable: true,
            scope: 'private',
            variables: [
                {
                    name: 'Temperature',
                    dataType: 'STRING',
                    unit: 'C',
                    searchable: true,
                    length: 3
                }
            ],
            aspects: [
                {
                    name: aspectName,
                    aspectTypeId: aspectId
                }
            ]
        };

        assettypeClient.saveAssetType({
            'id': assetTypeId,
            'assettype': assettype
        }).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.write(err.message);
            res.send();
        });
    } else {
        let msg = "Please enter the required parameters tenantName";
        res.write(msg);
        res.send();
    }
}

function putAssetType(req, res) {
    /**
	 * @route /assettype/:tenantName
     * @param tenantName : Name of tenant for which you wish to create asset type.
     * @queryparam aspectName : Name of an aspect type which you wish to associate with asset type.
     * @queryparam  aspectId : Id of an aspect which you wish to associate with asset type.
	 * @return Created asset type.
	 * @description This method - createAssetType internally calls method saveAssetType of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /api/assetmanagement/v3/assettypes/{id} of asset management service.
	 *              
	 * @apiNote Create or Update an asset type.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
   
    let ifMatch = req.params.ifmatch;
    let assetTypeId = req.params.id;
    let assettype = req.body; 
  
        assettypeClient.saveAssetType({
            'id': assetTypeId,
            'assettype': assettype,
            'ifMatch':ifMatch
        }).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.write(err.message);
            res.send();
        });
    
}









async function updateAssetType(req, res) {
    /**
	 * @route /updateAssetType
     * @queryparam assetTypeId : The type’s id is a unique identifier. 
	 * @return Updated asset type.
	 * @description This method - updateAssetType internally calls method updateAssetType of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PATCH /api/assetmanagement/v3/assettypes/{id} of asset management service.
	 *              
	 * @apiNote Patch an asset type. Patching requires the inclusion of all existing variables and aspects. 
     *          Missing file assignments, variables and aspects will be deleted. Other fields may be omitted. 
     *          Conforms to RFC 7396 - JSON merge Patch.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetTypeId = req.query.assetTypeId;
    if (assetTypeId) {
        let assetTypeObject = await getAssetTypeByID(assetTypeId);
        let ifMatch = assetTypeObject['etag']; //Last known version to facilitate optimistic locking
        let assettype = {
            name: assetTypeObject['name'],
            description: 'Updated Demo App Asset Type',
            parentTypeId: assetTypeObject['parentTypeId'],
            instantiable: true,
            scope: 'private',
            variables: assetTypeObject['variables'],
            aspects: [
                {
                    name: 'ContactPoint',
                    aspectTypeId: 'core.contactpoint'
                }
            ]
        };
        try {
            let response = await assettypeClient.updateAssetType({
                'ifMatch': ifMatch,
                'id': assetTypeId,
                'assettype': assettype
            });
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (assetTypeId and ifMatch).";
        res.write(msg);
        res.send();
    }
}

async function deleteAssetType(req, res) {
    /**
	 * @route /deleteAssetType
     * @queryparam assetTypeId : The type’s id is a unique identifier. 
	 * @return "Successfully deleted asset type with id " + <assetTypeId> upon successful execution.
	 * @description This method - deleteAssetType internally calls method deleteAssetType of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : DELETE /api/assetmanagement/v3/assettypes/{id} of asset management service.
	 *              
	 * @apiNote Deletes an asset type. Deletion only possible when the type has no child-type and there is no asset that 
     *          instantiate it.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetTypeId = req.query.assetTypeId;

    if (assetTypeId) {
        let assetTypeObject = await getAssetTypeByID(assetTypeId);
        let ifMatch = assetTypeObject['etag']; //Last known version to facilitate optimistic locking
        try {
            let response = await assettypeClient.deleteAssetType({
                'ifMatch': ifMatch,
                'id': assetTypeId
            });
            let msg = "Successfully deleted asset type with id " + assetTypeId;
            res.write(msg);
            res.end();
        }
        catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (assetTypeId and ifMatch).";
        res.write(msg);
        res.send();
    }
}

async function addFileAssignment(req, res) {
    /**
	 * @route /addFileAssignment
     
     * @queryparam assetTypeId :The type’s id is a unique identifier. 
     * @queryparam  key : Key of an file which you wish to assign to asset type
	 * @return Asset type information updated with file assignment on successful execution.
	 * @description This method - addFileAssignment internally calls method saveAssetTypeFileAssignment of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : PUT /assettypes/{id}/fileAssignments/{key} of asset management service.
	 *              
	 * @apiNote Add a new file assignment to a given asset type. 
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetTypeId = req.query.assetTypeId;
    let key = req.query.key;
    let fileIdValue = req.query.fileId;


    let assignment = {
        fileId: fileIdValue
    };

    if (assetTypeId && key && fileIdValue) {
        let assetTypeObject = await getAssetTypeByID(assetTypeId);
        let ifMatch = assetTypeObject['etag'];
        try {
            let response = await assettypeClient.saveAssetTypeFileAssignment({
                'ifMatch': ifMatch,
                'id': assetTypeId,
                'key': key,
                'assignment': assignment
            });
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (assetTypeId, key and fileId).";
        res.write(msg);
        res.send();
    }
}

async function deleteFileAssignment(req, res) {
    /**
	 * @route /deleteFileAssignment
     
     * @queryparam assetTypeId :The type’s id is a unique identifier. 
     * @queryparam  key : Key of an file assignment which you wish to delete.
	 * @return Asset type information updated with file assignment on successful execution.
	 * @description This method - deleteFileAssignment internally calls method deleteAssetTypeFileAssignment of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : DELETE /assettypes/{id}/fileAssignments/{key} of asset management service.
	 *              
	 * @apiNote Deletes a file assignment from an asset type.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetTypeId = req.query.assetTypeId;
    let key = req.query.key;

    if (assetTypeId && key) {
        let assetTypeObject = await getAssetTypeByID(assetTypeId);
        let ifMatch = assetTypeObject['etag'];
        try {
            let response = await assettypeClient.deleteAssetTypeFileAssignment({
                'id': assetTypeId,
                'key': key,
                'ifMatch': ifMatch
            });
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (assetTypeId and key).";
        res.write(msg);
        res.send();
    }
}

async function getAssetTypesStartsWith(req, res) {
    /**
	 * @route /assettypestartswith
	 * @return List all asset types available for tenant with provided filter
     * @queryparam fieldType - specifiy a fields based on which asset types should be filtered.(example - name, tenandId)
     * @queryparam filterValue - specify the value for fieldType to look for while filtering asset types..
	 * @description This method - getAssetTypesStartsWith internally calls method getAssetTypesStartsWith of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assettypes of asset management service.
	 *              
	 * @apiNote List all asset types.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let filterValue = req.query.filterValue;
    if (fieldType && filterValue) {
        try {
            let response = await assettypeClient.getAssetTypesStartsWith(fieldType, filterValue);
            res.send(response);
        } catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (fieldType and filterValue).";
        res.write(msg);
        res.send();
    }
}

async function getAssetTypesEndsWith(req, res) {
    /**
	 * @route /assettypeendswith
	 * @return List all asset types available for tenant with provided filter
     * @queryparam fieldType - specifiy a fields based on which asset types should be filtered.(example - name, tenandId)
     * @queryparam filterValue - specify the value for fieldType to look for while filtering asset types..
	 * @description This method - getAssetTypesEndsWith internally calls method getAssetTypesEndsWith of AssettypeClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/assettypes of asset management service.
	 *              
	 * @apiNote List all asset types.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let filterValue = req.query.filterValue;
    if (fieldType && filterValue) {
        try {
            let response = await assettypeClient.getAssetTypesEndsWith(fieldType, filterValue);
            res.send(response);
        } catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (fieldType and filterValue).";
        res.write(msg);
        res.send();
    }
}

async function getAssetTypeByID(assetTypeId) {
    /** This is a helper function retrieve asset type by provided Id. */
    let files = await assettypeClient.getAssetType({ 'id': assetTypeId });
    let fileData = JSON.parse(files);
    return fileData;
}

module.exports = {
    putAssetType,
    listAssetTypes,
    createAssetType,
    updateAssetType,
    getAssetType,
    deleteAssetType,
    addFileAssignment,
    deleteFileAssignment,
    getAssetTypesStartsWith,
    getAssetTypesEndsWith
}