var express = require('express')
const app = express()
var horoscope = require('horoscope')
const cors = require('cors');
app.use(cors());




app.get('/', function (req, res) {
    res.send('Hello, To get your Zodiac Sign,  you should add to this url /horscope?birthdate=YOUR-BIRTHDAY-DATE with date format type YYYY-MM-DD');
});


function isValidDateFormat(dateString) {
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateString)
}

function isValidDateContent(dateArray) {


    const year = dateArray[0]
    const month = dateArray[1]
    const day = dateArray[2]


    const date = new Date(year, month - 1, day)

   

    if( date.getFullYear() == year && date.getMonth() == month - 1 && date.getDate() == day) {
        return true;
    }

    return false
}


app.get('/horoscope', (req, res) => {
    const {birthdate} = req.query;

    if (!birthdate || !isValidDateFormat(birthdate)) {
        return res.status(400).send('you should provide your birthday date as a query parameter with the format YYYY-MM-DD where year month and day are numbers ')
    }

    const birthdateArray = birthdate.split('-').map(Number)

    if (isValidDateContent(birthdateArray) === false ) {
        return res.status(400).send('INVALID DATE')
    }




    const zodiacSign = horoscope.getZodiac(birthdateArray[0])
    const astroSign = horoscope.getSign({month : birthdateArray[1], day: birthdateArray[2]})
    res.json({"astroSign": astroSign, "zodiacSign": zodiacSign})

})
 
const server = app.listen(3000, function() {
    console.log('Listening to port 3000')
})

module.exports = {app, server}
