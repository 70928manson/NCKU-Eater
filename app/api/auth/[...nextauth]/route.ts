import bcrypt from "bcrypt";

import NextAuth, { AuthOptions } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider from "next-auth/providers/github";
import GoogleProvider from "next-auth/providers/google";
import InstagramProvider from "next-auth/providers/instagram";

import User from "@/models/User";
import connect from "@/lib/db";

const authOptions: AuthOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_CLIENT_ID as string,
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        InstagramProvider({
            clientId: process.env.INSTAGRAM_CLIENT_ID as string,
            clientSecret: process.env.INSTAGRAM_CLIENT_SECRET as string
        }),
        CredentialsProvider({
            name: 'credentials',
            credentials: {
                email: { label: 'email', type: 'text' },
                password: { label: 'password', type: 'password' }
            },
            async authorize(credentials, req) {
                await connect();
                // 無email 或 無password 狀況
                if (!credentials?.email || !credentials?.password) {
                    throw new Error('Please enter your email and password')
                };

                try {
                    const user = await User.findOne({
                        email: credentials.email
                    });

                    if (!user || !user?.password) {
                        throw new Error('Please confirm whether the email and password you entered are correct.');
                    };

                    const isCorrectPassword = await bcrypt.compare(
                        credentials.password,
                        user.password
                    );

                    if (!isCorrectPassword) {
                        throw new Error('Please confirm whether the email address and password you entered are correct.')
                    };

                    if (user) {
                        return user;
                    } else {
                        return null;
                    }
                }catch (err: any) {
                    console.log("err", err);
                    throw new Error(err?.message || "Auth Error");

                }
            },
        })
    ],
    // https://next-auth.js.org/getting-started/typescript
    callbacks: {
        async session({ session, token, user }) {
            await connect();
            const userData = await User.findOne({ email: session?.user?.email, });
            return {
                ...session,
                user: {
                    id: userData?._id,
                    username: session?.user?.name || userData?.username,
                    email: session?.user?.email || userData?.email,
                    favoriteStores: userData?.favoriteStores || [],
                    image: session?.user?.image || ""
                }
            };
            // return session 
            // The return type will match the one returned in `useSession()`
        },
    },
    debug: process.env.NODE_ENV === "development",
    session: {
        strategy: "jwt"
    },
    secret: process.env.NEXTAUTH_SECRET
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };