//PORT:
const port = 4000



const express = require('express');
const app = express();

const bot = require("./bot/main.js")


app.get('/', async function(req, re) {
  var r = req.query
  if(!r.path) {
    re.sendFile(__dirname + "/viewer/index.html")
  }
  if(r.path == "run" && r.token && !r.guild) {
    await bot.login(r.token)
    re.send(bot.selectGuild())
  }
  if(r.path == "sch" && r.guild) {
    re.send(bot.selectChannel(r.guild))
  }
  if(r.path == "msgs" && r.channel) {
    re.send(await bot.messages(r.channel))
  }
  if(r.path == "send" && r.channel) {
    await bot.send(r.channel, r.msg)
    re.send(await bot.messages(r.channel))
  }
  if(r.path == "sdm" && r.user && r.message) {
    bot.senddm(r.user, r.message)
    re.send(await bot.msgsdm(r.user))
  }
  if(r.path == "dm" && r.dm) {
    re.send(await bot.msgsdm(r.dm))
  }
  if(r.path == "leave" && r.guild) {
    await bot.leave(r.guild)
    re.send(bot.selectGuild())
  }
  if(r.path == "delete" && r.channel && r.guild) {
    await bot.deletech(r.channel)
    re.send(bot.selectChannel(r.guild))
  }
  if(r.path == "deleter" && r.role && r.guild) {
    await bot.deleter(r.role, r.guild)
    re.send(bot.selectRole(r.guild))
  }
  if(r.path == "deletem" && r.member && r.guild) {
    await bot.deletem(r.member, r.guild)
    re.send(bot.selectMember(r.guild))
  }
  if(r.path == "ms" && r.guild) {
    re.send(bot.selectMember(r.guild))
  }
  if(r.path == "delM" && r.channel && r.message) {
    await bot.delM(r.message, r.channel)
    re.send(await bot.messages(r.channel))
  }
  if(r.path == "roles" && r.guild) {
    re.send(bot.selectRole(r.guild))
  }
  if(r.path == "create" && r.name && r.type && r.guild) {
    await bot.create(r.name, {type: r.type}, r.guild)
    re.send(bot.selectChannel(r.guild))
  }
  if(r.path == "crro" && r.name && r.guild) {
    await bot.createRole(r.name, r.perms, r.guild)
    re.send(bot.selectRole(r.guild))
  }
  if(r.path == "list") {
    re.send(bot.selectGuild())
  }
  if(r.path == "clist" && r.channel) {
    re.send(bot.selectChannel(bot.getGuild(r.channel)))
  }
  if(r.logoff == "1") {
    re.sendFile(__dirname + "/viewer/index.html")
    bot.logout()
  }
});

const listener = app.listen(port, function() {
  console.log(`Go to any browser on THIS computer and open http://localhost:${port}`)
})
