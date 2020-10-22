module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_active_volume", {
    ...params.defaultConfig,
    assertions: {
      uniqueKey: ["active_volume_id"]
    }
  }).query(ctx => `
select
   id as active_volume_id,
   connector_id as connector_name,
   destination_id,
   measured_at,
   monthly_active_rows,
   schema_name,
   table_name
from
  ${ctx.ref(params.fivetranLogSchema, "active_volume")}
`)
}
