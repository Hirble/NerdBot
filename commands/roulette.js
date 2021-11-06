let remainChamber = 6;
let deadArr = new Map()

const spinCylinder = (message) => {
    if (remainChamber > 1) {
        return message.channel.send("these odds aren't even that bad just pull the trigger")
    }
    else {
        remainChamber = 6
        return message.channel.send('alway rember wen u wer 2 scare to pull the fuckign trigger <:Rember:363188112056254474> \n (gave the cylinder a good spin)')
    }
}

const resDead = (message, args, client) => {
    const stringArg = args.join(' ')
    let deadRole = message.guild.roles.cache.find(role => {
        return role.name === "Graveyard"
    })
    let userId = client.users.cache.find(user => {
        return user.username == stringArg
    }).id
    let newRes = message.guild.members.cache.get(userId)

    newRes.roles.remove(deadRole)
    message.channel.send('✧･ﾟ: *✧･ﾟ:* ***ZOP*** ✧･ﾟ: *✧･ﾟ:*\n I cast alive ur mans IV')
}

const massRes = (message) => {
    let deadRole = message.guild.roles.cache.find(role => {
        return role.name === "Graveyard"
    })

   console.log(deadArr.size)
   
   deadArr.forEach(async grave =>  await grave.roles.remove(deadRole));
   message.channel.send("just stop being dead??????")
}

module.exports = {
    name: 'roulette',
    aliases: ['spin', 'res', 'bigres'],
    description: 'might shoot you',
    cooldown: 0,
    async execute(client, message, cmd, args) {
        if (message.channel.id == 905963181812355072) return message.channel.send("ghosts have no rights")
        console.log(deadArr.size)
        if (deadArr.size == 0) {
            deadArr = await message.guild.roles.cache.find(role => {
                return role.name === "Graveyard"
            }).members
        }
        console.log(deadArr)
        if (cmd === 'roulette') {
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            chamber = getRandomInt(remainChamber)
            // chamber = 0
            console.log(chamber);
            if (chamber === 0) {
                message.channel.send("https://cdn.discordapp.com/attachments/360103749844336640/897063405070987264/Alakablam.mp4")
                message.channel.send("uh oh *(gunshots are loud please wear proper hearing protection)*")

                let deadRole = message.guild.roles.cache.find(role => {
                    return role.name === "Graveyard"
                })
                let newDead = message.guild.members.cache.get(message.author.id);

                //take back control, don't be a sheep
                deadArr.set(message.author.id, newDead)
                newDead.roles.add(deadRole)
                remainChamber = 6
            }
            else {
                remainChamber--
                if (message.author.username != "cosy") {
                    message.channel.send("**[CLICK]** you lived this time, feel free to try again")
                }
                else {
                    message.channel.send("**[CLICK]** hmph.")
                }
                if (remainChamber > 1) {
                    message.channel.send(`${remainChamber} chamber(s) remaining <:monakS:520414023737540617>`)
                }
            }
        }
        else if (cmd === 'spin') spinCylinder(message)
        else if (cmd === 'res') resDead(message, args, client)
        else if (cmd === 'bigres') massRes(message)
    }
}