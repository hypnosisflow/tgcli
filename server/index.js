const express = require("express");
const cors = require("cors");
const client = require("./db");
const Service = require("./service");

const PORT = process.env.PORT || 5050;

const app = express();

app.use(cors());
app.use(express.json({ limit: "50mb", extended: true, parameterLimit: 50000 }));

// app.use(function (req, res, next) {
//   res.header("Access-Control-Allow-Origin", "http://localhost:5173/"); // update to match the domain you will make the request from
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-With, Content-Type, Accept"
//   );
//   next();
// });

// const loadData = async (req) => {
//   const channel = await service.getChannel(id, period);
//   const chat = await service.getChat(id, period);
//   const users = await service.getUsers(data);
// };

app.get("/", async (req, res) => {
  const service = await Service();

  const { id, type, period, data } = req.query;

  console.log("type", type);

  if (!type) res.json({ msg: "Welcom to TGServer!" });

  if (type === "chat") {
    try {
      const response = await service.getChat(id, period);
      // console.log(response);

      res.send({
        response: response,
        type: req.query.type,
        chatId: req.query.id,
      });
    } catch (error) {
      console.log(error, "err");
      res.json({ error: error, msg: "Error on server (LOAD SERVICE) TG" });
    }
  }

  if (type === "user") {
    try {
      const response = await service.getUsers(data, id);
      console.log("user", response);
      res.send({
        response: response,
      });
    } catch (error) {
      console.log(error, "err");
      res.json({ error: error, msg: "Error on server (LOAD SERVICE) TG" });
    }
  }
});

app.get("/database", async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM "public"."users"');
    res.json({ data: result });
  } catch (error) {
    console.log(error);
    res.json({ error: error, msg: "Error on server (SQL) DB" });
  }
});

app.get("/dashboard", async (req, res) => {
  const { id, type, period, data } = req.query;
  console.log("da", data);

  try {
    // const response = await loadService(req);
    const users = await service.getUsers(data);
    res.json({ data: users });
  } catch (error) {
    console.log(error);
    res.json({ error: error, msg: "Error on server (SQL) DASH" });
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
  console.log(`Server is running on port: ${PORT}`);
});
