const Discord = require("discord.js");
const fs = require('fs');
require('dotenv').config();

const prefix = "~"
let karma = false
const client = new Discord.Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter(file => file.endsWith('.js'));
for (const file of commandFiles) {
  const command = require(`./commands/${file}`);

  client.commands.set(command.name, command)
}

client.on('ready', () => {
  console.log("Hello World")
})

client.on('message', text => {
  console.log("=================================")
  console.log(text.content)
  //console.log(text)
  console.log("Sent By:", text.author.username)
  console.log("In channel:", text.channel.name)
  if (!text.content.startsWith(prefix) || text.author.bot) return;

  const argument = text.content.slice(prefix.length).split(" ")
  const command = argument[0]

  if (command === "help") {
    client.commands.get('help').execute(text, argument)
  } else if (command === "play") {
    client.commands.get('play').execute(text, argument)
  } else if (command === "dang") {
    client.commands.get('dang').execute(text, argument)
  } else if (command === "stop") {
    client.commands.get('stop').execute(text, argument)
  } else if (command === "clear") {
    text.channel.send("This feature is too powerful, under construction")
    // client.commands.get('clear').execute(text, argument)
  } else if (command === "avatar") {
    client.commands.get('avatar').execute(text, argument)
  }
  else if (command === "roulette") {
    client.commands.get('roulette').execute(text, argument)
 }
 else if (command === "roulettetest") {
  client.commands.get('roulettetest').execute(text, argument)
}

})



client.login(process.env.TOKEN);