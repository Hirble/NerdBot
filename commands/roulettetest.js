module.exports = {
    name: 'roulettetest',
    description: 'might find out how many times you get shot',
    execute(message, args) {
        function getRandomInt(max) {
            return Math.floor(Math.random() * max);
        }
        let zero = 0
        let one = 0
        let two = 0
        let three = 0
        let four = 0
        let five = 0

        for (i = 0; i < 100; i++) {
            chamber = getRandomInt(6)
            if (chamber === 0) {
                zero++
            }
            else if (chamber === 1) {
                one++
            }
            else if (chamber === 2) {
                two++
            }
            else if (chamber === 3) {
                three++
            }
            else if (chamber === 4) {
                four++
            }
            else if (chamber === 5) {
                five++
            }
        }
        console.log(zero + "/" + one + "/" + two + "/" + three + "/" + four + "/" + five)
    }
}