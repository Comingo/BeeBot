//дикий секс

const Discord = require("discord.js");
const weather = require("weather-js");
const moment = require("moment");
const request = require("request")
const math = require('mathjs')
const strftime = require("strftime");
const YTDL = require("ytdl-core")
const ytSearch = require("yt-search")
const prefix = '%'
var mysql = require("mysql")
let embeds = require("./data/embeds.js")
const cfg = require("./data/config.js");
const client = new Discord.Client();

  const banned = new Discord.RichEmbed()
  .setTitle("Блокировка :x:")
  .setColor("#9100ce")
  .setDescription("Вы были забанены навсегда в боте Bee.")
  .setTimestamp();


var connection = mysql.createConnection({
  host: '37.59.55.185',
  user: "PgsPLLgsAo",
  password: "sVOHIru5EW",
  database: 'PgsPLLgsAo'
})

connection.connect();

const banuser = new Set();

client.on("ready", () => {
  connection.query(`SELECT * FROM banned`, (err, results) => {
  results.forEach(user => {
      banuser.add(user.user_id);
    })
  })

  var activ = setInterval(function() {
client.user.setActivity(`${client.guilds.size} серверов || %help`, {type: "STREAMING", url: "https://www.twitch.tv/monstercat"})
  }, 5000);
});

client.on("message", (message) => {
  if(message.content === `${prefix}help`)
  {
    if(banuser.has(message.author.id)) return message.channel.send(banned);

      const embed = new Discord.RichEmbed()
      .setTitle("Команды")
      .setColor("RANDOM")
      .setDescription("**Все команды бота**\n\n***Модерация:***\n*%roleinfo - информация о роли\n%poll - голосование.\n%sinfo - информация о сервере.\n%prune - очистка сообщений\n%warn - варн\n%mute - мут пользователя\n%kick/%ban - кик/бан пользователя.\n%unban id - разбан пользователя.*\n\n***Остальное:***\n*%8ball - шар предсказаний\n%pron - го пофапаем\n%avatar - отображить аватар пользователя\n%weather - погода\n%callcenter - попросить помощь разработчиков\n%userinfo - информация о пользователе*\n\n***Музыка:***\n*%play - включить песню (просто напишите название)\n%stop - остановить игру*\n\n***Анимация:***\n*%hug - обнять\n%slap - дать пощечины\n%kiss - поцеловать*\n\n***Помощь:***\n*%botinfo - информация о боте\n%botinvite - пригласить бота на свой сервер\n%support - сервер Пчёлки*")

      message.channel.send(embed)
    }
});



client.on("message", (message) => {
  if(message.content === `${prefix}botinfo`)
  {
    const embed = new Discord.RichEmbed()
    .setTitle("BOTINFO")
    .setColor("RANDOM")
    .setTimestamp()
    .addField("Имя бота", `${client.user.username}`)
    .addField("Версия", `alpha-1.4.4`)
    .addField("Создатель", "rippleknight🔥#0001");
    message.channel.send(embed);
  }
});

client.on("message", (message) => {

let args = message.content.slice(prefix.length).trim().split(/ +/g)

  function play(connection, message) {
      var server = servers[message.guild.id];
      server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
      server.dispatcher.on("end", function() {
          if(server.queue[0]) play(connection, message)
          else connection.disconnect();
      })
  }
var servers = {};

if(message.content.startsWith(`${prefix}play`))
{
  if(banuser.has(message.author.id)) return message.channel.send(banned);
    if(!message || !message.channel || message.channel.type === "dm") return;
    if (!args[0]) {
           message.channel.send("Пожалуйста, скажите название видео.");
           return
      }

      if(!message.member.voiceChannel) {
          message.channel.send("Я думаю, вам стоит зайти в голосовой канал.");
          return;
      }

      if(!servers[message.guild.id]) servers[message.guild.id] = {
          queue: []
      }
      var server = servers[message.guild.id];


      ytSearch(args.join(' '), function(err, r) {
        console.log(args)

        if ( err ) throw err
        const videos = r.videos
        const playlists = r.playlists
        const accounts = r.accounts

        const firstResult = videos[0]

      message.channel.send(`Ваша песня находится в очереди. Вот, что мы нашли: :notes: ${firstResult.title}\n\n`)

        function play(connection, message) {
            var server = servers[message.guild.id];
            server.dispatcher = connection.playStream(YTDL(`https://youtube.com${firstResult.url}`, {filter: "audioonly"}));
            if(server.dispatcher.end) server.queue.push(firstResult.url);
        }

        server.queue.shift();
        server.queue.push(firstResult.url);
        if(message.member.voiceConnection) return function(connection) {
          play(connection, message);
        }
        if(!message.member.voiceConnection) return message.member.voiceChannel.join().then(function(connection) {
             play(connection, message);
            })
      });
}
});



client.on("message", (message) => {

  function play(connection, message) {
    var server = servers[message.guild.id];
    server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
    server.queue.shift();
    server.dispatcher.on("end", function() {
        if(server.queue[0]) play(connection, message)
        else connection.disconnect();
    })
  }
var servers = {};

if(message.content === `${prefix}stop`)
{
  if(banuser.has(message.author.id)) return message.channel.send(banned);
    if(!message || !message.channel || message.channel.type === "dm") return;
    var server = servers[message.guild.id];
    if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
}
});

