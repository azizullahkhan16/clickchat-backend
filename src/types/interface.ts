import mongoose from "mongoose";
import { SenderType } from "./enum";

export interface AdminAttributes {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  image?: string;
}

export interface ChatAttributes {
  session: mongoose.Types.ObjectId;
  lead: mongoose.Types.ObjectId;
}

export interface LeadAttributes {
  firstName?: string;
  lastName?: string;
  email?: string;
  phone?: string;
  notes?: string;
  session: mongoose.Types.ObjectId;
}

export interface MessageAttributes {
  sender: mongoose.Types.ObjectId;
  senderType: SenderType;
  content: string;
  chatId: mongoose.Types.ObjectId;
}

export interface SessionAttributes {
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
