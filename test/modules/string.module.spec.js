// sut
const string = require('../../lib/modules/string.module');

describe('string.module', () => {
  describe('::camelize()', () => {
    it('is implemented', () => {
      expect(string.camelize).toBeInstanceOf(Function);
    });

    it('returns lower camelcase string', () => {
      expect(string.camelize('some-string.type')).toBe('someStringType');
      expect(string.camelize('some.service.stub')).toBe('someServiceStub');
      expect(string.camelize('space mixCASE')).toBe('spaceMixCase');
      expect(string.camelize('CONSTANT_VALUE')).toBe('constantValue');
    });
  });

  describe('::constantize()', () => {
    it('is implemented', () => {
      expect(string.constantize).toBeInstanceOf(Function);
    });

    it('returns uppercase constant string', () => {
      expect(string.constantize('some-str.type')).toBe('SOME_STR_TYPE');
      expect(string.constantize('some.str.type')).toBe('SOME_STR_TYPE');
      expect(string.constantize('space mixCASE')).toBe('SPACE_MIX_CASE');
    });
  });

  describe('::capitalize()', () => {
    it('is implemented', () => {
      expect(string.capitalize).toBeInstanceOf(Function);
    });

    it('returns first letter capitalized rest lowercase', () => {
      expect(string.capitalize('some-str.TYPE')).toBe('Some-str.TYPE');
      expect(string.capitalize('space mixCASE', true)).toBe('Space mixcase');
      expect(string.capitalize('SOME VAL', true, true)).toBe('Some Val');
    });
  });

  describe('::dasherize()', () => {
    it('is implemented', () => {
      expect(string.dasherize).toBeInstanceOf(Function);
    });

    it('returns hyphenated string', () => {
      expect(string.dasherize('someString.type')).toBe('some-string-type');
      expect(string.dasherize('space mixCASE')).toBe('space-mix-case');
      expect(string.dasherize('CONSTANT_VALUE')).toBe('constant-value');
    });
  });

  describe('::pascalize()', () => {
    it('is implemented', () => {
      expect(string.pascalize).toBeInstanceOf(Function);
    });

    it('returns upper camelcase string', () => {
      expect(string.pascalize('some-string.type')).toBe('SomeStringType');
      expect(string.pascalize('space mixCASE')).toBe('SpaceMixCase');
      expect(string.pascalize('CONSTANT_VALUE')).toBe('ConstantValue');
    });
  });
});
