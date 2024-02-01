const { TelegramClient } = require("telegram");
const { Api } = require("telegram/tl");
const { StringSession } = require("telegram/sessions");

const sharp = require("sharp");
const input = require("input");

const { getSortedUsersInfo, generateReplises } = require("./helpers");
const { generateList } = require("./helpers");

const setPeriod = require("./helpers/date");

const stringSession = process.env.STRING_SESSION;
const apiId = process.env.API_ID;
const apiHash = process.env.API_HASH;

async function Service() {
  const client = new TelegramClient(
    new StringSession(stringSession),
    +apiId,
    apiHash,
    { connectionRetries: 1 }
  );

  await client.start({
    phoneNumber: async () => await input.text("number ?"),
    password: async () => await input.text("password?"),
    phoneCode: async () => await input.text("code ?"),
    onError: (err) => console.log(err),
  });
  console.log("You should now be connected.");

  // MY CLIENT DIAGLOS
  const dialogs = await client.getDialogs();
  // console.log(dialogs[0]);

  // PARTICIPANTS OF CHAT
  const particip = await client.getParticipants("-1001529421031");
  console.log(particip[101].id.value);

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

      const length = history.messages.length;

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
  const chatId = "-1001529421031";

  async function getChat(chat, inputDate) {
    const newFullArray = [];
    let lastItemDate = Date.now();
    let offset = 0;
    let inputDateMS = setPeriod(inputDate);

    while (lastItemDate > inputDateMS) {
      const history = await client.invoke(
        new Api.messages.GetHistory({
          peer: chatId,
          offsetId: offset,
          limit: 10,
        })
      );

      // console.log(typeof history.messages);

      const length = history.messages.length;

      if (length === 0) {
        break;
      }

      lastItemDate = history.messages[length - 1].date * 1000;
      offset = history.messages[length - 1].id;

      newFullArray.push(...history.messages);
    }

    const messagesUntilDate = newFullArray.filter(
      (message) => message.date <= inputDateMS
    );
    const usersWithMsgsList = generateList(messagesUntilDate);
    const chatUsersInfo = getSortedUsersInfo(usersWithMsgsList);

    return chatUsersInfo;
  }

  // not working
  // eerrors says about entities connection..... wtf ?

  async function getUser(id) {
    const result = await client.invoke(
      new Api.users.GetFullUser({
        // id: Object.assign({}, "fd"),
        id: new Api.InputUser(290048059),
      })
    );
    console.log(result); // prints the result
  }

  async function getUsers(ids) {
    const result = await client.invoke(
      new Api.users.GetFullUser({
        id: ["918542960"],
      })
    );
    console.log(result); // prints the result
  }

  const getAll = async () => {
    const test = "766054057";
    const newArr = particip
      .map((i) => {
        if (i.id?.value === BigInt(test)) {
          const buf = Buffer.from(i.photo?.strippedThumb);

          const a = sharp(buf).toFile("output.jpg", (err, info) => {
            if (err) {
              console.error(err);
            } else {
              console.log(
                "Изображение успешно распарсено и сохранено в output.jpg"
              );
            }
          });

          return {
            username: i.username,
            firstname: i.firstName,
            lastname: i.lastName,
            phone: i.phone,
            photo: {
              id: i.photo.photoId,
              thumb: i.photo.strippedThumb,
            },
          };
          // return i
        }
      })
      .filter((i) => i);

    console.log(newArr[0].photo);
    return newArr;
  };

  // getUsers();

  return { getChannel, getChat, getUser, getUsers, getAll };
}

// Service();

module.exports = Service;
