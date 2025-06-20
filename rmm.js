

//-------------------------------------------------
   // RMM data 






module.exports = async function rmm(){


try {
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}


 
    const rmmList = [];

    async function getRmmToken(){
      let options = {
        method: 'POST',
      headers: {
        accept: '*/*',
        authorization: 'Bearer apiKey'
      }
      };
    const r = await fetch('https://rmm.mgmhealthcare.com/api/auth/authenticate', options);
    let tokens =await r.json();
    console.log(tokens);
    let token =tokens.tokens.access.token;
    return  token ;
    //console.log(token);
  }
  
  
  const token = await getRmmToken();
  
  async function queryRMM(URL,options){
      
      const r = await fetch(URL,options);
      const results = await r.json();
      //console.log(results);
      return results;
  }
  
  const options = {
    method: 'GET', 
    headers: {
      accept: '*/*',
      authorization: `Bearer ${token}`
    }
  
  
  };
  let deviceList = [];
  let deviceInfoList = [];
  let rmmFullList=[];
  let rmmListPlus=[]; 
  let pageNumber = 1;
  let hasData = true;
  while (true){
  
      const URL = `https://rmm.mgmhealthcare.com/api/devices?pageNumber=${pageNumber}&pageSize=100`;
  
      const data = await queryRMM(URL,options);
     
      if(!data.data || data.data.length ===0){
          break;
      }
      console.log(`Rmm pageNumber: ${pageNumber}`);
      
      
      pageNumber++;
    deviceList.push(data);
  };

  let delay =0;
  let counter = 1;  
  console.log(counter);

  let i=0;
  deviceList.forEach((item) => {
     item.data.forEach(item2 =>{
        rmmList.push(item2.longName);
        rmmListPlus.push({computerName: item2.longName,
          siteName: item2.siteName,
          lastLoggedInUser: item2.lastLoggedInUser});
        
        });
  });
  
  let t=0;
  
  
  for(const computer of deviceList){
    await wait(250);

  let computerData =computer.data;

            for(const computer2 of computerData){

              
    //if (t<5){
             
            let id = computer2.deviceId; 
             
            
            
           //async function getAssetInfo(){   
      
                      const URL2 = `https://rmm.mgmhealthcare.com/api/devices/${id}/assets`;
                      const assetData = await queryRMM(URL2,options);
                      

                    console.log(counter);

                    if (assetData.data){
                      if(assetData.data.device && assetData.data.computersystem){
                  
                
                      // console.log(assetData.data.computersystem.serialnumber);
                        //console.log(assetData.data.computersystem.manufacturer);
                        //console.log(assetData.data.computersystem.model);
                        deviceInfoList.push({rmmComputerId: id,
                                    serialNumber: assetData.data.computersystem.serialnumber,
                                    make: assetData.data.computersystem.manufacturer,
                                    model: assetData.data.computersystem.model,
                                  deviceType: assetData.data.device.deviceclass  } );
                                    
                      } 
                       else if(!assetData.data.device && !assetData.data.computersystem){
                        deviceInfoList.push({rmmComputerId: id,
                                    serialNumber: assetData.data.computersystem.serialnumber,
                                    make: assetData.data.computersystem.manufacturer,
                                    model: assetData.data.computersystem.model,
                                  deviceType: 'N/A' } );
                      }
                     else if(!assetData.data.device &&assetData.data.computersystem){
                        deviceInfoList.push({rmmComputerId: id,
                                    serialNumber: assetData.data.computersystem.serialnumber,
                                    make: assetData.data.computersystem.manufacturer,
                                    model: assetData.data.computersystem.model,
                                  deviceType: 'N/A' } );
                      }
                      else if (!assetData.data.computersystem && assetData.data.device){
                        deviceInfoList.push({rmmComputerId: id,
                                    serialNumber:'No data available from RMM',
                                    make:'No data available from RMM',
                                    model: 'No data available from RMM',
                                  deviceType: assetData.data.device.deviceclass } )
                      }
                    }
                      if(!assetData.data){              
                      
                          deviceInfoList.push({rmmComputerId: id,
                          serialNumber: 'No data available from RMM',
                          make: 'No data available from RMM',
                          model: 'No data available from RMM',
                           deviceType: 'No data available from RMM' 
                        })
                    
                      }  
                      counter++; 
                    
                      rmmFullList.push({...rmmListPlus[i],...deviceInfoList[i]}) ; 
                
                
                      console.log('in merge');
                      
                        i++;
                        t++;
              //};

              
             
           //getAssetInfo();
          
          
                           
    };
    delay +=250; 
 //};//end of if statement

  };
      
  
 

 //console.log('Rmm data');  

console.log('finished for loop');
    

     
    

     
     
   
  console.log(rmmList.length);
 
 return rmmFullList;
} catch (error) {
  console.error(error);
  
}
 
  


} ; 