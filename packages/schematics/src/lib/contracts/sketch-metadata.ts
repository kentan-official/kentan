import { ModelMetaData } from '../contracts';

export interface SketchMetaData {
  name: string;
  dir: string;
  modelImportPath: string;
  model: ModelMetaData;
}
