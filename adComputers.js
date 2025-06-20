const odbc = require('odbc');


module.exports = async function adComputers(){

async function connectToDSN() {
     const dsnName = 'myDsnName'; 
    
     try {
       const connection  = await odbc.connect(`DSN=${dsnName};UID=Id;PWD=pwd`);
       console.log('Connected to DSN successfully.');
    
       
       const result = await connection.query('SELECT * FROM Active_Directory_Computers ORDER BY computerName');
       //console.log(result);
    
       await connection.close();
       console.log('Connection closed.');
       return result;
     } catch (err) {
       console.error('ODBC Connection error:', err);
     }
   }
    
   const adList = await connectToDSN();
   //console.log(adList);
 
   let adComputers = [];
   
     adList.forEach(entry =>{
         adComputers.push(entry.computerName);
         //console.log(entry.computerName);
     })
     console.log(adComputers.length);
 
     //let difference = adComputers.length-rmmList.length;
     let extraADComputers = [];
     /*adComputers.forEach(computer =>{
         if(!rmmList.includes(computer)){
             extraADComputers.push(computer);
         };
     })*/
     
     
     //res.write(`There are ${difference} computers in AD which are not in RMM.\n`);
     //res.write('Here are the computers not in RMM:\n');
     /*/extraADComputers.forEach(computer =>{
         res.write(`${computer}\n`);
     })*/
     return adComputers;
    } 