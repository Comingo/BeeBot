
const Discord = require("discord.js");
const weather = require("weather-js");
const moment = require("moment");
const request = require("request")
const math = require('mathjs')
const strftime = require("strftime");
const YTDL = require("ytdl-core")
const ytSearch = require("yt-search")
const { createCanvas, loadImage } = require('canvas');
const canvas = createCanvas(400, 400);
const ctx = canvas.getContext('2d');
const prefix = '%'
var cpuStats = require("cpu-stats")
const fs = require("fs")
var mysql = require("mysql")
let embeds = require("./data/embeds.js")
const cfg = require("./data/config.js");
const client = new Discord.Client();


client.on("ready", () => {
  var activ = setInterval(function() {
client.user.setActivity(`${client.guilds.size} серверов || %help`, {type: "STREAMING", url: "https://www.twitch.tv/monstercat"})
  }, 5000);
});

client.on("message", (message) => {
  if(message.content === `${prefix}help`)
  {

      const embed = new Discord.RichEmbed()
      .setTitle("Команды")
      .setColor("RANDOM")
      .setDescription("**Все команды бота**\n\n***Модерация:***\n*%roleinfo - информация о роли\n%poll - голосование.\n%sinfo - информация о сервере.\n%prune - очистка сообщений\n%warn - варн\n%mute - мут пользователя\n%kick/%ban - кик/бан пользователя.\n%unban id - разбан пользователя.*\n\n***Остальное:***\n*%8ball - шар предсказаний\n%pron - го пофапаем\n%avatar - отображить аватар пользователя\n%weather - погода\n%userinfo - информация о пользователе*\n\n***Музыка (ОТКЛЮЧЕНО):***\n*%play - включить песню (просто напишите название)\n%stop - остановить игру*\n\n***Анимация:***\n*%hug - обнять\n%slap - дать пощечины\n%kiss - поцеловать*\n\n***Помощь:***\n*%botinfo - информация о боте\n%botinvite - пригласить бота на свой сервер\n%support - сервер Пчёлки*")

      message.channel.send(embed)
    }
});

client.on("message", (message) => {
  if(message.content === `${prefix}botinfo`)
  {
  const embed = new Discord.RichEmbed()
  .setTitle("Информация")
  .setColor("RANDOM")
  .setTimestamp()
  .addField("Имя бота", `${client.user.username}`)
  .addField("Версия", `alpha-1.7`)
  .addField("Создатель", "Leuchte#2048");
  message.channel.send(embed);
  }
});

client.on('message', async message => {
  if (message.content === '>parse') {
    const messages = await message.channel.messages.fetch({ limit: 100 });
    const randomMessage = messages.random().content;

    const attachment = message.attachments.random();
    if (!attachment) {
      return message.reply('No attachments found in this channel.');
    }
    message.channel.send("жди")
    const image = await loadImage(attachment.url);
    ctx.drawImage(image, 0, 0, canvas.width, canvas.height);

    ctx.fillStyle = 'white';
    ctx.fillRect(0, 350, canvas.width, 50);
    ctx.fillStyle = 'black';
    ctx.font = '20px sans-serif';
    ctx.textAlign = 'center';
    ctx.fillText(randomMessage, canvas.width / 2, 380);

    const attachmentName = attachment.name.split('.').shift();
    const buffer = canvas.toBuffer('image/jpeg', { quality: 0.8 });
    const attachmentMessage = await message.channel.send({
      files: [{ attachment: buffer, name: `${attachmentName}.jpg` }]

    });

    console.log(`Created meme: ${attachmentMessage.attachments.first().url}`);
  }
});

client.login('your-token-goes-here');

client.on("message", (message) => {

  if(message.content === `${prefix}sinfo`)
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
      let embed112 = new Discord.RichEmbed()
      .setAuthor(`Информация о сервере ${message.guild.name}`,message.guild.iconURL)
      .setColor("RANDOM")
      .addField('Название',message.guild.name,true)
      .addField('ID',message.guild.id,true)
      .addField('Каналов',`**Всего:** ${message.guild.channels.size} \n :computer:**Категорий:** ${message.guild.channels.filter(c => c.type === "category").size} \n :keyboard:**Текстовых:** ${message.guild.channels.filter(c => c.type === "text").size} \n :microphone2:**Голосовых:** ${message.guild.channels.filter(c => c.type === "voice").size}`,true)
      .addField('Количество пользователей',`**Всего:** ${message.guild.members.size} \n **Онлайн:** ${message.guild.members.filter(s => s.presence.status ===  "online").size} \n **Нет на месте:** ${message.guild.members.filter(s => s.presence.status ===  "idle").size} \n **Оффлайн:** ${message.guild.members.filter(s => s.presence.status === "offline").size}`,true)
      .addField('Количество ролей',message.guild.roles.size,true)
      .addField('Регион',message.guild.region,true)
      .addField('Эмодзи',message.guild.emojis.size,true)
      .addField('Уровень верификации',message.guild.verificationLevel,true)
      .addField('Создан:',moment(message.guild.createdAt).fromNow(),true)
      .setThumbnail(message.guild.iconURL);
      message.channel.send(embed112)
  }
});

