// TODO: update package name
const fivetran_logs = require("../");

const models = fivetran_logs({
  fivetranLogSchema: "fivetran_log",
  defaultConfig: {
    schema: "fivetran_log_package",
    tags: ["fivetran_log"],
    type: "view"
  },
});
