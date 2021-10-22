module.exports = {
    name: 'roulette',
    description: 'might shoot you',
    cooldown: 10,
    execute(client, message) {
        function getRandomInt(max){
            return Math.floor(Math.random() * max);
        }
        chamber = getRandomInt(6)
        if(chamber === 5){
            message.channel.send("https://cdn.discordapp.com/attachments/360103749844336640/897063405070987264/Alakablam.mp4")
            message.channel.send("uh oh *(gunshots are loud please wear proper hearing protection)*")
        }
        else{
            message.channel.send("**[CLICK]** you lived this time, feel free to try again")
        }
    }
  }