module.exports = {
  name: 'dang',
  description: 'sadges people',
  execute(client, message) {
    if (message.author.username != "Kuru") {
      message.channel.send('<:sadge:759279448074879027>')
    } else {
      message.channel.send("Made you Look")
    }
  }
}