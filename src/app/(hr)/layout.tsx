import "../globals.css";
import RootShell, { baseMetadata } from "@/components/RootShell";

export { viewport } from "@/components/RootShell";
export const metadata = baseMetadata;

/** Hrvatski root layout: /hr i sve ispod. <html lang="hr"> je razlog postojanja. */
export default function HrLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <RootShell lang="hr">{children}</RootShell>;
}
