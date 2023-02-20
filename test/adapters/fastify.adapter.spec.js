// local
const destinationStub = require('../support/stubs/destination.stub');
const loggerFactory = require('../../lib/modules/logger.module');

// sut
const server = require('../../lib/adapters/fastify.adapter');

// init
const logger = loggerFactory(
  { level: 'debug', name: 'test', prettyPrint: false },
  destinationStub
);

describe('fastify.adapter', () => {
  beforeEach(() => {
    this.spy = jest
      .spyOn(destinationStub, 'write')
      .mockImplementation(() => jest.fn());
  });

  afterEach(() => {
    this.spy.mockRestore();
  });

  describe('::connect()', () => {
    it('is implemented', () => {
      expect(server.connect).toBeInstanceOf(Function);
    });

    it('starts http server', async () => {
      server.init({ logger });
      await server.connect();
      await server.disconnect();
      const messages = destinationStub.calls({ level: 30 });
      expect(messages[0]).toStrictEqual({
        host: expect.any(String),
        level: 30,
        msg: 'Server listening at http://127.0.0.1:3000',
        name: 'test',
        pid: expect.any(Number),
        time: expect.any(Number)
      });
    });
  });

  describe('::disconnect()', () => {
    it('is implemented', () => {
      expect(server.disconnect).toBeInstanceOf(Function);
    });

    it('stops https server', async () => {
      server.init({ logger });
      await server.connect();
      await server.disconnect();
      const messages = destinationStub.calls({ level: 30 });
      expect(messages[1]).toStrictEqual({
        host: expect.any(String),
        level: 30,
        msg: 'Fastify adapter disconnected',
        name: 'test',
        pid: expect.any(Number),
        time: expect.any(Number)
      });
    });
  });
});
