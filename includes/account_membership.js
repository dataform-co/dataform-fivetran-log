module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_account_membership", {
    ...params.defaultConfig
  }).query(ctx => `
select
  account_id,
  user_id,
  activated_at,
  joined_at,
  role as account_role
from
  ${ctx.ref(params.fivetranLogSchema, "account_membership")}
group by
  1,2,3,4,5
`)
}
