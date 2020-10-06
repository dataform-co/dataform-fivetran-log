module.exports = (params) => {

  return publish("fivetran_log_destination", {
    ...params.defaultConfig
  }).query(ctx => `
select
  id as destination_id,
  account_id,
  created_at,
  name as destination_name,
  region
from
  ${ctx.ref(params.fivetranLogSchema, "destination")}
`)
}
