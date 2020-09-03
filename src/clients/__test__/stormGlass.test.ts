import { StormGlass } from "@src/clients/stormGlass";

describe('StormGlass cliente', () => {
    it('should return the normalizes forecast from the StormGlass service', async () => {
        const lat = -33.754545
        const lng = 152.5541

        const stormGlass = new StormGlass()
        const response = await stormGlass.fetchPoints(lat, lng)

        expect(response).toEqual({})
    })
})
