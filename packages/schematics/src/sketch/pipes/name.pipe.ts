import { SketchMetaData } from '@lib/contracts';

export function name(stringifiedSketch: string): string {
  const sketch = JSON.parse(stringifiedSketch) as SketchMetaData;
  return sketch.name;
}


