import mongoose, { Document } from "mongoose";
import bcrypt from "bcryptjs";
import { ObjectId } from "mongoose";

// Extend the IUser interface to include the _id field as ObjectId
export interface IUser extends Document {
  _id: ObjectId; // Explicitly define _id as ObjectId
  name: string;
  email: string;
  password: string;
  role: "Talent" | "Scout" | "Coach" | "Admin";
  isAdmin: boolean;
  matchPassword(enteredPassword: string): Promise<boolean>;
}

const userSchema = new mongoose.Schema<IUser>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["Talent", "Scout", "Coach", "Admin"], default: "Talent" },
  isAdmin: { type: Boolean, default: false }, // New admin field
});

// Password hashing before saving user
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Password verification
userSchema.methods.matchPassword = async function (enteredPassword: string) {
  return await bcrypt.compare(enteredPassword, this.password);
};

// Create the User model based on the IUser interface
const User = mongoose.model<IUser>("User", userSchema);

export default User;
