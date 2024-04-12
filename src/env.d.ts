declare global {
    namespace NodeJS {
        interface ProcessEnv {
            PORT: string
            DB_HOST: string
            DB_NAME: string
            DB_PASSWORD: string
            BD_USERNAME: string
        }
    }
}