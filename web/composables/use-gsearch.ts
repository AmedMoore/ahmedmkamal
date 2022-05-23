interface GSearchParams {
  terms: string[];
  sites: string[];
}

export function useGSearch({ terms, sites }: GSearchParams): string {
  return `//google.com/search?q=${encodeURIComponent(
    `${terms.join(" | ")} site:${sites.join(" | ")}`,
  )}`;
}
