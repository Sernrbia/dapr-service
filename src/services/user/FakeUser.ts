import UserService, { UserModel } from "./UserService";
import crypto from "crypto"


export default class FakeUser implements UserService {

    async get(id: string): Promise<UserModel> {
        return {
            "id": id,
            "email": "aleksandar.milosevic@appmodule.net",
            "businesses": [
                {
                    "id": "57cd9714-26be-44d3-af0a-19352e001337",
                    "role": "admin",
                    "createdAt": "2022-11-10T16:08:07.909Z"
                },
                {
                    "id": "3794c07d-2003-489f-9117-9c436f71e66b",
                    "role": "admin",
                    "createdAt": "2022-11-10T16:12:26.576Z"
                },
                {
                    "id": "8553049c-b2b0-4cca-b6d9-3ba89240d98c",
                    "role": "support",
                    "createdAt": "2022-11-10T16:12:26.576Z"
                }
            ],
            "createdAt": "2022-11-10T16:08:07.684Z"
        }
    }
    async getBusinessUsers(business: string): Promise<UserModel[]> {
        return [
            {
                "id": crypto.randomUUID(),
                "email": "aleksandar.milosevic@appmodule.net",
                "businesses": [
                    {
                        "id": business,
                        "role": "admin",
                        "createdAt": "2022-11-10T16:08:07.909Z"
                    },
                    {
                        "id": "3794c07d-2003-489f-9117-9c436f71e66b",
                        "role": "admin",
                        "createdAt": "2022-11-10T16:08:07.909Z"
                    },
                ],
                "createdAt": "2022-11-10T16:08:07.684Z"
            },
            {
                "id": crypto.randomUUID(),
                "email": "suri@appmodule.net",
                "businesses": [
                    {
                        "id": business,
                        "role": "support",
                        "createdAt": "2022-11-10T16:12:26.576Z"
                    }
                ],
                "createdAt": "2022-11-10T16:08:07.684Z"
            },
            {
                "id": crypto.randomUUID(),
                "email": "zika@appmodule.net",
                "businesses": [
                    {
                        "id": business,
                        "role": "viewer",
                        "createdAt": "2022-11-10T16:12:26.576Z"
                    }
                ],
                "createdAt": "2022-11-10T16:08:07.684Z"
            }
        ]
    }

    async inviteUser(email: string, business: string, role: string): Promise<void> {
        console.log("InviteUser", email, business, role)
    }
}