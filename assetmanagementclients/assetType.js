const AssettypeClient = require('assetmanagement-sdk').AssettypeClient;
const tokenUtil = require('../tokenUtil');

let assettypeClient;

function listAssetTypes(req, res) {
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

async function updateAssetType(req, res) {
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetTypeId = req.query.assetTypeId;
    if (assetTypeId) {
        let assetTypeObject = await getAssetTypeByID(assetTypeId);
        let ifMatch = assetTypeObject['etag'];
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
    assettypeClient = new AssettypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetTypeId = req.query.assetTypeId;

    if (assetTypeId) {
        let assetTypeObject = await getAssetTypeByID(assetTypeId);
        let ifMatch = assetTypeObject['etag'];
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
    let files = await assettypeClient.getAssetType({ 'id': assetTypeId });
    let fileData = JSON.parse(files);
    return fileData;
}

module.exports = {
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