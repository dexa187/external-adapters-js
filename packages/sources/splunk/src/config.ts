import { util } from '@chainlink/ea-bootstrap'
import { RequestConfig } from '@chainlink/types'

export const NAME = 'SPLUNK' // This should be filled in with a name corresponding to the data provider using UPPERCASE and _underscores_.

export const DEFAULT_ENDPOINT = 'en-US/account/login'
export const DEFAULT_BASE_URL = 'https://localhost:8089'

export type Config = {
  host?: string
  port?: string
  user?: string
  password?: string
  scheme?: string

  api?: RequestConfig
}

export const makeConfig = (prefix?: string): Config => ({
  host: util.getRequiredEnv('HOST', prefix) || 'localhost',
  port: util.getRequiredEnv('PORT', prefix) || 8089,
  scheme: util.getRequiredEnv('SCHEME', prefix) || 'https',
  user: util.getRequiredEnv('USER', prefix) || 'admin',
  password: util.getRequiredEnv('PASSWORD', prefix),
  api: {},
})
