// 3rd-party
const nock = require('nock');

// sut
const http = require('../../lib/modules/http.module');

describe('http.module', () => {
  beforeAll(() => {
    this.endpoint = 'https://api.magic.com';
    this.uri = '/projects/abc123';
    this.project = { id: 'abc123', name: 'Gravity Gun' };
  });

  afterAll(() => {
    nock.restore();
  });

  describe('::get()', () => {
    it('is implemented', () => {
      expect(http.get).toBeInstanceOf(Function);
    });

    it('makes expected request', async () => {
      const { endpoint, uri, project } = this;
      nock(endpoint).get(uri).reply(200, project);
      const { body } = await http.get(`${endpoint}${uri}`);
      expect(body).toStrictEqual(project);
    });
  });

  describe('::post()', () => {
    it('is implemented', () => {
      expect(http.post).toBeInstanceOf(Function);
    });

    it('makes expected request', async () => {
      const { endpoint, uri, project } = this;
      nock(endpoint).post(uri, project).reply(201);
      const { statusCode } = await http.post(`${endpoint}${uri}`, project);
      expect(statusCode).toBe(201);
    });
  });

  describe('::put()', () => {
    it('is implemented', () => {
      expect(http.put).toBeInstanceOf(Function);
    });

    it('makes expected request', async () => {
      const { endpoint, uri, project } = this;
      nock(endpoint).put(uri, project).reply(204);
      const { statusCode } = await http.put(`${endpoint}${uri}`, project);
      expect(statusCode).toBe(204);
    });
  });
});
