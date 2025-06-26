import mongoose from "mongoose";

interface IUser extends Document{
  _id:string,
  name:string,
  email:string,
  password:string
  createdAt?:Date
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  createdAt: { type: String, default: Date.now },
});

export default mongoose.model("User", userSchema);
