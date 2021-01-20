const FileServiceClient = require('iotfileservices-sdk').FileServiceClient;
const tokenUtil = require('./tokenUtil');

const path = require('path');
const fs = require('fs');

let fileServiceClient;

 function putFile (req, res) {
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let filePath = 'DemoApp' + Math.random();
    let entityId = req.params.entityId;
    let fileName = path.join(__dirname, '/resources/text.txt');
    let datetime = new Date();
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
          res.write(msg);
          res.send();
        }).catch((err) => {
          console.log(err);
          res.send(err);
      });
      } else {
          let msg = "Please enter the required parameters (entityId).";
      res.write(msg);
      res.send();
  }    
}

function getFile (req, res) {
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.params.entityId;
    let filePath = req.params.filePath;
    
    if (entityId && filePath) {
        fileServiceClient.getFile({
            'entityId':entityId,
            'filepath':filePath
        }).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters (entityId and filePath).";
        res.write(msg);
        res.send();
    }
}

 function searchFiles (req, res) {
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.params.entityId;

    if (entityId) {
         fileServiceClient.searchFiles({
            'entityId':entityId
         }).then((response) => {
            res.send(response);
        }).catch((err) => {
            console.log(err);
            res.send(err);
        });
    } else {
        let msg = "Please enter the required parameters (entityId).";
        res.write(msg);
        res.send();
    }
}

function deleteFile (req, res) {
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    let entityId = req.query.entityId;
    let filePath = req.query.filePath;
    
    if (entityId && filePath) {
        fileServiceClient.deleteFile({
            'entityId':entityId,
            'filepath':filePath
        }).then((response) => {
            res.write("File " + filePath + "successfully deleted for entity " + entityId);
            res.send();
        }).catch((err) => {
            console.log(err);
            res.write(err.message);
            res.send();
        });
    } else {
        let msg = "Please enter the required parameters (entityId and filePath).";
        res.write(msg);
        res.send();
    }
}

async function createMultiPartFile(req, res){
    fileServiceClient = new FileServiceClient(tokenUtil.getConfig(req.hostname), tokenUtil.getCredential(req));
    entityId = req.params.entityId;
    filePath = req.params.filePath;
    timestamp = '2018-09-10T05:03:42.363Z';
    description = "file description";
    type = "txt";
    let fileName = path.join(__dirname, './resources/partfile.txt');
    let fileContent =  fs.readFileSync(fileName);
    let fileExists = fs.existsSync(fileName);
    if(filePath && entityId && fileExists){
        try{
            await initiateFile(filePath, entityId, timestamp, description, type);
            await createMultiPart(filePath, entityId, fileContent, timestamp, description, type);
            await completefile(filePath, entityId, timestamp, description, type);
            res.write("Successfully uploaded file for the path: " + filePath);
            res.end();
        } catch(err){
            console.log(err);
            res.write(err.message);
            res.send();
        } 
    } else {
        let msg = "Please enter the required parameters (entityId and filePath).";
        res.write(msg);
        res.send();
    }
}

async function updateMultiPartFile(req, res){
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
    if(filePath && entityId && fileExists && ifMatch){
        try{
            await initiateFileForUpdate(filePath, entityId, timestamp, description, type, ifMatch);
            await updateMultiPart(filePath, entityId, fileContent, timestamp, description, type, ifMatch);
            await completefileForUpdate(filePath, entityId, timestamp, description, type, ifMatch);
            res.write("Successfully updated file for the path: " + filePath);
            res.end();
        } catch(err){
            console.log(err);
            res.write(err.message);
            res.send();
        } 
    } else {
        let msg = "Please enter the required parameters (entityId and filePath and ifMatch).";
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