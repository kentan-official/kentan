import { SketchMetaData } from '@lib/contracts';

export function modelImportPath(stringifiedSketch: string): string {
  const sketch = JSON.parse(stringifiedSketch) as SketchMetaData;
  return sketch.modelImportPath;
}
