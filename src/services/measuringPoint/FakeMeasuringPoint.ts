import MeasuringPointService, { MeasuringPointModel, MeasuringResult } from "./MeasuringPointService";

const MEASURING_POINTS = [
    {
        "id": "b11e32b1-738d-4785-9e6d-1f2418bc5a4b",
        "businessIdOfMp": "zika-patika-2-2",
        "business": "41a8b153-bdd3-4b3c-8b22-35fdf48d2ccd",
        "name": "zika-patika-2",
        "createdAt": "2022-11-16T11:02:02.416Z",
        "modifiedAt": "2022-11-16T11:02:23.349Z"
    },
    {
        "id": "455b6439-14e2-488a-827b-c818c5ae71a6",
        "businessIdOfMp": "zika-patika-2",
        "business": "b12b1305-2529-4de1-bbf3-7455908e1ace",
        "name": "zika-kacket",
        "createdAt": "2022-11-16T11:02:02.416Z",
        "modifiedAt": "2022-11-16T11:02:23.349Z"
    },
    {
        "id": "e22586ce-5ceb-41d2-a51a-fca6a2647001",
        "businessIdOfMp": "zika-patika",
        "business": "57cd9714-26be-44d3-af0a-19352e001337",
        "name": "zika-patika",
        "createdAt": "2022-11-16T11:02:02.416Z",
        "modifiedAt": "2022-11-16T11:02:23.349Z"
    },
    {
        "id": "8feb93c9-8b1a-407f-a662-f17d4c0cf879",
        "businessIdOfMp": "zika-trenerka",
        "business": "8553049c-b2b0-4cca-b6d9-3ba89240d98c",
        "name": "zika-trenerka",
        "createdAt": "2022-11-16T11:02:02.416Z",
        "modifiedAt": "2022-11-16T11:02:23.349Z"
    },
]

const measuring = (value: number) => ({
    "unit": "kW",
    "data": [
        {
            "time": 1669039937152,
            value
        },
        {
            "time": 1669039942146,
            value
        },
        {
            "time": 1669039947151,
            value
        },
        {
            "time": 1669039952154,
            value
        },
        {
            "time": 1669039957155,
            value
        }
    ]
})

export default class FakeMeasuringPoint implements MeasuringPointService {
    async getAll(): Promise<MeasuringPointModel[]> {
        return MEASURING_POINTS;
    }
    async getAllForBusiness(businessId: string): Promise<MeasuringPointModel[]> {
        return MEASURING_POINTS.map(mp => {
            mp.business = businessId
            return mp
        })
    }
    async get(id: string): Promise<MeasuringPointModel> {
        const mp = MEASURING_POINTS.find(mp => mp.id === id)
        if (mp === undefined) throw new Error("Not found measuring point")
        return mp;
    }
    async lastMeasuring(id: string, count: number): Promise<MeasuringResult> {
        return measuring(0.19)
    }
    async rangeMeasuring(id: string, from: number, to: number, timezone: string): Promise<MeasuringResult> {
        return measuring(0.29)
    }
    async aggregatedMeasuring(id: string, from: number, to: number, timezone: string, interval: string): Promise<MeasuringResult> {
        return measuring(0.39)
    }
}