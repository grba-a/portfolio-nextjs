import type { Metadata } from "next";
import NotFoundBody from "@/components/NotFoundBody";

export const metadata: Metadata = {
  title: "Page not found | zip",
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return <NotFoundBody />;
}
