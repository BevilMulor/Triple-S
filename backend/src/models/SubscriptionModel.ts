import mongoose from "mongoose";

const subscriptionSchema = new mongoose.Schema({
  scoutId: { type: mongoose.Schema.Types.ObjectId, ref: "Scout", required: true },
  status: { type: String, enum: ["active", "expired"], default: "active" },
  expiresAt: { type: Date, required: true },
});

const Subscription = mongoose.model("Subscription", subscriptionSchema);
export default Subscription;
