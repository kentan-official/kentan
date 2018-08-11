import { SketchMetaData } from '@lib/contracts';

export function isClass(stringifiedSketch: string) {
  const sketch = JSON.parse(stringifiedSketch) as SketchMetaData;
  return sketch.model.isClass;
}
