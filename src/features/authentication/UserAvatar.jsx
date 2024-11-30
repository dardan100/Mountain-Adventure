import React from "react";
import { useUser } from "./useUser";

export default function UserAvatar() {
  const { user } = useUser();
  const { fullName, avatar } = user.user_metadata;

  return (
    <div className="flex items-center gap-3 relative">
      <img
        className="inline-block object-cover w-12 h-12 rounded-full "
        src={avatar || "default-user.jpg"}
        alt={fullName}
      />
      <span class="absolute bottom-0 left-9 inline-block w-3 h-3 bg-green-600 border-2 border-white rounded-full"></span>
      <span>{fullName}</span>
    </div>
  );
}
