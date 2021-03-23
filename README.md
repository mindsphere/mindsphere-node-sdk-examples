# MindSphere SDK for NodeJS # 
API clients and References.md

## Full documentation

The full documentation can be found at [https://developer.mindsphere.io/resources/mindsphere-sdk-node/jsdoc/index.html](https://developer.mindsphere.io/resources/mindsphere-sdk-node/jsdoc/index.html)

## 1 - Preparation
### Prerequisites to use the MindSphere SDK for Node.js ###
- 1. NodeJS version 8.0 or higher installed where application will be running.
- 2. User authorization token or app credentials with required scopes for Mindsphere Service APIs.
    
    - 2.1 Environment variables set up in local machine to run application in local. 
    - 2.2 When application hosting type is `SELF_HOSTED`, the variables must be configured on server.
    - 2.3 When hosting an application in Cloud Foundry, the variable must be present as application's environment variables. This is achieved by adding variables in the manifest file.
- 3. MindSphere provides two options for hosting applications : `Cloud Foundry Hosted` and `Self Hosted`.
- 4.    


#### Environment Variables ####

Tenant Credentials
| Sr. No. | Environment Variable | Description |
|-----|--------------|--------------|
|1 | HOST_ENVIRONMENT | Store the region in environment variable named `HOST_ENVIRONMENT`. If not specified, HOST_ENVIRONMENT defaults to `eu1` in region Europe 1 SDK and to `cn1` in region China 1 SDK.
|2 | MDSP_USER_TENANT | Store the user tenant name in environment variable named `MDSP_USER_TENANT` |.
|3 | MINDSPHERE_CLIENT_ID | Store the mindsphere client id in environment variable named `MINDSPHERE_CLIENT_ID`. |
|4 | MINDSPHERE_CLIENT_SECRET | Store the mindsphere client secret in environment variable named `MINDSPHERE_CLIENT_SECRET`. |
|5 | MINDSPHERE_SUB_TENANT | Store the mindsphere subtenant name in environment variable named `MINDSPHERE_SUB_TENANT`. |
#### OR
Application Credentials
| Sr. No. | Environment Variable | Description |
|-----|--------------|--------------|
|1 | MDSP_OS_VM_APP_VERSION| Store App Version in environment variable named `MDSP_OS_VM_APP_VERSION`. | 
|2 | MDSP_OS_VM_APP_NAME| Store App Name in environment variable named `MDSP_OS_VM_APP_VERSION`. | 
|3 | MDSP_KEY_STORE_CLIENT_ID| Store App Client ID in environment variable named `MDSP_KEY_STORE_CLIENT_ID`. |
|4 | MDSP_KEY_STORE_CLIENT_SECRET| Store App Client Secret in environment variable named `MDSP_KEY_STORE_CLIENT_SECRET`. |
|5 | MDSP_HOST_TENANT | Store the name of the tenant on which application is hosted in environment variable named `MDSP_HOST_TENANT`. |
|6 | MDSP_USER_TENANT | Store the name of the tenant from which application is being accessed in environment variable named `MDSP_USER_TENANT`. |
|7 | HOST_ENVIRONMENT | Store the region in environment variable named `HOST_ENVIRONMENT`. If not specified, HOST_ENVIRONMENT defaults to `eu1` in region Europe 1 SDK and to `cn1` in region China 1 SDK.


- Either of 2 credentials (Tenant Credentials or App Credentials ) will suffice to use SDKs.
- For more information about credentials please visit [Token Handling](https://developer.mindsphere.io/resources/mindsphere-sdk-java-v2/token_handling_v2.html)
###### Note 
> App Credentials and Application Credentials refers to same concept. These terms might be used interchangeably in the document.

##### env:
  HOST_ENVIRONMENT: eu1
If not specified, HOST_ENVIRONMENT defaults to eu1 in region Europe 1 SDK and to cn1 in region China 1 SDK.

## 2 - Download 
##### Downloading the MindSphere SDK for Node.js
Download the MindSphere SDK for Node.js from the [Siemens Industry Online Support (SIOS) Portal](https://support.industry.siemens.com/cs/document/109757603/mindsphere-sdk-for-java-and-node-js?dti=0&lc=en-US).



## 3 - Host Node Sample Project on MindSphere


### 3A - 1 : Upload app to CloudFoundry and fetch app URL

The following steps describe way to deploy Node Sample Project on Cloud Foundry.
If you want to host your own application then skip to step 3(Push the App to CloudFoundry).
###### 1. Clone this repository.
####
```
git clone https://github.com/mindsphere/mindsphere-node-sdk-examples.git
```
###### 2. Install required dependencies.
- Create a folder named 'repo' in root directory of project.
- Download Node JS SDK from  [Download](#Download_41)
- Unzip the downloaded file.
- Navigate to <some path where unzipped folder is located>/mindsphere-node-sdk_1.0.0/modules/
- Copy .tgz files of required dependent service/services in 'repo' folder. (For this project(mindsphere-sdk-node-examples) we will need all the .tgz files but you can choose to use only required subset of all avaiable SDKs for your project.)
- For convinience, package.json is populated with relative path to copied dependencies.

###### 3. Push the App to CloudFoundry.
- Navigate to directory where cloned project directory is present. In this case navigate to sample-nodejs-app.
- In order to push app to CF, user must login to cloudfoundry. To login user can opt for either of two ways.
    - Jump to [Login to CF](#Login_to_CF_144)
- At this point you are successfully logged in CF.
- Prepare manifest.yml file for pushing. File content pertinent to sample project are as :
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/manifest.png" width="400">
    </p>
    - `path` specifies where to look for application. Here in this case, our app is located inside `mindsphere-node-sdk-examples` folder.
    - Environment variables are listed under `env`. Since sample application demonstrates use of MindSphere SDKs, environemnt variables are only specific for Token Generation. In case of other application, user can append the list with his own environment variables.
    - As mentioned in 1 - Prerequisites, either of Tenant Credentials/ Application Credentials would suffice for getting token.
    - In sample file variables for both type of credentials are mentioned but you can choose to use only one.
    - If opting for App Credentials, you will not have values of all environment variables. In this scenario either put some dummy   values or do not add variables at all. CF provides command to set environment variables hence they can be set later on.




     

### 3A - 2 : Deploy the application as Self Hosted Application.
- Self Hosted Applications are deployed by user on desired server.
- User must note down url where application is hosted.

### Step 3A - 3 : Create Application in Developer COckpit.
        - create app
        - component url -- self/cf hosted
        - roles and scopes. - table need to be created here.
        - register.
        - generate app creds.
        - set env vars --- self/cf
        - assign app to developer and access via launchpad.



### 3B - Set up Node Sample Project For Local Machine

The following steps describe the way to set up a sample project to test on local machine.
This is to facilitate any bug resolution on local developer setup.
Please follow prerequisite section for environment variables and how to get them?

##### 1. Clone this repository.
####
```
git clone https://github.com/mindsphere/mindsphere-node-sdk-examples.git
```
##### 2. Install required dependencies.
- Create a folder named 'repo' in root directory of project.
- Download Node JS SDK from  [Download](#Download_41)
- Unzip the downloaded file.
- Navigate to <some path where unzipped folder is located>/mindsphere-node-sdk_1.0.0/modules/
- Copy .tgz files of required dependent service/services in 'repo' folder. (For this project(mindsphere-sdk-node-examples) we will need all the .tgz files but you can choose to use only required subset of all avaiable SDKs for your project.)
- For convinience, package.json is populated with relative path to copied dependencies.
- Navigate inside the root directory of project if you are not in there.
```
cd mindsphere-node-sdk-examples
```
- Run below command to install required dependecies mentioned in package.json file.
```
npm install
```
###### Note 
> If you face errors while `npm install` mentioning particular .tgz file not found then kindly verify dependency file name in repo folder and that mentioned in package.json file. This could be also due to incorrect relative path mentioned in package.json file. If so then modify path in package.json wherever required.

##### 3. Run the app.
####
```
npm start
```
##### 4. Access the app.
Navigate to 'http://localhost:3000' (You can use any browswer of your choice).
domain url
You will be presented with comma separated list of avaiable routes.
Service Name (for e.g. eventanalytics) will be mentioned before APIs for that servive.
<p>
<img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/AccessAPP.PNG" width="400">
</p>


### Login to CF
- To login to cloudfoundry user can opt for either of two ways.
#### Using -sso
- `cf login -a [cloudfoundry_login_url] -sso`
- This command will prompt for Email and Password.
- Enter webkey credentials that you use for tenant login.
- You will be logged in as long as credentials in previous step are correct.
##### OR
#### Using Service Credentials on MindSphere.
- Navigate to MindSphere Launchpad -> Settings -> Service Credentials.
<p>
<img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/sc.png" width="400">
</p>
- Create service credentials by providing details asked on page.
- Generated service credentials(combination of username and password) are displayed on screen. Store them in secure location as they displayed only once.
- Use command `cf login -a [cloudfoundry_login_url] -u <username> -p <password>`

