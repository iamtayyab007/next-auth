import React from "react";

export default function ProfilePage({ params }: any) {
  return (
    <div className="text-green-300 flex items-center justify-center h-screen">
      this is the profile page page and this is my id {params.id}
    </div>
  );
}
