// 3rd-party
const { clone } = require('ramda');
const nock = require('nock');

// local
const { destinationStub } = require('../../../../../test/support/stubs');
jest.mock('../../../../modules/env.module', () => {
  return {
    get: (name) => {
      if (name === 'CONTROLLER_URL') return 'http://test:8002';
      return `unknown env name: ${name}`;
    },
    isProduction: () => false
  };
});
const env = require('../../../../modules/env.module');
const loggerFactory = require('../../../../modules/logger.module');

// sut
const server = require('../../../../adapters/fastify.adapter');

// init
const given = describe;
const logger = loggerFactory(
  { level: 'debug', name: 'test', prettyPrint: false },
  destinationStub
);

describe('POST /v1/renderer', () => {
  beforeAll(() => {
    server.init({ logger });
  });

  afterAll(() => {
    nock.restore();
  });

  beforeEach(() => {
    this.spy = jest
      .spyOn(destinationStub, 'write')
      .mockImplementation(() => jest.fn());

    this.request = {
      method: 'POST',
      path: '/v1/renderer?template=test-complex'
    };
  });

  afterEach(() => {
    this.spy.mockRestore();
    nock.cleanAll();
  });

  it('responds with status code 200 "OK"', async () => {
    const request = clone(this.request);
    request.payload = {
      site_id: 'testSite',
      market: 'testMarket',
      vendor: 'testVendor',
      operator: 'testOperator',
      check_type: 'testCheckType',
      techs: ['testTech'],
      whitelist: ['cell-status']
    };

    nock(env.get('CONTROLLER_URL'))
      .post('/cell-status', {
        site_id: 'testSite',
        market: 'testMarket',
        vendor: 'testVendor',
        operator: 'testOperator',
        check_type: 'testCheckType',
        techs: ['testTech']
      })
      .reply(200, { response: { status: 'test' } });

    // const response = await server.inject(request);
    //     expect(response.json().cell_status.length).not.toBe(0);
    //     expect(response).toHaveProperty('statusCode', 200);
  });

  it('responds with application/json content type', async () => {
    const request = clone(this.request);
    request.payload = {
      site_id: 'testSite',
      market: 'testMarket',
      vendor: 'testVendor',
      operator: 'testOperator',
      check_type: 'testCheckType',
      techs: ['testTech'],
      whitelist: ['cell-status']
    };

    nock(env.get('CONTROLLER_URL'))
      .post('/cell-status', {
        site_id: 'testSite',
        market: 'testMarket',
        vendor: 'testVendor',
        operator: 'testOperator',
        check_type: 'testCheckType',
        techs: ['testTech']
      })
      .reply(200, { response: { status: 'test' } });

    // const response = await server.inject(request);
    // expect(response.json().cell_status.length).not.toBe(0);
    // expect(response.headers['content-type']).toMatch(/application\/json/);
  });

  it('responds with expected data', async () => {
    const request = clone(this.request);
    request.payload = {
      site_id: 'testSite',
      market: 'testMarket',
      vendor: 'testVendor',
      operator: 'testOperator',
      check_type: 'testCheckType',
      techs: ['testTech'],
      whitelist: ['cell-status']
    };

    nock(env.get('CONTROLLER_URL'))
      .post('/cell-status', {
        site_id: 'testSite',
        market: 'testMarket',
        vendor: 'testVendor',
        operator: 'testOperator',
        check_type: 'testCheckType',
        techs: ['testTech']
      })
      .reply(200, { response: { status: 'test' } });

    // const response = await server.inject(request);
    // expect(response.json()).toStrictEqual({
    //   site_id: 'testSite',
    //   market: 'testMarket',
    //   vendor: 'testVendor',
    //   operator: 'testOperator',
    //   check_type: 'testCheckType',
    //   techs: ['testTech'],
    //   cell_status: [{ status: 'test' }]
    // });
  });

  it('responds with status code 200 "OK"', async () => {
    const request = clone(this.request);
    request.payload = {
      site_id: 'testSite',
      market: 'testMarket',
      vendor: 'testVendor',
      operator: 'testOperator',
      check_type: 'testCheckType',
      techs: ['testTech'],
      whitelist: ['look-at-this']
    };

    // const response = await server.inject(request);
    // expect(response.json()).toMatchObject(
    //   expect.objectContaining({
    //     statusCode: 400,
    //     error: 'Bad Request',
    //     message: expect.stringContaining('should contain a valid item')
    //   })
    // );
    // expect(response).toHaveProperty('statusCode', 400);
  });

  given('controller responds with invalid json', () => {
    it('returns data with in-place error', async () => {
      const request = clone(this.request);
      request.payload = {
        site_id: 'testSite',
        market: 'testMarket',
        vendor: 'testVendor',
        operator: 'testOperator',
        check_type: 'testCheckType',
        techs: ['testTech'],
        whitelist: ['cell-status']
      };

      nock(env.get('CONTROLLER_URL'))
        .post('/cell-status', {
          site_id: 'testSite',
          market: 'testMarket',
          vendor: 'testVendor',
          operator: 'testOperator',
          check_type: 'testCheckType',
          techs: ['testTech']
        })
        .reply(200, 'not a json response');

      // const response = await server.inject(request);
      // const data = response.json();
      // expect(data.cell_status[0].error).toMatch(/Unexpected token o in JSON/);
    });

    it('logs the error', async () => {
      const request = clone(this.request);
      request.payload = {
        site_id: 'testSite',
        market: 'testMarket',
        vendor: 'testVendor',
        operator: 'testOperator',
        check_type: 'testCheckType',
        techs: ['testTech'],
        whitelist: ['cell-status']
      };

      nock(env.get('CONTROLLER_URL'))
        .put('/cell-status', {
          site_id: 'testSite',
          market: 'testMarket',
          vendor: 'testVendor',
          operator: 'testOperator',
          check_type: 'testCheckType',
          techs: ['testTech']
        })
        .reply(200, 'not a json response');

      await server.inject(request);

      // const messages = destinationStub.calls({ level: 40 });
      // expect(messages[0].msg).toMatch(/Error while calling site-info module/);
    });
  });
});
