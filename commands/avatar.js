module.exports = {
    name: 'avatar',
    description: 'gibs avatar',
    execute(message, args) {
        if (message.author.avatar.includes("a_")) {
            message.channel.send(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.gif`)

        }
        else {
            message.channel.send(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
            //   console.log(message.author.avatarURL())
        }
    }
}