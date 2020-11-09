const fivetran_logs = require("../");

const models = fivetran_logs({
  fivetranLogSchema: "fivetran_log",
  fivetranLogDatabase: "dataform-corp",
  defaultConfig: {
    schema: "fivetran_log_package",
    tags: ["fivetran_log"],
    type: "view"
  },
});
