import { useEffect, useState } from "react";
import { fetchGitHubStars } from "./utils";

// One request per page load, however many components show the count.
let request: Promise<number> | null = null;

export function useGitHubStars() {
  const [stars, setStars] = useState<number | null>(null);
  useEffect(() => {
    request ??= fetchGitHubStars("hritik-sharmaa", "repeat-ui");
    let active = true;
    request.then((count) => {
      if (active) setStars(count);
    });
    return () => {
      active = false;
    };
  }, []);
  return stars;
}
