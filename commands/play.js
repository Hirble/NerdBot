const ytdl = require('ytdl-core');
const ytSearch = require('yt-search');

const queue = new Map()

const videoPlayer = async(guild, song) => {
  const songQueue = queue.get(guild.id);

  if(!song) {
    setTimeout(() => songQueue.voiceChannel.leave(), 5000);
    queue.delete(guild.id);
    return
  }
  const stream =  ytdl(song.url, { filter: 'audioonly' });
  songQueue.connection.play(stream, { seek: 0, volume: 1})
  .on('finish', () => {
    songQueue.songs.shift();
    videoPlayer(guild, songQueue.songs[0])
  });
  await songQueue.textChannel.send(`Now Playing ${song.title}`)
}

const skipSong = (message, songQueue) => {
  if(!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute command.');
  if(!songQueue) return message.channel.send(`There are no songs in queue`);
  songQueue.connection.dispatcher.end();
}

const stopPlaying = (message, songQueue) => {
  if(!message.member.voice.channel) return message.channel.send('You need to be in a channel to execute command.');
  songQueue.songs = []
  songQueue.connection.dispatcher.end();
}

module.exports = {
  name: 'play',
  aliases: ['skip', 'stop'],
  description: 'Joins and plays a video from youtube',
  async execute(client, message, cmd, args) {
    const voiceChannel = message.member.voice.channel;

    if(!voiceChannel) return message.channel.send('You need to be in a channel to execute command.');
    const permissions = voiceChannel.permissionsFor(message.client.user);
    if(!permissions.has('CONNECT')) return message.channel.reply('Not enough permissions, brother.');
    if(!permissions.has('SPEAK')) return message.channel.reply('Not enough permissions, brother.');
    
    const songQueue = queue.get(message.guild.id);
    //when the command comes in, if it's the play command dab
    if(cmd === 'play'){
      if(!args.length) return message.channel.reply('I need a link');
      let song = {}

      if(ytdl.validateURL(args[0])) {
        const songInfo = await ytdl.getInfo(args[0]);
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url
        }
      }else {
        //request to the youtube search api to check if video exists
        const finder = async query => {
          const videoResult =  await ytSearch(query);
          // if the videoResult comes back with information, return the first result
          // otherwise return NOTHING
          return (videoResult.videos.length > 1) ? videoResult.videos[0] : null;
        }

        const video = await finder(args.join(' '));
        if(video) {
          song = {
            title: video.title,
            url: video.url
          }
        } else {
          message.channel.send(`Couldn't find your stinky video.`)
        }
      }

      if(!songQueue) {
        const newQueue = {
          voiceChannel: voiceChannel,
          textChannel: message.channel,
          connection: null,
          songs: []
        }
  
        queue.set(message.guild.id, newQueue);
        newQueue.songs.push(song)
  
        try {
          const connection = await voiceChannel.join();
          newQueue.connection = connection;
          videoPlayer(message.guild, newQueue.songs[0])
        } catch (err) {
          queue.delete(message.quild.id);
          message.channel.send('Connection Error');
          throw err;
        }
      } else {
        songQueue.songs.push(song);
        return message.channel.send(`${song.title} added to queue.`)
      }
    } 
    else if(cmd === 'skip') skipSong(message, songQueue)
    else if(cmd === 'stop') stopPlaying(message, songQueue)
  }
}