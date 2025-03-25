"use client";

import React from "react";
import { useState } from "react";
import axios from "axios";
import Link from "next/link";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
useRouter;

export default function ProfilePage() {
  const router = useRouter();
  const [data, setData] = useState("Nothing");

  const getUsersData = async () => {
    const response = await axios.post("api/users/me");
    console.log(response.data);
    setData(response.data.data._id);
  };

  const logout = async () => {
    try {
      await axios.get("api/users/logout");
      toast.success("user logout successfully");
      router.push("/login");
    } catch (error: any) {
      console.log(error);
      toast.error(error);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <h1>Profile Page</h1>
      <hr />
      <h2>
        {data === "nothing" ? (
          "nothing"
        ) : (
          <Link href={`/profile/${data}`}>{data}</Link>
        )}
      </h2>
      <hr />
      <button
        onClick={logout}
        className="bg-blue-5 mt-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Logout
      </button>

      <button
        onClick={getUsersData}
        className="bg-green-5 mt-4 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
      >
        Get User Detail
      </button>
    </div>
  );
}
