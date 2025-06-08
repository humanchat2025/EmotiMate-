export default function splitResponse(text) {
  if (!text || typeof text !== 'string') return [];

  const segments = text
    .split(/(?<=[.!?])\s+|(?<=\d\.)\s+|(?<=•)\s+|(?<=-)\s+|\n+/)
    .map(segment => segment.trim())
    .filter(segment => segment.length > 0);

  return segments;
}