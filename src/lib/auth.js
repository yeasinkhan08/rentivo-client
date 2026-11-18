import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("RENTIVO");

export const auth = betterAuth({
  database: mongodbAdapter(db, {
    client,
  }),
  emailAndPassword: {
    enabled: true,
  },
  user: {
    additionalFields: {
      role: {
        type: ["customer", "owner", "admin"],
        input: false,
      },
    },
  },

  socialProviders: {
    google: {
      clientId: process.env.googl,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
