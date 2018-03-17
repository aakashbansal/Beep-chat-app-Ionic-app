export interface LoginResponse {
    result?: {
        email?: string,
        uid?: string
    },
    error?: {
        code?: string,
        message?: string
    }
}