import React, { Suspense } from "react";
import ConfirmationClient from "./ConfirmationClient";

export const metadata = {
  title: "Booking Confirmed - M-Ticket Pass - TicketSprint",
  description:
    "Your tickets are confirmed. Access your live dynamic QR gate pass and booking details on TicketSprint.",
};

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#11131a] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-[#10b981] animate-ping" />
            <span className="font-heading font-bold text-lg">
              Generating your secure M-Ticket pass...
            </span>
          </div>
        </div>
      }
    >
      <ConfirmationClient />
    </Suspense>
  );
}
