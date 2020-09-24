module.exports = (params) => {

  return publish("fivetran_log_credits_used", {
    ...params.defaultConfig
  }).query(ctx => `
select
  destination_id,
  measured_month,
  credits_consumed,
  ${params.fivetranLogDatabase} as destination_databases
from
  ${ctx.ref(params.fivetranSchema, "credits_used")}
`)
}
