import SpotifyWebApi = require("spotify-web-api-node");
import { debug } from "../../common/debug";

export const GetTracksAddedSince = async (playlistId: string, addedSince: string, api: SpotifyWebApi) => {
    const limit = 50;
    let offset = 0;
    let totalItems = 0;

    debug.namespace += ":spotify-api:GetTracksAddedSince"

    let tracks: SpotifyApi.PlaylistTrackObject[] = [];
    do {
        const tracksResponse = await api.getPlaylistTracks(playlistId, { limit, offset });
        totalItems = tracksResponse.body.total;
        offset += limit;

        tracks = [...tracks, ...tracksResponse.body.items]
    } while(tracks.length < totalItems);

    debug("tracks ", tracks);

    const addedDate = Date.parse(addedSince);
    return tracks.filter(x => {
        const trackAdded = Date.parse(x.added_at);
        return trackAdded > addedDate
    });
}