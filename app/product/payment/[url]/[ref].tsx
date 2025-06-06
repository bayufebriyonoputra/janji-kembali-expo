import { WebView } from 'react-native-webview';

import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { TRIPAY_API_KEY } from '@/constants/config';


const CHECK_INTERVAL = 5000;

const Payment = () => {

  const { url, ref } = useLocalSearchParams();
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const intervalRef = useRef<number | null>(null);

  useEffect(() => {
    if (!ref) return;
    setChecking(true);

    const checkStatus = async () => {
        // console.log("Checking payment status for reference:", ref);
      try {
        // Ganti dengan endpoint status pembayaran Tripay Anda
        const res = await fetch(`https://tripay.co.id/api-sandbox/transaction/detail?reference=${ref}`,{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TRIPAY_API_KEY}`

          },
        });

        const json = await res.json();
        console.log("Payment status response:", JSON.stringify(json));
        if (json.data.status === "PAID") {
          setChecking(false);
          // Navigasi ke halaman sukses
          router.replace('/product/payment/order-success',);
        }
      } catch (e:any) {
        // console.error("Error checking payment status:", e.message);
      }
    };

     intervalRef.current = setInterval(checkStatus, CHECK_INTERVAL);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };

  }, [ref])


  return (
    <WebView source={{ uri: decodeURIComponent(url as string) }} />
  )
}

export default Payment