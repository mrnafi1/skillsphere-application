import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import clientPromise from "./mongodb";

const getDb = async () => {
  const client = await clientPromise;
  return client.db("skillsphere");
};

export const auth = betterAuth({
  database: mongodbAdapter(await getDb()),
  baseURL: process.env.BETTER_AUTH_URL,
  secret: process.env.BETTER_AUTH_SECRET,
  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID || "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || "",
    },
  },
  user: {
    additionalFields: {
      image: {
        type: "string",
        required: false,
      },
    },
  },
});
