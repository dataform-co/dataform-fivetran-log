// TODO: import files from includes
const fivetranLogAccount = require("./includes/account");
const fivetranLogAccountMembership = require("./includes/account_membership");
const fivetranLogActiveVolume = require("./includes/active_volume");
const fivetranLogConnector = require("./includes/connector");
const fivetranLogCreditsUsed = require("./includes/credits_used");
const fivetranLogDestination = require("./includes/destination");
const fivetranLogDestinationMembership = require("./includes/destination_membership");
const fivetranLogLog = require("./includes/log");
const fivetranLogUser = require("./includes/user");
const fivetranLogConnectorDailyApiCalls = require("./includes/connector_daily_api_calls");
const fivetranLogConnectorStatus = require("./includes/connector_status");
const fivetranLogCreditMarHistyory = require("./includes/credit_mar_history");
const fivetranLogMarTableHistory = require("./includes/mar_table_history");

module.exports = (params) => {

  params = {
    // set defaults for parameters
    fivetranLogSchema: "fivetran_log",

    ...params
  };

  let account, account_membership, active_volume, connector, credits_used, destination, destination_membership, log, user;

  account = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "account"
  });

  account_membership = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "account_membership"
  });

  active_volume = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "active_volume"
  });

  connector = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "connector"
  });

  credits_used = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "credits_used"
  });

  destination = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "destination"
  });

  destination_membership = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "destination_membership"
  });

  log = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "log"
  });

  user = declare({
    ...params.defaultConfig,
    schema: params.fivetranLogSchema,
    name: "user"
  });

  // Publish and return datasets.
  let result = {
    // TODO: update files to call with params
    account: fivetranLogAccount(params),
    account_membership: fivetranLogAccountMembership(params),
    active_volume: fivetranLogActiveVolume(params),
    connector: fivetranLogConnector(params),
    credits_used: fivetranLogCreditsUsed(params),
    destination: fivetranLogDestination(params),
    destination_membership: fivetranLogDestinationMembership(params),
    log: fivetranLogLog(params),
    user: fivetranLogUser(params),
    connector_daily_api_calls: fivetranLogConnectorDailyApiCalls(params),
    connector_status: fivetranLogConnectorStatus(params),
    credit_mar_histyory: fivetranLogCreditMarHistyory(params),
    mar_table_history: fivetranLogMarTableHistory(params),
  };

  return result;
}
