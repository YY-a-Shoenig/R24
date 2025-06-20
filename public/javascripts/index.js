
'use strict';



const refreshButton = document.querySelector('#refreshButton');
const generateADCsv = document.querySelector('#generateADCsv');
const generateFsCsv = document.querySelector('#generatefsCsv');
const notSharepointButton = document.querySelector('#notSharepoint');
const sharepointButton = document.querySelector('#sharepointNotRmm');
const bodyDiv = document.querySelector('#bodyDiv');
const variableDiv = document.querySelector('#variableDiv');
const navigateButtonDiv = document.querySelector('#navigateButtonDiv');
const buttonDiv = document.querySelector('#headerButtonDiv');
const titleDiv = document.querySelector('#title');
const workingDiv = document.querySelector('#working');
const infoDiv = document.querySelector('#infoDiv');
const errorDiv = document.querySelector('#errorDiv');

errorDiv.style.display = 'none';

workingDiv.style.display = 'none';


refreshButton.addEventListener('click', refreshData);


generateADCsv.style.display = 'none';
generateFsCsv.style.display = 'none';

async function refreshData() {
     working.style.display = 'inline-block';
    infoDiv.textContent = 'You clicked: "Refresh Data".';

    notSharepointButton.removeEventListener('click',showNotSharepointList);
    sharepointButton.removeEventListener('click', showSharepointNotRmmList);

    await fetch('refreshData');

    notSharepointButton.addEventListener('click',showNotSharepointList);
    sharepointButton.addEventListener('click', showSharepointNotRmmList);
    working.style.display = 'none';
    
}



const total = document.querySelector('#total');

variableDiv.style.display = 'none';

let bodyText;
let button;

notSharepointButton.addEventListener('click',showNotSharepointList);
sharepointButton.addEventListener('click', showSharepointNotRmmList);


