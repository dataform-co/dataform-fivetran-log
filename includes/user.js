module.exports = (params) => {

  return publish("fivetran_log_user", {
    ...params.defaultConfig
  }).query(ctx => `
select
  id as user_id,
  created_at,
  email,
  email_disabled as has_disabled_email_notifications,
  family_name as last_name,
  given_name as first_name,
  phone,
  verified as is_verified,
  ${params.fivetranLogDatabase} as destination_databases
from
  ${ctx.ref(params.fivetranSchema, "user")}
`)
}
