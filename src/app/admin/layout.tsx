import "@/app/[locale]/globals.css";
import AdminLayoutClient from "@/components/admin/AdminLayoutClient";

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'TVAS Admin',
  description: 'The Village Art Studio Administration Portal',
};

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="antialiased bg-slate-50 text-slate-900" suppressHydrationWarning>
        <AdminLayoutClient>
          {children}
        </AdminLayoutClient>
      </body>
    </html>
  );
}
