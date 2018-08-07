export function jsonOf(buffer: Buffer | null): JSON {
  return buffer ? JSON.parse(buffer.toString()) : {};
}
