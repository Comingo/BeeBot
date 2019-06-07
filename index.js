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

client.on("message", (message) => {

let args = message.content.slice(prefix.length).trim().split(/ +/g)

  function play(connection, message) {
      var server = servers[message.guild.id];
      server.dispatcher = connection.playStream(YTDL(server.queue[0], {filter: "audioonly"}));
      server.dispatcher.on("end", function() {
          if(server.dispatcher) play(connection, message)
          else {
          connection.disconnect();    
          message.guild.voiceConnection.disconnect()
          }
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

client.login(cfg.token);
