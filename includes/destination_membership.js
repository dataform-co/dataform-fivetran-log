module.exports = (params) => {

  return publish("fivetran_log_destination_membership", {
    ...params.defaultConfig
  }).query(ctx => `
select
  destination_id,
  user_id,
  activated_at,
  joined_at,
  role as destination_role
from
  ${ctx.ref(params.fivetranLogSchema, "destination_membership")}
`)
}
