const rmm = require('./rmm.js');
const sharepoint = require('./sharepoint.js');
const adC = require('./adComputers.js');
const adU =require('./adUsers.js');
const freshservice = require('./freshservice.js');


module.exports = async function comparisons(){

    try {
    const sharepointComputers = await sharepoint();
    const adComputers = await adC();
    const adUsers = await adU();
    const freshserviceComputers = await freshservice();
    const rmmComputers = await rmm();
    const rmmTotal = rmmComputers.length;
    const sharepointTotal = sharepointComputers.length;
    const adTotal = adComputers.length;
    const freshserviceTotal = freshserviceComputers.length;

    let rmmComputerNames = [];
    let sharepointComputerNames = [];
    let sharepointMissing =[];
    let sharepointNotRmm = [];
    let sharepointMissingFromFreshservice = [];
    let rmmMissing = [];
    let freshserviceComputerNames = [];
    let rmmOverFreshservice = [];
    let freshserviceOverRmm = [];
    let rmmPlusAD = [];
    let rmmAdFreshservice = [];
    let adExtra = [];
    let fsExtra = [];

    let spMissingTotal = rmmComputers.length - sharepointComputers.length;

    

    //creating list of just the computer names

    rmmComputers.forEach(computer=>{
        rmmComputerNames.push(computer.computerName);

        
    });

    sharepointComputers.forEach(computer=>{
        sharepointComputerNames.push(computer.computerName);
    });

    function compareArrays(str, arr){
        return arr.every(element => element !== str);
    };

  
    let c = 0;
    let u = 0;
    let i = 0;
    let nameString;
    let adUserNameArr = [];

    rmmComputers.forEach(computer=>
    {
        const stringify = computer.lastLoggedInUser;
        const compString = stringify.slice(4);
            adUsers.forEach(user=>
            {
                nameString = user.userName;
                adUserNameArr.push(nameString);

                if(compString===nameString){
                    rmmPlusAD.push({...rmmComputers[c],...adUsers[u]});
                    console.log(adUsers[u]);
                    //console.log(rmmPlusAD[i]);
                    i++;
                };
                
                u++;
            });

            if(adUserNameArr.every(element => element !== compString)){
                rmmPlusAD.push({...rmmComputers[c],userName:'N/A',
                        lastName: 'N/A',
                        firstName: 'N/A',
                        department: 'N/A',
                        title: 'N/A',
                        office: 'N/A',
                        lastLogon: 'N/A',
                        inAD: true});
            };
            u=0;
            c++;
            adUserNameArr = [];
  });

  rmmPlusAD.forEach(entry=>{
    if(!adComputers.includes(entry.computerName)){
        entry.inAD = false;
    }
  });

  let j = 0;
  let counter = 1;
  rmmPlusAD.forEach(computer=>{
    let rmmName = computer.computerName;
    freshserviceComputers.forEach(fsComputer=>{
        if(rmmName ===fsComputer.name){ 
           
          if(fsComputer.assetTag){
                rmmAdFreshservice.push({itemNum:counter,...rmmPlusAD[j],freshserviceAssetTag:fsComputer.assetTag});
           } 
           if(!fsComputer.assetTag){
                rmmAdFreshservice.push({itemNum:counter,...rmmPlusAD[j],freshserviceAssetTag:'No asset tag'});
           }           
            
        }
       
       
    });
    if(!rmmAdFreshservice[j]){
        rmmAdFreshservice.push({itemNum:counter,...rmmPlusAD[j],freshserviceAssetTag:'Not in Freshservice'});
    };
    console.log('in add freshservice');
    //console.log(rmmAdFreshservice[j]);
    j++;
    counter++;
  })

  
  rmmAdFreshservice.forEach(computer =>{
    if(!sharepointComputerNames.includes(computer.computerName)){
        
        sharepointMissing.push(computer);
    };
 });

 let counter2 = 1;
 sharepointMissing.forEach(computer=>{
    computer.itemNum = counter2;
    counter2++;
 })

 

 //checking what's in sharepoint but not other lists

 sharepointComputers.forEach(computer=>{
    
    if(!rmmComputerNames.includes(computer.computerName)){
    
        computer.inRmm = false;
        sharepointNotRmm.push(computer);
    }
    if(!adComputers.includes(computer.computerName)){
        computer.inAD = false;
    }
    if(!freshserviceComputers.some(obj => Object.values(obj).includes(computer.computerName))){
        computer.inFreshService = false;
    }

 });

    let counterSharepoint = 1;
    sharepointNotRmm.forEach(computer=>{
    computer.itemNum = counterSharepoint;
    computer.inRmm = false;

    if(!adComputers.includes(computer.computerName)){
        computer.inAD = false;
    }
    if(!freshserviceComputers.some(obj => Object.values(obj).includes(computer.computerName))){
        computer.inFreshService = false;
    }
    counterSharepoint++;
 })

 
  console.log(sharepointMissing.length);

  sharepointComputers.forEach(computer=>{
        if(!rmmComputers.includes(computer)){
            rmmMissing.push(computer);
        };
    });
   
    freshserviceComputers.forEach(computer=>{
        freshserviceComputerNames.push(computer.name);
    });

    freshserviceComputers.forEach(computer=>{
        if(!sharepointComputers.includes(computer)){
            sharepointMissingFromFreshservice.push(computer);
           
        };
    });

    freshserviceComputers.forEach(computer=>{
        if(!rmmComputers.includes(computer)){
            freshserviceOverRmm.push(computer);

            };
    });
    rmmComputers.forEach(computer=>{
        if(!freshserviceComputers.includes(computer)){
            rmmOverFreshservice.push(computer);
        };
    });

    adComputers.forEach(computer=>{
        if (!rmmComputerNames.includes(computer)){
            adExtra.push(computer);
            fsExtra.push(computer);

        }
    })

   
    return {
        rmmComputers,
        rmmComputerNames,
        rmmPlusAD,    
        rmmTotal,
        sharepointComputers,
        sharepointComputerNames,
        sharepointNotRmm,
        sharepointTotal,
        adComputers,
        adTotal,
        adExtra,
        fsExtra,
        freshserviceComputers,
        freshserviceComputerNames,
        freshserviceTotal,
        
        sharepointMissing,

        spMissingTotal

    }
    } catch (error) {
        console.error(error);
    }
    
}; 