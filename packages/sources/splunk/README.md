# Chainlink External Adapter for Splunk

This adapter allows you to query for splunk for data.

### Environment Variables

| Required? |   Name   |                                             Description                                             | Options | Defaults to |
| :-------: | :------: | :-------------------------------------------------------------------------------------------------: | :-----: | :---------: |
|    ✅     |   HOST   | Hostname where your splunk instance resides (add a ✅ in `Required?` if this parameter is required) |         |  localhost  |
|    ✅     |   PORT   |                               The admin port for your splunk instance                               |         |    8089     |
|    ✅     |  SCHEME  |                          If your splunk instance is running http or https                           |         |    https    |
|    ✅     |   USER   |                               Username you wish to run the search as                                |         |    admin    |
|    ✅     | PASSWORD |                                  The password for your splunk user                                  |         |             |

---

### How to run

```
HOST=localhost PORT=8089 USER=admin PASSWORD=password SCHEME=https yarn start
```

### Input Parameters

| Required? |   Name   |     Description     |           Options           | Defaults to |
| :-------: | :------: | :-----------------: | :-------------------------: | :---------: |
|           | endpoint | The endpoint to use | [example](#Splunk-Endpoint) |   example   |

---

## Splunk Endpoint

An example endpoint description

### Input Params

| Required? |   Name   |          Description           | Options | Defaults to |
| :-------: | :------: | :----------------------------: | :-----: | :---------: |
|    ✅     | `search` | The search you wish to perform |         |             |

### Sample Input

```json
{
  "id": "1",
  "data": {
    "search": "search index=_internal earliest=1m | stats count",
  }
}

curl http://localhost:8080 --data '{"id":123,"data":{"search":"index=_internal earliest=1m | stats count"}}' -H "Content-type":"application/json"
```

### Sample Output

```json
{
  "jobRunID": 123,
  "result": "599",
  "statusCode": 200,
  "data": {
    "result": "599"
  }
}
```
