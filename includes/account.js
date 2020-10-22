module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_account", {
    ...params.defaultConfig,
    assertions: {
      uniqueKey: ["account_id"],
      nonNull: ["account_id"]
    }
  }).query(ctx => `
select
  id as account_id,
  country,
  created_at,
  name as account_name,
  status
from
  ${ctx.ref(params.fivetranLogSchema, "account")}
`)
}
