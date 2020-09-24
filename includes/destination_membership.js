module.exports = (params) => {

  return publish("fivetran_log_destination_membership", {
    ...params.defaultConfig
  }).query(ctx => `
select
  destination_id,
  user_id,
  activated_at,
  joined_at,
  role as destination_role,
  ${params.fivetranLogDatabase} as destination_databases
from
  ${ctx.ref(params.fivetranSchema, "destination_membership")}
`)
}
