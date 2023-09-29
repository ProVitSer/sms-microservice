export class SmsUtils {
    static normalizePhoneNumber(phoneNumber: string): string {
        const digits = phoneNumber.replace(/\D/g, '');
        if (digits.startsWith('8')) {
            return '7' + digits.slice(1);
        }

        if (digits.startsWith('+7')) {
            return digits.slice(1);
        }

        if (digits.length == 10) {
            return '7' + digits;
        }

        return digits;
    }
}
