function requiredEnv(name, value) {
  if (!value || !value.trim()) {
    throw new Error(`Missing required server configuration: ${name}`)
  }
  return value.trim()
}

export function loadServerConfig(env = process.env) {
  const port = Number(env.PORT ?? 8787)
  if (!Number.isInteger(port) || port < 1 || port > 65535) {
    throw new Error('PORT must be an integer from 1 to 65535')
  }

  return {
    host: env.HOST || '127.0.0.1',
    port,
    // Example of server-only configuration validation. Do not define this in
    // a frontend .env file or expose it through an API response.
    internalServiceUrl: requiredEnv('INTERNAL_SERVICE_URL', env.INTERNAL_SERVICE_URL),
  }
}
