"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("adminToken");

    if (!token) {
      router.push("/login");    // not logged in → go to login
    } else {
      router.push("/dashboard"); // logged in → go to dashboard
    }
  }, []);

  return null; // no need to render anything
}
