// require('dotenv').config();
// const { Bot, GrammyError, HttpError, Keyboard } = require('grammy');
// const { session } = require('grammy');

// const bot = new Bot(process.env.BOT_API_KEY);
// const fs = require('fs');
// const { setInterval } = require('timers/promises');
// // Настройка сессии с помощью плагина
// bot.use(session({ initial: () => ({}) }));

// bot.api.setMyCommands([
//   {
//     command: 'start',
//     description: 'Запуск бота',
//   },
//   {
//     command: 'send_message',
//     description: 'Отправить сообщение в каналы',
//   },
// ]);

// bot.command('start', async (ctx) => {
//   await ctx.reply(
//     'Здравствуйте, вы можете отправлять сообщения здесь по каналам. Пожалуйста пишите /send_message',
//   );
// });

// bot.command('send_message', async (ctx) => {
//   await ctx.reply(`Привет, ${ctx.from.first_name}! Отправьте мне любое сообщение, и я отвечу вам.`);
//   ctx.session.step = 'waiting_for_message';
// });

// bot.on('message:text', async (ctx) => {
//   if (ctx.session.step === 'waiting_for_message') {
//     ctx.session.step = null;
//     await handleUserMessage(ctx);
//   } else {
//     await ctx.reply('Пожалуйста отправьте /send_message чтобы переслать сообщении');
//   }
// });

// async function handleUserMessage(ctx) {
//   const userMessage = ctx.message.text;
//   const user = ctx.from;
//   const userInfo = {
//     id: user.id,
//     username: user.username,
//     firstName: user.first_name,
//     lastName: user.last_name,
//     text: ctx.message.text,
//     date: new Date(),
//   };

//   console.log('Информация о пользователе:', userInfo);

//   fs.appendFileSync('users.json', JSON.stringify(userInfo) + '\n');
//   sendMessageToChannel(userMessage);
//   await ctx.reply('Сообщения отправлено');
// }

// const channelId = '@adfdsafdsfsdfsdf';

// async function sendMessageToChannel(userMessage) {
//   try {
//     await bot.api.sendMessage(channelId, userMessage);
//     console.log(' успешно отправлено в канал');
//   } catch (error) {
//     console.error('Ошибка при отправке сообщения:', error);
//   }
//   await ctx.reply(`Мы отправили сообщение: "${userMessage}"`);
// }

// bot.catch((err) => {
//   const ctx = err.ctx;
//   console.error(`Error while handling update ${ctx.update.update_id}`);
//   const e = err.error;

//   if (e instanceof GrammyError) {
//     console.error('Error in request:', e.description);
//   } else if (e instanceof HttpError) {
//     console.error('Could not contact Telegram', e);
//   } else {
//     console.error('Unkown error:', e);
//   }
// });

// bot.start();




// require('dotenv').config();
// const { Bot, GrammyError, HttpError, Keyboard } = require('grammy');
// const { session } = require('grammy');

// const bot = new Bot(process.env.BOT_API_KEY);
// const fs = require('fs');
// const { setInterval } = require('timers/promises');
// // Настройка сессии с помощью плагина
// bot.use(session({ initial: () => ({}) }));

// bot.api.getMyCommands([
//   {
//     command: 'start',
//     description: 'Запуск бота',
//   },
// ]);

// bot.command('start', async (ctx) => {
//   await ctx.reply(
//     `Привет ${ctx.from.first_name} отправьте /send_message чтобы отправить сообщения по каналам`,
//   );
// });

// bot.command('send_message', async (ctx) => {
//   await ctx.reply(`${ctx.from.first_name} напишите любое текст чтобы отправить их на канал`);
//   ctx.session.step = 'waiting_for_message';
// });

// bot.on('message:text', async (ctx) => {
//   if (ctx.session.step === 'waiting_for_message') {
//     handleUserMessage(ctx);
//   } else {
//     await ctx.reply('Пожалуйста отправьте /send_message чтобы переслать сообщении');
//   }
// });

// const channelId = '@adfdsafdsfsdfsdf';

// async function sendMessageToChannel(userMessage) {
//   try {
//     await bot.api.sendMessage(channelId, userMessage);
//     console.log('успешно отправлено в канал');
//   } catch (error) {
//     console.error('Ошибка при отправке сообщения:', error);
//   }
//   await ctx.reply(`Мы отправили сообщение: "${userMessage}"`);
// }

// setInterval(sendMessageToChannel, 60 * 1000);

// async function handleUserMessage(ctx) {
//   const user = ctx.from;
//   const userInfo = {
//     id: user.id,
//     username: user.username,
//     firstName: user.first_name,
//     lastName: user.last_name,
//     text: ctx.message.text,
//     date: new Date(),
//   };

//   const userMessage = userInfo.text;

//   console.log('Информация о пользователе:', userInfo);

//   fs.appendFileSync('users.json', JSON.stringify(userInfo) + '\n');

//   sendMessageToChannel(userMessage);
  
//   await ctx.reply('Сообщения отправлено');
// }

// bot.catch((err) => {
//   const ctx = err.ctx;
//   console.error(`Error while handling update ${ctx.update.update_id}`);
//   const e = err.error;

//   if (e instanceof GrammyError) {
//     console.error('Error in request:', e.description);
//   } else if (e instanceof HttpError) {
//     console.error('Could not contact Telegram', e);
//   } else {
//     console.error('Unkown error:', e);
//   }
// });

// bot.start();
