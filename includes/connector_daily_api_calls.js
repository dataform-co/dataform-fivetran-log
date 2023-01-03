const sql = require("./sql")

module.exports = (params) => {
  
  return publish("fivetran_log_connector_daily_api_calls", {
    ...params.defaultConfig
  }).query(ctx => `
with daily_api_calls as (
select
  connector_name,
  ${sql.timestampTruncate(sql.asTimestamp("created_at"), "day")} as date,
  count(*) as number_of_api_calls
from
  ${ctx.ref(params.defaultConfig.schema, params.stagingTablePrefix + "fivetran_log_log")}
where
  event_subtype = 'api_call'
  and connector_name is not null
group by
  1,2
)

select
  daily_api_calls.date,
  daily_api_calls.number_of_api_calls,
  connector_status.connector_name,
  connector_status.connector_id,
  connector_status.connector_type,
  connector_status.destination_name,
  connector_status.destination_id,
  connector_status.set_up_at
from
  ${ctx.ref(params.defaultConfig.schema, "fivetran_log_connector_status")} as connector_status
  left join daily_api_calls on daily_api_calls.connector_name = connector_status.connector_name
where 
  ${sql.asTimestamp("daily_api_calls.date")} <= ${sql.currentUTC()}
`)
}