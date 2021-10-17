module.exports = {
  name: 'dang',
  description: 'sadges people',
  execute(message, args) {
    if (message.author.username != "Kuru") {
      message.react('765695829410316300')
    } else {
      message.channel.send("Made you Look")
    }
  }
}