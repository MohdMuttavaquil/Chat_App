import mongoose from 'mongoose'

export const dbConnect = ()=>{
    try {
       mongoose.connect("mongodb://127.0.0.1:27017/LetConnect")
      console.log('db connextrd')    
    } catch (error) {
        console.log(error)
    }
    
}
