import NextAuth from 'next-auth';
import Google from 'next-auth/providers/google';

// Only this email is allowed to access admin panel
const ALLOWED_EMAIL = 'postpr0727@gmail.com';

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers: [
    Google({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  pages: {
    signIn: '/admin_login87865678798',
    error: '/admin_login87865678798',
  },
  callbacks: {
    async signIn({ user }) {
      // Only allow the specific email to sign in
      if (user.email !== ALLOWED_EMAIL) {
        return false;
      }
      return true;
    },
    async session({ session }) {
      // Attach additional info if needed
      return session;
    },
    async redirect({ url, baseUrl }) {
      // Redirect to admin board after successful login
      if (url.startsWith(baseUrl)) {
        return `${baseUrl}/admin_board`;
      }
      return baseUrl;
    },
  },
  session: {
    strategy: 'jwt',
    maxAge: 24 * 60 * 60, // 24 hours
  },
  trustHost: true,
});

// Helper function to check if user is admin
export function isAdmin(email: string | null | undefined): boolean {
  return email === ALLOWED_EMAIL;
}

// Export allowed email for use in middleware
export { ALLOWED_EMAIL };
