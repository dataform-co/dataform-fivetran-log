module.exports = (params) => {

  return publish("fivetran_log_credit_mar_history", {
    ...params.defaultConfig
  }).query(ctx => `
select
 -- TODO
  ${params.fivetranLogDatabase} as destination_databases
from
  ${ctx.ref(params.fivetranSchema, "credit_mar_history")}
group by
  1,2,3,4,5
`)
}
