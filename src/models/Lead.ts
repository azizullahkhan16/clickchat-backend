import mongoose, { Schema, Document, Model } from "mongoose";
import { LeadAttributes } from "../types/interface";

// Interface for the Lead document (what a single lead instance has)
export interface LeadDocument extends Document {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  session: mongoose.Types.ObjectId;
}

// Interface for the Lead model (for adding custom static methods like `build`)
interface LeadModel extends Model<LeadDocument> {
  build(attributes: LeadAttributes): LeadDocument;
}

// Schema definition
const LeadSchema = new Schema<LeadDocument>(
  {
    firstName: { type: String, required: false },
    lastName: { type: String, required: false },
    email: { type: String, required: false },
    phone: { type: String, required: false },
    notes: { type: String, required: false },
    session: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Session",
      required: true,
    },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.__v;
      },
    },
  }
);

// Static `build` method for type-safe object creation
LeadSchema.statics.build = (attributes: LeadAttributes): LeadDocument => {
  return new Lead(attributes);
};

// Model creation
const Lead = mongoose.model<LeadDocument, LeadModel>("Lead", LeadSchema);
export { Lead };
