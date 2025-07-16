import { Injectable } from '@angular/core';
import * as CryptoJS from 'crypto-js';

@Injectable({ providedIn: 'root' })
export class CryptoService {
    private key: string = '1234567890abcdef1234567890abcdef';

    constructor() {}
    encryptData(payload: any): { encryptedData: string } {
        const key = CryptoJS.enc.Utf8.parse(this.key);
        const iv = CryptoJS.enc.Utf8.parse('abcdef1234567890');
        const encrypted = CryptoJS.AES.encrypt(JSON.stringify(payload), key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const encryptedString = encrypted.toString();
        const ivBase64 = CryptoJS.enc.Base64.stringify(iv);
        const combined = `${ivBase64}::${encryptedString}`;
        return { encryptedData: combined };
      }

    decryptData(payload: any): any {
        let encryptedMerged = '';
        // Support both string and object inputs
        if (typeof payload === 'string') {
            try {
                const parsed = JSON.parse(payload);
                encryptedMerged = parsed.encryptedData;
            } catch (error) {
                encryptedMerged = payload;
            }
        } else if (payload.encryptedData) {
            encryptedMerged = payload.encryptedData;
        } else {
            throw new Error('Missing encryptedData field.');
        }

        // Expect IV::Encrypted format
        const [ivBase64, encryptedString] = encryptedMerged.split('::');
        if (!ivBase64 || !encryptedString) {
            throw new Error('Missing IV or encrypted content in encryptedData string.');
        }

        const key = CryptoJS.enc.Utf8.parse(this.key);
        const iv = CryptoJS.enc.Base64.parse(ivBase64);

        const decrypted = CryptoJS.AES.decrypt(encryptedString, key, {
            iv: iv,
            mode: CryptoJS.mode.CBC,
            padding: CryptoJS.pad.Pkcs7
        });

        const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
        if (!decryptedString) {
            throw new Error('Decryption failed or resulted in an empty string.');
        }

        return JSON.parse(decryptedString);
    }
}
