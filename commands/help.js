module.exports = {
  name: 'help',
  description: 'sadges people',
  execute(client, message) {
    message.channel.send('```Command List: \n~avatar: gives you back your avatar \n~play your-song-here: plays a URL or the first search item from YouTube. \n~stop: stops current song and kills the bot. \n~dang: sadges. \n~clear: clears command messages in channel. \n~roulette: test your luck.```')
  }
}