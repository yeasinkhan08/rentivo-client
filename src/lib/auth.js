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
  session: {
    expiresIn: 60 * 60 * 24 * 30,
    updateAge: 60 * 60 * 24,
  },
  databaseHooks: {
    user: {
      create: {
        // only "owner" can be chosen at signup; everything else becomes customer
        before: async (user) => ({
          data: { ...user, role: user.role === "owner" ? "owner" : "customer" },
        }),
      },
      update: {
        // roles are only changed by an admin through our Express server
        before: async (user) => {
          if (user.role !== undefined) {
            throw new Error("Role cannot be changed here");
          }
          return { data: user };
        },
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
