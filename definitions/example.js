// TODO: update package name
const fivetran_logs = require("../");

const models = fivetran_logs({
  // TODO: add variables
    defaultConfig: {
    schema: "fivetran_log_package",
    tags: ["fivetran_log"],
    type: "view"
  },
  fivetranLogDatabase: "dataform-corp",
  // TODO: rename to fivetranLogSchema
  fivetranSchema: "fivetran_log",
  fivetranLogFirstDate: "2020-08-01"
  
});

