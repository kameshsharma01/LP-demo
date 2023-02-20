// init
const techsTranslator = new Map([
  ['gsm', 'GSM'],
  ['umts', 'UMTS'],
  ['lte', 'LTE'],
  ['nr', 'FIVEG']
]);

function normalizeTech(label) {
  if (!label) return;
  return techsTranslator.get(label.toLowerCase());
}

exports.normalizeTechs = function (labels) {
  if (!labels) return;
  return labels.map(normalizeTech);
};
