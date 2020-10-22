module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_connector", {
    ...params.defaultConfig,
    assertions: {
      uniqueKey: ["connector_name"]
    }
  }).query(ctx => `
with all_connectors as (
select
   connector_id,
   connector_name,
   connector_type,
   destination_id,
   connecting_user_id,
   paused as is_paused,
   signed_up as set_up_at,
  -- Consolidating duplicate connectors (ie deleted and then re-added)
  row_number() over ( partition by connector_name, destination_id order by _fivetran_synced desc ) as nth_last_record
from
  ${ctx.ref(params.fivetranLogSchema, "connector")}
)

select
  connector_id,
  connector_name,
  connector_type,
  destination_id,
  connecting_user_id,
  is_paused,
  set_up_at
from
  all_connectors
  -- Only look at the most recent one
where
  nth_last_record = 1

`)
}
