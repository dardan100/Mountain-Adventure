import React from "react";
import { useCheckout } from "./useCheckOut";

export default function CheckoutButton({ bookingId, className }) {
  const { checkout, isCheckingOut } = useCheckout();

  return (
    <button
      className={className}
      onClick={() => checkout(bookingId)}
      disabled={isCheckingOut}
    >
      Check Out
    </button>
  );
}
