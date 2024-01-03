# Tìm kiếm trên 1 triệu bản ghi với MYSQL

## Step 1: Insert dữ liệu

```js title="index.js"
const knex = require("knex")({
  client: "mysql2",
  connection: {
    host: "127.0.0.1",
    port: 3306,
    user: "root",
    password: "root123",
    database: "chat",
  },
});

const wordStr =
  "Ephemeral, labyrinthine, serendipity, cacophony, mellifluous, ethereal, clandestine, juxtapose, indelible, verisimilitude, myriad, effervescent, mellifluous, quintessential, scintillating, mellifluous, esoteric, nebulous, peregrinate, vicissitude, idyllic, incandescent, obfuscate, ineffable, sonorous, ephemeral, eclectic, sonorous, ethereal, clandestine, serendipity, mellifluous, labyrinthine, effulgent, somnambulist, labyrinthine, evanescent, myriad, quintessential, serendipity, ethereal, perspicacious, reverie, nebulous, ineffable, verisimilitude, discombobulate, ephemeral, quixotic, mellifluous, sonorous, clandestine, vicissitude, evocative, ineffable, serendipity, mellifluous, ephemeral, labyrinthine, ethereal, peregrinate, scintillating, ineffable, serendipity, mellifluous, nebulous, esoteric, clandestine, labyrinthine.";
const word = wordStr.split(",")?.map((w) => w.trim());

const getRandomWord = () => {
  return word[Math.floor(Math.random() * word.length)];
};
const getRandomMessage = () => {
  // each message that have 5 to 10 words
  const wordCount = Math.floor(Math.random() * 5) + 5;
  let message = "";
  for (let i = 0; i < wordCount; i++) {
    message += getRandomWord() + " ";
  }
  return message;
};

console.log(getRandomMessage());

const main = async () => {
  await knex.schema.hasTable("messages").then(function (exists) {
    if (!exists) {
      return knex.schema.createTable("messages", function (t) {
        t.increments("id").primary();
        t.string("message", 500);
        t.string("created_time", 100);
      });
    }
  });

  // insert 1 millions messages
  // insert 1 million messages
  for (let i = 0; i < 1000; i++) {
    const tempMessages = [];
    const totalRowPerBatch = 5000;
    for (let j = 0; j < totalRowPerBatch; j++) {
      const message = getRandomMessage();
      const createdTime = new Date().toISOString();
      tempMessages.push({ message, created_time: createdTime });
    }
    await knex("messages").insert(tempMessages);
    // batch insert
    console.log(
      "batch insert",
      i,
      tempMessages.length,
      "total inserted",
      i * totalRowPerBatch
    );
  }
};

main();
```

```bash
npm i knex mysql2 --save

node index.js
```

## SQL

```sql
SELECT COUNT(*)
FROM messages m
WHERE message LIKE 'evanescent%'; -- ~2s -- without index

CREATE INDEX idx_1__message USING BTREE ON chat.messages (message);

SELECT COUNT(*)
FROM messages m
WHERE message LIKE 'evanescent%'; -- after index: 62ms
```
