import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookie, setCookie } from 'cookies-next';
import { signAccessToken, verifyToken } from '@/pages/api/auth/utils/index';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const { useHttpCookie } = req.body;
  
  const refreshToken = getCookie('refresh_token', { req, res });

  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }

  try {
    const user = verifyToken(refreshToken as string) as any;
    const newAccessToken = signAccessToken({ id: user.id, email: user.email });

    setCookie('token', newAccessToken, {
      req,
      res,
      httpOnly: useHttpCookie ?? true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
    });

    return res.status(200).json({ success: true });
  }
  catch (err) {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
}