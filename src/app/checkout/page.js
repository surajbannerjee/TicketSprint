import React, { Suspense } from "react";
import CheckoutClient from "./CheckoutClient";

export const metadata = {
  title: "Checkout & Concessions - TicketSprint",
  description:
    "Review tickets, add gourmet cinema concessions, and complete checkout on TicketSprint.",
};

export default function CheckoutPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#11131a] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-[#ff2e63] animate-ping" />
            <span className="font-heading font-bold text-lg">
              Loading your order summary...
            </span>
          </div>
        </div>
      }
    >
      <CheckoutClient />
    </Suspense>
  );
}

