import { AxiosStatic } from "axios";

export interface StormGlassPointSource {
    [key: string]: number
}
export interface StormGlassPoint {
    readonly time: string
    readonly waveHeight: StormGlassPointSource
    readonly waverDirection: StormGlassPointSource
    readonly swellDirection: StormGlassPointSource
    readonly swellHeight: StormGlassPointSource
    readonly swellPeriod: StormGlassPointSource
    readonly windSpeed: StormGlassPointSource
    readonly windDirection: StormGlassPointSource
}
export interface StormGlassForecastResponse {
    hours: StormGlassPoint[]
}

export interface ForecastPoint {
    swellDirection: number,
    swellHeight: number
    swellPeriod: number,
    time: string,
    waveDirection: number,
    waveHeight: number,
    windDirection: number,
    windSpeed: number
}
export class StormGlass {
    readonly stormGlassAPIParams = `swellDirection,swellHeight,swellPeriod,waveDirection,waveHeight,windDirection,windSpeed`
    readonly stormGlassAPISource = `noaa`

    constructor(protected request: AxiosStatic) { }

    public async fetchPoints(lat: number, lng: number): Promise<ForecastPoint[]> {
        const { data } = await this.request.get<StormGlassForecastResponse>(`https://api.stormglass.io/v2/weather/point?
        params=${this.stormGlassAPIParams}&source=${this.stormGlassAPISource}&lat=${lat}&lng=${lng}`)
        return this.normalizeResponse(data)
    }

    private normalizeResponse(points: StormGlassForecastResponse): ForecastPoint[] {
        return points.hours.filter(this.isValidPoint.bind(this)).map(point => (
            {
                swellDirection: point.swellDirection[this.stormGlassAPISource],
                swellHeight: point.swellHeight[this.stormGlassAPISource],
                swellPeriod: point.swellPeriod[this.stormGlassAPISource],
                waveDirection: point.waverDirection[this.stormGlassAPISource],
                waveHeight: point.waveHeight[this.stormGlassAPISource],
                windSpeed: point.windSpeed[this.stormGlassAPISource],
                windDirection: point.windDirection[this.stormGlassAPISource],
                time: point.time
            }))

    }

    private isValidPoint(point: Partial<StormGlassPoint>): boolean {
        return !!(
            point.time &&
            point.swellDirection?.[this.stormGlassAPISource] &&
            point.swellHeight?.[this.stormGlassAPISource] &&
            point.swellPeriod?.[this.stormGlassAPISource] &&
            point.waverDirection?.[this.stormGlassAPISource] &&
            point.waveHeight?.[this.stormGlassAPISource] &&
            point.windSpeed?.[this.stormGlassAPISource] &&
            point.windDirection?.[this.stormGlassAPISource]
        )
    }
}