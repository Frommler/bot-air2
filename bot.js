const { Telegraf, Markup } = require("telegraf");
const { message } = require("telegraf/filters");
require("dotenv").config();

const bot = new Telegraf(process.env.BOT_API_KEY);
bot.start((ctx) => {
  ctx.reply(
    "Welcome",
    Markup.keyboard([
      Markup.button.locationRequest("Send my application"),
    ]).resize()
  );
});
bot.on("location", async (ctx) => {
  const {longitude, latitude} = ctx.update.message.location;
  
  let api = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${process.env.WEATHER_API_KEY}&units=metric`;

  const response = await fetch(api);
  const jsonData = await response.json();
  const {speed, deg} = jsonData.wind;
  console.log(jsonData);
  console.log(speed);
  console.log(deg);
  console.log(ctx.botInfo.username);
  //TODO save to DB
  ctx.reply(`Your application is accepted, ${new Date().toLocaleString()}`);
});

bot.launch();

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
