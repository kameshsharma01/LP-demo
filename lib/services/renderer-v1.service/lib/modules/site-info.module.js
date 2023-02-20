const string = require('../../../../modules/string.module');

const siteInfoModules = [
  'alarms',
  'alarms-history',
  'cell-status',
  'cells',
  'commands-health-check',
  'kpis',
  'rssi-rtwp',
  'external-alarms',
  'vswr',
  'fiber-check',
  'rets',
  'assets',
  'gsm-info',
  'power',
  'imnos-kpis',
  'extra-cell-parameters',
  'sw-version'
];

exports.siteInfoModules = Object.freeze(siteInfoModules);

exports.getModulePayload = function (moduleName, payload) {
  const name = moduleName;
  switch (name) {
    case 'cell-status':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs,
        protocols: payload.protocols
      };
    case 'cells':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    case 'alarms':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs,
        protocols: payload.protocols
      };
    case 'kpis':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    case 'imnos-kpis':
      return {
        sitename: payload.site_id,
        market: payload.market,
        vendor: payload.vendor.toUpperCase(),
        tech: payload.techs.toString(),
        data_src: 'raw',
        samples: 1,
        kpilist: payload.kpilist
          ? payload.kpilist
          : [
              'erab_accessibility_common',
              'volte_erlang_common',
              'nr_endc_drop_rate'
            ]
      };
    case 'extra-cell-parameters':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    case 'power':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs,
        protocols: payload.protocols
      };
    case 'rssi-rtwp':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    case 'vswr':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type
      };
    case 'fiber-check':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    case 'external-alarms':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type
      };
    case 'rets':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    case 'assets':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    case 'alarms-history':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        history_hours: payload.history_hours,
        techs: payload.techs
      };
    case 'gsm-info':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type
      };
    case 'commands-health-check':
      return {
        market: payload.market,
        operator: payload.operator,
        technology: payload.technology,
        command_name: payload.command_name,
        bsc: payload.bsc,
        rnc: payload.rnc,
        oss: payload.oss
      };
    case 'sw-version':
      return {
        site_id: payload.site_id,
        market: payload.market,
        vendor: payload.vendor,
        operator: payload.operator,
        check_type: payload.check_type,
        techs: payload.techs
      };
    default:
      return payload;
  }
};

exports.getAllowedModules = function (allowedModules) {
  const filterByInputModules = (siteInfoModule) =>
    allowedModules.includes(siteInfoModule);
  const transform = (siteInfoModule) =>
    `include${string.pascalize(siteInfoModule)}`;

  return siteInfoModules
    .filter(filterByInputModules)
    .map(transform)
    .reduce((res, name) => {
      res[name] = true;
      return res;
    }, {});
};
