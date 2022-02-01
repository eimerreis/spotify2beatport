import axios, { AxiosInstance, AxiosRequestConfig } from "axios";
import { config } from "../../common/config";
import { ConfigKeys } from "../../common/configKeys";
import { AddTrackResponse } from "./AddTrackResponse";
import { CreatePlaylistResponse } from "./CreatePlaylistResponse";
import { DownloadsResponse } from "./DownloadsResponse";
import { MyAccountResponse } from "./MyAccountResponse";
import { MyPlaylistsResponse } from "./MyPlaylistsResponse";
import { SearchTrackRequest } from "./SearchTrackRequest";
import { SearchTrackResponse } from "./SearchTrackResponse";

export class BeatportApi {
    private readonly axiosInstance: AxiosInstance;

    constructor(private accessToken: string, private baseUrl: string) {
        this.axiosInstance = axios.create({
            baseURL: baseUrl,
            headers: {
                Authorization: "Bearer " + accessToken
            }
        });
    }

    public static Create(token: string) {
        return new BeatportApi(token, config.get(ConfigKeys.BeatportApiUrl) as string);
    }

    /**
     * Searches for a track by given search request
     * @param searchRequest 
     * @returns 
     */
    public async SearchTrack({ artist, mixName, name }: SearchTrackRequest): Promise<SearchTrackResponse> {
        const params: any = {
            artist_name: artist,
            name,
        }
        if (mixName) {
            params["mix_name"] = mixName;
        }

        console.log(params);
        return this.axiosInstance.get("/v4/catalog/tracks/", { params }).then(x => {
            return x.data
        });
    }

    /**
     * Returns the latest downloads, to identify last purchase date
     * @returns currently only the last 10 downloads
     */
    public async GetMyDownloads(): Promise<DownloadsResponse> {
        return this.axiosInstance.get("/v4/my/downloads").then(x => x.data);
    }

    public async GetMyPlaylists(): Promise<MyPlaylistsResponse> {
        return this.axiosInstance.get("/v4/my/playlists").then(x => x.data);
    }

    public async GetMyAccount(): Promise<MyAccountResponse> {
        return this.axiosInstance.get("/v4/my/account").then(x => x.data);
    }

    public async CreatePlaylist(name: string): Promise<CreatePlaylistResponse> {
        return this.axiosInstance.post("/v4/my/playlists", { name }, {
            headers: {
                "accept": "application/json",
                "Content-Type": "application/json"
            }
        }).then(x => {
            console.log(x.data)
            return x.data;
        });
    }

    public async AddTrackToPlaylist(listId: string, trackId: number): Promise<AddTrackResponse> {
        return this.axiosInstance.post(`/v4/my/playlists/${listId}/tracks/`, {
            "track_id": trackId
        });
    }
}
