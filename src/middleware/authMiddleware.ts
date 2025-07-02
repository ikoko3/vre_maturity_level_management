import { Request, Response, NextFunction } from 'express';
import { jwtVerify, createRemoteJWKSet } from 'jose';
import { config } from '../config/config';

const jwks = createRemoteJWKSet(new URL(config.jwt.jwksUri));

export async function authenticate(req: Request, res: Response, next: NextFunction): Promise<void> {
  const authHeader = req.headers.authorization;

  if (!authHeader?.startsWith('Bearer ')) {
    res.status(401).json({ error: 'Missing token' });
    return; 
  }

  const token = authHeader.split(' ')[1];

  try {
    const { payload } = await jwtVerify(token, jwks, {
      issuer: config.jwt.issuer,
      audience: config.jwt.audience,
    });

    // Attach user info for later use
    (req as any).user = payload;

    const roles =
      (req as any).user?.resource_access?.[config.jwt.audience]?.roles || [];
    if (roles.includes('coordinator')) {
    // show or allow coordinator actions
    }


    next();
  } catch (err) {
    console.error('JWT validation failed:', err);
    res.status(401).json({ error: 'Invalid or expired token' });
  }
}
