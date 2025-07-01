import type { NextApiRequest, NextApiResponse } from 'next';

import { getCookie } from 'cookies-next';
import { verifyToken } from '@/pages/api/auth/utils/index';


export default function handler(req: NextApiRequest, res: NextApiResponse) {

  const token = getCookie('token', { req, res });

  if (!token) return res.status(401).json({ error: 'No token' });

  try {
    const user = verifyToken(token as string);
    return res.status(200).json({ message: 'Protected content', user });
  }
  catch {
    return res.status(401).json({ error: 'Invalid token' });
  }
}
