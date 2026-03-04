import { auth } from '@/auth';
import { redirect } from 'next/navigation';
import { AdminSidebar } from '@/components/admin/AdminSidebar';

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  // Check authentication on server side
  if (!session?.user) {
    redirect('/admin_login87865678798');
  }

  // Check if user is authorized admin
  if (session.user.email !== 'postpr0727@gmail.com') {
    redirect('/admin_login87865678798?error=Unauthorized');
  }

  return <AdminSidebar>{children}</AdminSidebar>;
}
