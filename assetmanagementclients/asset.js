const AssetsClient = require('assetmanagement-sdk').AssetsClient;
const tokenUtil = require('../tokenUtil');

let assetsClient;

function listAssets(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    assetsClient.listAssets(
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

let msg = "Please enter the required parameters (assetId).";

async function getAsset(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;

    if (assetId) {
        let IfNoneMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.getAsset({
                'id': assetId,
                'ifNoneMatch': IfNoneMatch
            });
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        };
    } else {
        res.write(msg);
        res.send();
    }
}

function getRootAsset(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    assetsClient.getRootAsset(
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

function createAsset(req, res) {
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
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters tenantName";
        res.write(msg);
        res.send();
    }
}

async function updateAsset(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let tenantName = req.query.tenantName;
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
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId and tenantName).";
        res.write(msg);
        res.send();
    }
}

async function replaceAsset(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let tenantName = req.query.tenantName;
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
            res.send(response);
        } catch (err) {
            console.log(err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId and tenantName).";
        res.write(msg);
        res.send();
    }
}

async function deleteAsset(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;

    if (assetId) {
        let ifMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.deleteAsset({
                'ifMatch': ifMatch,
                'id': assetId
            });
            res.write("asset deleted successfully with ID" + assetId);
            res.end(response);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        };
    } else {
        res.write(msg);
        res.send();
    }
}

async function moveAsset(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let newParentId = req.query.newParentId;

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
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId and newParentId).";
        res.write(msg);
        res.send();
    }
}

async function addAssetFileAssignment(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;
    let fileIdValue = req.query.fileId;
    let key = req.query.key;
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
            res.send(response);
        } catch (err) {
            console.log(err);
            res.send(err);
        }
    } else {
        let msg = "Please enter the required parameters (assetId , fileId and key).";
        res.write(msg);
        res.send();
    }
}


async function removeAssetFileAssignment(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.query.assetId;
    let key = req.query.key;
    if (assetId) {
        let ifMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.deleteAssetFileAssigment({
                'id': assetId,
                'key': key,
                'ifMatch': ifMatch
            });
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId , fileId and key).";
        res.write(msg);
        res.send();
    }
}

async function deleteAssetConfirmation(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let assetId = req.params.assetId;
    if (assetId) {
        let ifMatch = await getEtag(assetId);
        try {
            let response = await assetsClient.deleteAssetWithConfirmation({
                'id': assetId,
                'ifMatch': ifMatch
            });
            res.send(response);
        }
        catch (err) {
            console.log(err);
            res.send(err);
        };
    } else {
        let msg = "Please enter the required parameters (assetId).";
        res.write(msg);
        res.send();
    }
}

async function getAssetsLike(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    let firstFilterValue = req.query.firstFilterValue;
    let secondFilterValue = req.query.secondFilterValue;
    if (fieldType && (firstFilterValue || secondFilterValue)) {
        try {
            let response = await assetsClient.getAssetsLike(fieldType, firstFilterValue, secondFilterValue);
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

async function getAssetsOfType(req, res) {
    assetsClient = new AssetsClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fieldType = req.query.fieldType;
    if (fieldType) {
        try {
            let response = await assetsClient.getAssetsOfType(fieldType);
            res.send(response);
        } catch (err) {
            console.log(err);
            res.write(err.message);
            res.send();
        };
    } else {
        let msg = "Please enter the required parameters (fieldType).";
        res.write(msg);
        res.send();
    }
}

async function getEtag(assetId) {
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