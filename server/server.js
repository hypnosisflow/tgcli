const express = require("express");
const cors = require("cors");
const client = require("./db");
const Service = require("./service");

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));

const loadService = async (req) => {
  const service = await Service();

  const data = async (req) => {
    const { id, type, period, data } = req.query;
    // const { data } = req.body;

    switch (type) {
      case "channel":
        const channel = await service.getChannel(id, period);
        return channel;
      case "chat":
        const chat = await service.getChat(id, period);
        return chat;
      case "user":
        const users = await service.getUsers(data);
        return users;
      default:
        console.log("err on server side");
    }
  };

  const result = await data(req);

  return result;
};

app.get("/", async (req, res) => {
  try {
    const response = await loadService(req);
    res.send({
      response: response,
      type: req.query.type,
      chatId: req.query.id,
    });
  } catch (error) {
    console.log(error);
    res.json({ error: error, msg: "Error on server (LOAD SERVICE)" });
  }
});

app.get("/database", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "public"."users"');
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.json({ error: error, msg: "Error on server (SQL)" });
  }
});

app.get("/dashboard", async (req, res) => {
  try {
    const response = await loadService(req);
    res.json({ data: response });
  } catch (error) {
    console.log(error);
    res.json({ error: error, msg: "Error on server (SQL)" });
  }
});

const { log } = console;

app.post("/dashboard", async (req, res) => {
  const { data, id, period, date } = req.body;
  // log(req.body);

  async function send(arr) {
    arr.forEach(async (user) => {
      const { userId, msgs, firstname, lastname, phone, username } = user;
      const query =
        "INSERT INTO users (period_filter, chat_id, report_date, user_id,  firstname, lastname, username ,  phone,content) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9);";
      const data = [
        period,
        id,
        date,
        userId,
        firstname,
        lastname,
        username,
        phone,
        JSON.stringify(msgs),
      ];
      await client.query(query, data);
    });
  }

  try {
    await send(data);
    return res.status(200).json("ok");
  } catch (error) {
    res.json({ error: error, msg: "Error on server (POST)" });
    return error;
  }
});

app.listen(PORT, () => {
  // console.log(`Server is running on port: ${PORT}`);
});
