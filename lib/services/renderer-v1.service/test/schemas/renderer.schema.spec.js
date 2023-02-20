'use strict';

// local
const validatorFactory = require('../../../../modules/validator.module');

// sut
const schema = require('../../lib/schemas/renderer.schema');

// init
const given = describe;
const validator = validatorFactory();

describe('renderer.schema', () => {
  it('is a valid schema', () => {
    expect(validator.validateSchema(schema)).toBe(true);
    expect(validator.errors).toBeNull();
  });

  it('is a secure schema', () => {
    expect(validator.isSchemaSecure(schema)).toBe(true);
    expect(validator.isSchemaSecure.errors).toBeNull();
  });

  describe('schema definition', () => {
    beforeEach(() => {
      this.isValid = validator.compile(schema);
    });

    describe('.whitelist', () => {
      it('is required', () => {
        const data = { other: 'properties' };
        expect(this.isValid(data)).toBe(false);
        expect(this.isValid.errors).toMatchObject([
          { message: "should have required property 'whitelist'" }
        ]);
      });

      given('whitelist exists', () => {
        it('must contain at least one of "cells" or "cell-status"', () => {
          const data = { whitelist: ['other-only'] };
          expect(this.isValid(data)).toBe(false);
          expect(this.isValid.errors).toMatchObject(
            expect.arrayContaining([
              expect.objectContaining({
                message: 'should be equal to constant',
                params: { allowedValue: 'cells' }
              }),
              expect.objectContaining({
                message: 'should be equal to constant',
                params: { allowedValue: 'cell-status' }
              }),
              expect.objectContaining({
                message: 'should contain a valid item'
              }),
              expect.objectContaining({
                message: 'should match some schema in anyOf'
              })
            ])
          );
        });

        it('returns "true" without errors if "cells" exists', () => {
          const data = { whitelist: ['cells'] };
          expect(this.isValid(data)).toBe(true);
          expect(this.isValid.errors).toBeNull();
        });

        it('returns "true" without errors if "cell-status" exists', () => {
          const data = { whitelist: ['cell-status'] };
          expect(this.isValid(data)).toBe(true);
          expect(this.isValid.errors).toBeNull();
        });

        it('returns "true" without errors if "cell" & "cell-status" exist', () => {
          const data = { whitelist: ['cell-status', 'cell-status', 'other'] };
          expect(this.isValid(data)).toBe(true);
          expect(this.isValid.errors).toBeNull();
        });
      });
    });
  });
});
