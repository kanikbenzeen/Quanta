const mongoose = require("mongoose")
const connectionString ="mongodb+srv://kanik:HWbCd5eEZg4xSIBE@chat.gh5k8jg.mongodb.net/chat?retryWrites=true&w=majority"
const coneectDB = () =>{

    mongoose.connect(connectionString, {})
    .then(()=>{
        console.log(`database connected`)
    })
    .catch((error)=>{
          console.log(error.message)
    })

}


module.exports = coneectDB