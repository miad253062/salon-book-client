import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.BETTER_AUTH_DB_URL as string);
const db = client.db('salonbook-db');

export const auth = betterAuth({
    emailAndPassword: { 
    enabled: true, 
    autoSignIn: false,
  }, 
  baseURL: process.env.BETTER_AUTH_URL, 
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
    },
  user: {
    additionalFields: {
      role: {
        type: "string",
        required: true,
        input: false,
        defaultValue: "customer",
      },
      isBlocked: {
        type: "boolean",
        required: true,
        input: false,
        defaultValue: false,
      },
    },
  },
  database: mongodbAdapter(db, {
    client,
  }),
});