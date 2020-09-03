import { StormGlass } from "@src/clients/stormGlass";
import axios from 'axios'

import stormGlassWeather3HoursFixture from '@test/fixtures/stormglass_weather_3_hours.json'
import stormGlassNormalized3HoursFixture from '@test/fixtures/stormglass_normalized_response_3_hours.json'

jest.mock('axios')

describe('StormGlass cliente', () => {
    const mockedAxios = axios as jest.Mocked<typeof axios>

    it('should return the normalizes forecast from the StormGlass service', async () => {
        const lat = -33.754545
        const lng = 152.5541

        mockedAxios.get.mockResolvedValue({ data: stormGlassWeather3HoursFixture })

        const stormGlass = new StormGlass(mockedAxios)
        const response = await stormGlass.fetchPoints(lat, lng)

        expect(response).toEqual(stormGlassNormalized3HoursFixture)
    })
})
