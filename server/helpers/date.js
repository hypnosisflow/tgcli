const today = new Date();
const day = 24 * 60 * 60 * 1000;
const weekMS = 7 * day;
const threeDaysMS = 3 * day;
const oneMonthMS = weekMS * 4;

const oneWeekAgo = today.getTime() - weekMS;
const theeDaysAgo = today.getTime() - threeDaysMS;
const oneMonthAgo = today.getTime() - oneMonthMS;
const threeMonthsAgo = today.getTime() - oneMonthMS * 4;

function setPeriod(period) {
  switch (period) {
    case "quater":
      return threeMonthsAgo;
    case "week":
      return oneWeekAgo;
    case "month":
      return oneMonthAgo;
    default:
      return;
  }
}

module.exports = setPeriod;
