const mongoose = require( "mongoose")


const workersSchema = new mongoose.Schema({
      name : {
            type : String,
            value : true
      },
      email : {
            type :String,
            value : true,
            unique : true
      },
      password : {
            type : String,
            value : true
      }

})

module.exports = mongoose.model('workers', workersSchema)