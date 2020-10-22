module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_destination", {
    ...params.defaultConfig,
    assertions: {
      uniqueKey: ["destination_id"],
      nonNull: ["destination_id"]
    }
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
