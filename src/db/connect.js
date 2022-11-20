const mongoose = require('mongoose')

function connectToDb() {
    try {
        console.log('connectToDb')
        mongoose.connect(`mongodb://${process.env.DB_HOST}/api`,
        // mongoose.connect('mongodb://localhost:27017/api',
            {
                useNewUrlParser: true,
                useCreateIndex: true,
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