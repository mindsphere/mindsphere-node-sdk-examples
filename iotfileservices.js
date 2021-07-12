const FileServiceClient = require('iotfileservices-sdk').FileServiceClient;
const tokenUtil = require('./tokenUtil');

const path = require('path');
const fs = require('fs');
var logger = require('cf-nodejs-logging-support');
logger.setLoggingLevel("info");

let fileServiceClient;

/**
	 * The IoT File API enables storing and retrieving files for asset (entity)
	 * instances.
	 */

	/**
	 * For complete API specification of IoT File service refer :
	 * https://developer.mindsphere.io/apis/iot-iotfile/api-iotfile-api.html
	 */

 function putFile (req, res) {
     /**
	 * @route /files/fileservicecreate/:entityId
	 * @param entityId - An Asset Id for which file needs to be created/stored.
	 * @note Non existent/Incorrect entityId will result in Error.
	
     * @return "File " + <filePath> + " added for entityId " + <entityId> + " at " + datetime.toISOString(); upon
                successful execution.
	
	 * @description This method - putFile internally calls method putFile of
	 *              FileServiceClient class. This class is available as dependency
	 *              in iotfileservices-sdk-<version-here>.tgz.
	 *              The required fields of PutFileRequest are : 
	 *              1)file string($binary) the file attached content 
	 *              2)entityId - unique identifier of the asset (entity) 
	 *              3)filepath - url path of the file along with filename
	 * @apiEndpoint : PUT /api/iotfile/v3/files/{entityId}/{filepath} of iot file
	 *                service. 
     * @apiNote Create or update a file for the specified asset (entity) and path,
	 *          with the provided content.
	 * @throws Error if an error occurs while attempting to invoke the
	 *         sdk call.
	
	 */
    logger.info("/files/fileservicecreate/:entityId invoked");
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let filePath = 'DemoApp' + Math.random();
    let entityId = req.params.entityId;
    let fileName = path.join(__dirname, '/resources/text.txt');
    let datetime = new Date();
    logger.info("EntityId is "+entityId);
      if (entityId && fs.existsSync(fileName)) {
        let fileContent =  fs.readFileSync(fileName,'utf8');
         fileServiceClient.putFile({
             'file': fileContent,
             'entityId':entityId,
             'filepath':filePath,
             'timestamp':datetime.toISOString(),
             'description':"Description from Demo app",
             'type':"txt"
            }).then((response) => {
            let msg = "File " + filePath + " added for entityId " + entityId + " at " + datetime.toISOString();
            logger.info(msg);
          res.write(msg);
          res.send();
        }).catch((err) => {
          logger.info("Getting error "+err);
          res.send(err);
      });
      } else {
          let msg = "Please enter the required parameters (entityId).";
          logger.info(msg);
      res.write(msg);
      res.send();
  }    
}