client.on("message", (message) => {

  if(message.content.startsWith(`${prefix}userinfo`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);

      let member = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]))
      let argsUser
      if (member) argsUser = member.user
      else argsUser = message.author

      let statuses = {
          online: `В сети`,
          idle: `Не активен`,
          dnd: `Не беспокоить`,
          offline: `Не в сети`
      }
      let game
      if (!argsUser.presence.game) game = `Имеет статус \n **${statuses[argsUser.presence.status]}**`
      else if (argsUser.presence.game.type == 0) game = `Играет в **${argsUser.presence.game.name}**`
      else if (argsUser.presence.game.type == 1) game = `Стримит [**${argsUser.presence.game.name}**](${argsUser.presence.game.url})`
      else if (argsUser.presence.game.type == 2) game = `Слушает **${argsUser.presence.game.name}**`
      else if (argsUser.presence.game.type == 3) game = `Смотрит **${argsUser.presence.game.name}**`

      let day = 1000 * 60 * 60 * 24
      let date1 = new Date(message.createdTimestamp)
      let date2 = new Date(argsUser.createdTimestamp)
      let date3 = new Date(message.guild.member(argsUser).joinedTimestamp)
      let diff1 = Math.round(Math.abs((date1.getTime() - date2.getTime()) / day))
      let diff2 = Math.round(Math.abs((date1.getTime() - date3.getTime()) / day))

      let embed = new Discord.RichEmbed()
          .setTitle(argsUser.username)
          .setDescription(game)
          .addField('Дата регистрации', `${strftime('%d.%m.%Y в %H:%M', new Date(argsUser.createdTimestamp))}\n(${diff1} дней назад)`, true)
          .addField('Подключился на сервер', `${strftime('%d.%m.%Y в %H:%M', new Date(message.guild.member(argsUser).joinedTimestamp))}\n(${diff2} дней назад)`, true)
          .addField('Роли', message.guild.member(argsUser).roles.filter(r => r.id != message.guild.id).map(role => role.name).join(', ') || 'Отсутствуют')
          .setColor("RANDOM")
          .setTimestamp()
          .setThumbnail(argsUser.avatarURL)
          .setFooter(`ID: ${argsUser.id}`)
          message.channel.send(embed)
  }
});

client.on("message", (message) => {
  if(message.content === `${prefix}support`)
  {
    message.channel.send("Здесь вы можете спросить помощь: https://discord.gg/c6J9TMb");
  }
});

client.on("message", (message) => {

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}prune`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
      if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("отсутствуют права");
      if(!args[0]) return message.reply("нельзя очистить меньше 1 знака или 0");
      message.delete(1);
      message.channel.bulkDelete(args[0]).then(() => {
      message.channel.send(`Удалено ${args[0]} сообщение(ий)`).then(msg => msg.delete(2000));
        });
  };
});


client.on("message", (message) => {

  if(message.content.startsWith(`${prefix}mute`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
      let mute = message.guild.roles.find(role => role.name === "BeeMute");
      let m = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(message.member.hasPermissions("MANAGE_MESSAGES"))
      {
        if(!mute) return message.reply("У вас нет роли `BeeMute`. Создайте и ограничьте в ней права на отправку сообщений.")
        if(m.roles.has(mute.id)) {
              m.removeRole(mute.id);
          message.channel.send(`${m} был размучен ${message.author}`)
            } else {
              m.addRole(mute.id);
          message.channel.send(`${m} был замучен ${message.author}`)
            }
       } else {
        message.reply("недостаточно прав.")
       }
  };
});

client.on("message", (message) => {
  if(message.content === `${prefix}botinvite`)
  {
    message.channel.send("Я рад, что я нужен вам! = )\nhttps://discordapp.com/api/oauth2/authorize?client_id=555427790711947273&permissions=8&scope=bot")
  }
});

client.on('message',async(message) =>{
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);
if(message.content.startsWith(`${prefix}poll`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
    message.delete();
      if (!args) return message.reply("Вы должны указать вопрос голосования!")
      if (!message.content.includes("?")) return message.reply("Добавьте `?` в конце,чтобы начать голосование")
      if (args < 3) return message.reply("голосование должно содержать как минимум 3 символа. (пробел считается.)")
    message.channel.send(`${message.author.username} начал голосование`);
      const pollTopic = new Discord.RichEmbed()
      .setTitle("Голосование")
      .setDescription(`${args.join(" ")}`)
      .setColor("#5DDAEE")
      .setFooter(`Голосование создано ${message.author.tag}`);
      message.channel.send(pollTopic).then(embedMessage => { embedMessage.react('👍').then(r => { embedMessage.react('👎') }).catch(error => { console.log(error) }) }).catch(error => { console.log(error) });
  }
})


client.on("message", (message) => {

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}ban`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
      let bu = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!bu) return message.channel.send(`Пользователь не найден.`);

      let br = args.join(" ").slice(22);

      if(!br) return message.channel.send(`Советуем указать причину.`);

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас нет прав администратора");

      if(bu.hasPermission("ADMINISTRATOR")) return message.channel.send("У данного участника есть права администратора.");

      let banEmbed = new Discord.RichEmbed()
      .setDescription("Информация")
      .setColor("RANDOM")
      .setTimestamp()
      .addField("Выдан бан", `${bu} с ID ${bu.id}`)
      .addField("Бан выдан", `<${message.author.id}> с ID ${message.author.id}`)
      .addField("Было выполнено в канале", message.channel)
      .addField("Причина", br)
      .setFooter("Время");

      message.guild.member(bu).ban(br);
      message.channel.send(banEmbed);
  };
});

