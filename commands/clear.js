module.exports = {
  name: 'clear',
  description: "Clear messages!",
  async execute(client, message, cmd, args) {
    await message.channel.messages.fetch({limit: 20}).then(messages => {
      messages.forEach( msg => {
        //currently deleting strikethrough
        if(msg.content.startsWith('~') || msg.author.bot){
          if(msg.content[1] == '~'){
            console.log('exception')
          }else {
            msg.delete()
          }
        }    
      })
    })
  }
}