import { Command, Flags } from '@oclif/core'
const logSymbols = require("log-symbols");
import ora = require('ora');
import { BeatportApi } from '../api/beatport/BeatportApi'
import { GetTracksAddedSince } from '../api/spotify/GetTracksAddedSince';
import { config } from '../common/config'
import { ConfigKeys } from '../common/configKeys'
import { SpotifyApiFactory } from '../common/SpotifyApiFactory';

export default class Transfer extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    spotifyToken: Flags.string({ char: 's', description: "the spotify acccess token" }),
    beatportToken: Flags.string({ char: "b", description: "the beatport access token" }),
  }

  static args = [{ name: 'file' }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Transfer)
    const spotifyToken = flags.spotifyToken || config.get(ConfigKeys.SpotifyToken) as string;
    const beatportToken = flags.beatportToken || config.get<string>(ConfigKeys.BeatportToken) as string;

    if (!spotifyToken) {
      throw new Error("No spotify token was defined and config didnt contain one either");
    }

    if (!beatportToken) {
      throw new Error("No beatport token was defined and config didnt contain one either");
    }

    const beatportApi = BeatportApi.Create(beatportToken);
    const latestDownloads = await beatportApi.GetMyDownloads();
    const latestDate = latestDownloads.results[0].purchase_date;
    this.log(logSymbols.info, `Your latest download has been at ${latestDate}`);

    const spotifyApi = SpotifyApiFactory.Create(spotifyToken);
    const spotifyListId = config.get(ConfigKeys.SpotifyPlaylist) as string;

    const spinner = ora({ text: `${logSymbols.info} fetching your new tracks from spotify`, spinner: "bouncingBall" })
    spinner.start();
    const tracks = await GetTracksAddedSince(spotifyListId, latestDate, spotifyApi);
    spinner.succeed();

    const beatportList = config.get(ConfigKeys.BeatportPlaylist) as string;

    for (const { track } of tracks) {
      const mixSplit = track.name.split(" - ");
      const isMix = mixSplit.length > 0;

      this.log(logSymbols.info, `Searching for track "${track.name} on beatport`);
      const searchRequest = {
        artist: track.artists[0].name,
        mixName: isMix ? mixSplit[1] : "",
        name: isMix ? mixSplit[0] : track.name
      }
      this.log(`${JSON.stringify(searchRequest)}`);

      const { results } = await beatportApi.SearchTrack(searchRequest)

      this.log(`Found ${results.length} results for track "${track.name} on beatport`);

      if (results && results.length > 0) {
        let trackToAdd;
        const purchaseResult = results.filter(x => x.sale_type.id === 1)[0];
        if (purchaseResult) {
          trackToAdd = purchaseResult;
        } else {
          trackToAdd = results[0];
        }
        spinner.text = `Adding track ${trackToAdd.name} to playlist on beatport`;
        spinner.start();
        const addToList = await beatportApi.AddTrackToPlaylist(beatportList, trackToAdd.id)
        spinner.succeed();
      }
    }
  }
}
