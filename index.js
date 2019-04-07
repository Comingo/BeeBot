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
let embeds = require("./data/embeds.js")
const cfg = require("./data/config.js");
const client = new Discord.Client();
  var bl = ['411277475335897088'] 


client.on('message', (message) => {

});


client.on("ready", () => {
  var activ = setInterval(function() {
  client.user.setActivity(`${client.guilds.size} серверов || %help`, {type: "WATCHING"});
   }, 5000);
});

client.on("message", (message) => {
  if(message.content === `${prefix}help`)
  {
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

    const embed = new Discord.RichEmbed()
    .setTitle("Команды")
    .setColor("RANDOM")
    .setDescription("Все команды бота.\n\nМодерация:\n%poll - голосование.\n%sinfo - информация о сервере.\n%prune - очистка сообщений\n%mute - мут пользователя\n%kick/%ban - кик/бан пользователя.\n%unban id - разбан пользователя.\n\nОстальное:\n%pron - го пофапаем\n%avatar - отображить аватар пользователя\n%weather - погода\n%callcenter - попросить помощь разработчиков\n%userinfo - информация о пользователе\n\nМузыка:\n%play - включить песню (просто напишите название)\n%stop - остановить игру\n\nПомощь:\n%botinvite - пригласить бота на свой сервер\n%support - сервер Альфред бота")

    message.channel.send(embed)
    }
});

client.on("guildCreate", guild => {
  let hue = client.channels.get("555426672225157132")
  const guildadd = new Discord.RichEmbed()
  .setTitle("Новый гилд.")
  .setColor("RANDOM")
  .setDescription(`Имя сервера: ${guild.name}\n\nОвнер: ${guild.owner}\n\n Гилд-ид: ${guild.id}`)
  .setFooter("Alfred");
  hue.send(guildadd);
});

client.on("guildDelete", guild => {
  let hue = client.channels.get("555426672225157132")
  const guildadd = new Discord.RichEmbed()
  .setTitle("Пока, гилд.")
  .setColor("RANDOM")
  .setDescription(`Имя сервера: ${guild.name}\n\nОвнер: ${guild.owner}\n\n Гилд-ид: ${guild.id}`)
  .setFooter("Alfred");
  hue.send(guildadd);
});

//
//

/*client.on("message", (message) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  function play(connection, message) {
      var server = servers[message.guild.id];
      server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
      server.queue.shift();
      server.dispatcher.on("end", function() {
          if(server.queue[0]) play(connection, message);
          else connection.disconnect();
      })
  }
var servers = {};

if(message.content.startsWith(`${prefix}play`))
{
  if(!message || !message.channel || message.channel.type === "dm") return;
  if (!args[0]) {
         message.channel.send("Пожалуйста, предоставьте ссылку.");
         return
    }

    if(!message.member.voiceChannel) {
        message.channel.send("Я думаю, вам стоит зайти в голосовой канал.");
    }

    if(!servers[message.guild.id]) servers[message.guild.id] = {
        queue: []
    }
    var server = servers[message.guild.id];

    server.queue.push(args[0]);
    message.channel.send("Ваша песня находится в очереди.")
    if(!message.member.voiceConnection) message.member.voiceChannel.join().then(function(connection) {
        play(connection, message);
    })
}
});*/

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
  if(bl.includes(message.author.id))
  {
    const embed = new Discord.RichEmbed()
    .setTitle("Блокировка :x:")
    .setColor("#9100ce")
    .setDescription("Вы были забанены навсегда в боте Alfred.")
    .setTimestamp();

    message.channel.send(embed)
    return;
  }

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
  if(bl.includes(message.author.id))
  {
    const embed = new Discord.RichEmbed()
    .setTitle("Блокировка :x:")
    .setColor("#9100ce")
    .setDescription("Вы были забанены навсегда в боте Alfred.")
    .setTimestamp();

    message.channel.send(embed)
    return;
  }

  if(!message || !message.channel || message.channel.type === "dm") return;
  var server = servers[message.guild.id];
  if(message.guild.voiceConnection) message.guild.voiceConnection.disconnect();
}
});

client.on("message", (message) => {

  if(message.content === `${prefix}sinfo`)
  {
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

    if(!message || !message.channel || message.channel.type === "dm") return;
    let mute = message.guild.roles.find(role => role.name === "AlfredMute");
    let m = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(message.member.hasPermissions("MANAGE_MESSAGES"))
    {
      if(!mute) return message.reply("У вас нет роли `AlfredMute`. Создайте и настройте её.")
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
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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
  await message.channel.send(pollTopic).then(embedMessage => { embedMessage.react('👍').then(r => { embedMessage.react('👎') }).catch(error => { console.log(error) }) }).catch(error => { console.log(error) });
  }
})

client.on("message", (message) => {

  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}ban`))
  {
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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

  if(message.content.startsWith(`${prefix}kick`))
  {
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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

  if(message.content.startsWith(`${prefix}weather`))
  {
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

        let messageArray = message.content.split(" ");
        let args = messageArray.slice(1);

    weather.find({search: args.join(" "), degreeType: 'C', lang: 'ru-RU'}, function(err, result) {
          if (result === undefined || result.length === 0) {
              message.channel.send("Указанное местоположение отсуствует или неопределенное.")
              return;
          }
                var current = result[0].current;
                var location = result[0].location;

          const embed = new Discord.RichEmbed()
          .setTitle(`Погода в ${current.observationpoint}`)
          .setColor("RANDOM")
          .setDescription(`**${current.skytext}**`)
          .addField("Временная зона", `UTC${location.timezone}`)
          .addField('Температура',`${current.temperature} градусов`)
          .addField('Ощущается как', `${current.feelslike} градусов`)
          .addField('Ветер', current.winddisplay)
          .addField('Влажность', `${current.humidity}%`);

          message.channel.send(embed);
    });
  };
});

client.on("message", (message) => {


  if(message.content.startsWith(`${prefix}callcenter`))
  {
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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


  if(message.content.startsWith(`${prefix}snipe`))
  {
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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
    if(bl.includes(message.author.id))
    {
      const embed = new Discord.RichEmbed()
      .setTitle("Блокировка :x:")
      .setColor("#9100ce")
      .setDescription("Вы были забанены навсегда в боте Alfred.")
      .setTimestamp();

      message.channel.send(embed)
      return;
    }

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

client.on('message', (message) => {

  let ch = client.channels.get("564364090244595713")
  if(message.content.startsWith(`${prefix}`))
  {
    const embed = new Discord.RichEmbed()
    .setTitle("LOGS")
    .setColor("RANDOM")
    .setTimestamp()
    .addField("Имя гилда", message.guild)
    .addField("Имя пользователя", message.author.username)
    .addField("Контент", message.content)
    .setFooter("Время");
    ch.send(embed)
  }
});

client.login(cfg.token);
