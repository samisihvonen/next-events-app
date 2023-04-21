import type { NextApiRequest, NextApiResponse } from 'next';
import cookie from 'cookie';

const logout = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === 'POST') {
    res.setHeader(
      'Set-Cookie',
      cookie.serialize('token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV !== 'development',
        maxAge: 0, // 1 week
        sameSite: 'strict',
        path: '/',
      })
    );

    res.status(200).json({
      message: 'Success',
    });
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).json({
      message: `Method ${req.method} not allowed`,
    });
  }
};

export default logout;