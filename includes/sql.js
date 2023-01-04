const getDialect = () => {
  const dataformWarehouse = global.dataform.projectConfig.warehouse;
  if (!dataformWarehouse) {
    return "standard";
  }
  return {
    bigquery: "standard",
    redshift: "redshift",
    postgres: "postgres",
    snowflake: "snowflake",
    sqldatawarehouse: "mssql",
  }[dataformWarehouse];
};

const asTimestamp = (castableToTimestamp) => {
  return `cast(${castableToTimestamp} as timestamp)`;
};

const timestampDiff = (datePart, start, end) => {
  const dialect = getDialect();
  if (dialect === "snowflake" || dialect === "redshift") {
    return `datediff(${datePart}, ${start}, ${end})`;
  }
  return `timestamp_diff(${end}, ${start}, ${datePart})`;
};

const timestampTruncate = (timestamp, timestampUnit) => {
  const dialect = getDialect();
  if (dialect === "snowflake") {
    return `date_trunc(${timestampUnit}, ${timestamp})`;
  }
  if (dialect === "redshift") {
    return `date_trunc('${timestampUnit}', ${timestamp})`;
  }
  return `timestamp_trunc(${timestamp}, ${timestampUnit})`;
};

const currentUTC = () => {
  const dialect = getDialect();
  if (dialect === "redshift") {
    return "current_timestamp::timestamp";
  }
  if (dialect === "snowflake") {
    return "convert_timezone('UTC', current_timestamp())::timestamp";
  }
  return "current_timestamp()";
};

const stringAgg = (field, delimiter = ",") => {
  const dialect = getDialect();
  if (dialect === "snowflake" || dialect === "redshift") {
    return `listagg(${field}, '${delimiter}')`;
  }
  return `string_agg(${field}, '${delimiter}')`;
};

module.exports = {
  asTimestamp,
  timestampDiff,
  timestampTruncate,
  currentUTC,
  stringAgg,
};
