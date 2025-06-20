'use strict';

module.exports = async function departmentCodes(department){
switch (department) {
  case 'Accounting':
    department = 1;
    break;
     case 'Activities':
    department = 2;
    break;
     case 'Administration':
    department = 3;
    break;
     case 'Business Office':
    department = 4;
    break;
     case 'Clinical Reimbursement':
    department = 5;
    break;
     case 'Dietary':
    department = 6;
    break;
     case 'Environmental Services':
    department = 7;
    break;
     case 'Human Resources':
    department = 8;
    break;
     case 'Information Technology':
    department = 9;
    break;
     case 'Legal':
    department = 10;
    break;
     case 'Maintenance':
    department = 11;
    break;
     case 'Marketing':
    department = 12;
    break;
     case 'Nursing Administration':
    department = 13;
    break;
     case 'Nursing CMT':
    department = 14;
    break;
     case 'Nursing CNA':
    department = 15;
    break;
     case 'Nursing LPN':
    department = 16;
    break;
     case 'Nursing RN':
    department = 17;
    break;
     case 'Nursing Support':
    department = 18;
    break;
     case 'Purchasing':
    department = 19;
    break;
     case 'Social Services':
    department = 20;
    break;
     case 'Medical Records':
    department = 21;
    break;

       default:
        department = 9;
}
return department;
}