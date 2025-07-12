import mongoose from 'mongoose';
const uri = "mongodb+srv://ghewarevarad4:Varadgheware6@cluster0.xdtg6lm.mongodb.net/todolist?retryWrites=true&w=majority&appName=Cluster0";

const connectDB = async () => {
  try {
    const con = await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      dbName: 'todolist' 
    });
    console.log(`Connection established ${con.connection.host}`);
  } catch (error) {
    console.log("Error in connection:", error);
    process.exit(1);
  }
};

export default connectDB;