module.exports = {
  name: 'clear',
  description: "Clear messages!",
  async execute(message, args) {
    await message.channel.messages.fetch({limit: args[1]}).then(messages => {
      message.channel.bulkDelete(messages);
    })
  }
}