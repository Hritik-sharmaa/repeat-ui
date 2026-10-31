import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export interface GitHubRepoData {
  stargazers_count: number;
  forks_count: number;
  watchers_count: number;
}

export async function fetchGitHubStars(
  owner: string,
  repo: string
): Promise<number> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Accept: "application/vnd.github.v3+json",
        },
        // Cache for 10 minutes to avoid hitting rate limits
        next: { revalidate: 600 },
      }
    );

    if (!response.ok) {
      console.warn("Failed to fetch GitHub repo data:", response.statusText);
      return 0;
    }

    const data: GitHubRepoData = await response.json();
    return data.stargazers_count || 0;
  } catch (error) {
    console.warn("Error fetching GitHub stars:", error);
    return 0;
  }
}

export function formatStarCount(count: number): string {
  if (count >= 1000) {
    return `${(count / 1000).toFixed(1)}k`;
  }
  return count.toString();
}

export const GITHUB_URL = "https://github.com/Hritik-sharmaa/repeat-ui";

// Feeds the pointer position to `.spotlight` backgrounds as --x / --y.
export function trackPointer(e: React.PointerEvent<HTMLElement>) {
  const rect = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty("--x", `${e.clientX - rect.left}px`);
  e.currentTarget.style.setProperty("--y", `${e.clientY - rect.top}px`);
}

export const formatName = (name: string) =>
  name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
