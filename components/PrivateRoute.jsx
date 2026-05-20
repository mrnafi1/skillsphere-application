"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { authClient } from "@/lib/auth-client";
import { FiBookOpen } from "react-icons/fi";

export default function PrivateRoute({ children }) {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const { data } = await authClient.getSession();
      if (!data?.user) {
        router.push("/login");
      } else {
        setSession(data);
        setLoading(false);
      }
    };
    checkSession();
  }, [router]);

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-base-100">
        <div className="flex flex-col items-center gap-4">
          <div className="w-14 h-14 bg-brand-500/10 rounded-2xl flex items-center justify-center animate-pulse">
            <FiBookOpen className="text-brand-500 text-2xl" />
          </div>
          <div className="flex items-center gap-2">
            <span className="loading loading-spinner loading-sm text-brand-500"></span>
            <span className="text-slate-400 text-sm">Verifying access...</span>
          </div>
        </div>
      </div>
    );
  }

  return children;
}
