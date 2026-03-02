import type { NextApiRequest, NextApiResponse } from 'next';

import { setCookie } from 'cookies-next';
import { signAccessToken, signRefreshToken } from '@/pages/api/auth/utils/index';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password, useHttpCookie } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: 'Email and password are required' });
  }

  // Dummy auth check
  if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {

    const user = { id: 1, email };

    const accessToken = signAccessToken(user);
    const refreshToken = signRefreshToken(user);

    setCookie('token', accessToken, {
      req,
      res,
      httpOnly: useHttpCookie ?? true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    setCookie('refresh_token', refreshToken, {
      req,
      res,
      httpOnly: useHttpCookie ?? true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({ success: true });
  }

  return res.status(401).json({ error: 'Invalid credentials' });
}
