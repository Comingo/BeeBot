const Discord = require("discord.js");
const prefix = '%'
let embeds = require("./data/embeds.js")
const cfg = require("./data/config.js");
const client = new Discord.Client();

client.on("ready", () => {
  client.user.setActivity(`${client.guilds.size} серверов || %help`, {type: "WATCHING"})
});

client.on("guildAdd", () => {
  let hue = client.channels.get("555426672225157132")
  const guildadd = new Discord.RichEmbed()
  .setTitle("Новый гилд.")
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


client.login(cfg.token);
