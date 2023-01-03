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
  };
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
  if (this.dialect === "snowflake") {
    return `date_trunc(${timestampUnit}, ${timestamp})`;
  }
  if (this.dialect === "redshift") {
    return `date_trunc('${timestampUnit}', ${timestamp})`;
  }
  return `timestamp_trunc(${timestamp}, ${timestampUnit})`;
};

const currentUTC = () => {
  if (this.dialect === "redshift") {
    return "current_timestamp::timestamp";
  }
  if (this.dialect === "snowflake") {
    return "convert_timezone('UTC', current_timestamp())::timestamp";
  }
  return "current_timestamp()";
};

function stringAgg(field, delimiter = ",") {
  if (this.dialect === "snowflake" || this.dialect === "redshift") {
    return `listagg(${field}, '${delimiter}')`;
  }
  return `string_agg(${field}, '${delimiter}')`;
}

module.exports = {
  asTimestamp,
  timestampDiff,
  timestampTruncate,
  currentUTC,
  stringAgg,
};
