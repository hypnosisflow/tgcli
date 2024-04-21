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
  firstDay: 1704812799,
  lastDay: 1706720399, 
}

const February = {
  firstDay: 1706720400,
  lastDay: 1709225999,
}

const March = {
  firstDay: 1709312399,
  lastDay: 1711904399,
}

const April = {
  firstDay: 1711990799,
  lastDay: 1714496399,
}

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
