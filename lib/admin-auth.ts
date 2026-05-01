import { getIronSession } from 'iron-session';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export interface AdminSession {
  isAdmin?: boolean;
  adminLoginTime?: number;
}

const sessionConfig = {
  password: process.env.ADMIN_SESSION_SECRET || 'default-insecure-password-change-this',
  cookieName: 'admin_session',
  cookieOptions: {
    secure: process.env.NODE_ENV === 'production',
    httpOnly: true,
    sameSite: 'strict' as const,
    maxAge: 24 * 60 * 60, // 24 hours
  },
};

export async function getSession() {
  const cookieStore = await cookies();
  const session = await getIronSession<AdminSession>(cookieStore, sessionConfig);
  return session;
}

export async function requireAdmin() {
  const session = await getSession();
  if (!session.isAdmin) {
    redirect('/admin/login');
  }
  return session;
}

export async function setAdminSession() {
  const session = await getSession();
  session.isAdmin = true;
  session.adminLoginTime = Date.now();
  await session.save();
}

export async function clearAdminSession() {
  const session = await getSession();
  session.destroy();
}
