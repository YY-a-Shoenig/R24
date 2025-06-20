const odbc = require('odbc');


module.exports = async function adUsers(){

async function connectToDSN() {
     const dsnName = 'dsnName'; 
    
     try {
       const connection  = await odbc.connect(`DSN=${dsnName};UID=uid;PWD=pwd`);
       console.log('Connected to DSN successfully.');
    
       
       const result = await connection.query('SELECT * FROM Active_Directory_Users');
       
    
       await connection.close();
       console.log('Connection closed.');
       return result;
     } catch (err) {
       console.error('ODBC Connection error:', err);
     }
   }
    
   const adList = await connectToDSN();
   //console.log(adList);
 
   let adUsers = [];
   
     adList.forEach(entry =>{
         adUsers.push({userName: entry.samAccountName,
                        lastName: entry.lastName,
                        firstName: entry.firstName,
                        department: entry.department,
                        title: entry.title,
                        office: entry.physicalDeliveryOfficeName,
                        lastLogon: entry.lastLogon
         });
         //console.log(entry.computerName);
     })
     adUsers.forEach(user=>{
        //console.log(user);
     });
     console.log(adUsers.length);
 
     
    
    
     return adUsers;
    }