'use strict';

// sut
const validatorFactory = require('../../lib/modules/validator.module');

describe('validator.module', () => {
  it('returns a new JSON schema validator', () => {
    const validator = validatorFactory();
    const isEmail = validator.compile({ format: 'email' });
    expect(isEmail('emmet.brickowski@lego.com')).toBe(true);
    expect(isEmail('whatever')).toBe(false);
  });

  it('adds #isSchemaSecure() to returned validators', () => {
    const insecureSchema = { format: 'email' };
    const secureSchema = { format: 'email', maxLength: 5 };
    const validator = validatorFactory();
    expect(validator.isSchemaSecure(insecureSchema)).toBe(false);
    expect(validator.isSchemaSecure(secureSchema)).toBe(true);
  });

  it('coerces types by default', () => {
    const validator = validatorFactory();
    const isInteger = validator.compile({ type: 'integer' });
    expect(isInteger(5)).toBe(true);
    expect(isInteger('5')).toBe(true);
    expect(isInteger('whatever')).toBe(false);
  });

  it('enables messages by default', () => {
    const validator = validatorFactory();
    const schema = { type: 'integer' };
    const isInteger = validator.compile(schema);
    expect(isInteger('whatever')).toBe(false);
    expect(isInteger.errors).toMatchObject([
      {
        message: 'should be integer'
      }
    ]);
  });
});
