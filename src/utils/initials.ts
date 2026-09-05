/** "Ada Lovelace" → "AL". Empty/whitespace → "". */
export function initials(name: string | null | undefined, max = 2): string {
  return (name || '')
    .split(' ')
    .filter(Boolean)
    .slice(0, max)
    .map((part) => part[0]?.toLocaleUpperCase() ?? '')
    .join('');
}
