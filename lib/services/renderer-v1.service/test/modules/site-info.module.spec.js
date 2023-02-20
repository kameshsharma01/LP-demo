// // 3rd-party
// const { find, lensProp, propEq, pipe, view } = require('ramda');
// const nock = require('nock');
// const http = require('../../../../modules/http.module');

// // local
// jest.mock('../../../../modules/env.module', () => {
//   return {
//     get: (name) => {
//       if (name === 'CONTROLLER_URL') return 'http://test:8002';
//       return `unknown env name: ${name}`;
//     },
//     isProduction: () => true
//   };
// });
// const { destinationStub } = require('../../../../../test/support/stubs');
// const env = require('../../../../modules/env.module');
// const loggerFactory = require('../../../../modules/logger.module');
// const string = require('../../../../modules/string.module');

// // sut
// const siteInfoModule = require('../../lib/modules/site-info.module');

// // init
// const given = describe;
// const logger = loggerFactory(
//   { level: 'debug', name: 'test', prettyPrint: false },
//   destinationStub
// );

// describe('site-info.module', () => {
//   // it('contains all available site-info modules', () => {

//   it('creates `getAlarms` handler with expected behavior', async () => {
//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']],
//       ['protocols', { testTech: 'testProtocol' }]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/alarms', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech'],
//         protocols: { testTech: 'testProtocol' }
//       })
//       .reply(200, { alarms: 'controller-data' });

//     //  const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/alarms`,...input);
//     // expect(data).toStrictEqual({ alarms: 'controller-data' });
//   });

//   it('creates `getAlarmsHistory` handler with expected behavior', async () => {
//     // const getAlarmsHistoryHandler = getHandler('alarms-history')(
//     //   siteInfoModule.filters()
//     // );
//     // expect(getAlarmsHistoryHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['history_hours', 'testHistoryHours'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/alarms-history', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         history_hours: 'testHistoryHours',
//         techs: ['testTech']
//       })
//       .reply(200, { alarmsHistory: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/alarms-history`,...input);
//     // expect(data).toStrictEqual({ alarmsHistory: 'controller-data' });
//   });

//   it('creates `getCellStatus` handler with expected behavior', async () => {
//     // const getCellStatusHandler = getHandler('cell-status')(
//     //   siteInfoModule.filters()
//     // );
//     // expect(getCellStatusHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']],
//       ['protocols', { testTech: 'testProtocol' }]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/cell-status', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech'],
//         protocols: { testTech: 'testProtocol' }
//       })
//       .reply(200, { cellStatus: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/cell-status`,...input);
//     // expect(data).toStrictEqual({ cellStatus: 'controller-data' });
//   });

//   it('creates `getCells` handler with expected behavior', async () => {
//     // const getCellsHandler = getHandler('cells')(siteInfoModule.filters());
//     // expect(getCellsHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/cells', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech']
//       })
//       .reply(200, { cells: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/cells`,...input);
//     // expect(data).toStrictEqual({ cells: 'controller-data' });
//   });

//   it('creates `getCommandsHealthCheck` handler with expected behavior', async () => {
//     // const getCommandsHealthCheckHandler = getHandler('commands-health-check')(
//     //   siteInfoModule.filters()
//     // );
//     // expect(getCommandsHealthCheckHandler).not.toBeUndefined();

//     const input = [
//       ['market', 'testMarket'],
//       ['technology', 'testTechnology'],
//       ['operator', 'testOperator'],
//       ['command_name', 'testCommandName'],
//       ['objects', [{ some: 'object' }]],
//       ['bsc', 'testBsc'],
//       ['rnc', 'testRnc'],
//       ['oss', 'testOss']
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/commands-health-check', {
//         operator: 'testOperator',
//         market: 'testMarket',
//         technology: 'testTechnology',
//         command_name: 'testCommandName',
//         objects: [{ some: 'object' }],
//         bsc: 'testBsc',
//         rnc: 'testRnc',
//         oss: 'testOss'
//       })
//       .reply(200, { commandsHealthCheck: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/commands-health-check`,...input);
//     // expect(data).toStrictEqual({ commandsHealthCheck: 'controller-data' });
//   });

//   it('creates `getKpis` handler with expected behavior', async () => {
//     // const getKpisHandler = getHandler('kpis')(siteInfoModule.filters());
//     // expect(getKpisHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['kpis_last_minutes', 10],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/kpis', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         techs: ['testTech'],
//         kpis_last_minutes: 10
//       })
//       .reply(200, { kpis: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/kpis`,...input);
//     // expect(data).toStrictEqual({ kpis: 'controller-data' });
//   });

//   it('creates `getRssiRtwp` handler with expected behavior', async () => {
//     // const getRssiRtwpHandler = getHandler('rssi-rtwp')(
//     //   siteInfoModule.filters()
//     // );
//     // expect(getRssiRtwpHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/rssi-rtwp', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech']
//       })
//       .reply(200, { rssiRtwp: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/rssi-rtwp`,...input);
//     // expect(data).toStrictEqual({ rssiRtwp: 'controller-data' });
//   });

//   it('creates `getExternalAlarms` handler with expected behavior', async () => {
//     // const getExternalAlarmsHandler = getHandler('external-alarms')(
//     //   siteInfoModule.filters()
//     // );
//     // expect(getExternalAlarmsHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType']
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/external-alarms', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType'
//       })
//       .reply(200, { externalAlarms: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/external-alarms`,...input);
//     // expect(data).toStrictEqual({ externalAlarms: 'controller-data' });
//   });

