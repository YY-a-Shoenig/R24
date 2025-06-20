const axios = require('axios');

module.exports = async function freshservice(){


async function queryFreshservice(freshserviceURL,options){
     
     const r = await axios.get(freshserviceURL,options);
     
     const results =await r.data.assets;
     
     //console.log(results);
     return results;
 }
 let freshserviceComputers= [];
 let page = 1;
 let number = 1;
 while(true){
     
     const freshserviceURL = `https://mgmhealthcare.freshservice.com/api/v2/assets?order_by=name&order_type=asc&page=${page}`;
     const fsOptions ={
         headers: {
             'Authorization': 'Basic myKey'
         }
 
     };
 
 const freshserviceData = await queryFreshservice(freshserviceURL,fsOptions);
 //console.log(freshserviceData);
 console.log(`Freshservice page #${page}`)
 page++;
     if(freshserviceData.length===0){
     break;
     }
     
 freshserviceData.forEach(computer =>{
     freshserviceComputers.push({name: computer.name,
                                assetTag: computer.asset_tag
     });
    
 });
 }
 
 
 console.log(freshserviceComputers.length);
 /*
 if(freshserviceComputers.length > rmmList.length){
     
 
     let difference = freshserviceComputers.length-rmmList.length;
     res.write(`There are ${difference} more computers in FreshService than Rmm.\n`);
     res.write('Here are the extras in Freshservice not Rmm\n');
     
     let extraFSComputers =[];
 
    freshserviceComputers.forEach(computer =>{
         if(!rmmList.includes(computer)){
             extraFSComputers.push(computer);
             res.write(`${number}: ${computer}\n`);
             number ++;
         }
     })
    
 }
 if(rmmList.length > freshserviceComputers.length){
     for(i=0;i<15;i++){
         res.write('\n');
     }
     //res.write(`There are ${difference} more computers in Rmm than Freshservice.\n`);
     //res.write('Here are the extras in Rmm not if Freshservice');
     let extraRMMComputers =[];
     //let difference = rmmList.length-freshserviceComputers.length;
     rmmList.forEach(computer =>{
         if(!freshserviceComputers.includes(computer)){
             extraRMMComputers.push(computer);
             res.write(`${computer}\n`);
         }
        
     })
 }*/

    return freshserviceComputers;

}