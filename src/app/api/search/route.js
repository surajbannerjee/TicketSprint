import { NextResponse } from "next/server";
import { SEARCH_INDEX } from "@/constants/searchData";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const q = searchParams.get("q")?.trim().toLowerCase();

  if (!q) {
    return NextResponse.json({
      success: true,
      total: SEARCH_INDEX.length,
      data: SEARCH_INDEX.slice(0, 8),
    });
  }

  const results = SEARCH_INDEX.filter((item) => {
    const matchTitle = item.title.toLowerCase().includes(q);
    const matchSubtitle = item.subtitle?.toLowerCase().includes(q);
    const matchKeywords = item.keywords?.some((k) => k.toLowerCase().includes(q));
    return matchTitle || matchSubtitle || matchKeywords;
  });

  return NextResponse.json({
    success: true,
    total: results.length,
    data: results.slice(0, 10),
  });
}