client.on("message", (message) => {

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}warn`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
      let bu = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!bu) return message.channel.send(`Пользователь не найден.`);

      let br = args.join(" ").slice(22);

      if(!br) return message.channel.send(`Не указана причина варна.`);

      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("У Вас нет прав администратора");

      if(bu.hasPermission("KICK_MEMBERS")) return message.channel.send("У данного участника есть права *Кикать участников*");

      let warnEmbed = new Discord.RichEmbed()
      .setDescription("Информация")
      .setColor("RANDOM")
      .setTimestamp()
      .addField("Вам был выдан варн модератором", `<@${message.author.id}> с ID ${message.author.id}`)
      .addField("Причина", br)
      .setFooter("Время");

      bu.send(warnEmbed);
      message.channel.send(`Варн успешно выдан пользователю ${bu}.`);
  };
});

client.on("message", (message) => {

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}kick`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
      let ku = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!ku) return message.channel.send(`Пользователь не найден.`);

      let kr = args.join(" ").slice(22);

      if(!kr) return message.channel.send(`Советуем указать причину.`);

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас нет прав администратора");

      if(ku.hasPermission("ADMINISTRATOR")) return message.channel.send("У данного участника есть права администратора.");

      message.guild.member(ku).kick(kr);
      message.channel.send(`Пользователь ${ku} успешно кикнут`);

  };
});

client.on("message", (message) => {
  if(message.content.startsWith(`${prefix}weather`))
  {
    let messageArray = message.content.split(" ");
    let args = messageArray.slice(1);

    weather.find({search: args.join(" "), degreeType: 'C', lang: 'ru-RU'}, function(err, result) {
      if (result === undefined || result.length === 0) {
          message.reply("укажите местоположение или проверьте указанное местоположение.")
          return;
      }

  var current = result[0].current;
      var location = result[0].location;
      const embed = new Discord.RichEmbed()
          .setDescription(`**${current.skytext}**`)
          .setAuthor(`Погода в ${current.observationpoint}`)
          .setThumbnail(current.imageUrl)
          .setColor("RANDOM")
          .addField('Временная зона',`UTC${location.timezone}`, true)
          .addField('Тип температуры',location.degreetype, true)
          .addField('Температура',`${current.temperature} градусов`, true)
          .addField('Ощущается как', `${current.feelslike} градусов`, true)
          .addField('Ветер', current.winddisplay, true)
          .addField('Влажность', `${current.humidity}%`, true);
          message.channel.send({embed});
    });
  }
});

client.on("message", (message) => {

  if(message.content.startsWith(`${prefix}snipe`))
  {
      let snipe = message.mentions.users.first()

      const embed = new Discord.RichEmbed()
      .setColor("#9100ce")
      .setDescription(`${message.author} sniped ${snipe}`)

      const noembed = new Discord.RichEmbed()
      .setColor("#9100ce")
      .setDescription(`${message.author} sniped himself`)

      if(snipe) return message.channel.send(embed)
      if(!snipe) return message.channel.send(noembed)
  }
});

client.on("message", (message) => {

  if(message.content.startsWith(`${prefix}kj`))
  {
    message.reply("DO YOU LIKE A FUCKING KJ?")
  }
});