//   it('creates `getVswr` handler with expected behavior', async () => {
//     // const getVswrHandler = getHandler('vswr')(siteInfoModule.filters());
//     // expect(getVswrHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType']
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/vswr', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType'
//       })
//       .reply(200, { vswr: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/vswr`,...input);
//     // expect(data).toStrictEqual({ vswr: 'controller-data' });
//   });

//   it('creates `getFiberCheck` handler with expected behavior', async () => {
//     // const getFiberCheckHandler = getHandler('fiber-check')(
//     //   siteInfoModule.filters()
//     // );
//     // expect(getFiberCheckHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/fiber-check', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech']
//       })
//       .reply(200, { fiberCheck: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/fiber-check`,...input);
//     // expect(data).toStrictEqual({ fiberCheck: 'controller-data' });
//   });

//   it('creates `getRets` handler with expected behavior', async () => {
//     // const getRetsHandler = getHandler('rets')(siteInfoModule.filters());
//     // expect(getRetsHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/rets', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech']
//       })
//       .reply(200, { rets: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/rets`,...input);
//     // expect(data).toStrictEqual({ rets: 'controller-data' });
//   });

//   it('creates `getAssets` handler with expected behavior', async () => {
//     // const getAssetsHandler = getHandler('assets')(siteInfoModule.filters());
//     // expect(getAssetsHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/assets', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech']
//       })
//       .reply(200, { assets: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/assets`,...input);
//     // expect(data).toStrictEqual({ assets: 'controller-data' });
//   });

//   it('creates `getGsmInfo` handler with expected behavior', async () => {
//     // const getGsmInfoHandler = getHandler('gsm-info')(
//     //   siteInfoModule.filters()
//     // );
//     // expect(getGsmInfoHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType']
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/gsm-info', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType'
//       })
//       .reply(200, { gsmInfo: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/gsm-info`,...input);
//     // expect(data).toStrictEqual({ gsmInfo: 'controller-data' });
//   });

//   it('creates `getPower` handler with expected behavior', async () => {
//     // const getPowerHandler = getHandler('power')(siteInfoModule.filters());
//     // expect(getPowerHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['protocols', { testTech: 'testProtocol' }]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/power', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         protocols: { testTech: 'testProtocol' }
//       })
//       .reply(200, { power: 'controller-data' });

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/power`,...input);
//     // expect(data).toStrictEqual({ power: 'controller-data' });
//   });

//   it('logs the error in-place if call to controller fails', async () => {
//     // const getAlarmsHandler = getHandler('alarms')(siteInfoModule.filters());
//     // expect(getAlarmsHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/alarms', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech']
//       })
//       .replyWithError(new Error('Something went bad'));

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/alarms`,...input);
//     // expect(data).toStrictEqual({
//     //   error: 'Error while calling site-info module "alarms". Something went bad'
//     // });
//   });

//   it('logs the error with logger if call to controller fails', async () => {
//     const spy = jest
//       .spyOn(destinationStub, 'write')
//       .mockImplementation(() => jest.fn());

//     // const getAlarmsHandler = getHandler('alarms')(
//     //   siteInfoModule.filters({ logger })
//     // );
//     // expect(getAlarmsHandler).not.toBeUndefined();

//     const input = [
//       ['site_id', 'testSiteId'],
//       ['market', 'testMarket'],
//       ['vendor', 'testVendor'],
//       ['operator', 'testOperator'],
//       ['check_type', 'testCheckType'],
//       ['techs', ['testTech']]
//     ];

//     const data = nock(env.get('CONTROLLER_URL'))
//       .post('/alarms', {
//         operator: 'testOperator',
//         vendor: 'testVendor',
//         market: 'testMarket',
//         site_id: 'testSiteId',
//         check_type: 'testCheckType',
//         techs: ['testTech']
//       })
//       .replyWithError(new Error('Something went bad'));

//     // const data = await http.post(`http:\\${env.get('CONTROLLER_URL')}/alars`,...input);
//     // const messages = destinationStub.calls({ level: 40 });
//     // expect(messages[0].msg).toMatch(/Error while calling site-info module/);

//     spy.mockRestore();
//   });
// });

// describe('::getAllowedModules()', () => {
//   it('is implemented', () => {
//     expect(siteInfoModule.getAllowedModules).toBeInstanceOf(Function);
//   });

//   given('a whitelist of modules', () => {
//     beforeEach(() => {
//       this.whitelist = siteInfoModule.siteInfoModules.slice();
//     });

//     it('returns the corresponding object with includes', () => {
//       const result = siteInfoModule.getAllowedModules(this.whitelist);
//       expect(result).toStrictEqual({
//         includeAlarms: true,
//         includeAlarmsHistory: true,
//         includeCellStatus: true,
//         includeCells: true,
//         includeCommandsHealthCheck: true,
//         includeKpis: true,
//         includeRssiRtwp: true,
//         includeExternalAlarms: true,
//         includeVswr: true,
//         includeFiberCheck: true,
//         includeRets: true,
//         includeAssets: true,
//         includeGsmInfo: true,
//         includePower: true
//       });
//     });
//   });
// });
// // })
