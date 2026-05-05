"use client";

import { getSessionAction } from "@/lib/action";
import { useEffect, useState } from "react";

export function useSession() {
  const [session, setSession] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchSession = async () => {
    try {
      setLoading(true);
      setError(null);
      const currentSession = await getSessionAction();
      setSession(currentSession);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch session"),
      );
      setSession(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSession();
  }, []);

  return {
    session,
    loading,
    error,
    refetch: fetchSession,
  };
}
