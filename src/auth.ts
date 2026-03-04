
import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

console.log("Auth Debug - Client ID:", process.env.AUTH_GOOGLE_ID ? "Present" : "Missing");
console.log("Auth Debug - Client Secret:", process.env.AUTH_GOOGLE_SECRET ? "Present" : "Missing");
console.log("Auth Debug - Admin Email:", process.env.ADMIN_EMAIL ? "Present" : "Missing");
console.log("Auth Debug - Auth Secret:", process.env.AUTH_SECRET ? "Present" : "Missing");

export const { handlers, auth, signIn, signOut } = NextAuth({
    trustHost: true, // Required for localhost and production
    secret: process.env.AUTH_SECRET,
    providers: [
        Google({
            clientId: process.env.AUTH_GOOGLE_ID,
            clientSecret: process.env.AUTH_GOOGLE_SECRET,
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 30 * 24 * 60 * 60, // 30 days
        updateAge: 24 * 60 * 60, // 24 hours (session will be updated if older than this)
    },
    callbacks: {
        async signIn({ user }) {
            if (!user.email) return false;

            // Allow only the specific admin email defined in .env
            if (user.email === process.env.ADMIN_EMAIL) {
                return true;
            }

            console.log(`Unauthorized login attempt by: ${user.email}`);
            return false; // Reject other emails
        },
        async session({ session, token }) {
            // Add user email to session
            if (token?.email) {
                session.user.email = token.email;
            }
            return session;
        },
        async jwt({ token, user }) {
            // Persist email in the token
            if (user?.email) {
                token.email = user.email;
            }
            return token;
        },
    },
    pages: {
        signIn: '/admin_login87865678798', // Redirect here if unauthenticated
        error: '/admin_login87865678798', // Redirect here on error
    },
});
