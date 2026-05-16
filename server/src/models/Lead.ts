import mongoose, { Document, Schema } from "mongoose";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";

export interface ILead {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface ILeadDocument extends ILead, Document {
  createdAt: Date;
  updatedAt: Date;
}

const leadSchema = new Schema<ILeadDocument>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      trim: true,
      lowercase: true,
    },
    status: {
      type: String,
      enum: ["New", "Contacted", "Qualified", "Lost"],
      default: "New",
    },
    source: {
      type: String,
      enum: ["Website", "Instagram", "Referral"],
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Lead = mongoose.model<ILeadDocument>("Lead", leadSchema);

export default Lead;
