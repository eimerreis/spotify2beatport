import SpotifyWebApi = require("spotify-web-api-node");

export class SpotifyApiFactory {
    static Create(accessToken: string) {
        return new SpotifyWebApi({ accessToken })
    }
}