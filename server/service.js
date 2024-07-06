const { TelegramClient } = require("telegram");
const { Api } = require("telegram/tl");
const { StringSession } = require("telegram/sessions");

const sharp = require("sharp");
const input = require("input");

const { getSortedUsersInfo, generateReplises } = require("./helpers");
const { generateList } = require("./helpers");

const setPeriod = require("./helpers/date");

const chatId = "-1001529421031";

const stringSession = process.env.STRING_SESSION;
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;

async function Service() {
  const client = new TelegramClient(
    new StringSession(stringSession),
    +apiId,
    apiHash,
    {
      connectionRetries: 5,
    }
  );

  await client.start({
    phoneNumber: async () => await input.text("number ?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("code ?"),
    onError: (err) => console.log(err),
  });

  console.log(client.session.save());

  console.log("You should now be connected.");

  // client.start()

  // // MY CLIENT DIAGLOS
  // const dialogs = await client.getDialogs();

  // PARTICIPANTS OF CHAT

  // section for CHANNEL
  const channelPlatformId = "-1001789253515";

  async function getChannel(channel, period) {
    const channelHistory = [];
    let lastItemDate = Date.now();
    let offset = 0;
    let inputDateMS = setPeriod(period);

    while (lastItemDate > inputDateMS) {
      const history = await client.invoke(
        new Api.messages.GetHistory({
          peer: channelPlatformId,
          limit: 100,
        })
      );

      const length = history.messages?.length;

      if (length === 0) {
        break;
      }

      lastItemDate = history.messages[length - 1].date * 1000;
      offset = history.messages[length - 1].id;

      channelHistory.push(...history.messages);
    }

    async function getUsersRepliesShortList(id) {
      const postRepliesById = await client.invoke(
        new Api.messages.GetReplies({
          // peer: channel.toString(),
          peer: channelPlatformId,
          msgId: id,
          limit: 100,
        })
      );
      const repliesList = generateReplises(postRepliesById.messages);

      const repliesFullInfo =
        repliesList.length > 0
          ? { postId: id, repliesInfo: repliesList }
          : null;

      return repliesFullInfo;
    }

    // array with postIds and userIds and replies count per post
    async function extract() {
      const result = [];
      const repliedMsgIdList = channelHistory
        .filter((i) => i.replies !== null)
        .map((i) => i.id);

      for (const id of repliedMsgIdList) {
        await getUsersRepliesShortList(id).then((res) => {
          if (res !== null) {
            result.push(res.repliesInfo);
          }
        });
      }

      return result;
    }

    const arrOfRepliesSplitted = await extract();
    const arrOfReplies = [].concat(...arrOfRepliesSplitted);
    const channelUsersInfo = getSortedUsersInfo(arrOfReplies);

    return channelUsersInfo;
  }

  // section for GROUP CHAT

  const ROMA_CHAT = "-1001337586711";
  async function getChat(chat, period) {
    const newFullArray = [];
    let target = setPeriod(period);
    let lastItemDate = Date.now();
    let offset = 0;

    // todo: засетить структуру периодов когда мы не пикаем месяца, а отрезки

    while (lastItemDate > target.firstDay) {
      const history = await client.invoke(
        new Api.messages.GetHistory({
          peer: chat,
          offsetDate: target.lastDay,
          offsetId: offset,
          limit: 100,
        })
      );
      const length = history?.messages?.length;

      if (length === 0) {
        break;
      }

      lastItemDate = history.messages[length - 1].date;
      offset = history.messages[length - 1].id;
      newFullArray.push(...history.messages);
    }
    const messagesUntilDate = newFullArray.filter(
      (message) => message.date >= target.firstDay
    );
    const usersWithMsgsList = generateList(messagesUntilDate);
    const chatUsersInfo = getSortedUsersInfo(usersWithMsgsList).sort(
      (a, b) => b.msgs?.length - a.msgs?.length
    );

    return chatUsersInfo;
  }

  // data of ids
  const { log } = console;
  const getUsers = async (data, id) => {
    const particip = await client.getParticipants(id);

    const unique = [...new Set(data.map((i) => BigInt(i)))];

    const newArr = particip
      .map((i) => {
        if (unique.includes(i.id?.value)) {
          return {
            user_id: i.id.value.toString(),
            username: i.username,
            firstname: i.firstName,
            lastname: i.lastName,
            phone: i.phone,
            photo: {
              id: i.photo?.photoId,
              thumb: i.photo?.strippedThumb,
            },
          };
        }
      })
      .filter((i) => i);

    return newArr;
  };

  return { getChannel, getChat, getUsers };
}

module.exports = Service;
