const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

module.exports = {
  name: 'play',
  description: 'Joins and plays a video from youtube',
  async execute(message, args) {
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.channel.send('You need to be in a channel to execute command.');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.channel.reply('Not enough permissions, brother.');
    if(!permissions.has('SPEAK')) return message.channel.reply('Not enough permissions, brother.');
    if(!args.length) return message.channel.reply('I need a link');

    const validURL = (str) => {
      const regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex.test(str)){
        return false;
      }else {
        return true;
      }
    }
    console.log(args.shift())
    console.log(validURL(args[0]))

    if(validURL(args[0])) {
      // message.channel.send('You entered a correct URL');

      const connection = await voiceChannel.join();
      const stream = ytdl(args[0], {filter: 'audioonly'});

      connection.play(stream, {seek: 0, volume: 1})
      .on('finish', () => {
        // message.channel.send('Song Ended.')
        voiceChannel.leave();
      })

      await message.reply('Now Playing your linked video')

      return
    }

    const connection = await voiceChannel.join();

    const videoFinder =  async (query) => {
      const videoResult = await ytSearch(query);

      return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
    }

    const video = await videoFinder(args.join(' '));

    if(video) {
      const stream = ytdl(video.url, {filter: 'audioonly'});
      connection.play(stream, {seek: 0, volume: 1})
      .on('finish', () => {
        voiceChannel.leave();
      });

      await message.reply(`Now playing: ${video.title}`)
    }
  }
  //initialize array to store song queue
  //have play function first check that a song is not playing
  //if song is playing, add terms of search as string to array
  //after song ends, check if next index is occupied by search terms
}