client.on("message", (message) => {

  if(message.content === `${prefix}sinfo`)
  {
    if(banuser.has(message.author.id)) return message.channel.send(banned);
      if(!message || !message.channel || message.channel.type === "dm") return;
      let embed112 = new Discord.RichEmbed()
      .setAuthor(`Информация о сервере ${message.guild.name}`,message.guild.iconURL)
      .setColor("RANDOM")
      .addField('Название',message.guild.name,true)
      .addField('ID',message.guild.id,true)
      .addField(`Создатель`,message.guild.owner,true)
      .addField('Тег создателя',message.guild.owner.user.tag,true)
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    message.channel.send("Здесь вы можете спросить помощь: https://discord.gg/zWGQ7Zt");
  }
});

client.on("message", (message) => {

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}prune`))
  {
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
      if(!message || !message.channel || message.channel.type === "dm") return;
      let mute = message.guild.roles.find(role => role.name === "BeeMute");
      let m = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(message.member.hasPermissions("MANAGE_MESSAGES"))
      {
        if(!mute) return message.reply("У вас нет роли `BeeMute`. Создайте и настройте её.")
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
  if(banuser.has(message.author.id)) return message.channel.send(banned);
      if(!message || !message.channel || message.channel.type === "dm") return;
      let bu = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!bu) return message.channel.send(`Пользователь не найден.`);

      let br = args.join(" ").slice(22);

      if(!br) return message.channel.send(`Причина не указана.`);

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас нет прав администратора");

      if(bu.hasPermission("ADMINISTRATOR")) return message.channel.send("У данного участника есть права администратора.");

      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Отлетел~")
      .setColor("RANDOM")
      .setTimestamp()
      .addField("Забанен", `${bu} с ID ${bu.id}`)
      .addField("Забанен юзером", `<@${message.author.id}> с ID ${message.author.id}`)
      .addField("Забанен через канал", message.channel)
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
      if(!message || !message.channel || message.channel.type === "dm") return;
      let bu = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!bu) return message.channel.send(`Пользователь не найден.`);

      let br = args.join(" ").slice(22);

      if(!br) return message.channel.send(`Не указана причина варна.`);

      if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("У Вас нет прав администратора");

      if(bu.hasPermission("KICK_MEMBERS")) return message.channel.send("У данного участника есть права *Кикать участников*");

      let warnEmbed = new Discord.RichEmbed()
      .setDescription("Варн")
      .setColor("RANDOM")
      .setTimestamp()
      .addField("Вам был выдан варн модератором", `<@${message.author.id}> с ID ${message.author.id}`)
      .addField("Причина", br)
      .setFooter("Время");

      bu.send(warnEmbed);
      message.channel.send("Варн успешно выдан пользователю");
  };
});

client.on("message", (message) => {

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}kick`))
  {
    if(banuser.has(message.author.id)) return message.channel.send(banned);
      if(!message || !message.channel || message.channel.type === "dm") return;
      let ku = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));

      if(!ku) return message.channel.send(`Пользователь не найден.`);

      let kr = args.join(" ").slice(22);

      if(!kr) return message.channel.send(`Причина не указана.`);

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас нет прав администратора");

      if(ku.hasPermission("ADMINISTRATOR")) return message.channel.send("У данного участника есть права администратора.");

      message.guild.member(ku).kick(kr);
      message.channel.send("Пользователь успешно кикнут");

  };
});


client.on("message", (message) => {


  if(message.content.startsWith(`${prefix}callcenter`))
  {
    if(banuser.has(message.author.id)) return message.channel.send(banned);
      let call = client.channels.get("560481919868076032")
      let messageArray = message.content.split(" ");
      let args = messageArray.slice(1);
      message.channel.send("Вскоре вам напишет разработчик бота.")

      const embed = new Discord.RichEmbed()
      .setTitle("CallCenter")
      .setColor("RANDOM")
      .setDescription(`Автор: ${message.author}\n\nГилд: ${message.guild.name} \n\nТег: ${message.author.tag}\n\nЗапрос: ${message.content}`);

      call.send(embed);
  };
});

client.on("message", (message) => {
  if(message.content.startsWith(`${prefix}weather`))
  {
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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

  if(message.content.startsWith(`${prefix}avatar`))
  {
      if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
      if(!message || !message.channel || message.channel.type === "dm") return;
      let user = args[0]
      if(!user) return message.reply("укажите ID пользователя.")

      if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас нет прав администратора");

      message.guild.unban(user);

      let banEmbed = new Discord.RichEmbed()
      .setDescription("~Влетел~")
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
      if(banuser.has(message.author.id)) return message.channel.send(banned);
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

client.on('message', (message) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}blockdbuser`))
  {
    let user = args[0]
    connection.query(`INSERT INTO banned(user_id, reason) VALUES ('${user}', 'Забанен за плохое деяние')`, function(err, results) {
      message.reply("Готово.")
      client.destroy().then(client.login(cfg.token));
    });
  }
});


client.on("message", (message) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}8ball`))
  {
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    if(banuser.has(message.author.id)) return message.channel.send(banned);
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
    .setTitle("Role Info")
    .setColor("RANDOM")
    .addField("Роль", role.name, true)
    .addField("Участников с данной ролью", role.members.size, true)
    .addField("HEX-color роли", role.hexColor, true)
    .addField('Дата создания роли', role.createdAt.toDateString(), true)
    .addField("Отображается-ли отдельно? (true/false)", role.hoist, true)
    .addField("Можно ли упомянуть? (true/false)", role.mentionable, true)
    .addField("Позиция в списке ролей", role.position, true);

    message.channel.send(embed);
  }
});

client.login(cfg.token);
