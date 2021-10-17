module.exports = {
    name: 'karmageddon',
    description: 'thanks kind stranger',
    execute(text, args) {
        if (text.author.username !="a dead rat") {
            text.react(765695829410316300)

        }
    }
}