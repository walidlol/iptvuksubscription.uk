import type { MediaItem } from "@/lib/tmdb";
import ContentRow from "./ContentRow";

type RowSize = "poster" | "backdrop";

interface ContentRowServerProps {
  readonly title: string;
  readonly fetchFn: () => Promise<readonly MediaItem[]>;
  readonly size?: RowSize;
  readonly priority?: boolean;
}

export default async function ContentRowServer({
  title,
  fetchFn,
  size = "poster",
  priority = false,
}: ContentRowServerProps) {
  const items = await fetchFn();

  if (items.length === 0) return null;

  return <ContentRow title={title} items={items} size={size} priority={priority} />;
}
