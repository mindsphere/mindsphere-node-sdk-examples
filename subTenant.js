const ClientConfig = require('mindsphere-sdk-node-core').ClientConfig;
const assert = require('assert');
const AssetsClient = require('assetmanagement-sdk').AssetsClient;
const TokenService = require('mindsphere-sdk-node-core').TechnicalTokenService;
let MindsphereCredentials = require('mindsphere-sdk-node-core').MindsphereCredentials;

let proxyValue =  process.env.HTTP_PROXY  ;
let creds;
let assetsClient;

function getClient(req) {
    if (proxyValue) {
        config = new ClientConfig({ proxy: proxyValue, timeout: 1000000 });
    } else {
        config = new ClientConfig({ timeout: 1000000 });
    } 
        let tokenType = req.params.tokentype;
        
        if(tokenType == 'ut'){
            token = req.get('authorization');
          let creds = new MindsphereCredentials({ authorization : token });
          assetsClient = new AssetsClient(config, creds);
        } else {
            assetsClient = new AssetsClient(config);
        }
}

function getSubtenant(req,creds) {
    if (proxyValue) {
        config = new ClientConfig({ proxy: proxyValue, timeout: 1000000 });
    } else {
        config = new ClientConfig({ timeout: 1000000 });
    } 
        let tokenType = req.params.tokentype;
        
        if(tokenType == 'ut'){
            token = req.get('authorization');
          let cred = new MindsphereCredentials({ authorization : token });
          assetsClient = new AssetsClient(config, cred);
        } else {
            assetsClient = new AssetsClient(config,creds);
        }
}

async function getSubTenantTokenUsingClientConfig(req, res){
    let clientIdValue = req.query.clientIdValue
    let clientSecretValue = req.query.clientSecretValue
    let tenantValue = req.query.tenantValue
    let subTenantValue = req.query.subTenantValue
    creds = new MindsphereCredentials({clientId: clientIdValue, clientSecret: clientSecretValue, tenant:tenantValue,subTenant: subTenantValue});
    getSubtenant(req, creds);
    try{
        let token = await TokenService.getToken(config, creds);
        res.send(token);
    }catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
async function getSubTenantToken(req, res){
    try{
        let token = await TokenService.getToken(config, creds);
        res.send(token);
    }catch (err) {
        console.log(err.message);
        res.send(err.message);
    }
}
async function getSubTenantTokenAndCallAsset(req, res){
    getClient(req);
    assetsClient.listAssets(
    ).then((response) => {
        res.send(response);
    }).catch((err) => {
        console.log(err);
        res.send(err);
    });
}
module.exports = {
    getSubTenantTokenUsingClientConfig,
    getSubTenantToken,
    getSubTenantTokenAndCallAsset
}
