"use client";

import PortfolioClient from "../components/portfolio-client";

// Direct import avoids rendering null on the server (ssr:false) which paired with a
// client-only loading fallback can trigger a hydration mismatch warning.
// All nested components are already client components, so normal SSR is safe.
export default function Home() {
  return <PortfolioClient />;
}
