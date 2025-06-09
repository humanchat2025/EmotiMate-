export default function splitResponse(text) {
  return text
    .split('\n')
    .map(line => line.trim())
    .filter(Boolean);
}
