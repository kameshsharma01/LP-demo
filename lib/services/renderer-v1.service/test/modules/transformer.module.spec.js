const transfromerModule = require('../../lib/modules/transformer.module');

describe('site-info.module', () => {
  describe('::normalizeTechs()', () => {
    it('is implemented', () => {
      expect(transfromerModule.normalizeTechs).toBeInstanceOf(Function);
    });

    it('receives all techs except nr and returns them normalized', () => {
      const result = transfromerModule.normalizeTechs(['lte', 'umts', 'gsm']);
      expect(result).toStrictEqual(['LTE', 'UMTS', 'GSM']);
    });

    it('receives an undefined value and returns the same', () => {
      const result = transfromerModule.normalizeTechs();
      expect(result).toStrictEqual(undefined);
    });

    it('receives an empty list and returns the same', () => {
      const result = transfromerModule.normalizeTechs([]);
      expect(result).toStrictEqual([]);
    });

    it('receives nr and returns it normalized', () => {
      const result = transfromerModule.normalizeTechs(['nr']);
      expect(result).toStrictEqual(['FIVEG']);
    });
  });
});
