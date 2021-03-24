function getUrls(req, res) {
    let urls = [];
    // urls.push({
    //     "Asset Management APIs ":  ["your-domain-url-here/aspects/{Your_tenant}"," your-domain-url-here/assettype/{Your_tenant}?aspectName={nameFromstep1response}&aspectId={idFromstep1response} ",
    //     " your-domain-url-here/assets/{Your_tenant}?assetTypeId={assetTypeIdFromStep2} "]
       
    // });
    urls.push("Asset Management APIs ");
    urls.push(" ========================== ")
    urls.push(" your-domain-url-here/aspects/{Your_tenant} ");
    urls.push(" your-domain-url-here/assettype/{Your_tenant}?aspectName={nameFromstep1response}&aspectId={idFromstep1response} ");
    urls.push(" your-domain-url-here/assets/{Your_tenant}?assetTypeId={assetTypeIdFromStep2} ");
    urls.push(" your-domain-url-here/assetfiles ");
    urls.push(" your-domain-url-here/{assetId}?key={any_string}&fileId={fileid} ");
    urls.push(" your-domain-url-here/assetlocation/{asset_id} ");
    urls.push(" your-domain-url-here/assetsget/{idFromStep3} ");
    urls.push(" your-domain-url-here/assetsdelete/{idFromStep3} ");
    urls.push(" your-domain-url-here/assetsdeleteconfirmation/{id} ");
    urls.push(" your-domain-url-here/assets ");
    urls.push(" your-domain-url-here/aspectsequals?fieldType={value}&filterValue={value} ");
    urls.push(" your-domain-url-here/aspectscontains?fieldType={value}&filterValue={value} ");
    urls.push(" your-domain-url-here/assettypestartswith?fieldType={value}&filterValue={value} ");
    urls.push(" your-domain-url-here/assettypeendswith?fieldType={value}&filterValue={value} ");
    urls.push(" your-domain-url-here/assetslike?fieldType={value}&firstFilterValue={value}&secondFilterValue={value} ");
    urls.push(" your-domain-url-here/assetsbytype?fieldType={value} ");
    urls.push(" ----------------------------------------------------------------------------------------------------------------------------------");
    urls.push(" Event Analytics APIs ");
    urls.push(" ========================== ")
    urls.push(" your-domain-url-here/eventanalytics/topevents ");
    urls.push(" your-domain-url-here/eventanalytics/countevents ");
    urls.push(" your-domain-url-here/eventanalytics/filterevents ");
    urls.push(" your-domain-url-here/eventanalytics/patternmatching ");
    urls.push(" your-domain-url-here/eventanalytics/removeduplicateevent ");
    urls.push(" ----------------------------------------------------------------------------------------------------------------------------------");
    urls.push(" File Services APIs ");
    urls.push(" ========================== ")
    urls.push(" your-domain-url-here/putFile/{entityId} ");
    urls.push(" your-domain-url-here/deleteFile/{entityId}/{filepath} ");
    urls.push(" your-domain-url-here/fileservicecreatemultipartfile/{entityId}/{filepath}");
    urls.push(" ----------------------------------------------------------------------------------------------------------------------------------");
    urls.push(" Timeseries APIs ");
    urls.push(" ========================== ")
    urls.push(" your-domain-url-here/timeseries/create/{entityid}/{propertyname} ");
    urls.push(" your-domain-url-here/timeseries/get/{entityid}/{propertyname}?from={timestamp1}&to={timestamp2} ");
    urls.push(" your-domain-url-here/timeseries/delete/{entityid}/{propertyname}?from={timestamp1}&to={timestamp2} ");
    urls.push(" ----------------------------------------------------------------------------------------------------------------------------------");
    urls.push(" Aggregate APIs ");
    urls.push(" ========================== ")
    urls.push(" your-domain-url-here/timeseriesaggregate/get/{entityid}/{propertyname}?from={timestamp1}&to={timestamp2}&intervalValue=60&intervalUnit=second ");
    res.send(urls.join("<br />"));
}

module.exports = {
    getUrls
}