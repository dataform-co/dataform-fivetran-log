module.exports = (params) => {

  return publish("fivetran_log_account", {
    ...params.defaultConfig
  }).query(ctx => `
select
  id as account_id,
  country,
  created_at,
  name as account_name,
  status,
  ${params.fivetranLogDatabase} as destination_databases
from
  ${ctx.ref(params.fivetranSchema, "account")}
`)
}
