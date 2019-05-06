
/**
 * @param alertId
 * @param param_type
 * @param param_label
 * @param param_status
 * @param param_from
 * @param param_to
 * @returns {{id: *, type: *, label: *, status: *, from: *, to:*}}
 */

module.exports = class Alert {
    constructor(alertId, param_type, param_label, param_status, param_from, param_to) {
      this.id = alertId;
      this.type = param_type;
      this.label = param_label;
      this.status = param_status;
      this.from = param_from;
      this.to = param_to;
    }
  };