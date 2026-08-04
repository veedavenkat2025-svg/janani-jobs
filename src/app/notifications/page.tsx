import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { revalidatePath } from "next/cache";

export default async function NotificationsPage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.email) {
    return (
      <main className="container" style={{ padding: "4rem 0", textAlign: "center" }}>
        <h1>Access Denied</h1>
        <p style={{ color: "var(--text-muted)", marginBottom: "2rem" }}>Please sign in to view your notifications.</p>
        <Link href="/api/auth/signin" className="btn btn-primary">Sign In</Link>
      </main>
    );
  }

  const user = await prisma.user.findUnique({
    where: { email: session.user.email },
    include: {
      notifications: {
        orderBy: { createdAt: "desc" }
      }
    }
  });

  if (!user) return <p>User not found</p>;

  // Mark all as read when they visit this page
  if (user.notifications.some(n => !n.isRead)) {
    await prisma.notification.updateMany({
      where: { userId: user.id, isRead: false },
      data: { isRead: true }
    });
  }

  return (
    <main className="container" style={{ padding: "4rem 0", maxWidth: "800px" }}>
      <header style={{ marginBottom: "3rem", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1 className="text-gradient" style={{ fontSize: "2.5rem" }}>Notification Center</h1>
        <span style={{ padding: "0.25rem 0.75rem", borderRadius: "20px", background: "var(--bg-subtle)", border: "1px solid var(--border-color)", fontSize: "0.875rem" }}>
          {user.notifications.length} Total
        </span>
      </header>

      {user.notifications.length === 0 ? (
        <div className="card" style={{ textAlign: "center", padding: "4rem 0" }}>
          <p style={{ color: "var(--text-muted)", fontSize: "1.25rem", marginBottom: "1rem" }}>You're all caught up! No new notifications.</p>
        </div>
      ) : (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {user.notifications.map((notif) => (
            <div key={notif.id} className="card" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", background: notif.isRead ? "var(--bg-card)" : "rgba(0, 229, 255, 0.05)", borderLeft: notif.isRead ? "1px solid var(--border-color)" : "4px solid var(--color-primary)" }}>
              <div>
                <h3 style={{ fontSize: "1.125rem", marginBottom: "0.25rem" }}>{notif.title}</h3>
                <p style={{ color: "var(--text-muted)", fontSize: "0.875rem", marginBottom: "0.5rem" }}>{notif.message}</p>
                <span style={{ fontSize: "0.75rem", color: "var(--text-muted)" }}>
                  {notif.createdAt.toLocaleString()}
                </span>
              </div>
              {notif.link && (
                <Link href={notif.link} className="btn btn-secondary" style={{ padding: "0.5rem 1rem", fontSize: "0.875rem" }}>
                  View
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
