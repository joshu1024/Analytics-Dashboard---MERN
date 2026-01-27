import mongoose from "mongoose";

const eventsSchema = new mongoose.Schema(
  {
    type: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
    metadata: { type: Object },
  },
  { timestamps: true },
);
const Event = mongoose.model("Event", eventsSchema);
export default Event;
