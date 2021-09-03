const tokenUtil = require('./tokenUtil');
const fs = require('fs');
const readline = require('readline');

var logger = require('cf-nodejs-logging-support');
logger.setLoggingLevel("info");

const meBrokerHelper;

const mbBaseUrl = "api/messagebroker/v4/";

function subscribetoMsgBroker(postBody, backendAppName, version, topicName, token){
    logger.info("Subcription call to msgBroker...");
    const response = meBrokerHelper.createsubscription(postBody, backendAppName, version, topicName, token);
    logger.info("Subscription done successfully to messagebroker " + response);
    return response;
}

function unsubscribetoMsgBroker(backendAppName, version, topicName, token){
    logger.info("Subcription call to msgBroker...");
    logger.info("delete subcription call to msgBroker...");
    meBrokerHelper.unsubscribeMsgBroker(bakcnedappName, version, topicName, token);
    logger.info("unsubscribed successfully.");
}

function storeNotificationDatatofile(body){
    logger.info("Writing data to file....");
    try {
        
        fs.access("msgBrokerResponse.json", function(exists) {
            if (!exists) {
                if (fs.read('msgBrokerResponse.json').length !== 0) {
                    body = "," + body;
                }
            }
            else {    
                fs.writeFile("msgBrokerResponse.json", "", function(err){
                    logger.info("Couldn't create new file");
                });
            }
        });
        fs.appendFile("msgBrokerResponse.json", body, function(err) {
            if(err) {
                return console.log(err);
            }
            logger.info("Successfully wrote to the file.");
            return "Successfully wrote to the file.";
        });

    } catch (e) {
        logger.info("An error occurred while writing file. " + e.message());
        return e.message();
    }
}

function readNotificationData(){
    logger.info("Reading data from file....");
    var response = "";
    try {
        const file = readline.createInterface({
            input: fs.createReadStream('msgBrokerResponse.json'),
            output: process.stdout,
            terminal: false
        });
        file.on('line', line => {
            response = response + line;
        });
    } catch (e) {
        logger.info("An error occurred while reading file. " + e.getMessage());
        throw new MindsphereServiceException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR, e);
    }
    return response;
}

function deleteContent(){
    logger.info("Reopen file to delete content");
    try {
        fs.unlink("msgBrokerResponse.json", function(err){
            throw(err);
        });
        log.info("Content deleted successfully");
        return "Content deleted successfully";
    } catch (e) {
        log.info("An error occurred while reopen file. " + e.message());
        return (e.message());
    }
}

module.exports = {
    subscribetoMsgBroker,
    unsubscribetoMsgBroker,
    storeNotificationDatatofile,
    readNotificationData,
    deleteContent
}