const AspectTypeClient = require('assetmanagement-sdk').AspecttypeClient;
const tokenUtil = require('../tokenUtil');

let aspectTypeClient;

function listAspectTypes(req, res) {
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    aspectTypeClient.listAspectTypes(
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

async function getAspectType(req, res) {
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let aspectTypeId = req.query.aspectTypeId;
    if (aspectTypeId) {
        let assetTypeObject = await getAspectTypeByID(aspectTypeId);
        let ifNoneMatch = assetTypeObject['etag'];
        try {
            let response = await aspectTypeClient.getAspectType({
                'id': aspectTypeId,
                'ifNoneMatch': ifNoneMatch
            });
            res.send(response);
        }
        catch (err) {
            console.log(err.message);
            res.send(err.message);
        };
    } else {
        let msg = "Please enter the required parameters (aspectTypeId and ifNoneMatch).";
        res.write(msg);
        res.send();
    }
}

function createAspectType(req, res) {
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let tenantName = req.params.tenantName;
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

async function updateAspectType(req, res) {
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let aspectTypeId = req.query.aspectTypeId;
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
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (aspectTypeId and ifMatch).";
        res.write(msg);
        res.send();
    }
}

async function deleteAspectType(req, res) {
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let aspectTypeId = req.query.aspectTypeId;

    if (aspectTypeId) {
        let assetTypeObject = await getAspectTypeByID(aspectTypeId);
        let ifMatch = assetTypeObject['etag'];
        try {
            let response = await aspectTypeClient.deleteAspectType({
                'ifMatch': ifMatch,
                'id': aspectTypeId
            });
            let msg = "Successfully deleted aspect type with id " + aspectTypeId;
            res.write(msg);
            res.end();
        }
        catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (aspectTypeId and ifMatch).";
        res.write(msg);
        res.send();
    }
}

async function getAspectTypesEqualTo(req, res) {
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let filterValue = req.query.filterValue;
    console.log(fieldType);
    console.log(fieldType);
    if (fieldType && filterValue) {
        try {
            let response = await aspectTypeClient.getAspectTypesEqualTo(fieldType, filterValue);
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

async function getAspectTypesContains(req, res) {
    aspectTypeClient = new AspectTypeClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let filterValue = req.query.filterValue;
    if (fieldType && filterValue) {
        try {
            let response = await aspectTypeClient.getAspectTypesContains(fieldType, filterValue);
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

async function getAspectTypeByID(assetTypeId) {
    let files = await aspectTypeClient.getAspectType({ 'id': assetTypeId });
    let fileData = JSON.parse(files);
    return fileData;
}

module.exports = {
    listAspectTypes,
    createAspectType,
    updateAspectType,
    getAspectType,
    deleteAspectType,
    getAspectTypesEqualTo,
    getAspectTypesContains
}