import type { NextApiRequest, NextApiResponse } from 'next';
import { getCookie, setCookie } from 'cookies-next';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const token = getCookie('token', { req, res });
  const refreshToken = getCookie('refresh_token', { req, res });

  if (token) {
    setCookie('token', '', {
      req,
      res,
      maxAge: -1,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  if (refreshToken) {
    setCookie('refresh_token', '', {
      req,
      res,
      maxAge: -1,
      path: '/',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });
  }

  return res.status(200).json({ success: true, message: 'Logout Successfully' });
}
