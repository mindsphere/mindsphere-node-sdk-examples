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

  


#### Environment Variables ####

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


- App Credentials will suffice to use SDKs.
- For more information about credentials please visit [Token Handling](https://developer.mindsphere.io/resources/mindsphere-sdk-java-v2/token_handling_v2.html)
###### Note 
> App Credentials and Application Credentials refers to same concept. These terms might be used interchangeably in the document.

###### Note 
> From now, Tenant Credential support is removed from Node SDKs. Older versions with tenant credential support are still available on [Siemens Industry Online Support (SIOS) Portal](https://support.industry.siemens.com/cs/document/109757603/mindsphere-sdk-for-java-and-node-js?dti=0&lc=en-US). This application uses latest library for mindsphere-core library with version 1.0.5. Using older version of mindsphere-core library might lead to breaking behaviour of application. Hence we strongly recommend you to use latest version for smooth experience.

##### env:
  HOST_ENVIRONMENT: eu1
If not specified, HOST_ENVIRONMENT defaults to eu1 in region Europe 1 SDK and to cn1 in region China 1 SDK.

## 2 - Download 
##### Downloading the MindSphere SDK for Node.js
Download the MindSphere SDK for Node.js from the [Siemens Industry Online Support (SIOS) Portal](https://support.industry.siemens.com/cs/document/109757603/mindsphere-sdk-for-java-and-node-js?dti=0&lc=en-US).



## 3 - Host Node Sample Project on MindSphere
MindSphere provides two ways to host an application - `Cloud Foundry Hosted` and `Self Hosted`.
For `Cloud Foundry Hosted` see 3A - 1 and for `Self Hosted` see 3A-2.

### 3A - 1 : Upload app to CloudFoundry and fetch app URL

The following steps describe way to deploy Node Sample Project on Cloud Foundry.
If you want to host your own application then skip to step 3(Push the App to CloudFoundry).

#### 1. Clone this repository.
####
```
git clone https://github.com/mindsphere/mindsphere-node-sdk-examples.git
```
#### 2. Install required dependencies.

- Download Node JS SDK from  [Download](#2---download).
- Unzip the downloaded file.
- Navigate to <some path where unzipped folder is located>/mindsphere-node-sdk_1.0.0/modules/
- Copy .tgz files of required dependent service/services in 'packages' folder. (For this project(mindsphere-sdk-node-examples) we will need all the .tgz files but you can choose to use only required subset of all avaiable SDKs for your project.)
- Kindly note that Tenant Credential Support is removed from Node SDKs from now. Hence we strongly recommend using
  latest version(1.0.5) of mindsphere-core library.
- For convenience `packages` folder is already created in root directory of project.
- For convenience, package.json is populated with relative path to copied dependencies.

#### 3. Push the App to CloudFoundry.
- Navigate to directory where cloned project directory is present. In this case navigate to sample-nodejs-app.
- In order to push app to CF, user must login to cloudfoundry. To login user can opt for either of two ways.
    - Jump to [Login to CF](#login-to-cf)
- At this point you are successfully logged in CF.
- Prepare manifest.yml file for pushing. File content pertinent to sample project are as :
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/manifest.png" width="400">
    </p>
- For convienience, sample manifest.yml is added in root directory of project.
- `path` specifies where to look for application. Here in this case, our app is located inside `mindsphere-node-sdk-examples` folder.
- Environment variables are listed under `env`. Since sample application demonstrates use of MindSphere SDKs, environemnt variables  are only specific for Token Generation. In case of other application, user can append the list with his/her own environment variables.
- As mentioned in 1 - Prerequisites, either of Tenant Credentials/ Application Credentials would suffice for getting token.
- In sample file variables for both type of credentials are mentioned but user can choose to use only one.
- If opting for App Credentials, user will not have values of all environment variables at this point. In this scenario either put some dummy values or do not add variables at all. CF provides command to set environment variables hence they can be set later on.
- Now run the command `cf push`.
- Once application is successfully deployed check for app status using command `cf app routi`.
- Note down app URL displayed on screen.
<p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/cfappurl.png" width="400">
</p>

### 3A - 2 : Deploy the application as Self Hosted Application.
- Self Hosted Applications are deployed by user on desired server.
- User must note down URL where application is hosted.

### Step 3A - 3 : Create Application in Developer Cockpit.

#### Save the Application
1. Open the **Developer Cockpit** from the Launchpad and select the **Dashboard tab**.
2. Click on **Create new application**.
3. Select Type Standard and Infrastructure MindSphere Cloud Foundry if you have deployed application in cloud foundry. In case of self-hosted application select Self Hosted.
4. Enter an arbitrary Display Name and an Internal Name which will be part of the application URL. The Internal Name cannot be changed after initial creation!
5. Enter a version number.
    - MindSphere supports a Major.Minor.Patch scheme.
    - Versions must start with a major number >= 1.
    - The version cannot be changed after saving.
6. Upload an icon for your application.(Optional step)
7. Enter the component name. The component name must be the same as specified in the __*manifest.yml*__ file.
    - In case of sample project `mindsphere-node-sdk-examples` component name will be **routi** and component url can be obtained by 
      running `cf app routi` on command line.
    - In case of Self Hosted Application, component name and URL will be as per customer's deployment strategy.
8. Add one endpoint for your component using /** to match all of your application paths.
9. Set the content-security-policy according to the examples:
    - For Europe1 :     default-src 'self' *.eu1.mindsphere.io; style-src * 'unsafe-inline'; script-src 'self' 'unsafe-inline' *.eu1.mindsphere.io code.jquery.com cdnjs.cloudflare.com; font-src 'self' 'unsafe-inline' fonts.gstatic.com *.eu1.mindsphere.io; img-src * data:;
    - For Europe2:     default-src 'self' *.eu1.mindsphere.io *.eu2.mindsphere.io; style-src * 'unsafe-inline'; script-src 'self' 'unsafe-inline' *.eu1.mindsphere.io *.eu2.mindsphere.io; img-src * data:;
10.  Click on **Save**.

#### Add roles and Scopes
1. Switch to the Authorization Management tab.
2. Select the application you just created.
3. Create an application scope, e.g. <provided-application-name>.subtenant.
4. Add the following Core roles to enable access to the respective APIs. For this project - `mindsphere-node-sdk-examples`, you will need following API roles. If required roles are not added then endpoints specific to those services will not work as expected.
<p>
<img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/apiroles.PNG" width="400">
</p>

#### Register the Application
1. Switch to the Dashboard tab.
2. Open the application details.
3. Click on Register.

#### Generate App Credentials
1. Switch to the Authorization Management tab.
2. Click on **App Credentials** tab.
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/ac.png" width="400">
    </p>
3. Click on **Issue access** button.
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/issueaccessac.png" width="400">
    </p>
4. Select **Read And Write** .
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/readandwrite.PNG" width="400">
    </p>
5. Click on **Submit** button.
6. You will be presented with client ID and client secret for application.
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/cidcsecret.png" width="400">
    </p>
7. Store these values at secure location as they are displayed only once.

#### Set environment variables
1. In case of App Credentials, at this point you have all the required values for corresponding environment variables - 
`MDSP_OS_VM_APP_NAME`, `MDSP_OS_VM_APP_VERSION`, `MDSP_KEY_STORE_CLIENT_ID`,`MDSP_KEY_STORE_CLIENT_SECRET`,`MDSP_HOST_TENANT`, `MDSP_USER_TENANT`.

| Sr. No. | Environment Variable | Value |
|-----|--------------|--------------|
|1 | MDSP_OS_VM_APP_VERSION| Version you provided while creating application. | 
|2 | MDSP_OS_VM_APP_NAME| Internal name of your application(Can be seen in Application Details in Developer Cockpit). | 
|3 | MDSP_KEY_STORE_CLIENT_ID|  App Client ID displayed on screen in last step. |
|4 | MDSP_KEY_STORE_CLIENT_SECRET| App Client Secret displayed on screen in last step. |
|5 | MDSP_HOST_TENANT | Name of the tenant you are currently working upon. |
|6 | MDSP_USER_TENANT | This specifies the name of tenant which will use the application. Since we are currently in developing and testing phase, `MDSP_USER_TENANT` == `MDSP_HOST_TENANT`. |

2. Set the values of this environment variables in Cloud Foundry.
```
cf set-env routi <VARIABLE-NAME> <VARIABLE-VALUE>
```
If you have provided any other value for application name then modify the command accordingly.
As suggested by Cloud Foundry documentation, restage the app.
````
cf restage <APP-NAME>
````
3. In case of Self Hosted application, you need to store these values as per deployment strategy. Also make sure this values can be accessed in application.
      
#### Assign the App and Access via Launchpad
1. Navigate to MindSphere Launchpad -> Settings -> Users
2. Select a Developer you want to assign this application to. (You can assign it to yourself as well)
3. Scroll down a bit and click on **Edit direct assignments**.
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/assignapp.png" width="400">
    </p>
4. In the **Application Roles** section, search your application by internal name.
5. Select checkboxes for both admin and user.
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/addadminuser.png" width="400">
    </p>
6. Click on **Next**.
7. Click on **Save**.

Now concerned developer should be able to access the application via launchpad.

#### Access the application.
1. Navigate to MindSphere Launchpad.
2. Click on your application tile.
3. You should see something like :
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/sp95changes/images/Homescreen1.png" width="400">
    </p>
4. By clicking on any endpoint showing on above image you should see like :
    <p>
    <img src="https://github.com/mindsphere/mindsphere-python-sdk-examples/blob/swaggerui-changes/images/putaspectcall.png" width="400">
    </p>
5. By clicking 'try it out' button you can make api call by putting correct parameters and requestbody. then you will get response like :
    <p>
    <img src="https://github.com/mindsphere/mindsphere-python-sdk-examples/blob/swaggerui-changes/images/respnseapi.png" width="400">
    </p>    

6. Domain url is **Application URL** displayed on Application details page.
    <p>
    <img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/master/images/appurl.png" width="400">
    </p>

#### Create an asset via application.
1. For creating an asset we will first create aspect type. From created aspect type we create Asset type. Next we finally create an asset based on created Asset type.
2. First hit the endpoint PUT /assets/putaspect/{id}/{ifmatch}.
3.  If call is succesful, note down aspect id and aspect name from the response.
4. Next, hit PUT /assets/putaassettype /{id}/{ifmatch}. Pass noted aspect id and aspect name value in payload for creating asset type. 
5. If call is succesful, note down id from the response.
6. Next hit GET /assets/root to get root asset of the tenant. Note down id of an asset from the response.
7. Finally we will now create an asset. Pass id from step 5 and parent id from step 6 in the payload for creating an asset.
8. If asset creation is successful, you should see created asset in the call GET /assets/assets.
9. All the created resources (aspect type, asset type and asset) are visible on Asset Manager application on MindSphere Launchpad.

###### Note 
> Sample payload for endpoint is provided whenever required. For more information about payload, please refer `sample-payload/<service-name>/sampleinput` file.
> For now, swagger endpoints are provided for **asset management, timeseries and event analytics** service only. For other services, endpoints can be tried via entering url in browser.

###### Note 
> We require XSRF token for calling PUT, POST/PATCH, DELETE APIs (For GET endpoints, XSRF_TOKEN is not compulsory). The value of XSRF token can be passed in request header. This token is available in cookies by name `XSRF-TOKEN`. We have fetched this token from cache in the application and put it in request header.  




### 3B - Set up Node Sample Project For Local Machine

The following steps describe the way to set up a sample project to test on local machine.
This is to facilitate any bug resolution on local developer setup.
Please follow prerequisite section for environment variables, how to get them and how to store them.

##### 1. Clone this repository.
####
```
git clone https://github.com/mindsphere/mindsphere-node-sdk-examples.git
```
##### 2. Install required dependencies.

- Download Node JS SDK from  [Download](#2---download)
- Unzip the downloaded file.
- Navigate to <some path where unzipped folder is located>/mindsphere-node-sdk_1.0.0/modules/
- Copy .tgz files of required dependent service/services in 'packages' folder. (For this project(mindsphere-sdk-node-examples) we will need all the .tgz files but you can choose to use only required subset of all avaiable SDKs for your project.)
- For convenience, package.json is populated with relative path to copied dependencies.
- For convenience `packages` folder is already created in root directory of project.
- Navigate inside the root directory of project if you are not in there.
```
cd mindsphere-node-sdk-examples
```
- Run below command to install required dependecies mentioned in package.json file.
```
npm install
```
###### Note 
> If you face errors while `npm install` mentioning particular '<file-name>.tgz file not found' then kindly verify dependency file name in packages folder and that mentioned in package.json file. This could be also due to incorrect relative path mentioned in package.json file. If so then modify path in package.json wherever required.

##### 3. Run the app.
####
```
npm start
```
##### 4. Access the app.
1. Navigate to 'http://localhost:3000' (You can use any browswer of your choice).
2. Domain URL in this case will be 'localhost:3000'.
<p>
<img src="https://github.com/mindsphere/mindsphere-node-sdk-examples/blob/sp95changes/images/homescreen.png" width="400">
</p>

###### Note 
> Sample payload for endpoint is provided whenever required. For more information about payload, please refer `sample-payload/<service-name>/sampleinput` file.
> For now, swagger endpoints are provided for **asset management, timeseries and event analytics** service only. For other services, endpoints can be tried via entering url in browser.


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

###### Note 
> Service Credentials application is accessible to Tenant Admins only. If you are not a Tenant Admin then contact your Tenant Admin to generate these Service Credentials for you.

## 4 - Prepare the app to hand it over to Operator Cockpit
Please refer [Handing over app to Operator Cockpit](https://developer.mindsphere.io/howto/howto-develop-and-register-an-application.html#handover-the-application-to-the-operator-tenant)
