import { WebView } from 'react-native-webview';

import React, { useEffect, useRef, useState } from 'react'
import { useLocalSearchParams, useRouter } from 'expo-router'
import { TRIPAY_API_KEY } from '@/constants/config';


const CHECK_INTERVAL = 5000;

const Payment = () => {

  const { url, ref } = useLocalSearchParams();
  const router = useRouter();
  const [checking, setChecking] = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!ref) return;
    setChecking(true);

    const checkStatus = async () => {
      try {
        // Ganti dengan endpoint status pembayaran Tripay Anda
        const res = await fetch(`https://tripay.co.id/api-sandbox/transaction/check-status`,{
          method:"GET",
          headers:{
            "Content-Type": "application/json",
            "Authorization": `Bearer ${TRIPAY_API_KEY}`

          },
          body: JSON.stringify({reference: ref})
        });

        const json = await res.json();
        if (json.success) {
          setChecking(false);
          // Navigasi ke halaman sukses
          router.replace('/product/payment/order-success',);
        }
      } catch (e) {
        // Optional: handle error
      }
    };

  }, [ref])


  return (
    <WebView source={{ uri: decodeURIComponent(url as string) }} />
  )
}

export default Payment