function getFile (req, res) {
    /**
	 * @route /files/fileservicegetfile/:entityId/:filePath
	 * @param entityId - An Asset Id for which file needs to be retrieved.
	 * @note Non existent/Incorrect entityId will result in Error.
	 * @param filePath - path of the file along with filename.
	
	 * @return Content of file.
	
	 * @description This method - getFile internally calls method getFile of
	 *              FileServiceClient class. This class is available as dependency
	 *              in iotfileservices-sdk-<version-here>.tgz.
	 * 
	 * @apiEndpoint : GET /api/iotfile/v3/files/{entityId}/{filepath} of iot file
	 *                service.
	 * @apiNote Read a file for the specified asset (entity) and path.
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	 
	 */
    logger.info("/files/fileservicegetfile/:entityId/:filePath invoked");
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.params.entityId;
    let filePath = req.params.filePath;

    logger.info("Request params are entityID:"+entityId +" filepath :"+filePath);
    
    if (entityId && filePath) {
        fileServiceClient.getFile({
            'entityId':entityId,
            'filepath':filePath
        }).then((response) => {
            logger.info(`Getting Response successfully for fileservicegetfile :  ${JSON.stringify(response)}`);
            res.send(response);
        }).catch((err) => {
            logger.info("Getting Error :"+err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters (entityId and filePath).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

 function searchFiles (req, res) {

    /**
	 * @route /files/fileservicesearch/:entityId
	 * @param entityId - An Asset Id for which file needs to be searched.
	 * @note Non existent/Incorrect entityId will result in Error.
	 
	 * @return List of Files.
	
	 * @description This method - searchFile internally calls method searchFiles of
	 *              FileServiceClient class. This class is available as dependency
	 *              in iotfileservices-sdk-<version-here>.tgz.
	 * @apiEndpoint : GET /api/iotfile/v3/files/{entityId} of iot file service.
	 *              service.
	 * @apiNote Search files for the specified asset (entity).
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	 
	 */
    logger.info("/files/fileservicesearch/:entityId invoked.");
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.params.entityId;
    logger.info("EntityId is :"+entityId);

    if (entityId) {
         fileServiceClient.searchFiles({
            'entityId':entityId
         }).then((response) => {
            logger.info(`Getting Response successfully for fileservicesearch :  ${JSON.stringify(response)}`); 
            res.send(response);
        }).catch((err) => {
            logger.info("Getting Error :"+err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters (entityId).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

function deleteFile (req, res) {

    /**
	 * @route /deleteFile
	 * @queryparam entityId - An Asset Id for which file needs to be deleted.
	 * @note Non existent/Incorrect entityId will result in Error.
	 * @queryparam filepath - path of the file along with filename.
	 * @returns "File " + <filePath> + "successfully deleted for entity " + <entityId> upon successful execution.
	 * @description This method - deleteFile internally calls method deleteFile of
	 *              FileServiceClient class. This class is available as dependency
	 *              in iotfileservices-sdk-<version-here>.tgz.
	 * @apiEndpoint : DELETE /api/iotfile/v3/files/{entityId}/{filepath} of iot file
	 *              service.
	 * @apiNote Delete a file for the specified asset (entity) and path.
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	
	 */
    logger.info("/files/deleteFile invoked.");
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.query.entityId;
    let filePath = req.query.filePath;
    logger.info("Request params are entityID:"+entityId +" filepath :"+filePath);
    
    if (entityId && filePath) {
        fileServiceClient.deleteFile({
            'entityId':entityId,
            'filepath':filePath
        }).then((response) => {
            res.write("File " + filePath + "successfully deleted for entity " + entityId);
            logger.info("File " + filePath + "successfully deleted for entity " + entityId);
            res.send();
        }).catch((err) => {
            logger.info("Getting Error :"+err);
            res.write(err.message);
            res.send();
        });
    } else {
        let msg = "Please enter the required parameters (entityId and filePath).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function createMultiPartFile(req, res){

    /**
	 * @route /fileservicecreatemultipartfile/:entityId/:filePath
	 * @param entityId - An Asset Id for which file needs to be stored.
	 * @note Non existent/Incorrect entityId will result in Error.
	 * @param filePath - url path of the file along with filename
	 
	 * @return "Successfully uploaded file for the path: " + <filePath> upon successful execution.
	 
	 * @description This method - createMultiPartFile internally calls methods
	 *              initiateMultiPartUpload, createMultiPartFile, completeMultiPartUpload  of FileServiceClient class. This class is available as
	 *              dependency in iotfileservices-sdk-<version-here>.tgz.
	 * @apiEndpoint : PUT /api/iotfile/v3/files/{entityId}/{filepath} of iot file
	 *                service.
	 * @apiNote Create or update a file for the specified asset (entity) and path,
	 *          with the provided content.
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	
	 */

    logger.info("/files/fileservicecreatemultipartfile/:entityId/:filePath invoked.");
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    entityId = req.params.entityId;
    filePath = req.params.filePath;
    timestamp = '2018-09-10T05:03:42.363Z';
    description = "file description";
    type = "txt";
    let fileName = path.join(__dirname, './resources/partfile.txt');
    let fileContent =  fs.readFileSync(fileName);
    let fileExists = fs.existsSync(fileName);
    logger.info("Request params are entityID:"+entityId +" filepath :"+filePath);
    if(filePath && entityId && fileExists){
        try{
            await initiateFile(filePath, entityId, timestamp, description, type);
            await createMultiPart(filePath, entityId, fileContent, timestamp, description, type);
            await completefile(filePath, entityId, timestamp, description, type);
            res.write("Successfully uploaded file for the path: " + filePath);
            logger.info("Successfully uploaded file for the path: " + filePath);
            res.end();
        } catch(err){
            logger.info("Getting Error :"+err);
            res.write(err.message);
            res.send();
        } 
    } else {
        let msg = "Please enter the required parameters (entityId and filePath).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function updateMultiPartFile(req, res){

    /**
	 * @route /fileserviceupdatemultipartfile/:entityId/:filePath/:ifMatch
	 * @param entityId - An Asset Id for which file needs to be stored.
	 * @note Non existent/Incorrect entityId will result in Error.
	 * @param filePath - url path of the file along with filename
	 * @param ifMatch : etag of the latest version for optimistic locking
	 * @return "Successfully updated file for the path: " + <filePath> upon successful execution.
	
	 * @description This method - updateMultiPartFile internally calls methods
	 *              initiateMultiPartUpload, createMultiPartFile, completeMultiPartUpload  of FileServiceClient class. 
     *              This class is available as dependency in iotfileservices-sdk-<version-here>.tgz.
	 * @apiEndpoint : PUT /api/iotfile/v3/files/{entityId}/{filepath} of iot file
	 *                service.
	 * @apiNote Create or update a file for the specified asset (entity) and path,
	 *          with the provided content.
	 * @throws Error if an error occurs while attempting to invoke the
	 *                             sdk call.
	 
	 */
    logger.info("/files/fileserviceupdatemultipartfile/:entityId/:filePath/:ifMatch invoked.");
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    entityId = req.params.entityId;
    filePath = req.params.filePath;
    ifMatch = req.params.ifMatch;
    timestamp = '2018-09-10T05:03:42.363Z';
    description = "file description";
    type = "txt";
    let fileName = path.join(__dirname, './resources/partfile.txt');
    let fileContent =  fs.readFileSync(fileName);
    let fileExists = fs.existsSync(fileName);
    logger.info("Request params are entityID:"+entityId +" filepath :"+filePath +" Ifmatch" +ifMatch);
    if(filePath && entityId && fileExists && ifMatch){
        try{
            await initiateFileForUpdate(filePath, entityId, timestamp, description, type, ifMatch);
            await updateMultiPart(filePath, entityId, fileContent, timestamp, description, type, ifMatch);
            await completefileForUpdate(filePath, entityId, timestamp, description, type, ifMatch);
            res.write("Successfully updated file for the path: " + filePath);
            logger.info("Successfully updated file for the path: " + filePath);
            res.end();
        } catch(err){
            logger.info("Getting Error :"+err);
            res.write(err.message);
            res.send();
        } 
    } else {
        let msg = "Please enter the required parameters (entityId and filePath and ifMatch).";
        logger.info(msg);
        res.write(msg);
        res.send();
    }
}

async function initiateFile(filePath, entityId, timestamp, description, type){
    await fileServiceClient.initiateMultiPartUpload(
        {
          entityId: entityId,
          filepath: filePath,
          timestamp: timestamp,
          description: description,
          type: type
        }
    );
}

async function createMultiPart(filePath, entityId, fileContent, timestamp, description, type){
    await fileServiceClient.createMultiPartFile(
        {
            file: fileContent,
            entityId: entityId,
            filepath: filePath,
            part: 1,
            timestamp: timestamp,
            description: description,
            type: type
        }
    );
}

async function completefile(filePath, entityId, timestamp, description, type){
    await fileServiceClient.completeMultiPartUpload(
    {
        entityId: entityId,
        filepath: filePath,
        timestamp: timestamp,
        description: description,
        type: type
    });
}

async function initiateFileForUpdate(filePath, entityId, timestamp, description, type, ifMatch){
    await fileServiceClient.initiateMultiPartUpload(
        {
          entityId: entityId,
          filepath: filePath,
          timestamp: timestamp,
          description: description,
          type: type,
          ifMatch: ifMatch
        }
    );
}

async function updateMultiPart(filePath, entityId, fileContent, timestamp, description, type, ifMatch){
    await fileServiceClient.updateMultiPartFile(
        {
          file: fileContent,
          entityId: entityId,
          filepath: filePath,
          part: 1,
          timestamp: timestamp,
          description: description,
          type: type,
          ifMatch: ifMatch
        }
      );
}

async function completefileForUpdate(filePath, entityId, timestamp, description, type, ifMatch){
    await fileServiceClient.completeMultiPartUpload(
        {
          entityId: entityId,
          filepath: filePath,
          timestamp: timestamp,
          description: description,
          type: type,
          ifMatch: ifMatch
        }
      );
}

module.exports = {
    putFile,
    getFile,
    searchFiles,
    deleteFile,
    createMultiPartFile,
    updateMultiPartFile
}