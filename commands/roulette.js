module.exports = {
    name: 'roulette',
    description: 'might shoot you',
    cooldown: 0,
    execute(client, message) {
        function getRandomInt(max){
            return Math.floor(Math.random() * max);
        }
        chamber = getRandomInt(6)
        // chamber = 5
        console.log(chamber);
        if(chamber === 5){
            message.channel.send("https://cdn.discordapp.com/attachments/360103749844336640/897063405070987264/Alakablam.mp4")
            message.channel.send("uh oh *(gunshots are loud please wear proper hearing protection)*")

            let deadRole = message.guild.roles.cache.find(role => {
                return role.name === "Graveyard"
            })
            let newDead = message.guild.members.cache.get(message.author.id)

            newDead.roles.add(deadRole)

        }
        else{
            if(message.author.username != "cosy"){
            message.channel.send("**[CLICK]** you lived this time, feel free to try again")
            }
            else {
                message.channel.send("**[CLICK]** hmph.")
            }
        }
    }
  }