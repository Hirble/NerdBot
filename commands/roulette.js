let remainChamber = 6

const spinCylinder = (message) => {
    if (remainChamber > 3) {
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
}

const massRes = (message) => {
    let deadRole = message.guild.roles.cache.find(role => {
        return role.name === "Graveyard"
    })
    let deadCount = message.guild.roles.cache.find(role => {
        return role.name === "Graveyard"
    }).members

    deadCount.forEach(grave => {
        grave.roles.remove(deadRole)
    });
}


module.exports = {
    name: 'roulette',
    aliases: ['spin', 'res', 'bigres'],
    description: 'might shoot you',
    cooldown: 0,
    execute(client, message, cmd, args) {


        if (cmd === 'roulette') {
            function getRandomInt(max) {
                return Math.floor(Math.random() * max);
            }
            chamber = getRandomInt(remainChamber)
            // chamber = 5
            console.log(chamber);
            if (chamber === 0) {
                message.channel.send("https://cdn.discordapp.com/attachments/360103749844336640/897063405070987264/Alakablam.mp4")
                message.channel.send("uh oh *(gunshots are loud please wear proper hearing protection)*")

                let deadRole = message.guild.roles.cache.find(role => {
                    return role.name === "Graveyard"
                })
                let newDead = message.guild.members.cache.get(message.author.id)

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