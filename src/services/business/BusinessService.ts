export type BusinessModel = {
    id: string
    rootBusiness: boolean
    accessAllowed: boolean
    numberOfBusinesses: number
    name: string
    ceoName: string
    zip: string
    city: string
    address: string
    accountNumber: string
    createdAt: string
    modifiedAt?: string
}

export type CreateBusinessRequest = {
    name: string
    ceoName?: string
    address?: string
    city?: string
    zip?: string
    accountNumber?: string
}

export default interface BusinessService {
    getAll(): Promise<BusinessModel[]>
    getBusiness(id: string): Promise<BusinessModel>
    getBusinessByParent(id: string): Promise<BusinessModel[]>

    createBusiness(rootBusiness: string, request: CreateBusinessRequest): Promise<string>
}