const mongoose = require('mongoose')

function connectToDb() {
    try {
        console.log('connectToDb')
        // mongoose.connect('mongodb://mongodb-service.local:27017/api',
        mongoose.connect('mongodb://db:27017/api',
            {
                useNewUrlParser: true,
                useUnifiedTopology: true
            }
        );
    } catch(e) {
        console.log(e)
    }
}

module.exports = {
    connectToDb
}