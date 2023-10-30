import crypto from 'crypto';

export function hashPassword(password: string): { salt: string; hashedPassword: string } {
  const salt = crypto.randomBytes(16).toString('hex');
  const hashedPassword = crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');

  return { salt, hashedPassword };
}

export function verifyPassword(password: string, salt: string, hashedPassword: string): boolean {
  const hashedAttempt = crypto
    .createHash('sha256')
    .update(password + salt)
    .digest('hex');

  return hashedPassword === hashedAttempt;
}
