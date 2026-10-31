import { useSearchParams } from "next/navigation";
import { DEFAULT_FLAVOR, isFlavor, type Flavor } from "./flavor";

// The chosen flavor lives only in the URL (?flavor=), so every link that should keep it
// must pass it on, and a shared or reloaded link shows the same code.
export function useFlavor(): Flavor {
  const value = useSearchParams().get("flavor");
  return value && isFlavor(value) ? value : DEFAULT_FLAVOR;
}
