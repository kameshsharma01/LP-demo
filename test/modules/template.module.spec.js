// sut
const templateModule = require('../../lib/modules/template.module');

// init
const given = describe;

describe('template.module', () => {
  describe('::renderTemplate()', () => {
    it('is implemented', () => {
      expect(templateModule.renderTemplate).toBeInstanceOf(Function);
    });

    it('renders test file as expected', async () => {
      const result = await templateModule.renderTemplate('test-simple', {
        greet: 'hello'
      });
      expect(result).toBe('Hello, liquidjs');
    });

    given('test file does not exist', () => {
      it('throws an error', () => {
        return expect(
          templateModule.renderTemplate('whatever', {})
        ).rejects.toThrow(/Failed to lookup/);
      });
    });
  });
});
