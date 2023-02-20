const moduleStatusCode = Object.freeze({
  fiberCheck: 'FC',
  assets: 'AA',
  cellStatus: 'CS',
  alarms: 'AL',
  extraCellParameters: 'EC',
  cells: 'CE',
  rets: 'RT',
  vswr: 'VS',
  alarmHistroy: 'AH',
  commandHealthCheck: 'CH',
  kpis: 'KP',
  rssiRTWP: 'RS',
  externalAlarms: 'EA',
  gsmInfo: 'GI',
  power: 'PO'
});

const microserviceCode = 'CC';

exports.errorHandler = function (moduleName, err) {
  var statusCode = err.response.statusCode.toString();
  var errorCode;
  if (moduleName == 'fiber-check') {
    errorCode =
      '' + microserviceCode + moduleStatusCode.fiberCheck + statusCode;
  }
  if (moduleName == 'assets') {
    errorCode = '' + microserviceCode + moduleStatusCode.assets + statusCode;
  }
  if (moduleName == 'cell-status') {
    errorCode =
      '' + microserviceCode + moduleStatusCode.cellStatus + statusCode;
  }
  if (moduleName == 'cells') {
    errorCode = '' + microserviceCode + moduleStatusCode.cells + statusCode;
  }
  if (moduleName == 'alarms') {
    errorCode = '' + microserviceCode + moduleStatusCode.alarms + statusCode;
  }
  if (moduleName == 'rets') {
    errorCode = '' + microserviceCode + moduleStatusCode.rets + statusCode;
  }
  if (moduleName == 'vswr') {
    errorCode = '' + microserviceCode + moduleStatusCode.vswr + statusCode;
  }
  if (moduleName == 'extra-cell-parameters') {
    errorCode =
      '' + microserviceCode + moduleStatusCode.extraCellParameters + statusCode;
  }
  if (moduleName == 'alarms-history') {
    errorCode =
      '' + microserviceCode + moduleStatusCode.alarmHistroy + statusCode;
  }
  if (moduleName == 'commands-health-check') {
    errorCode =
      '' + microserviceCode + moduleStatusCode.commandHealthCheck + statusCode;
  }
  if (moduleName == 'kpis') {
    errorCode = '' + microserviceCode + moduleStatusCode.kpis + statusCode;
  }
  if (moduleName == 'rssi-rtwp') {
    errorCode = '' + microserviceCode + moduleStatusCode.rssiRTWP + statusCode;
  }
  if (moduleName == 'external-alarms') {
    errorCode =
      '' + microserviceCode + moduleStatusCode.externalAlarms + statusCode;
  }
  if (moduleName == 'gsm-info') {
    errorCode = '' + microserviceCode + moduleStatusCode.gsmInfo + statusCode;
  }
  if (moduleName == 'power') {
    errorCode =
      '' +
      microserviceCode +
      moduleStatusCode.moduleStatusCode.power +
      statusCode;
  }

  return {
    error: {
      message: `${err.response.statusMessage}`,
      code: err.response.statusCode,
      errorCode: errorCode
    }
  };
};
