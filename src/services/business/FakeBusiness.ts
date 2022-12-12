import BusinessService, { BusinessModel, CreateBusinessRequest } from "./BusinessService";
import crypto from "crypto"

const BUSINESSES = [
    {
        "id": "57cd9714-26be-44d3-af0a-19352e001337",
        "rootBusiness": true,
        "accessAllowed": true,
        "numberOfBusinesses": 0,
        "name": "Coop",
        "ceoName": "Philipp Wyss",
        "zip": "40001",
        "city": "Basel",
        "address": "Postfach",
        "accountNumber": "1111-2222",
        "createdAt": "2022-11-03T20:20:55.743Z"
    },
    {
        "id": "8553049c-b2b0-4cca-b6d9-3ba89240d98c",
        "rootBusiness": false,
        "parent": "57cd9714-26be-44d3-af0a-19352e001337",
        "accessAllowed": true,
        "numberOfBusinesses": 0,
        "name": "Coop (original) x2",
        "ceoName": "Philipp Wyss",
        "zip": "40001",
        "city": "Basel",
        "address": "Postfach",
        "accountNumber": "1111-2222",
        "createdAt": "2022-11-16T19:01:07.690Z"
    },
    {
        "id": "41a8b153-bdd3-4b3c-8b22-35fdf48d2ccd",
        "rootBusiness": false,
        "parent": "57cd9714-26be-44d3-af0a-19352e001337",
        "accessAllowed": true,
        "numberOfBusinesses": 0,
        "name": "Coop (original) x3",
        "ceoName": "Philipp Wyss",
        "zip": "40001",
        "city": "Basel",
        "address": "Postfach",
        "accountNumber": "1111-2222",
        "createdAt": "2022-11-16T19:06:04.982Z"
    },
    {
        "id": "b12b1305-2529-4de1-bbf3-7455908e1ace",
        "rootBusiness": false,
        "parent": "57cd9714-26be-44d3-af0a-19352e001337",
        "accessAllowed": true,
        "numberOfBusinesses": 0,
        "name": "Coop (original) x4",
        "ceoName": "Philipp Wyss",
        "zip": "40001",
        "city": "Basel",
        "address": "Postfach",
        "accountNumber": "1111-2222",
        "createdAt": "2022-11-16T19:06:11.291Z"
    },
    {
        "id": "3794c07d-2003-489f-9117-9c436f71e66b",
        "rootBusiness": true,
        "accessAllowed": true,
        "numberOfBusinesses": 0,
        "name": "Demo businesses 1",
        "ceoName": "",
        "zip": "40001",
        "city": "Basel",
        "address": "Postfach",
        "accountNumber": "1111-2222",
        "createdAt": "2022-11-16T19:06:04.982Z"
    },
]


export default class FakeBusiness implements BusinessService {

    async getAll(): Promise<BusinessModel[]> {
        return BUSINESSES
    }
    async getBusiness(id: string): Promise<BusinessModel> {
        const business = BUSINESSES.find((business) => business.id === id)
        if (business === undefined) throw new Error("Business not found")
        return business
    }
    async getBusinessByParent(id: string): Promise<BusinessModel[]> {
        return BUSINESSES.filter(business => business.parent === id)
    }
    async createBusiness(rootBusiness: string, request: CreateBusinessRequest): Promise<string> {
        return crypto.randomUUID()
    }
}