client.on("message", (message) => {

  if(message.content.startsWith(`${prefix}avatar`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
       let user = message.mentions.users.first() || message.author;
      const embed = new Discord.RichEmbed()
      .setColor('RANDOM')
      .setDescription(`[Аватар ${user.username}](${user.avatarURL})`)
      .setImage(user.avatarURL)
    message.channel.send(embed)
  }
});

client.on("message", (message) => {


  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}unban`))
  {
      if(!message || !message.channel || message.channel.type === "dm") return;
      let user = args[0]
      if(!user) return message.reply("укажите ID пользователя.")

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас нет прав администратора");

      message.guild.unban(user);

      let banEmbed = new Discord.RichEmbed()
      .setDescription("Информация")
      .setColor("RANDOM")
      .setTimestamp()
      .addField("Разбанен", `Пользователь <@${user}> с ID: ${user}`)
      .addField("Разбанен юзером", `<@${message.author.id}> с ID ${message.author.id}`)
      .addField("Разбанен через канал", message.channel)
      .setFooter("Время");

      message.channel.send(banEmbed);
  };
});

client.on("message", (message) => {

  if(message.content === `${prefix}pron`)
  {
      if(!message.channel.nsfw) return message.reply("у канала нет флага NSFW");
      request('https://nekobot.xyz/api/image?type=pgif', function (error, response, body) {
       let resultofpron = JSON.parse(body);

       let embed = new Discord.RichEmbed()
        .setTitle("let's fapp")
        .setColor("RANDOM")
        .setImage(resultofpron['message'])
        .setTimestamp();

      message.channel.send(embed)
      });

  }
});



client.on("message", (message) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}8ball`))
  {
    let phrases = ['Абсолютно нет', 'Однозначно', 'Не уверен', 'Да', 'Дай пельменей пожрать спокойно (сэ_сэ)', 'В слове да нет слова нет, в нём есть только да']
    let phrasa = Math.floor(Math.random() * phrases.length);
    if(!args.join(" ")) return message.reply("ты не хочешь задавать мне вопросы?");
    const embed = new Discord.RichEmbed()
    .setTitle("8BALL")
    .setColor("RANDOM")
    .setDescription(`Вопрос: **${args.join(" ")}**\n\nОтвет: **${phrases[phrasa]}**`);
    message.channel.send(embed)
  };
});

client.on("message", (message) => {
  if(message.content.startsWith(`${prefix}hug`))
  {
      let huser = message.mentions.users.first()

      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`${message.author} обнял ${huser}`)
      .setImage("https://media0.giphy.com/media/42YlR8u9gV5Cw/giphy.gif?cid=790b76115cc9c9c7713069547729c734&rid=giphy.gif")

      if(huser) return message.channel.send(embed)
      if(!huser) return message.reply("вы забыли упомянуть пользователя")
  }
});

client.on("message", (message) => {
  if(message.content.startsWith(`${prefix}slap`))
  {
      let suser = message.mentions.users.first()

      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`${message.author} дал пизды ${suser}`)
      .setImage("https://media0.giphy.com/media/1ZszhyLPNiC4vUI2Sv/giphy.gif?cid=790b76115cc9cc4676774f2f3660325b&rid=giphy.gif")

      if(suser) return message.channel.send(embed)
      if(!suser) return message.reply("вы забыли упомянуть пользователя")
  }
});

client.on("message", (message) => {
  if(message.content.startsWith(`${prefix}kiss`))
  {
      let kuser = message.mentions.users.first()

      const embed = new Discord.RichEmbed()
      .setColor("RANDOM")
      .setDescription(`${message.author} поцеловал ${kuser}`)
      .setImage("https://media1.tenor.com/images/a66f4ac0deded0a2a12260cb1af11c3c/tenor.gif?itemid=11034277")

      if(kuser) return message.channel.send(embed)
      if(!kuser) return message.reply("вы забыли упомянуть пользователя")
  }
});

client.on("message", (message) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}roleinfo`))
  {
    let role = message.mentions.roles.first();
    if(!role) return message.reply("вы забыли упомянуть роль");

    const embed = new Discord.RichEmbed()
    .setTitle("Информация о роли")
    .setColor("RANDOM")
    .addField("Роль", role.name, true)
    .addField("Участников с данной ролью", `${role.members.size} участника(ов)`, true)
    .addField("HEX-color роли", role.hexColor, true)
    .addField("Отображается-ли отдельно? (true (да)/false (нет))", role.hoist, true)
    .addField("Можно ли упомянуть? (true (да)/false (нет))", role.mentionable, true)
    .addField("Позиция в списке ролей", role.position, true);

    message.channel.send(embed);
  }
});


client.login(cfg.token);
