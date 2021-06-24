let AppCredentials = require('mindsphere-sdk-node-core').AppCredentials;
let UserCredentials = require('mindsphere-sdk-node-core').UserCredentials;
let ClientConfig = require('mindsphere-sdk-node-core').ClientConfig;
let TechnicalTokenService = require('mindsphere-sdk-node-core').TechnicalTokenService;


const token = {
    USER: 'USER',
    APP: 'APP'
};

let proxyValue =  'http://194.138.0.25:9400';

let tokenType = token.USER;

function toggle(req, res) {
    if (tokenType == token.USER) {
        tokenType = token.APP;
    }
    else if (tokenType == token.APP) {
        tokenType = token.USER;
    }
    res.send(tokenType);
}

async function getToken(req, res) {
    let response =await TechnicalTokenService.getToken(getConfig(req.hostname), getCredential(req));
    res.send(response);
}

function getConfig(hostname) {
    let config = null;
    if (hostname == 'localhost') {
        config = new ClientConfig({ proxy: proxyValue, timeout: 1000000 });
    } else {
        config = new ClientConfig({ timeout: 1000000 });
    }
    return config;
}

function getCredential(req) {
    if (tokenType == 'APP') {
        return new AppCredentials();
    }else if(tokenType == 'USER' && req.get('authorization') != null){
        return new UserCredentials({'authorization':req.get('authorization')});
    }
    
}

module.exports = {
    toggle,
    getToken,
    getConfig,
    getCredential
}