var axios = require('axios');
//sharepoint data
 module.exports = async function sharepoint(){
    
 async function fetchComputersList() {
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
 
         
         const headers = { Authorization: `Bearer ${accessToken}` };
 
         
         const siteUrl = `https://graph.microsoft.com/v1.0/sites/${siteDomain}:${sitePath}`;
         const siteResponse = await axios.get(siteUrl, { headers });
         const siteId = siteResponse.data.id;
 
         
         const sharepointUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists`;
         const listResponse = await axios.get(sharepointUrl, { headers });
         const computersList = listResponse.data.value.find(list => list.name === 'Computers');
 
        
         //Right now the limit is 4000. If there are ever more computers than that, this will be a problem.
         //The problem with looping until all the data is finished is that the field name for the link of the next URL is @odata.nextLink, which is hard to put into code
         //because it thinks it's a decoration. 

         const itemsUrl = `https://graph.microsoft.com/v1.0/sites/${siteId}/lists/${computersList.id}/items?expand=fields&$orderby=fields/Title&$top=4000`;
         console.log(`Fetching items from: ${itemsUrl}`); // Log the request URL
         const itemsResponse = await axios.get(itemsUrl, {headers });

         
         console.log('sharepoint data'); 
             
       
         console.log(`Items in '${computersList.name}' List:`);

        
 
        
        const computers = itemsResponse.data.value;        
        return computers;
     } catch (error) {
         console.error('Error fetching data:', error.message);
         console.error('Error details:', error.response ? error.response.data : error);
        
     }
   } 
 
   //function to clean out any hidden characters
    function cleanString(str) {
    return str.replace(/\s/g, ''); 
    };
    let sharepointList =[];
    let sharepointListWithBools = [];
    let sharepointMissing =[];
    let counter = 1;
    const computers = await fetchComputersList();

    
    computers.forEach(computer =>{
    if(computer.fields.Device_x0020_Type !== 'Tablet'){
        let newString = cleanString(computer.fields.Title)
        sharepointList.push({computerName: newString, sharepointID: computer.id});
    }
     
     
  });
  sharepointList.forEach(computer=>{
    sharepointListWithBools.push({itemNum: counter,...computer, inFreshService: true, inAD: true, inRmm: true});
    counter++;
  })
  
  console.log(sharepointList.length);



  
   return sharepointListWithBools;
    }; 

   
 