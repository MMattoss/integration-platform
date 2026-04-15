import { Injectable } from '@nestjs/common';
import { createCipheriv, randomBytes, scrypt, createDecipheriv } from 'node:crypto';
import { promisify } from 'node:util';

@Injectable()
export class EncryptionService {
  async encrypt(text: string): Promise<string> {
    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) {
      throw new Error('ENCRYPTION_SECRET is not defined');
    }

    const iv = randomBytes(16);
    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;

    const cipher = createCipheriv('aes-256-ctr', key, iv);

    const encrypted = Buffer.concat([
      cipher.update(text),
      cipher.final(),
    ]);

    return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
  }

  async decrypt(encryptedText: string): Promise<string> {
    const secret = process.env.ENCRYPTION_SECRET;
    if (!secret) {
      throw new Error('ENCRYPTION_SECRET is not defined');
    }

    const [ivHex, contentHex] = encryptedText.split(':');

    const iv = Buffer.from(ivHex, 'hex');
    const content = Buffer.from(contentHex, 'hex');

    const key = (await promisify(scrypt)(secret, 'salt', 32)) as Buffer;

    const decipher = createDecipheriv('aes-256-ctr', key, iv);

    const decrypted = Buffer.concat([
      decipher.update(content),
      decipher.final(),
    ]);

    return decrypted.toString();
  }
}
