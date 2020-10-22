module.exports = (params) => {

  return publish(params.stagingTablePrefix + "fivetran_log_log", {
    ...params.defaultConfig
  }).query(ctx => `
select
  id as log_id, 
  time_stamp as created_at,
  connector_id as connector_name,
  case 
    when transformation_id is not null and event is null then 'TRANSFORMATION'
    else event 
  end as event_type, 
  message_data,
  case 
    when transformation_id is not null and message_data like '%has succeeded%' then 'transformation run success'
    when transformation_id is not null and message_data like '%has failed%' then 'transformation run failed'
    else message_event 
  end as event_subtype,
  transformation_id
from
  ${ctx.ref(params.fivetranLogSchema, "log")}
`)
}
