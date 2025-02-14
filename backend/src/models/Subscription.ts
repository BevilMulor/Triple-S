// src/models/Subscription.ts
import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  scoutId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  isActive: { type: Boolean, default: false },
  subscribedAt: { type: Date, default: Date.now },
  expiresAt: { type: Date, required: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
