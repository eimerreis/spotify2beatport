import SpotifyApi = require("spotify-web-api-node");
import { debug } from "../../common/debug";

export const GetAllUserPlaylists = async (api: SpotifyApi) => {
    const limit = 10;
    let offset = 0;
    let totalItems = 0;

    debug.namespace += ":spotify-api:GetAllUserPlaylists"

    let playlists: SpotifyApi.PlaylistObjectSimplified[] = [];
    do {
        const playlistResponse = await api.getUserPlaylists({ limit, offset });
        totalItems = playlistResponse.body.total;
        offset += limit;

        playlists = [...playlists, ...playlistResponse.body.items]
    } while(playlists.length < totalItems);

    debug("playlists ", playlists);

    return playlists;
}