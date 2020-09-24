module.exports = (params) => {

  return publish("fivetran_log_connector_status", {
    ...params.defaultConfig
  }).query(ctx => `
select
 -- TODO
  ${params.fivetranLogDatabase} as destination_databases
from
  ${ctx.ref(params.fivetranSchema, "connector_status")}
group by
  1,2,3,4,5
`)
}
