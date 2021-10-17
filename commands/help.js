module.exports = {
  name: 'help',
  description: 'sadges people',
  execute(message, args) {
    message.channel.send('```Command List: \n~play your-song-here: plays a URL or the first search item from YouTube. \n~stop: stops current song and kills the bot. \n~dang: sadges. \n~clear: clears messages in channel. ```')
  }
}