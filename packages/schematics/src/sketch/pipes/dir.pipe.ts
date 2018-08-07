export interface SketchParameters {
  dir: string
};

export function dir(sketch: string) {
  const s = JSON.parse(sketch) as SketchParameters;
  return s.dir;
}
