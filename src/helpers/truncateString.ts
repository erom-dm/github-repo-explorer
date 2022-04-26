export default function truncateString(
  str: string,
  n: number,
  useWordBoundary: boolean
): string {
  if (str) {
    const trimmedString = str.replace(/\s+/g, " ").trim();
    if (trimmedString.length <= n) {
      return trimmedString;
    }

    const subString = trimmedString.slice(0, n - 1);
    return (
      (useWordBoundary
        ? subString.slice(0, subString.lastIndexOf(" "))
        : subString) + "..."
    );
  }
  return "";
}
