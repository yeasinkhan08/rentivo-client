import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

const client = new MongoClient(process.env.MONGO_DB_URI);
const db = client.db("RENTIVO");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),
  emailAndPassword: { enabled: true },
  user: {
    additionalFields: {
      role: { type: "string", defaultValue: "customer", input: true },
      phone: { type: "string", required: false },
      address: { type: "string", required: false },
    },
  },
  databaseHooks: {
    user: {
      create: {
        // only "owner" can be chosen at signup; everything else becomes customer
        before: async (user) => ({
          data: { ...user, role: user.role === "owner" ? "owner" : "customer" },
        }),
      },
    },
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});
