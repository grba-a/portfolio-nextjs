import "../globals.css";
import RootShell, { baseMetadata } from "@/components/RootShell";

export { viewport } from "@/components/RootShell";
export const metadata = baseMetadata;

/** Engleski root layout: /, /work, /p/[slug]. */
export default function EnLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="en">{children}</RootShell>;
}
