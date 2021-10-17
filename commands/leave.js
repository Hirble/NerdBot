module.exports = {
  name: 'stop',
  description: 'stops bot and makes it leave channel',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.channel.send('You need to be in a channel to execute command.');
    await voiceChannel.leave();
    await message.channel.send('Leaving Channel <:sadge:759279448074879027>')
  }
}