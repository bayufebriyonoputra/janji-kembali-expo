import crypto from 'crypto';


function generateTripayCloseSignature({
    merchantCode,
    merchantRef,
    amount,
    secretKey
}: {
    merchantCode: string;
    merchantRef: string;
    amount: number;
    secretKey: string;
}) {
    const data = merchantCode + merchantRef + amount.toString();

    return crypto.createHmac('sha256', secretKey).update(data).digest('hex');
}