var express = require('express');
var tsaggregates = require('./tsaggregates');
var timeseries = require('./timeseries');
var fileservice = require('./iotfileservices');
var aspectType = require('./assetmanagementclients/aspectType');
var assetType = require('./assetmanagementclients/assetType');
var structure = require('./assetmanagementclients/structure');
var location = require('./assetmanagementclients/location');
var assetfiles = require('./assetmanagementclients/assetfiles');
var asset = require('./assetmanagementclients/asset');
var subTenant = require('./subTenant');
var tokenUtil = require('./tokenUtil');
var appUtil = require('./appUtil');
var eventAnalytics = require('./eventAnalytics');

var router = express.Router();

router.route('/health').get(function(req, res) {
    res.write("App is up and running!!");
    res.send();
});

router.route('/').get(appUtil.getUrls);

router.route('/tokentype/toggle').get(tokenUtil.toggle);

router.route('/token').get(tokenUtil.getToken);

router.route('/timeseriesaggregate/get/:entityId/:propertyName').get(tsaggregates.getTimeseriesAggregate);

router.route('/timeseries/get/:entityId/:propertySetName').get(timeseries.getTimeseries);
router.route('/timeseries/create/:entityId/:propertySetName').get(timeseries.putTimeseries);
router.route('/timeseries/delete/:entityId/:propertySetName').get(timeseries.deleteTimeseries);
router.route('/timeseries/puttimeseriesdata/:entityid/:prpertysetname').put(timeseries.putTimeseriesdata);


router.route('/assets/putaspect/:id/:ifmatch').put(aspectType.putaspecttype);
router.route('/assets/putassettype/:id/:ifmatch').put(assetType.putAssetType);
router.route('/assets/postasset').post(asset.postAsset);
router.route('/aspects/:tenantName').get(aspectType.createAspectType);
router.route('/assettype/:tenantName').get(assetType.createAssetType);
router.route('/assets/createasset/:tenantName').get(asset.createAsset);
router.route('/assetfiles').get(assetfiles.uploadFile);
router.route('/assetfiles/:assetId').get(asset.addAssetFileAssignment);
router.route('/assetlocation/:assetId').get(location.addAssetLocation);
router.route('/assetsget/:assetId').get(asset.getAsset);
router.route('/assetsdelete/:assetId').get(asset.deleteAsset);
router.route('/assetsdeleteconfirmation/:assetId').get(asset.deleteAssetConfirmation);
router.route('/assets/assets').get(asset.listAssets);
router.route('/aspectsequals').get(aspectType.getAspectTypesEqualTo);
router.route('/aspectscontains').get(aspectType.getAspectTypesContains);
router.route('/assettypestartswith').get(assetType.getAssetTypesStartsWith);
router.route('/assettypeendswith').get(assetType.getAssetTypesEndsWith);
router.route('/assetslike').get(asset.getAssetsLike);
router.route('/assetsbytype').get(asset.getAssetsOfType);

router.route('/files/fileservicegetfile/:entityId/:filePath').get(fileservice.getFile);
router.route('/files/fileservicecreate/:entityId').get(fileservice.putFile);
router.route('/files/fileservicesearch/:entityId').get(fileservice.searchFiles);
router.route('/deleteFile').get(fileservice.deleteFile);
router.route('/fileservicecreatemultipartfile/:entityId/:filePath').get(fileservice.createMultiPartFile);
router.route('/fileserviceupdatemultipartfile/:entityId/:filePath/:ifMatch').get(fileservice.updateMultiPartFile);

router.route('/listAspectTypes').get(aspectType.listAspectTypes);
router.route('/getAspectType').get(aspectType.getAspectType);

router.route('/updateAspectType').get(aspectType.updateAspectType);
router.route('/deleteAspectType').get(aspectType.deleteAspectType);

router.route('/listAssetTypes').get(assetType.listAssetTypes);
router.route('/getAssetType').get(assetType.getAssetType);

router.route('/updateAssetType').get(assetType.updateAssetType);
router.route('/deleteAssetType').get(assetType.deleteAssetType);
router.route('/addFileAssignment').get(assetType.addFileAssignment);
router.route('/deleteFileAssignment').get(assetType.deleteFileAssignment);

router.route('/listAssetAspects').get(structure.listAssetAspects);
router.route('/listAssetVariables').get(structure.listAssetVariables);

router.route('/deleteAssetLocation').get(location.deleteAssetLocation);

router.route('/listFiles').get(assetfiles.listFiles);
router.route('/replaceFile').get(assetfiles.replaceFile);
router.route('/downloadFile').get(assetfiles.downloadFile);
router.route('/getAssetFile').get(assetfiles.getFile);
router.route('/deleteAssetFile').get(assetfiles.deleteFile);

router.route('/assets/root').get(asset.getRootAsset);
router.route('/updateAsset').get(asset.updateAsset);
router.route('/moveAsset').get(asset.moveAsset);
router.route('/addAssetFileAssignment').get(asset.addAssetFileAssignment);
router.route('/removeAssetFileAssignment').get(asset.removeAssetFileAssignment);
router.route('/replaceAsset').get(asset.replaceAsset);

router.route('/sub/Tenant').get(subTenant.getSubTenantTokenUsingClientConfig);
router.route('/sub').get(subTenant.getSubTenantToken);
router.route('/sub/asset').get(subTenant.getSubTenantTokenAndCallAsset);

router.route('/eventanalytics/topevents').get(eventAnalytics.topEvents);
router.route('/eventanalytics/filterevents').get(eventAnalytics.filterEvents);
router.route('/eventanalytics/countevents').get(eventAnalytics.countEvents);
router.route('/eventanalytics/removeduplicateevents').get(eventAnalytics.removeduplicateevent);
router.route('/eventanalytics/matcheventpatterns').get(eventAnalytics.matchEventPatteren);

module.exports = router;