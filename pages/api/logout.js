import cookie from 'cookie';
import { API_URL } from '@/config/index';

// this route is like a middle man for strapi. We are doing this so we can set an http cookie with our token
export default async (req, res) => {
  if (req.method === 'POST') {
    // Destroy cookie
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        expires: new Date(0),
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({ message: 'Success' });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
