const today = new Date();
const day = 24 * 60 * 60 * 1000;
const weekMS = 7 * day;
const threeDaysMS = 3 * day;
const oneMonthMS = weekMS * 4;

const oneWeekAgo = today.getTime() - weekMS;
const theeDaysAgo = today.getTime() - threeDaysMS;
const oneMonthAgo = today.getTime() - oneMonthMS;
const threeMonthsAgo = today.getTime() - oneMonthMS * 3;

const January = {
  from: 1675166399,
  to : 1672531200000, 
}

const February = {
  from: 1677844799,
  to: 1675166400000,
}

const March = {
  from: 1680436799,
  to: 1677844800000,
}

const April = {
  from: 1683115199,
  to:1680436800000,
}

    // let offsetDate = 1675166400 // January 31, 2024
    // let targetDate = 1672531200000 // January 1, 2024

function setPeriod(period) {
  switch (period) {
    case "quater":
      return threeMonthsAgo;
    case "week":
      return oneWeekAgo;
    case "month":
      return oneMonthAgo;
    case 'january':
      return January;
    case 'february':
      return February;  
    case 'march':
      return March;
    case 'april':
    return April;
      
    default:
      return;
  }
}

module.exports = setPeriod;
