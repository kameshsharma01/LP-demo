const env = require('../../../../modules/env.module');
const fs = require('fs');
const path = require('path');
// local
const { renderTemplate } = require('../../../../modules/template.module');
const {
  getAllowedModules,
  getModulePayload
} = require('../modules/site-info.module');
const { normalizeTechs } = require('../modules/transformer.module');
const http = require('../../../../modules/http.module');

const CONTROLLER_URL_DEFAULT = 'http://ms_controller:8002';
const KPIS_URL_DEFAULT = 'http://ms_controller:8002';
const CONTROLLER_URL = env.get('CONTROLLER_URL', CONTROLLER_URL_DEFAULT);
const KPIS_URL = env.get('KPIS_URL', KPIS_URL_DEFAULT);
const { errorHandler } = require('../helper/error-code');
const sampleData = require('./mock.json');
exports.post = async function (request, reply) {
  const { template } = request.query;
  const { whitelist, ...args } = request.body;
  const { headers } = request;
  try {
    const payload = {
      ...args,
      ...getAllowedModules(whitelist),
      ...{ normalizedTechs: normalizeTechs(args.techs) }
    };

    const siteInfoResult = await getSiteInfoModule(
      payload,
      whitelist,
      headers,
      request.body
    );
    let result;

    if (
      payload.target_vendor &&
      payload.target_vendor != '' &&
      payload.vendor != payload.target_vendor
    ) {
      result = await renderTemplate('site-info-target-vendor', {
        payload: payload,
        siteInfoResult: siteInfoResult
      });
    } else {
      result = await renderTemplate(template, {
        payload: payload,
        siteInfoResult: siteInfoResult
      });
    }
    ensureJson(result);
    reply.header('Content-Type', 'application/json').send(result);
  } catch (err) {
    request.log.error({ err }, `Error on rendering template: "${template}"`);
    reply.code(500).send();
  }
};

async function getSiteInfoModule(payload, whitelist, headers, body) {
  try {
    const request = [];
    const errRequest = [];

    const header = {
      headers: {
        'X-Transation-ID': headers['x-transation-id'],
        'Task-ID': headers['task-id']
      }
    };

    for (let i = 0; i < whitelist.length; i++) {
      const body = getModulePayload(whitelist[i], payload);
      if (whitelist[i] == 'imnos-kpis') {
        request.push(
          http
            .post(`${KPIS_URL}/kpis/v3/kpi-data/`, body, header)
            .then((res) => res.body)
            .catch((err) => {
              errRequest.push(errorHandler(whitelist[i], err));
              return errorHandler(whitelist[i], err);
            })
        );
      } else {
        request.push(
          http
            .post(`${CONTROLLER_URL}/${whitelist[i]}`, body, header)
            .then((res) => res.body)
            .catch((err) => {
              errRequest.push(errorHandler(whitelist[i], err));
              return errorHandler(whitelist[i], err);
            })
        );
      }
    }

    const [...data] = await Promise.all(request);
    const [...errData] = await Promise.all(errRequest);

    const date = Date.now();
    const logData = {
      timestamp: date,
      payload: body,
      headers: header.headers,
      response: errData
    };

    let fpath = path.join(__dirname, 'logger.txt');
    if (errData.length > 0) {
      fs.appendFile(fpath, '\n' + JSON.stringify(logData) + ',', (err) => {
        if (err) {
          console.log(err);
        }
      });
    }
    if (data) {
      const res = {};
      for (let i = 0; i < whitelist.length; i++) {
        res[whitelist[i]] = data[i];
      }
      return res;
    }
  } catch (error) {
    console.log('Error test template', error);
  }
}

function ensureJson(payload) {
  JSON.parse(payload);
}
