// local
const { destinationStub } = require('../../../../../test/support/stubs');
const loggerFactory = require('../../../../modules/logger.module');

// sut
const server = require('../../../../adapters/fastify.adapter');

// init
const logger = loggerFactory({ level: 'debug', name: 'test' }, destinationStub);

describe('GET /v1/monitor/health', () => {
  beforeAll(() => {
    server.init({ logger });
  });

  beforeEach(() => {
    this.spy = jest
      .spyOn(destinationStub, 'write')
      .mockImplementation(() => jest.fn());
    this.request = {
      method: 'GET',
      path: '/v1/monitor/health'
    };
  });

  afterEach(() => {
    this.spy.mockRestore();
  });

  it('responds with status code 200 "OK"', async () => {
    const response = await server.inject(this.request);
    expect(response).toHaveProperty('statusCode', 200);
  });

  it('responds with body content "OK"', async () => {
    const response = await server.inject(this.request);
    expect(response).toHaveProperty('body', 'OK');
  });

  it('responds with text/plain content type', async () => {
    const response = await server.inject(this.request);
    expect(response.headers['content-type']).toMatch(/^text\/plain/);
  });
});
