const memory: Record<string, number> = {};

export function log(id: string) {
  memory[id] = (memory[id] ?? 0) + 1;

  return memory[id];
}
