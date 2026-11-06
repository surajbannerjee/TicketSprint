import MovieDetailsClient from "./MovieDetailsClient";

export async function generateStaticParams() {
  return [
    { id: "dune-part-two" },
    { id: "dune-awakening" },
    { id: "neon-velocity" },
    { id: "the-midnight-symphony" },
    { id: "quantum-heist" },
    { id: "solaris-vanguard" },
    { id: "tokyo-drift-zero" },
  ];
}

export const metadata = {
  title: "Dune: Part Two (IMAX 70mm) - TicketSprint",
  description:
    "Book IMAX 70mm seats and showtimes for Dune: Part Two in San Francisco on TicketSprint.",
};

export default async function MovieDetailsPage({ params }) {
  const resolvedParams = await params;
  return <MovieDetailsClient movieId={resolvedParams?.id || "dune-part-two"} />;
}

