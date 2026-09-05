export function clamp(value: number, min: number, max: number): number {
  return Math.min(max, Math.max(min, value));
}

/** 0..1 ratio, safe against zero / negative capacity. */
export function ratio(filled: number, capacity: number): number {
  if (!capacity || capacity <= 0) return 0;
  return clamp(filled / capacity, 0, 1);
}
