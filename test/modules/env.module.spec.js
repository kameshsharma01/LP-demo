// local
const { nodeEnv } = require('../support/helpers');

// sut
const env = require('../../lib/modules/env.module');

// init
const given = describe;

describe('env.module', () => {
  describe('::get()', () => {
    it('is implemented', () => {
      expect(env.get).toBeInstanceOf(Function);
    });

    given('environment variable exists', () => {
      it('returns environment variable', () => {
        expect(env.get('NODE_ENV')).toBe('test');
      });
    });

    given('environment variable does not exist', () => {
      it('returns "undefined"', () => {
        expect(env.get('FOO_BAR')).toBeUndefined();
      });

      it('returns fallback value', () => {
        expect(env.get('FOO_BAR', 'whatever')).toBe('whatever');
      });
    });
  });

  describe('::need()', () => {
    it('is implemented', () => {
      expect(env.need).toBeInstanceOf(Function);
    });

    given('environment variable exists', () => {
      it('does not throw', () => {
        expect(() => {
          env.need('NODE_ENV');
        }).not.toThrow();
      });

      it('returns environment variable', () => {
        expect(env.need('NODE_ENV')).toBe('test');
      });
    });

    given('environment variable does not exist', () => {
      it('throws descriptive error', () => {
        expect(() => {
          env.need('FOO_BAR');
        }).toThrow('FOO_BAR not defined');
      });
    });
  });

  describe('::isProduction()', () => {
    it('is implemented', () => {
      expect(env.isProduction).toBeInstanceOf(Function);
    });

    given('production environment', () => {
      it('returns true', () => {
        const restore = nodeEnv('production');
        expect(env.isProduction()).toBe(true);
        restore();
      });
    });

    given('non-production environment', () => {
      it('returns false', () => {
        const restore = nodeEnv('development');
        expect(env.isProduction()).toBe(false);
        restore();
      });
    });
  });

  describe('::isTest()', () => {
    it('is implemented', () => {
      expect(env.isTest).toBeInstanceOf(Function);
    });

    given('test environment', () => {
      it('returns true', () => {
        const restore = nodeEnv('test');
        expect(env.isTest()).toBe(true);
        restore();
      });
    });

    given('non-test environment', () => {
      it('returns false', () => {
        const restore = nodeEnv('production');
        expect(env.isTest()).toBe(false);
        restore();
      });
    });
  });
});
