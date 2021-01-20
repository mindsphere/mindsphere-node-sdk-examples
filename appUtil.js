function getUrls(req, res) {
    let urls = [];
    urls.push("Asset Management APIs ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/aspects/{Your_tenant} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assettype/{Your_tenant}?aspectName={nameFromstep1response}&aspectId={idFromstep1response} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assets/{Your_tenant}?assetTypeId={assetTypeIdFromStep2} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assetfiles ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/{assetId}?key={any_string}&fileId={fileid} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assetlocation/{asset_id} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assetsget/{idFromStep3} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assetsdelete/{idFromStep3} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assetsdeleteconfirmation/{id} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assets ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/aspectsequals?fieldType={value}&filterValue={value} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/aspectscontains?fieldType={value}&filterValue={value} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assettypestartswith?fieldType={value}&filterValue={value} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assettypeendswith?fieldType={value}&filterValue={value} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assetslike?fieldType={value}&firstFilterValue={value}&secondFilterValue={value} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/assetsbytype?fieldType={value} ");
    urls.push(" Event Analytics APIs ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/eventanalytics/topevents ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/eventanalytics/countevents ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/eventanalytics/filterevents ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/eventanalytics/patternmatching ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/eventanalytics/removeduplicateevent ");
    urls.push(" File Services APIs ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/putFile/{entityId} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/deleteFile/{entityId}/{filepath} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/fileservicecreatemultipartfile/{entityId}/{filepath}");
    urls.push(" Timeseries APIs ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/timeseries/create/{entityid}/{propertyname} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/timeseries/get/{entityid}/{propertyname}?from={timestamp1}&to={timestamp2} ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/timeseries/delete/{entityid}/{propertyname}?from={timestamp1}&to={timestamp2} ");
    urls.push(" Aggregate APIs ");
    urls.push(" https://mdspsdk-helloapp-mdspsdk.eu1-int.mindsphere.io/timeseriesaggregate/get/{entityid}/{propertyname}?from={timestamp1}&to={timestamp2}&intervalValue=60&intervalUnit=second ");
    res.send(urls);
}

module.exports = {
    getUrls
}