import mongoose,{Schema,Document} from "mongoose";

export interface ISettings extends Document{
  companyName:string,
  smtp?:{host?:string},
  branding?:{companyName?:string},
  apiKeys:{keyHash:string,createdAt:Date}[],
  createdAt?:Date,
  updatedAt?:Date
}

const SettingsSchema = new Schema<ISettings>(
  {
    companyName: String,
    smtp: {
      host: String,
    },
    branding: {
      companyName: String,
    },
    apiKeys: [
      {
        keyHash: String,
        createdAt: { type: Date, default: Date.now },
      },
    ],
  },
  { timestamps: true },
);

const Setings = mongoose.model<ISettings>("Setings", SettingsSchema);
export default Setings;
