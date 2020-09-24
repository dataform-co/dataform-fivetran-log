module.exports = (params) => {

  return publish("fivetran_log_connector_daily_api_calls", {
    ...params.defaultConfig
  }).query(ctx => `
with api_calls as (
select
  connector_name,
  destination_database,
  { { dbt_utils.date_trunc('day', 'created_at') } } as date,
  count(*) as number_of_api_calls
from
  ${ctx.ref(params.fivetranSchema, "fivetran_log_log")}
where
  event_subtype = 'api_call'
  and connector_name is not null
group by
  1,2,3
),

connector_api_calls as (
select
  api_calls.date,
  api_calls.number_of_api_calls,
  connector.connector_name,
  connector.connector_id,
  connector.connector_type,
  connector.destination_name,
  connector.destination_id,
  connector.set_up_at
from
  ${ctx.ref(params.fivetranSchema, "fivetran_log_connector")} as connector
  left join api_calls on api_calls.connector_name = connector.connector_name
  and api_calls.destination_database = connector.destination_database
),

-- TODO: Make this not just BigQuery specific
with dates as (
  select
    *
  from
    unnest(
generate_date_array(
  date(${params.fivetranLogFirstDate}),
  date_add(current_date(), interval 1 week),
  interval 1 day
)
    ) as date
),

connector_api_call_history as (
select
  dates.date,
  connector_api_calls.connector_name,
  connector_api_calls.connector_id,
  connector_api_calls.connector_type,
  connector_api_calls.destination_name,
  connector_api_calls.destination_id,
  max(case 
        when cast(dates.date as timestamp) = connector_api_calls.date then connector_api_calls.number_of_api_calls
        else 0
       end) as number_of_api_calls
from
  dates 
    join connector_api_calls 
    on cast(dates.date as timestamp) >= connector_api_calls.set_up_at
group by
  1,2,3,4,5,6
),

-- now rejoin dates to get a complete calendar
join_api_call_history as (
select
  dates.date,
  connector_api_call_history.connector_name,
  connector_api_call_history.connector_id,
  connector_api_call_history.connector_type,
  connector_api_call_history.destination_name,
  connector_api_call_history.destination_id,
  connector_api_call_history.number_of_api_calls
from
  dates
  left join connector_api_call_history
  on dates.date = connector_api_call_history.date
group by 
  1,2,3,4,5,6,7
),

select 
  *
from 
  join_api_call_history
where 
  -- TODO: Make current_timestamp not bigquery specific
  cast(date as timestamp) <= current_timestamp()
order by 
  date desc
`)
}
