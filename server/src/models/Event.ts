import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEvent extends Document{
  type:string,
  user:Types.ObjectId,
  metadata?:Record<string,any>,
  createdAt?:Date,
  updatedAt?:Date
}
const eventsSchema = new Schema<IEvent>(
  {
    type: { type: String, required: true },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "userModel" },
    metadata: { type: Object },
  },
  { timestamps: true },
);
const Event = mongoose.model<IEvent>("Event", eventsSchema);
export default Event;
