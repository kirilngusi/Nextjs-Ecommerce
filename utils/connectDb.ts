import mongoose , {ConnectOptions} from 'mongoose';
const dotenv = require('dotenv');

dotenv.config()
const connectDB = async () => {
    try {
      await mongoose.connect(process.env.MONGO_URL as string,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        } as ConnectOptions
    );
      console.log("Connected...");
    } catch (e) {
      console.error(e)
    }
  };

export default connectDB;