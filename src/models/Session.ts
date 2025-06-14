import mongoose, { Schema, Document, Model } from "mongoose";
import { SessionAttributes } from "../types/interface";

// Interface for the Session document (what a single session instance has)
export interface SessionDocument extends Document {
  ipAddress: string;
  location: {
    country?: string;
    region?: string;
    city?: string;
    latitude?: number;
    longitude?: number;
    timezone?: string;
    postalCode?: string;
  };
  pageUrl: string;
}

// Interface for the Session model (for adding custom static methods like `build`)
interface SessionModel extends Model<SessionDocument> {
  build(attributes: SessionAttributes): SessionDocument;
}

// Schema definition
const SessionSchema = new Schema<SessionDocument>(
  {
    ipAddress: { type: String, required: true },
    location: {
      country: { type: String, required: false },
      region: { type: String, required: false },
      city: { type: String, required: false },
      latitude: { type: Number, required: false },
      longitude: { type: Number, required: false },
      timezone: { type: String, required: false },
      postalCode: { type: String, required: false },
    },
    pageUrl: { type: String, required: true },
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

SessionSchema.path("location").validate(function (value: any) {
  return Object.values(value || {}).some((v) => v !== undefined && v !== null);
}, "At least one field in 'location' is required.");

// Static `build` method for type-safe object creation
SessionSchema.statics.build = (
  attributes: SessionAttributes
): SessionDocument => {
  return new Session(attributes);
};

// Model creation
const Session = mongoose.model<SessionDocument, SessionModel>(
  "Session",
  SessionSchema
);

export { Session };
