module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_user", {
    ...params.defaultConfig,
    assertions: {
      uniqueKey: ["user_id"],
      nonNull: ["user_id"]
    }
  }).query(ctx => `
select
  id as user_id,
  created_at,
  email,
  email_disabled as has_disabled_email_notifications,
  family_name as last_name,
  given_name as first_name,
  phone,
  verified as is_verified
from
  ${ctx.ref(params.fivetranLogSchema, "user")}
`)
}