async function showNotSharepointList(){
    try {
        refreshButton.removeEventListener('click', refreshData);
        working.style.display = 'inline-block';
        infoDiv.textContent = 'You clicked: "View computers in Rmm but not in Sharepoint".'

    variableDiv.style.display = 'none';
    navigateButtonDiv.replaceChildren();
    buttonDiv.replaceChildren();

    sharepointButton.removeEventListener('click', showSharepointNotRmmList);
    notSharepointButton.removeEventListener('click',showNotSharepointList);
    
    let rowWidth;
    
    let s = await fetch('/rmmNotSharepoint');
    let notSharepointList= await s.json();

    titleDiv.textContent = 'Computers in Rmm not Sharepoint\n\n In Rmm: \u2705 In Sharepoint: \u274C';

    bodyDiv.replaceChildren();

    let table = document.createElement('table');
    bodyDiv.appendChild(table);
    let header= document.createElement('thead');
    table.appendChild(header);
    let headerRow = document.createElement('tr');
    header.appendChild(headerRow);

    let itemNum = document.createElement('th');
    itemNum.textContent='Item #';
    let computerName = document.createElement('th');
    computerName.textContent= 'Computer Name';
    let siteName = document.createElement('th');
    siteName.textContent = 'Site Name';
    let lastLoggedInUser = document.createElement('th');
    lastLoggedInUser.textContent = 'Last Logged In User';
    let rMMId = document.createElement('th');
    rMMId.textContent = 'RMM Id';
    let serialNumber = document.createElement('th');
    serialNumber.textContent = 'Serial Number/Service Tag';
    let make = document.createElement('th');
    make.textContent = 'Make';
    let model = document.createElement('th');
    model.textContent = 'Model';
    let deviceType = document.createElement('th');
    deviceType.textContent = 'Device Type';
    let userName = document.createElement('th');
    userName.textContent = 'UserName';
    let lastName = document.createElement('th');
    lastName.textContent = 'Last Name';
    let firstName = document.createElement('th');
    firstName.textContent = 'First Name';
    let department = document.createElement('th');
    department.textContent = 'Department';
    let title = document.createElement('th');
    title.textContent = 'Title';
    let office = document.createElement('th');
    office.textContent = 'Office';
    let lastLogon = document.createElement('th');
    lastLogon.textContent = 'Last Logon';
    let freshserviceAssetTag = document.createElement('th');
    freshserviceAssetTag.textContent = 'Freshservice Asset Tag';
    let inAD = document.createElement('th');
    inAD.textContent = 'In AD';
    let manageItem = document.createElement('th');
    manageItem.textContent = 'Manage Item';

    headerRow.append(itemNum,computerName,siteName,lastLoggedInUser,rMMId,serialNumber,make,model,deviceType,userName,lastName,
        firstName,department,title,office,lastLogon,freshserviceAssetTag,inAD,manageItem    
    );

       

    let body = document.createElement('tbody');
    table.appendChild(body);
   

    if(notSharepointList.length===0){

        total.textContent = `Total: ${notSharepointList.length}`;
        variableDiv.style.display = 'block';

        //caption.textContent = `Total: ${sharepointList.length}`;

        rowWidth = 17;
        
        let rowData = document.createElement('td');
        
        rowData.colSpan = rowWidth;

        rowData.textContent = 'There are no computers in Rmm which are not in Sharepoint.';

        body.appendChild(rowData);

        let csvButton = document.createElement('button');
        csvButton.textContent = 'Generate Csv File of  Entire List';
        let viewSharepointButton = document.createElement('button');
        viewSharepointButton.textContent = 'View Sharepoint Not Rmm List';
        let ADButton = document.createElement('button');
        ADButton.textContent = 'Generate Csv File of Extra AD Computers';
        let fsButton = document.createElement('button');
        fsButton.textContent = 'Generate Csv File of Extra FS Computers';
        let seeAllButton = document.createElement('button');
        seeAllButton.textContent = 'See All Data';

    
        csvButton.classList.add('headerButton');
        viewSharepointButton.classList.add('headerButton');
        ADButton.classList.add('headerButton');
        fsButton.classList.add('headerButton');
        seeAllButton.classList.add('headerButton');

        total.style.marginTop = '1em';

        navigateButtonDiv.append(viewSharepointButton,seeAllButton);
        buttonDiv.append(ADButton,fsButton,csvButton);

        viewSharepointButton.addEventListener('click', showSharepointNotRmmList);

        csvButton.addEventListener('click',   () => window.location.href = '/updateSharepoint');
        ADButton.addEventListener('click',   () => window.location.href = '/extraAdComputers');
        fsButton.addEventListener('click',   () => window.location.href = '/extraFsComputers');
        seeAllButton.addEventListener('click',   () => window.location.href = '/seeAll');
        
        variableDiv.style.display = 'block';
        

        notSharepointButton.addEventListener('click',showNotSharepointList);
        sharepointButton.addEventListener('click', showSharepointNotRmmList);
        refreshButton.addEventListener('click', refreshData);

        working.style.display = 'none';
    }
    
    else if(notSharepointList.length !== 0){
        notSharepointList.forEach(item=>{

            total.textContent = `Total: ${notSharepointList.length}`;
            variableDiv.style.display = 'block';
            //caption.textContent = `Total: ${sharepointList.length}`;
            
            let bodyRow = document.createElement('tr');
            body.appendChild(bodyRow);

            let itemNumVal = document.createElement('td');
            itemNumVal.textContent = item.itemNum;           
            let computerNameVal = document.createElement('td');
            computerNameVal.textContent = item.computerName;            
            let siteNameVal = document.createElement('td');
            siteNameVal.textContent = item.siteName;
            let lastLoggedInUserVal = document.createElement('td');
            lastLoggedInUserVal.textContent = item.lastLoggedInUser;            
            let rMMIdVal = document.createElement('td');
            rMMIdVal.textContent = item.rmmComputerId;            
            let serialNumberVal = document.createElement('td');
            serialNumberVal.textContent=item.serialNumber;
            let makeVal = document.createElement('td');
            makeVal.textContent = item.make;    
            let modelVal = document.createElement('td');
            modelVal.textContent = item.model;    
            let deviceTypeVal = document.createElement('td');
            deviceTypeVal.textContent = item.deviceType;      
            let userNameVal = document.createElement('td');
            userNameVal.textContent = item.userName;  
            let lastNameVal = document.createElement('td');
            lastNameVal.textContent = item.lastName;     
            let firstNameVal = document.createElement('td');
            firstNameVal.textContent = item.firstName;      
            let departmentVal = document.createElement('td');
            departmentVal.textContent = item.department;
            let titleVal = document.createElement('td');
            titleVal.textContent = item.title;
            let officeVal = document.createElement('td');
            officeVal.textContent = item.office;
            let lastLogonVal = document.createElement('td');
            lastLogonVal.textContent = item.lastLogon;
            let freshserviceAssetTagVal = document.createElement('td');
            
            freshserviceAssetTagVal.textContent = item.freshserviceAssetTag === 'Not in Freshservice' ? '\u274C' : item.freshserviceAssetTag;
            
            let inADVal = document.createElement('td');
            inADVal.textContent = item.inAD === false ? '\u274C' :'\u2705';
            let manageItemVal = document.createElement('td');

            let addSharepointButton = document.createElement('button');
            addSharepointButton.textContent = 'Add to Sharepoint';
            addSharepointButton.classList.add('inTableButton');
            addSharepointButton.setAttribute('id',`${item.itemNum}`);

            

            manageItemVal.appendChild(addSharepointButton);            

            button = addSharepointButton.addEventListener('click', async ()=>{console.log('in click event');addToSharepoint(item);});
            

           

            

            bodyRow.append(itemNumVal,computerNameVal,siteNameVal,lastLoggedInUserVal,rMMIdVal,serialNumberVal,makeVal,modelVal,deviceTypeVal,userNameVal,lastNameVal,
                firstNameVal,departmentVal,titleVal,officeVal,lastLogonVal,freshserviceAssetTagVal,inADVal,manageItemVal
            );

    });

    let csvButton = document.createElement('button');
    csvButton.textContent = 'Generate Csv File of  Entire List';
    let viewSharepointButton = document.createElement('button');
    viewSharepointButton.textContent = 'View Sharepoint Not Rmm List';
    let ADButton = document.createElement('button');
    ADButton.textContent = 'Generate Csv File of Extra AD Computers';
    let fsButton = document.createElement('button');
    fsButton.textContent = 'Generate Csv File of Extra FS Computers';
    let seeAllButton = document.createElement('button');
    seeAllButton.textContent = 'See All Data';

    
    csvButton.classList.add('headerButton');
    viewSharepointButton.classList.add('headerButton');
    ADButton.classList.add('headerButton');
    fsButton.classList.add('headerButton');
    seeAllButton.classList.add('headerButton');
    total.style.marginTop = '1em';

    navigateButtonDiv.append(viewSharepointButton,seeAllButton);
    buttonDiv.append(ADButton,fsButton,csvButton);

    viewSharepointButton.addEventListener('click', showSharepointNotRmmList);

     csvButton.addEventListener('click',   () => window.location.href = '/updateSharepoint');
     ADButton.addEventListener('click',   () => window.location.href = '/extraAdComputers');
     fsButton.addEventListener('click',   () => window.location.href = '/extraFsComputers');
     seeAllButton.addEventListener('click',   () => window.location.href = '/seeAll');
    
     variableDiv.style.display = 'block';
     working.style.display = 'none';

    }
  
    notSharepointButton.addEventListener('click',showNotSharepointList);
    sharepointButton.addEventListener('click', showSharepointNotRmmList);
    refreshButton.addEventListener('click', refreshData);
   
    } catch (error) {
        errorDiv.style.display = 'block';
        errorDiv.textContent = `Error \n ${error}\n${button}`;
    }

   
};

