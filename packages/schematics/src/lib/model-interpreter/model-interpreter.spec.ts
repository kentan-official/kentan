import { ModelInterpreter } from './model-interpreter';

describe('ModelInterpreter', () => {
  let content: string;
  let interpreter: ModelInterpreter;
  describe('When the passed content is empty', () => {
    beforeEach(() => {
      content = '';
      interpreter = new ModelInterpreter();
    });

    it('should set model name to empty', () => {
      const model = interpreter.process(content);
      expect(model.name).toBe('');
    });

    it('should set model name to empty', () => {
      const model = interpreter.process(content);
      expect(model.isClass).toBe(false);
    });
  });

  describe('When the content contains the key words "class"', () => {
    beforeEach(() => {
      content = 'export class Customer {';
      interpreter = new ModelInterpreter();
    });

    it('should set the name of the model', () => {
      const metaData = interpreter.process(content);
      expect(metaData.name).toBe('Customer');
    });

    it('should indicate that the content contains a class', () => {
      const metaData = interpreter.process(content);
      expect(metaData.isClass).toBe(true);
    });
  });
});
