'use strict';

module.exports = async function locationCodes(location){
switch (location) {
  case 'Adel':
    location = 2;
    break;
    case 'Arbor Court':
    location = 3;
    break;
    case 'Bentwood':
    location = 4;
    break;
    case 'Bettendorf':
    location = 5;
    break;
    case 'Broadway':
    location = 6;
    break;
    case 'Camelot':
    location = 7;
    break;
    case 'Cleveland':
    location = 8;
    break;
    case 'Corporate':
    location = 9;
    break;
    case 'Coweta':
    location = 10;
    break;
    case 'Eastgate':
    location = 11;
    break;
    case 'Florissant Valley':
    location = 12;
    break;
    case 'Forest Hills AL':
    location = 13;
    break;
    case 'Forest Hills Rehab':
    location = 14;
    break;
    case 'Fort Gibson':
    location = 15;
    break;
    case 'Genesis':
    location = 16;
    break;
    case 'Heritage':
    location = 17;
    break;
    case 'Jackson':
    location = 18;
    break;
    case 'Lake Drive':
    location = 19;
    break;
    case 'Lansdowne':
    location = 20;
    break;
    case 'Leisure Village':
    location = 21;
    break;
    case 'Mitchell':
    location = 22;
    break;
    case 'Normandy':
    location = 23;
    break;
     case 'Oak Park':
    location = 24;
    break;
     case 'Oakland':
    location = 25;
    break;
     case 'Parkview':
    location = 26;
    break;
     case 'Rainbow Health':
    location = 27;
    break;
     case 'Regency':
    location = 28;
    break;
     case 'Seminole':
    location = 29;
    break;
     case 'Sherbrooke':
    location = 36;
    break;
     case 'South Pointe':
    location = 31;
    break;
     case 'Spring Valley':
    location = 30;
    break;
     case 'Springfield':
    location = 32;
    break;
     case 'St. Sophia':
    location = 1;
    break;
     case 'Sunset':
    location = 33;
    break;
     case 'The Quarters':
    location = 34;
    break;
     case 'Walnut Grove':
    location = 35;
    break;


    default:
        location = 9;
}
return location;
}