async function showSharepointNotRmmList(){
    try {
            working.style.display = 'inline-block';

     navigateButtonDiv.replaceChildren();
     buttonDiv.replaceChildren();

    infoDiv.textContent = 'You clicked: "View computers in Sharepoint but not Rmm".';

    refreshButton.removeEventListener('click', refreshData);
    notSharepointButton.removeEventListener('click',showNotSharepointList);
    sharepointButton.removeEventListener('click', showSharepointNotRmmList);

    

    let s = await fetch('/sharepointNotRmm');
    let sharepointNotRmm= await s.json();

    titleDiv.textContent = 'Computers in Sharepoint not Rmm\n\nIn Sharepoint: \u2705 In Rmm: \u274C ';

    total.textContent = `Total: ${sharepointNotRmm.length}`

    bodyDiv.replaceChildren();
    

    let table = document.createElement('table');
    bodyDiv.appendChild(table);


    let header= document.createElement('thead');
    table.appendChild(header); 
    let headerRow = document.createElement('tr');
    header.appendChild(headerRow);

    let itemNum = document.createElement('th');
    itemNum.textContent = 'Item #';
    let computerName = document.createElement('th');
    computerName.textContent = 'Computer Name';
    let inAD = document.createElement('th');
    inAD.textContent = 'In AD';
    let inFreshService = document.createElement('th');
    inFreshService.textContent = 'In Freshservice';
    let manageItem = document.createElement('th');
    manageItem.textContent = 'Manage Item';

    headerRow.append(itemNum,computerName,inAD,inFreshService,manageItem);

    let body = document.createElement('tbody');
    table.appendChild(body);
   
    if (sharepointNotRmm.length ===0){
       let rowWidth = 5;
        
        let rowData = document.createElement('td');
        
        rowData.colSpan = rowWidth;

        rowData.textContent = 'There are no computers in Sharepoint which are not in Rmm.';

        body.appendChild(rowData);
    }
    else if(sharepointNotRmm.length !==0){
        sharepointNotRmm.forEach(item=>{

        let bodyRow = document.createElement('tr');
        body.appendChild(bodyRow);

        let itemNumVal = document.createElement('td');
        itemNumVal.textContent = item.itemNum;
        let computerNameVal = document.createElement('td');
        computerNameVal.textContent = item.computerName;
        let inADVal = document.createElement('td');
        let inFreshServiceVal = document.createElement('td');
        let manageItemVal = document.createElement('td');

        

        if (item.inAD ===true){
            inADVal.textContent = '\u2705';
        }
        else if (item.inAD === false){
            inADVal.textContent = '\u274C';
        }
        if (item.inFreshService === true){
            inFreshServiceVal.textContent = '\u2705'; 
        }
        else if(item.inFreshService === false){
            inFreshServiceVal.textContent = '\u274C';
        }

        let deleteSharepointButton = document.createElement('button');
        deleteSharepointButton.textContent = 'Delete from Sharepoint';
        deleteSharepointButton.classList.add('inTableButton');
        deleteSharepointButton.setAttribute('id',`${item.itemNum}`);

        deleteSharepointButton.addEventListener('click', async ()=>{console.log('in click event');deleteFromSharepoint(item);});


        manageItemVal.appendChild(deleteSharepointButton);

        bodyRow.append(itemNumVal,computerNameVal,inADVal,inFreshServiceVal,manageItemVal);


    });
    }

    

    let csvButton = document.createElement('button');
    csvButton.textContent = 'Generate Csv File of  Entire List';
    let viewRmmButton = document.createElement('button');
    viewRmmButton.textContent = 'View Rmm Not Sharepoint List';
    let ADButton = document.createElement('button');
    ADButton.textContent = 'Generate Csv File of Extra AD Computers';
    let fsButton = document.createElement('button');
    fsButton.textContent = 'Generate Csv File of Extra FS Computers';
    let seeAllButton = document.createElement('button');
    seeAllButton.textContent = 'See All Data';

    
    csvButton.classList.add('headerButton');
    viewRmmButton.classList.add('headerButton');
    ADButton.classList.add('headerButton');
    fsButton.classList.add('headerButton');
    seeAllButton.classList.add('headerButton');
    total.style.marginTop = '1em';

     viewRmmButton.addEventListener('click', showNotSharepointList);

     csvButton.addEventListener('click',   () => window.location.href = '/updateSharepoint');
     ADButton.addEventListener('click',   () => window.location.href = '/extraAdComputers');
     fsButton.addEventListener('click',   () => window.location.href = '/extraFsComputers');
     seeAllButton.addEventListener('click',   () => window.location.href = '/seeAll');

    navigateButtonDiv.append(viewRmmButton,seeAllButton);
    buttonDiv.append(ADButton,fsButton,csvButton);

   

    variableDiv.style.display = 'block';
    working.style.display = 'none';

    notSharepointButton.addEventListener('click',showNotSharepointList);
    sharepointButton.addEventListener('click', showSharepointNotRmmList);
    refreshButton.addEventListener('click', refreshData);
    } catch (error) {
        console.error(error);
        workingDiv.style.display = 'inline-block';
        workingDiv.textContent = error;
    }


}

 async function addToSharepoint(item){

                try {
                    console.log('in add to sharepoint function');
                //alert(`${item.computerName}`);
                let url = '/addItemToSharepoint';
                
                    const response = await fetch(url, {
                    method:  'POST',
                    body: JSON.stringify(item),
                    headers: {
                        'content-type': 'application/json'
                    }
                    });

                    

         
                    console.log('finished fetch');
                    
                } catch (error) {
                    cosnole.error(error);
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = error;
                    


                }

              
            
                
            }
            
async function deleteFromSharepoint(item) {
    try {
            let url = '/deleteSharepointItem';

                    console.log(item.computerName)
                    const response = await fetch(url, {
                    method:  'POST',
                    body: JSON.stringify(item),
                    headers: {
                        'content-type': 'application/json'
                    }
                    });
        console.log('end of delete from sharepoint');
    } catch (error) {
        cosnole.error(error);
                    errorDiv.style.display = 'block';
                    errorDiv.textContent = error;
    }
       
        }

  
