import { AuthenticateSpotify } from "../../src/common/AuthenticateSpotify";

describe("AuthenticateSpotify", () => {
    it("should ask for a token, and make a call against spotify", async () => {
        const token = await AuthenticateSpotify();
    })
})