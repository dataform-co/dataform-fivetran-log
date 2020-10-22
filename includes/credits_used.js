module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_credits_used", {
    ...params.defaultConfig
  }).query(ctx => `
select
  destination_id,
  measured_month,
  credits_consumed
from
  ${ctx.ref(params.fivetranLogSchema, "credits_used")}
`)
}
