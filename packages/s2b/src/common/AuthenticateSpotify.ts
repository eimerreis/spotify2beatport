import { prompt } from "enquirer";
import { config } from "./config";
import { ConfigKeys } from "./configKeys";
import { debug } from "./debug";
import { SpotifyApiFactory } from "./SpotifyApiFactory";

export const AuthenticateSpotify = async () => {
    debug("current spotifyToken in config", config.get(ConfigKeys.SpotifyToken));
    const { spotifyToken } = await prompt<{ spotifyToken: string }>({
        type: "input",
        message: "Please Provide a Spotify Access Token",
        name: "spotifyToken",
        initial: config.get(ConfigKeys.SpotifyToken),
        required: true
    });
    debug("spotifyToken ", spotifyToken);

    try {
        const api = SpotifyApiFactory.Create(spotifyToken);
        const meResponse = await api.getMe();
        debug("spotify meResponse", meResponse);

        config.set(ConfigKeys.SpotifyToken, spotifyToken);

        return {
            token: spotifyToken,
            api
        };
    } catch (err) {
        debug(err);
        throw err;
    }
}


