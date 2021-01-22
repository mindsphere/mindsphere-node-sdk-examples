const FilesClient = require('assetmanagement-sdk').FilesClient;
const tokenUtil = require('../tokenUtil');
const path = require('path');

let filesClient;

let msg = "Please enter the required parameters (fileId).";


function listFiles(req, res) {
    filesClient = new FilesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    filesClient.listFiles().then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

function downloadFile(req, res) {
    filesClient = new FilesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fileId = req.query.fileId;

    if (fileId) {
        filesClient.downloadFile({
            'fileId':fileId
        }).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    } else {
        res.write(msg);
        res.send();
    }

}

function uploadFile(req, res) {
    filesClient = new FilesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let sourceFilePath = path.join(__dirname, '../resources/text.txt');
    let fileName = 'mds' + Math.floor((Math.random() * 10000) + 1);
    let fileDesc = "File added in Demo app";

    filesClient.uploadFile({
        'file':sourceFilePath,
        'name':fileName,
        'scope':'PUBLIC',
        'description':fileDesc
    }).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

async function replaceFile(req, res) {
    filesClient = new FilesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fileId = req.query.fileId;

    if (fileId) {
        let fileName = 'mds' + Math.floor((Math.random() * 100000) + 1);
        let description = "Updated File Description in Demo app";
        let sourceFilePath = path.join(__dirname, '../resources/text.txt');
        let ifMatch = await getFileEtag(fileId);

        try {
            let response = await filesClient.replaceFile({
                'ifMatch':ifMatch, 
                'fileId':fileId, 
                'file':sourceFilePath, 
                'name':fileName, 
                'scope':'PUBLIC', 
                'description':description
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

async function getFile(req, res) {
    filesClient = new FilesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fileId = req.query.fileId;

    if (fileId) {
        let ifNoneMatch = await getFileEtag(fileId);
        try {
            let response = await filesClient.getFile({
                'fileId':fileId, 
                'ifNoneMatch':ifNoneMatch
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

async function deleteFile(req, res) {
    filesClient = new FilesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let fileId = req.query.fileId;

    if (fileId) {
        let ifMatch = await getFileEtag(fileId);
        try {
            let response = await filesClient.deleteFile({
                'ifMatch':ifMatch, 
                'fileId':fileId
            });
            res.write("File " + fileId + " successfully deleted.");
            res.send();
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

async function getFileEtag(fileId) {
    let files = await filesClient.getFile({'fileId':fileId});
    let fileData = JSON.parse(files);
    return fileData['etag'];
}

module.exports = {
    listFiles,
    downloadFile,
    uploadFile,
    replaceFile,
    getFile,
    deleteFile
}