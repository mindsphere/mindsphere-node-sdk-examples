const FilesClient = require('assetmanagement-sdk').FilesClient;
const tokenUtil = require('../tokenUtil');
const path = require('path');

let filesClient;

let msg = "Please enter the required parameters (fileId).";

/**
	 * For complete API specification of asset management service refer :
	 * https://developer.mindsphere.io/apis/advanced-assetmanagement/api-assetmanagement-api.html
	 */

function listFiles(req, res) {
    /**
	 * @route /listFiles
	 * @return Returns metadata of uploaded files.
	 * @description This method - listFiles internally calls method listFiles of FilesClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/files of asset management service.
	 *              
	 * @apiNote Returns all visible file metadata for the tenant. Will NOT return the files.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
    filesClient = new FilesClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    filesClient.listFiles().then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}

function downloadFile(req, res) {
    /**
	 * @route /downloadFile
	 * @return Returns content of file with provided Id.
     * @queryparam fileId : Unique identifier of a file to be retrieved.
	 * @description This method - downloadFile internally calls method downloadFile of FilesClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/files/{id}/file of asset management service.
	 *              
	 * @apiNote Returns a file by its id
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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
    /**
	 * @route /assetfiles
	 * @return Details of uploaded file upon successful execution.
    
	 * @description This method - uploadFile internally calls method uploadFile of FilesClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : POST /api/assetmanagement/v3/files of asset management service.
	 *              
	 * @apiNote Upload files to be used in Asset Management.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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
    /**
	 * @route /replaceFile
	 * @return Details of uploaded file upon successful execution.
     * @queryparam fileId : Unique identifier of a file to be replaced.
	 * @description This method - replaceFile internally calls method replaceFile of FilesClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *             
	 * @apiEndpoint : PUT /api/assetmanagement/v3/files/{file_id} of asset management service.
	 *              
	 * @apiNote Update a previously uploaded file.
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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
     /**
	 * @route /getAssetFile
     * @queryparam fileId - Unique identifier of the file.
	 * @return Returns metadata of file with provided Id.
     * @queryparam fileId : Unique identifier of a file to be retrieved.
	 * @description This method - getFile internally calls method getFile of FilesClient class.
	 * 				This class is available as dependency in assetmanagement-sdk-<version-here>.tgz
	 *              
	 * @apiEndpoint : GET /api/assetmanagement/v3/files/{id} of asset management service.
	 *              
	 * @apiNote Returns a file’s metadata by its id
	 * @throws Error if an error occurs while attempting to invoke the sdk call.
	 */
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