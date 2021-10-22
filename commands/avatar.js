module.exports = {
    name: 'avatar',
    aliases: 'a',
    description: 'gibs avatar',
    execute(client, message, cmd) {
        if (message.author.avatar.includes("a_")) {
            message.channel.send(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}.gif`)
        }
        else {
            message.channel.send(`https://cdn.discordapp.com/avatars/${message.author.id}/${message.author.avatar}`)
        }
    }
}