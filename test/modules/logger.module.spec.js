// 3rd-party
const timekeeper = require('timekeeper');

// local
const { nodeEnv } = require('../support/helpers');

// sut
const loggerFactory = require('../../lib/modules/logger.module');

// init
const given = describe;

describe('logger.module', () => {
  beforeEach(() => {
    timekeeper.freeze(new Date('2021-05-11T11:00:00.000Z'));
  });

  afterEach(() => {
    timekeeper.reset();
  });

  it('is implemented', () => {
    expect(loggerFactory).toBeInstanceOf(Function);
  });

  given('development environment', () => {
    it('configures and returns a new logger instance', () => {
      const restoreEnv = nodeEnv('development');
      const fakeDestination = { write: jest.fn() };
      const logger = loggerFactory(undefined, fakeDestination);
      logger.error({ some: 'data' }, 'test message');
      const message = fakeDestination.write.mock.calls[0][0];
      expect(message).toMatch('ERROR');
      restoreEnv();
    });
  });

  given('non-development environment', () => {
    it('configures and returns new logger instance', () => {
      const restoreEnv = nodeEnv('production');
      const fakeDestination = { write: jest.fn() };
      const base = { pid: 1, host: 'whatever' };
      const logger = loggerFactory({ base, name: 'test' }, fakeDestination);
      logger.error({ some: 'data' }, 'test message');
      const message = JSON.parse(fakeDestination.write.mock.calls[0][0]);
      expect(message).toStrictEqual({
        level: 50,
        time: 1620730800000,
        pid: 1,
        host: 'whatever',
        name: 'test',
        some: 'data',
        msg: 'test message'
      });
      restoreEnv();
    });
  });
});
