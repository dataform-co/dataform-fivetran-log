# dataform-fivetran-log

BETA package for transforming Fivetran Log data, which comes from a [free internal connector](https://fivetran.com/docs/logs/fivetran-log). An ERD of the source data is [here](https://docs.google.com/presentation/d/1lny-kFwJIvOCbKky3PEvEQas4oaHVVTahj3OTRONpu8/edit#slide=id.p). The package currently only supports a single destination.

This package helps you understand:
* How you are spending money in Fivetran according to our [consumption-based pricing model](https://fivetran.com/docs/getting-started/consumption-based-pricing). We display consumption data at the table, connector, destination, and account levels.
* How your data is flowing in Fivetran:
    * Connector health and sync statuses
    * Daily API calls

The package's main goals are to:
* Create a history of measured monthly active rows (MAR), credit consumption, and the relationship between the two
* Enhance the connector table with sync metrics and relevant alert messages
* Enhance the transformation table with run metrics
* Create a history of daily API calls for each connector
* Union log data across destinations

## Models

| **model**                  | **description**                                                                                                                                               |
| -------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| fivetran\_log\_connector\_status        | Each record represents a connector loading data into a destination, enriched with data about the connector's status and the status of its data flow.                                          |
| fivetran\_log\_mar\_table\_history     | Each record represents a table's active volume for a month, complete with data about its connector and destination.                             |
| fivetran\_log\_credit\_mar\_history    | Each record represents a destination's consumption by showing its MAR, total credits used, and credits per millions MAR.                             |
| fivetran\_log\_connector\_daily_api\_calls    | Each record represents a daily measurement of the API calls made by a connector, starting from the date on which the connector was set up.  

## Installation

Add the package to your `package.json` file in your Dataform project. You can find the most up to package version on the [releases page](https://github.com/dataform-co/dataform-fivetran-log/releases).

## Configure the package

Create a new JS file in your `definitions/` folder and create the Fivetran Log tables as in the following example.

By default, the package will run using the `fivetran_log` schema. If this is not where your Fivetran Log data is, you can override it when calling the package:

```js
const fivetranLog = require("fivetran-log");

fivetranLog({
  // The name of your fivetran log schema.
  fivetranLogSchema: "fivetran_log",
  // Default configuration applied to all produced datasets.
  defaultConfig: {
    schema: "fivetran_log_package",
    tags: ["fiveran_log_package"],
    type: "view"
  },
});
```

## Features not supported:
 - transformations
 - multiple destination databases

## Supported warehouses:
 - BigQuery
 - Snowflake
 - Redshift
