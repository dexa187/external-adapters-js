import { Requester, Validator } from '@chainlink/ea-bootstrap'
import { ExecuteWithConfig, ExecuteFactory } from '@chainlink/types'
import { Config, makeConfig } from './config'
var splunkjs = require('splunk-sdk')

const inputParams = {
  search: true,
}

export interface ResponseSchema {
  data: {
    result: any
  }
}

export const execute: ExecuteWithConfig<Config> = async (request, _, config) => {
  const validator = new Validator(request, inputParams)
  if (validator.error) throw validator.error

  const jobRunID = validator.validated.id
  const search = validator.validated.data.search

  //Make splunk search here
  const service = new splunkjs.Service({
    username: config.user,
    password: config.password,
    host: config.host,
    port: config.port,
    scheme: config.scheme,
  })

  const kwargs_blockingsearch = { exec_mode: 'blocking' }

  console.log(`${JSON.stringify(config)}`)

  const login = () => {
    return new Promise((resolve, reject) => {
      service.login((err: any, success: any) => {
        if (err != null) {
          console.log(err)
          reject(err)
        }
        resolve(success)
      })
    })
  }
  await login()
  const jobs = service.jobs()
  const searchJob = (search: string, kwargs_blockingsearch: any) => {
    return new Promise((resolve, reject) => {
      jobs.oneshotSearch(search, kwargs_blockingsearch, (err: any, results: any) => {
        if (err != null) {
          console.log(err)
          reject(err)
        }
        resolve(results)
      })
    })
  }

  const job: any = await searchJob(search, kwargs_blockingsearch)

  return Requester.success(jobRunID, { data: { result: `${job.rows[0]}` } }, true)
}

export const makeExecute: ExecuteFactory<Config> = (config) => {
  return async (request, context) => execute(request, context, config || makeConfig())
}
