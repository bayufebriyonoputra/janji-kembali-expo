import { getToken } from "@/lib/secureStore";
import { useEffect, useState } from "react";

type UserInfo = {
  point: number;
  fullname: string;
  email: string;
};

export function useUserInfo(apiUrl: string) {
  const [user, setUser] = useState<UserInfo | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        setError(null);
        const token = await getToken();
        const res = await fetch(apiUrl,{
            method:"GET",
            headers:{
                "Authorization" : `bearer ${token}`
            }
        });
        const json = await res.json();
        if (json.status_code === 200 && json.data && json.data.length > 0) {
          const { point, fullname, email } = json.data[0];
          setUser({ point, fullname, email });
        } else {
          setError("User not found");
        }
      } catch (e: any) {
        setError(e.message || "Failed to fetch user");
      } finally {
        setLoading(false);
      }
    };
    fetchUser();
  }, [apiUrl]);

  return { user, loading, error };
}