import cookie from 'cookie';
import { API_URL } from '@/config/index';

// this route is like a middle man for strapi. We are doing this so we can set an http cookie with our token
export default async (req, res) => {
  if (req.method === 'GET') {
    if (!req.headers.cookie) {
      console.log('Forbidden in user.js line8');
      res.status(403).json({ message: 'Not Authorized' });
      return;
    }

    const { token } = cookie.parse(req.headers.cookie);

    const strapiRes = await fetch(`${API_URL}/users/me`, {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const user = await strapiRes.json();

    if (strapiRes.ok) {
      res.status(200).json({ user });
    } else {
      console.log('Forbidden in user.js line27');
      res.status(403).json({ message: 'User forbidden' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
};
