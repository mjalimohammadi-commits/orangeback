import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    // ورود با ایمیل/پسورد (Mock)
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // 🔥 اینجا بعدا وصل میشه به DB
        if (
          credentials.email === "test@orangeback.com" &&
          credentials.password === "123456"
        ) {
          return { id: 1, name: "Test User", email: "test@orangeback.com" };
        }
        return null;
      },
    }),

    // ورود با گوگل
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],

  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
});
