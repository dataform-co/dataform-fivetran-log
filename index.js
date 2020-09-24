// TODO: import files from includes
const getaccount = require("./includes/account");
const getaccount_membership = require("./includes/account_membership");
const getactive_volume = require("./includes/active_volume");
const getconnector = require("./includes/connector");
const getcredits_used = require("./includes/credits_used");
const getdestination = require("./includes/destination");
const getdestination_membership = require("./includes/destination_membership");
const getlog = require("./includes/log");
const getuser = require("./includes/user");

module.exports = (params) => {

  params = {
    // TODO: set default params
    fivetranLogFirstDate: "2016-01-01",

    ...params
  };

  let account, account_membership, active_volume, connector, credits_used, destination, destination_membership, log, user;

  account = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "account"
  });

  account_membership = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "account_membership"
  });

  active_volume = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "active_volume"
  });

  connector = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "connector"
  });

  credits_used = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "credits_used"
  });

  destination = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "destination"
  });

  destination_membership = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "destination_membership"
  });

  log = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "log"
  });

  user = declare({
    ...params.defaultConfig,
    schema: params.fivetranSchema,
    name: "user"
  });

  // Publish and return datasets.
  let result = {
    // TODO: update files to call with params
    account: getaccount(params),
    account_membership: getaccount_membership(params),
    active_volume: getactive_volume(params),
    connector: getconnector(params),
    credits_used: getcredits_used(params),
    destination: getdestination(params),
    destination_membership: getdestination_membership(params),
    log: getlog(params),
    user: getuser(params),
  };

  return result;
}
