import type { NextApiRequest, NextApiResponse } from 'next';

import { setCookie } from 'cookies-next';
import { signAccessToken, signRefreshToken } from '@/pages/api/auth/utils/index';


export default async function handler(req: NextApiRequest, res: NextApiResponse) {

  if (req.method !== 'POST') {
    console.log('Method not allowed:', req.method);
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password, useHttpCookie } = req.body;

  // Dummy auth check
  if (email === 'admin@bimapay.com' && password === '12345678') {

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
