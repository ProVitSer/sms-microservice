import * as crypto from 'crypto';

export class CriptoUtils {
    static algorithm = process.env.CRIPTO_ALGORITHM;
    static secretKey = process.env.SEKRET_KEY;
    static iv = crypto.randomBytes(16);

    public static encrypt(text: string): string {
        const cipher = crypto.createCipheriv(this.algorithm, Buffer.from(this.secretKey), this.iv);
        let encrypted = cipher.update(text, 'utf-8', 'hex');
        encrypted += cipher.final('hex');
        return `${this.iv.toString('hex')}:${encrypted}`;
    }

    public static decrypt(text: string): string {
        const [ivString, encrypted] = text.split(':');
        const decipher = crypto.createDecipheriv(this.algorithm, Buffer.from(this.secretKey), Buffer.from(ivString, 'hex'));
        let decrypted = decipher.update(encrypted, 'hex', 'utf-8');
        decrypted += decipher.final('utf-8');
        return decrypted;
    }
}
