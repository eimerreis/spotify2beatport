import { Command, Config } from '@oclif/core';
import { prompt } from "enquirer";
import { ConfigKeys } from '../common/configKeys';
import { debug } from "../common/debug";
import { AuthenticateSpotify } from '../common/AuthenticateSpotify';
import { AuthenticateBeatport } from '../common/AuthenticateBeatport';
import { GetAllUserPlaylists } from '../api/spotify/getAllUserPlaylists';
import { config } from '../common/config';
import ora = require("ora");

export default class Setup extends Command {
  static description = 'describe the command here'

  static examples = [
    '<%= config.bin %> <%= command.id %>',
  ]

  static flags = {
  }

  static args = [{ name: 'file' }]

  public async run(): Promise<void> {
    const { args, flags } = await this.parse(Setup);
    debug(config.path);
    debug.namespace = "s2b:init";
    config.set(ConfigKeys.BeatportApiUrl, "https://api.beatport.com");

    const {
      api: spotifyApi
    } = await AuthenticateSpotify();
    const {
      api: beatportApi
    } = await AuthenticateBeatport();

    const spinner = ora({ text: "Getting your Spotify playlists ready", "spinner": "bouncingBall" });
    spinner.start();
    const usersPlaylists = await GetAllUserPlaylists(spotifyApi);
    spinner.succeed();

    const { spotifyPlaylist } = await prompt<{ spotifyPlaylist: string }>({
      type: "autocomplete",
      choices: usersPlaylists.map(x => x.name),
      message: "which spotify playlist is your shopping cart list?",
      name: "spotifyPlaylist"
    });
    config.set(ConfigKeys.SpotifyPlaylist, usersPlaylists.find(x => x.name === spotifyPlaylist)?.id);

    spinner.text = "Getting your Beatport Playlists";  
    spinner.start();
    const { results: beatportPlaylists } = await beatportApi.GetMyPlaylists();
    spinner.succeed();

    const { beatportPlaylist } = await prompt<{ beatportPlaylist: string }>({
      type: "autocomplete",
      choices: beatportPlaylists.map(x => x.name),
      message: "which beatport playlist do you want to add the tracks to?",
      name: "beatportPlaylist"
    });
    
    config.set(ConfigKeys.BeatportPlaylist, beatportPlaylists.find(x => x.name === beatportPlaylist)?.id);
  }
}
