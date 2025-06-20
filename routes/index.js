var express = require('express');
var router = express.Router();
const fs = require('fs').promises;
const path = require('path');
var  nAbleNCentral =require( '@api/n-able-n-central');
const { fetch, setGlobalDispatcher, Agent } = require('undici');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
//const { poolPromise } = require('../pool.js');
const odbc = require('odbc');
var axios = require('axios');
const comparisons = require('../comparisons.js');
const jobTitleCode = require('../jobTitleCodes.js');
const locationCode = require('../locationCodes.js');
const departmentCode = require('../departmentCodes.js');






setGlobalDispatcher(new Agent({connect: { timeout: 40_000 }})); // to stop early timeout and allow fetch to work

let cachedData = null;

async function fetchDataOnce() {
  if (!cachedData) {
    cachedData = await comparisons(); 
  }
  return cachedData; 
  };

  function cleanString(str) {
    return str.replace(/\s/g, ''); 
    };


router.route('/refreshData')
.all(async function(req,res,next){
  try {
    cachedData = null;
await fetchDataOnce();
res.redirect('/');
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }

});
router.route('/notify')
.all(function(req,res,next){

  res.render('delay', {title: 'MGM Assets'})
})

router.route('/seeAll')
.all(async function(req, res, next) {

  try {
     const {rmmComputers, rmmComputerNames, rmmPlusAD, rmmTotal, sharepointComputers, sharepointComputerNames, sharepointTotal, 
      adComputers, adTotal, adExra, fsExtra, freshserviceComputers, freshserviceComputerNames, freshserviceTotal,sharepointMissing,spMissingTotal} = await fetchDataOnce();
    req.session.rmmComputers  =rmmComputers;
    req.session.rmmComputerNames = rmmComputerNames;
    req.session.rmmPlusAD = rmmPlusAD;
    req.session.rmmTotal =rmmTotal;
    req.session.sharepointComputers = sharepointComputers;
    req.session.sharepointComputerNames =  sharepointComputerNames;
    req.session.sharepointTotal = sharepointTotal;
    req.session.adComputers = adComputers;
    req.session.adTotal = adTotal;
    req.session.freshserviceComputers = freshserviceComputers;
    req.session.freshserviceComputerNames = freshserviceComputerNames;
    req.session.freshserviceTotal=freshserviceTotal;
    req.session.sharepointMissing = sharepointMissing;
    req.session.spMissingTotal = spMissingTotal;

    req.session.adExra = adExra;
    req.session.fsExtra = fsExtra;
  
   
   
 
   
     
   res.render('layout', {
    title: 'MGM Assets',
    appTitle: 'MGM Assets',
    
   rmmComputers,
   rmmComputerNames,
    rmmTotal,
    sharepointComputerNames,
    sharepointTotal,
    adComputers,
    adTotal,
    freshserviceComputerNames,
    freshserviceTotal,

    spMissingTotal 
   
  });
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
  
  
    
});

router.route('/rmmNotSharepoint')
.get(async function(req,res,next){
  try {
     const {sharepointMissing } = await fetchDataOnce();
  console.log(typeof sharepointMissing);
  console.log(sharepointMissing);  
  res.json(sharepointMissing);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
 
})

router.route('/sharepointNotRmm')
.get(async function (req,res,next){
  try {
     const {sharepointNotRmm} = await fetchDataOnce();

  res.json(sharepointNotRmm);
  } catch (error) {
    console.error(error);
    res.redirect('/');
  }
 
})

/*router.route('/selectLocation')
.all(function(req,res,next){
   
  
  console.log(`path: ${req.session.path}`);
  res.render('selectLocation',{title: 'MGM Assets'});
  
});*/

  router.route('/updateSharepoint')
  .all(async function (req, res,next){

    console.log('in update sharepoint before try catch');

    try {
         const {sharepointMissing } = await fetchDataOnce();
   console.log(Array.isArray(sharepointMissing));
   console.log('before sharepointMissing list in update sharepoint');
   console.log(sharepointMissing);
    
  console.log('after sharepoint list in update sharepoint');

  if (sharepointMissing.length === 0){
  res.render('notification',{title: 'MGM Assets', appTitle: 'MGM Assets', notify: 'computers in Rmm and not Sharepoint.'});
}
  


else if(sharepointMissing.length !== 0){

     sharepointMissing.forEach(item=>{
     for (let key in item) {
      if (typeof item[key] === 'string') {
        if (item[key].includes(',')) {
          item[key] = item[key].replace(/,/g, '');
        };
      };
    };
   })
   
//  const foldersPath = req.body.selectLocation; 
 

 

   const headers = Object.keys(sharepointMissing[0]).join(','); 

    const csvRows = sharepointMissing.map(row => Object.values(row).join(","));
    const csvData = [headers, ...csvRows].join("\n");
   
    const foldersPath = '/var/www/html/AssetManagement/sharepointwithaxios/CSV';
    //const foldersPath = 'C:/Users/25358/Documents';
   const fileName = 'sharepointMissing.csv';
   const fullPath= path.join(foldersPath,fileName); 

   await  fs.writeFile(fullPath, csvData, err => {
        if (err) {
            console.error('Error writing to the file', err); 
         } else {
            console.log('CSV file has been created successfully in'); 
        }
    });


    //res.render('seeCreatedFile',{title: 'MGM Assets', appTitle: 'MGM Assets'});
    res.download(fullPath);
}
 
    } catch (error) {
      console.error('Were there any computers on the list?');
      console.error(error);
      res.redirect('/');
    }


  

});

router.route('/extraAdComputers')
.all(async function (req,res,next){
  try {
    console.log('in generate ad csv');

  const {adExtra} = await fetchDataOnce();
  console.log(adExtra);

  if (adExtra.length === 0){
    res.render('notification',{title: 'MGM Assets', appTitle: 'MGM Assets', notify: 'AD computers not in Rmm.'});
  }
  else if(adExtra.length !== 0){
    const foldersPath = 'myPath';
    //const foldersPath = 'C:/Users/25358/Documents';
    const fileName = 'extraAdComputers.csv';
    const fullPath= path.join(foldersPath,fileName); 

  
    adExtra.forEach(computer=>{
      computer=computer.trim();
    })
    const csvString = adExtra.join(',\n');

    await fs.writeFile(fullPath, csvString, err => {
          if (err) {
              console.error('Error writing to the file', err); 
          } else {
              console.log('CSV file has been created successfully in'); 
          }
      });


      //res.render('seeCreatedFile',{title: 'MGM Assets', appTitle: 'MGM Assets'});
      res.download(fullPath);
    }
 
  } catch (error) {
     console.error('Were there any computers on the list?');
    console.error(error);
    res.redirect('/');
  }
  
  

})

router.route('/extraFsComputers')
.all(async function (req,res,next){
  try {
    console.log('in generate fs csv');

  const {fsExtra} = await fetchDataOnce();
  if(fsExtra.length === 0){
    res.render('notification',{title: 'MGM Assets', appTitle: 'MGM Assets', notify: 'Freshservice computers not in Rmm.'});
  }
  else if(fsExtra.length !== 0){
      fsExtra.forEach(computer=>{
    computer=computer.trim();
  })
  const csvString = fsExtra.join(',\n');
    const foldersPath = 'myPath';
    //const foldersPath = 'C:/Users/25358/Documents';
    const fileName = 'extraFreshservComputers.csv';
    const fullPath= path.join(foldersPath,fileName); 


  await fs.writeFile(fullPath, csvString, err => {
        if (err) {
            console.error('Error writing to the file', err); 
         } else {
            console.log('CSV file has been created successfully in'); 
        }
    });


    //res.render('seeCreatedFile',{title: 'MGM Assets', appTitle: 'MGM Assets'});
    res.download(fullPath);
  }

  } catch (error) {
     console.error('Were there any computers on the list?');
    console.error(error);
    res.redirect('/');
  }
  
  

})

router.route('/addItemToSharepoint')
.all(async function (req,res,next){
  const item = req.body;
  console.log('in add to sharepoint endpoint');
  
 
  let newString = cleanString(item.title);  
  let jobTitle = await jobTitleCode(newString);
  

 
  let newString2 = item.office.trim();
  
  let location = await locationCode(newString2);
  
  
  let newString3 = item.department.trim();
  let department = await departmentCode(newString3);

  let newString4 = item.computerName.trim();

  let data;
   
     try {
         const tenantId = 'myTenantId';
         const clientId = 'myClientId';
         const clientSecret = 'myClientSecret';
         const siteDomain = 'myDomain.sharepoint.com';
         const sitePath = '/IT/assetmanagement'; 
 
         
         const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
         const tokenBody = new URLSearchParams({
             client_id: clientId,
             scope: 'https://graph.microsoft.com/.default',
             client_secret: clientSecret,
             grant_type: 'client_credentials'
         });
 
         const tokenResponse = await axios.post(tokenUrl, tokenBody.toString(), {
             headers: { 'Content-Type': 'application/x-www-form-urlencoded'}                      
              
         });
         const accessToken = tokenResponse.data.access_token;
 
         
         const headers = { Authorization: `Bearer ${accessToken}`,
                            'Accept': 'application/json',
                            'Content-Type': 'application/json;odata=nometadata' };
        
      if(item.freshserviceAssetTag !== 'Not in Freshservice' || item.freshserviceAssetTag !== 'N/A'){
        data = {
            fields:{
               Title: newString4,
               FacilityLookupId: location,
               DepartmentsLookupId: department,
               Job_x0020_TitlesLookupId: jobTitle,
               Assignee: item.firstName === 'N/A'? 'N/A' : `${item.firstName} ${item.lastName}`,
               Device_x0020_Type: item.deviceType,
               Make: item.make,
               Model: item.model,
               Service_x0020_Tag: item.serialNumber,
              Fresh_x0020_Service_x0020_Asset_: item.freshserviceAssetTag
            }
           
         }
      }
      else if(item.freshserviceAssetTag === 'Not in Freshservice' || item.freshserviceAssetTag === 'N/A'){
        data = {
            fields:{
               Title: newString4,
               FacilityLookupId: location,
               DepartmentsLookupId: department,
               Job_x0020_TitlesLookupId: jobTitle,
               Assignee: item.firstName === 'N/A'? 'N/A' : `${item.firstName} ${item.lastName}`,
               Device_x0020_Type: item.deviceType,
               Make: item.make,
               Model: item.model,
               Service_x0020_Tag: item.serialNumber
            }
           
         }
      }
           
         console.log(data);
         
         const siteUrl = `https://graph.microsoft.com/v1.0/sites/${siteDomain}:${sitePath}`;
         const siteResponse = await axios.get(siteUrl, { headers });
         const siteId = siteResponse.data.id;
 
         
         const sharepointUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists`;
         const listResponse = await axios.get(sharepointUrl, { headers });
         const computersList = listResponse.data.value.find(list => list.name === 'Computers');

         
         
         

         const itemsUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${computersList.id}/items?trimduplicates=false`;
         console.log(`Fetching items from: ${itemsUrl}`); // Log the request URL
       const response =  await axios.post(itemsUrl, data, {headers});

       //This if statement needs to be here. It seems that it hangs if its expecting a 200, but the status code to create an item is 201;
       //Possibly, or more likely, the fetch on the client side is expecting a 200 and doesn't get it. If there are too 
      //many unresolved fetches, eventually the system hangs. If its an error code it moves on (even though there was not actually an error.)
       if (response.status !== 200) {
            throw new Error(`Unexpected response: ${response.status}`);
        };
      
         
         console.log('bottom of add to sharepoint');     
       
         
        
 
       
        
     } catch (error) {
        
         console.error('Error fetching data:', error.message);
         console.error('Error details:', error.response ? error.response.data : error);
         res.redirect('/');
     }
    

})

router.route('/deleteSharepointItem')
.all(async function(req,res,next){

  const item = req.body;

  try {
         const tenantId = 'myTenantId';
         const clientId = 'myClientId';
         const clientSecret = 'myClientSecret';
         const siteDomain = 'myDomain.sharepoint.com';
         const sitePath = '/IT/assetmanagement'; 

         const itemId = item.sharepointID;
 
         
         const tokenUrl = `https://login.microsoftonline.com/${tenantId}/oauth2/v2.0/token`;
         const tokenBody = new URLSearchParams({
             client_id: clientId,
             scope: 'https://graph.microsoft.com/.default',
             client_secret: clientSecret,
             grant_type: 'client_credentials'
         });
 
         const tokenResponse = await axios.post(tokenUrl, tokenBody.toString(), {
             headers: { 'Content-Type': 'application/x-www-form-urlencoded'}                      
              
         });
         const accessToken = tokenResponse.data.access_token;
 
         
         const headers = { Authorization: `Bearer ${accessToken}`};
        
      
         
           
        
         
         
         const siteUrl = `https://graph.microsoft.com/v1.0/sites/${siteDomain}:${sitePath}`;
         const siteResponse = await axios.get(siteUrl, { headers });
         const siteId = siteResponse.data.id;
 
         
         const sharepointUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists`;
         const listResponse = await axios.get(sharepointUrl, { headers });
         const computersList = listResponse.data.value.find(list => list.name === 'Computers');

         
         
         

         const itemsUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${computersList.id}/items/${itemId}`;
         console.log(`Fetching items from: ${itemsUrl}`); // Log the request URL
       const response = await axios.delete(itemsUrl,  {headers});
      console.log(response);
         //This if statement needs to be here. It seems that it hangs if its expecting a 204, but gets some other code;
         //Possibly, or more likely, the fetch on the client side is expecting a 200 and doesn't get it. If there are too 
         //many unresolved fetches, eventually the system hangs. If its an error code it moves on (even though there was not actually an error.)
       if (response.status !== 200) {
            throw new Error(`Unexpected response: ${response.status}`);
        };
        
         console.log('bottom of delete from sharepoint');
        
        
     } catch (error) {
        console.log(item);
         console.error('Error fetching data:', error.message);
         console.error('Error details:', error.response ? error.response.data : error);
         
          res.redirect('/');
        
     }
    
})



module.exports = router;
 