require('dotenv').config();
const { Bot } = require('grammy');

const bot = new Bot(process.env.BOT_API_KEY);
const fs = require('fs');
const path = require('path');

bot.api.setMyCommands([
  {
    command: 'start',
    description: 'Запуск бота',
  },
  {
    command: 'stop',
    description: 'Отменить отправка сообщения',
  },
]);

const CHANNEL_ID = '@adfdsafdsfsdfsdf';
let intervalId;

bot.command('start', async (ctx) => {
  await ctx.reply(`Привет ${ctx.from.first_name} отправьте сообщения что бы переслать в каналах`);
});

bot.command('stop', (ctx) => {
  clearInterval(intervalId);
  ctx.reply('Отменено отправка сообшения.');
  console.log('Bot stopped by user.');
});

// Функция для сохранения сообщения в файл
const saveMessageToFile = (message, filePath) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(filePath, message, (err) => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
};

// Функция для чтения текста из файла
const readTextFromFile = (filePath) => {
  return new Promise((resolve, reject) => {
    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// Функция для клонирования текста и отправки в канал
const cloneAndSendText = async (sourceFilePath, clonedFilePath) => {
  try {
    const text = await readTextFromFile(sourceFilePath);
    await saveMessageToFile(text, clonedFilePath);
    await bot.api.sendMessage(CHANNEL_ID, text);
    console.log('Message cloned and sent to the channel successfully');
  } catch (error) {
    console.error('Error processing message:', error);
  }
};

// Обработчик сообщений
bot.on('message', async (ctx) => {
  if (ctx.from.id === 696151337) {
    const message = ctx.message.text;
    const filePath = path.join(__dirname, 'message.txt');

    try {
      // Сохранить сообщение в файл
      await saveMessageToFile(message, filePath);
      await ctx.reply('Сообщения сохранено и будет отправлен.');
      console.log('Message saved successfully');
    } catch (error) {
      console.error('Error saving message:', error);
      await ctx.reply('An error occurred while saving your message.');
    }
  } else {
    await ctx.reply('Вы не админ этого бота. Вы не можете отправить сообщения.');
  }
});

// Запустить бота
bot.start();

// Установить таймер для клонирования и отправки сообщений каждые 1 минуту
intervalId = setInterval(() => {
  const sourceFilePath = path.join(__dirname, 'message.txt');
  const clonedFilePath = path.join(__dirname, 'cloned_message.txt');
  cloneAndSendText(sourceFilePath, clonedFilePath);
}, 60000);

// Функция для сохранения сообщения в файл
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

// bot.command('send_message', async (ctx) => {
//   await ctx.reply(`${ctx.from.first_name} напишите любое текст чтобы отправить их на канал`);
//   sendMessage();
// });
// const channelId = '@adfdsafdsfsdfsdf';

// bot.on('message', async (ctx) => {
//   const message = ctx.message.text;
//   const filePath = path.join(__dirname, 'message.txt');

//   try {
//     // Сохранить сообщение в файл
//     await saveMessageToFile(message, filePath);

//     // Прочитать текст из файла
//     const text = await readTextFromFile(filePath);

//     // Создать новый файл с клонированным текстом
//     const clonedFilePath = path.join(__dirname, 'cloned_message.txt');
//     await saveMessageToFile(text, clonedFilePath);

//     // Отправить текст обратно в Telegram бот
//     // await ctx.reply(text);
//     const sendMessageToChannel = bot.api.sendMessage(channelId, text);

//     setInterval(sendMessageToChannel, 60 * 1000);

//     console.log('Message processed and sent back successfully');
//   } catch (error) {
//     console.error('Error processing message:', error);
//     await ctx.reply('An error occurred while processing your message.');
//   }
// });

// // async function sendMessageToChannel(userMessage) {
//   try {
//     await bot.api.sendMessage(channelId, userMessage);
//     console.log('успешно отправлено в канал');
//   } catch (error) {
//     console.error('Ошибка при отправке сообщения:', error);
//   }
//   await ctx.reply(`Мы отправили сообщение: "${userMessage}"`);
// }

// Запустить бота
