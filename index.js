// require('dotenv').config();
// const { Bot } = require('grammy');

// const bot = new Bot(process.env.BOT_API_KEY);
// const fs = require('fs');
// const path = require('path');

// bot.api.setMyCommands([
//   {
//     command: 'start',
//     description: 'Запуск бота',
//   },
//   {
//     command: 'stop',
//     description: 'Отменить отправка сообщения',
//   },
// ]);

// const CHANNEL_ID = [];
// // const CHANNEL_ID = '@adfdsafdsfsdfsdf';

// async function getAdminChats() {
//   // Получите список чатов из базы данных или другого источника
//   // Здесь массив adminChats уже должен быть заполнен ID чатов
// }
// let intervalId;

// bot.command('start', async (ctx) => {
//   await ctx.reply(`Привет ${ctx.from.first_name} отправьте сообщения что бы переслать в каналах`);
// });

// bot.command('stop', (ctx) => {
//   clearInterval(intervalId);
//   ctx.reply('Отменено отправка сообшения.');
//   console.log('Bot stopped by user.');
// });

// // Функция для сохранения сообщения в файл
// const saveMessageToFile = (message, filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.writeFile(filePath, message, (err) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve();
//       }
//     });
//   });
// };

// // Функция для чтения текста из файла
// const readTextFromFile = (filePath) => {
//   return new Promise((resolve, reject) => {
//     fs.readFile(filePath, 'utf8', (err, data) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(data);
//       }
//     });
//   });
// };

// // Функция для клонирования текста и отправки в канал
// const cloneAndSendText = async (sourceFilePath, clonedFilePath) => {
//   try {
//     const text = await readTextFromFile(sourceFilePath);
//     await saveMessageToFile(text, clonedFilePath);
//     await bot.api.sendMessage(CHANNEL_ID, text);
//     console.log('Message cloned and sent to the channel successfully');
//   } catch (error) {
//     console.error('Error processing message:', error);
//   }
// };

// // Обработчик сообщений
// bot.on('message', async (ctx) => {
//   if (ctx.from.id === 696151337 || 961883651) {
//     const message = ctx.message.text;
//     const filePath = path.join(__dirname, 'message.txt');

//     try {
//       // Сохранить сообщение в файл
//       await saveMessageToFile(message, filePath);
//       await ctx.reply('Сообщения сохранено и будет отправлен.');
//       console.log('Message saved successfully');
//     } catch (error) {
//       console.error('Error saving message:', error);
//       await ctx.reply('An error occurred while saving your message.');
//     }
//   } else {
//     await ctx.reply('Вы не админ этого бота. Вы не можете отправить сообщения.');
//   }
// });

// // Запустить бота
// bot.start();

// // Установить таймер для клонирования и отправки сообщений каждые 1 минуту
// intervalId = setInterval(() => {
//   const sourceFilePath = path.join(__dirname, 'message.txt');
//   const clonedFilePath = path.join(__dirname, 'cloned_message.txt');
//   cloneAndSendText(sourceFilePath, clonedFilePath);
// }, 60000);

// ********************************************************************

require('dotenv').config();
const { Bot } = require('grammy');
const fs = require('fs');
const path = require('path');

const bot = new Bot(process.env.BOT_API_KEY);

// Установить команды бота
bot.api.setMyCommands([
  { command: 'start', description: 'Запуск бота' },
  { command: 'stop', description: 'Отменить отправку сообщения' },
]);

const channelsFilePath = path.join(__dirname, 'channels.json');

// Функция для чтения ID чатов из файла
const readChatsFromFile = async () => {
  try {
    const data = await fs.promises.readFile(channelsFilePath, 'utf8');
    return JSON.parse(data) || [];
  } catch (err) {
    // Если файл не существует, вернуть пустой массив
    return [];
  }
};

// Функция для сохранения ID чатов в файл
const saveChatToFile = async (chatId) => {
  const chats = await readChatsFromFile();
  if (!chats.includes(chatId)) {
    chats.push(chatId);
    await fs.promises.writeFile(channelsFilePath, JSON.stringify(chats, null, 2));
    console.log(`Chat ${chatId} сохранен.`);
  }
};

// Функция для отправки сообщения в сохранённые каналы/группы
const sendMessagesToChannels = async (text) => {
  const channels = await readChatsFromFile();
  channels.forEach(async (channelId) => {
    try {
      await bot.api.sendMessage(channelId, text);
      console.log(`Сообщение отправлено в чат ${channelId}`);
    } catch (error) {
      console.error(`Ошибка при отправке сообщения в ${channelId}:`, error);
    }
  });
};

// Обработчик для команды /start
bot.command('start', async (ctx) => {
  await ctx.reply(
    `Привет, ${ctx.from.first_name}! Отправьте сообщение, чтобы переслать его в каналы.`,
  );
});

// Обработчик для команды /stop
bot.command('stop', (ctx) => {
  clearInterval(intervalId);
  ctx.reply('Отправка сообщений остановлена.');
  console.log('Отправка сообщений остановлена пользователем.');
});

// Обработчик для получения сообщений
bot.on('message', async (ctx) => {
  if (ctx.from.id === 696151337 || ctx.from.id === 961883651) {
    const message = ctx.message.text;
    const filePath = path.join(__dirname, 'message.txt');

    try {
      // Сохранить сообщение в файл
      await fs.promises.writeFile(filePath, message);
      await ctx.reply('Сообщение сохранено и будет отправлено.');
      console.log('Сообщение успешно сохранено.');

      // Отправить сообщение в каналы/группы
      sendMessagesToChannels(message);
    } catch (error) {
      console.error('Ошибка при сохранении сообщения:', error);
      await ctx.reply('Произошла ошибка при сохранении вашего сообщения.');
    }
  } else {
    await ctx.reply('Вы не админ этого бота. Вы не можете отправить сообщения.');
  }
});

// Обработчик для событий добавления в чат (бота добавляют в канал/группу)
bot.on('my_chat_member', async (ctx) => {
  const chat = ctx.chat;
  const status = ctx.myChatMember.new_chat_member.status;

  if (status === 'administrator') {
    await saveChatToFile(chat.id);
    console.log(`Бот добавлен админом в чат: ${chat.id}`);
  }
});

// Запустить бота
bot.start();

// Установить таймер для отправки сохранённого сообщения каждые 1 минуту
let intervalId = setInterval(async () => {
  const sourceFilePath = path.join(__dirname, 'message.txt');
  try {
    const text = await fs.promises.readFile(sourceFilePath, 'utf8');
    await sendMessagesToChannels(text);
  } catch (error) {
    console.error('Ошибка при чтении и отправке сообщения:', error);
  }
}, 60000);
