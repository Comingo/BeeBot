const Discord = require("discord.js");
const prefix = '%'
let embeds = require("./data/embeds.js")
const cfg = require("./data/config.js");
const client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity(`${client.guilds.size} серверов || %help`, {type: "WATCHING"})
});

client.on("message", (message) => {
  if(message.content === `${prefix}help`)
  {
    message.channel.send(`**Возможности**\n\n%mute @ping - мут пользователя.\n%kick @ping reason - кик\n%ban @ping reason - ban\n\n**ВСЕ БУДЕТ ДОПОЛНЯТЬСЯ, БОТ В БЕТА-ТЕСТЕ**`)

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
client.on("message", (message) => {
  if(message.content === `${prefix}sinfo`)
  {
    let sicon = message.guild.iconURL;
    const serverembed = new Discord.RichEmbed()
        .setDescription(`Сервер: \n ${message.guild.name}`)
        .setColor("#15f153")
        .setThumbnail(sicon)
        .addField('Владелец', message.guild.owner, true)
        .addField('ID сервера', message.guild.id, true)
        .addField('Регион', message.guild.region, true)
        .addField('Участников', `${message.guild.memberCount}`, true)
        .addField('Каналы',`${message.guild.channels.filter(c => c.type == 'text').size} текстовых\n${message.guild.channels.filter(c => c.type == 'voice').size} голосовых`, true )
        .addField('AFK Канал',`${message.guild.afkChannel !== null ? `${message.guild.afkChannel}` : 'Нет'}`, true)
        .addField('Роли', message.guild.roles.size, true)
        .addField('Эмодзи', message.guild.emojis.size, true)
        .setFooter('Сервер создан')
        .setTimestamp(new Date(message.guild.createdTimestamp))
        .setColor("RANDOM");
        message.channel.send(serverembed);
  }
});


client.on("message", (message) => {
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}prune`))
  {
    if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply("отсутствуют права");
    if(!args[0]) return message.reply("нельзя очистить меньше 1 знака или 0");
    message.channel.bulkDelete(args[0]).then(() => {
    message.channel.send(`Удалено ${args[0]} сообщение(ий)`).then(msg => msg.delete(2000));
      });
  };
});

client.on("message", (message) => {
  if(message.content.startsWith(`${prefix}mute`))
  {
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
  let messageArray = message.content.split(" ");
  let args = messageArray.slice(1);

  if(message.content.startsWith(`${prefix}ban`))
  {
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

client.login(cfg.token);
