import {Command, Flags} from '@oclif/core'
import Conf from "conf";
import { BeatportApi } from '../api/beatport/BeatportApi'
import { ConfigKeys } from '../common/configKeys';

const config = new Conf();

export default class TransferList extends Command {
  static description = 'Transfer a Spotify Playlist to Beatport'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
    spotifyToken: Flags.string({ char: 's', description: "the spotify acccess token" }),
    beatportToken: Flags.string({ char: "b", description: "the beatport access token"}),
  }

  static args = [{ name: 'file'}, { name: "token"}]

  public async run(): Promise<void> {
    const {args, flags} = await this.parse(TransferList)
    const spotifyToken = flags.spotifyToken || config.get(ConfigKeys.SpotifyToken) as string;
    const beatportToken = flags.beatportToken || config.get<string>(ConfigKeys.BeatportToken) as string;

    if(!spotifyToken) {
      throw new Error("No spotify token was defined and config didnt contain one either");
    }

    if(!beatportToken) {
      throw new Error("No beatport token was defined and config didnt contain one either");
    }

    const api = new BeatportApi(beatportToken, "https://api.beatport.com");

    const latestDownloads = await api.GetMyDownloads();
    this.log(`Your latest download has been at ${latestDownloads.results[0].purchase_date}`);

    const response = await api.SearchTrack({ artist: "Cubicolor", mixName: "Adam Port Remix", name: "No Dancers"});
    const track = response.results.find(x => x.sale_type.id === 1);
    this.log(`${JSON.stringify(track)}`); 
  }
}
