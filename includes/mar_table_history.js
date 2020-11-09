const sql = require("@dataform/sql")();

module.exports = (params) => {

  return publish("fivetran_log_mar_table_history", {
    ...params.defaultConfig
  }).query(ctx => `
with 
active_volume as (
select
  *,
  ${sql.timestamps.truncate(sql.asTimestamp("measured_at"), "month")} as measured_month
from
  ${ctx.ref(params.defaultConfig.schema, params.stagingTablePrefix + "fivetran_log_active_volume")}
where
  schema_name != 'fivetran_log'
  -- it's free!
),

ordered_mar as (
select
  connector_name,
  schema_name,
  table_name,
  destination_id,
  measured_at,
  measured_month,
  monthly_active_rows,
  -- each measurement is cumulative for the month, so we'll only look at the latest date for each month
  row_number() over(
    partition by table_name,
    connector_name,
    destination_id,
    measured_month
    order by
      measured_at desc
  ) as n
from
  active_volume
),

latest_mar as (
select
  connector_name,
  schema_name,
  table_name,
  destination_id,
  measured_month,
  date(measured_at) as last_measured_at,
  monthly_active_rows
from
  ordered_mar
where
    n = 1
)

select
  latest_mar.*,
  connector.connector_type,
  destination.destination_name
from
  latest_mar
  join ${ctx.ref(params.defaultConfig.schema, params.stagingTablePrefix + "fivetran_log_connector")} as connector on latest_mar.connector_name = connector.connector_name
  and latest_mar.destination_id = connector.destination_id
  join ${ctx.ref(params.defaultConfig.schema, params.stagingTablePrefix + "fivetran_log_destination")} as destination on latest_mar.destination_id = destination.destination_id
`)
}
