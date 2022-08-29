declare global {
  namespace NodeJS {
    interface ProcessEnv {
      CONNECT_DATABASE_URI: string
      port: string
    }
  }
}
export {}