import mongoose, { Schema, Document, Model } from "mongoose";
import { AdminAttributes } from "../types/interface";
import bcrypt from "bcrypt";

// Interface for the Admin document (what a single admin instance has)
export interface AdminDocument extends Document {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}

// Interface for the Admin model (for adding custom static methods like `build`)
interface AdminModel extends Model<AdminDocument> {
  build(attributes: AdminAttributes): AdminDocument;
}

// Schema definition
const AdminSchema = new Schema<AdminDocument>(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    password: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    image: { type: String },
  },
  {
    timestamps: true,
    toJSON: {
      transform(doc, ret) {
        delete ret.password;
        delete ret.__v;
      },
    },
  }
);

// Static `build` method for type-safe object creation
AdminSchema.statics.build = (attributes: AdminAttributes): AdminDocument => {
  return new Admin(attributes);
};

AdminSchema.pre("save", async function (done) {
  if (this.isModified("password")) {
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(this.get("password"), salt);
    this.set("password", hashed);
  }
  done();
});

// Model creation
const Admin = mongoose.model<AdminDocument, AdminModel>("Admin", AdminSchema);

export { Admin };
