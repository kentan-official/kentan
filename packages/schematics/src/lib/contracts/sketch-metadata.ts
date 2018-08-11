import { ModelMetaData } from '@lib/contracts/model-metadata';

export interface SketchMetaData {
  name: string;
  dir: string;
  modelImportPath: string;
  model: ModelMetaData;
}
