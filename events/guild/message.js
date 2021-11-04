const cooldowns = new Map();

module.exports = (Discord, client, message) => {
  // assign a different prefix for commands
  const prefix = "~";
  // if message doesn't have the prefix then GET OUTTA HERE, also if you're a bot
  if(!message.content.startsWith(prefix) || message.author.bot) return;
  // strikethrough exception
  if(message.content[1] == prefix) return;

  // seperate arguments and commands from the string coming in after prefix
  const args =  message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

  // return if the command does not exist in our file system
  if(!command) return message.reply("Not a valid command");

  if(!cooldowns.has(command.name)){
    cooldowns.set(command.name, new Discord.Collection());
  }

  const time = Date.now();
  const timeStamp =  cooldowns.get(command.name);
  const cooldownAmt = command.cooldown * 1000;

  if(timeStamp.has(message.author.id)) {
    const resetTimer =  timeStamp.get(message.author.id) + cooldownAmt;

    if(time < resetTimer) {
      const timeLeft = (resetTimer - time)/1000;

      return message.reply(`oGCD on cooldown. ${timeLeft.toFixed(1)} seconds before you can use ${command.name} again.`)
    }
  }

  timeStamp.set(message.author.id, time);
  setTimeout(() => timeStamp.delete(message.author.id), cooldownAmt)

  // if the command matches the command list, execute the exported function from the individual command file
  // ergo ~avatar executes the avatar command
  try {
    command.execute(client, message, cmd, args, Discord)
  } catch (err) {
    message.reply("Something Went Wrong! <:sadge:759279448074879027>")
    console.log(err)
  }
}