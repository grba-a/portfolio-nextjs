import { BlogIndex, blogIndexMetadata } from "@/components/Blog";

export const metadata = blogIndexMetadata("en");

export default function Page() {
  return <BlogIndex lang="en" />;
}
