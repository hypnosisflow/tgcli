function getSortedUsersInfo(arr) {
  const filtered = arr.filter((i) => i);
  const userIds = filtered.map((i) => i.userId);

  const uniqueIdsList = userIds.filter(
    (item, index) => userIds.indexOf(item) === index
  );

  const attachMsgsToUsers = uniqueIdsList.map((userId) =>
    filtered.filter((i) => i.userId === userId)
  );

  const sortedUsersInfo = attachMsgsToUsers.map((user) => {
    const id = user[0].userId;
    const msgsList = user.map((i) => {
      const msg = { msg: i.msg, msgId: i.msgId, date: i.date };
      return msg;
    });
    const result = { userId: id, msgs: msgsList };
    return result;
  });

  return sortedUsersInfo;
}

function generateList(arr) {
  return arr.map((i) => {
    console.log(i)
    if (i.fromId?.userId?.value !== undefined)
      return {
        userId: i.fromId?.userId?.value.toString(),
        msgId: i.id,
        msg: i.message,
        date: i.date,
      };
  });
}

function generateReplises(arr) {
  return arr.map((i) => {
    if (i.fromId?.userId?.value !== undefined)
      return {
        userId: i.fromId?.userId?.value.toString(),
        msgId: i.id.toString(),
        msg: i.message,
        date: i.date,
      };
  });
}

module.exports = { getSortedUsersInfo, generateList, generateReplises };
