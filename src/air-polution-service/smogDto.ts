import { Scope } from "@nestjs/common"

export class SmogResponse {
    smog_data: SmogData[]
}

export class SmogData {
    school: School
    data: Data
    timestamp: string
}

export class School {
    name: string
    street: string
    post_code: string
    city: string
    longitude: number
    latitude: number
}

export class Data {
    humidity_avg: number
    pressure_avg: number
    temperature_avg: number
    pm10_avg: number
    pm25_avg: number
}