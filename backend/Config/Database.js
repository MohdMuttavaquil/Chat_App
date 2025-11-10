import mongoose from 'mongoose'

export const dbConnect = ()=>{
    try {
       mongoose.connect(process.env.MONGODB_CONNACTION)
      console.log('db connextrd')    
    } catch (error) {
        console.log(error)
    }
    
}
