import CryptoJS from 'crypto-js';


export function generateTripayCloseSignature({
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

   const signature = CryptoJS.HmacSHA256(data, secretKey).toString(CryptoJS.enc.Hex);
    return signature;
}