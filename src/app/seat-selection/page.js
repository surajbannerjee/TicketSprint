import React, { Suspense } from "react";
import SeatSelectionClient from "./SeatSelectionClient";

export const metadata = {
  title: "Seat Selection - Dune: Part Two - TicketSprint",
  description:
    "Interactive IMAX laser seat selection map for Dune: Part Two at AMC Metreon 16.",
};

export default function SeatSelectionPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#11131a] flex items-center justify-center text-white">
          <div className="flex items-center gap-3">
            <span className="w-4 h-4 rounded-full bg-[#ff2e63] animate-ping" />
            <span className="font-heading font-bold text-lg">
              Loading auditorium map...
            </span>
          </div>
        </div>
      }
    >
      <SeatSelectionClient />
    </Suspense>
  );
}
