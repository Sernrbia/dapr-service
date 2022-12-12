export type LaimDevice = {
    deviceId: string
    firmware?: string
}

export default interface LaimService {
    link: string
    createTicket(resource: string): Promise<string>
    devices(resource: string): Promise<LaimDevice[]>
}