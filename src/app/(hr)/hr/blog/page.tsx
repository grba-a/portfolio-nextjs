import { BlogIndex, blogIndexMetadata } from "@/components/Blog";

export const metadata = blogIndexMetadata("hr");

export default function Page() {
  return <BlogIndex lang="hr" />;
}
