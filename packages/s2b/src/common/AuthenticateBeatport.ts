import { prompt } from "enquirer";
import { ConfigKeys } from "./configKeys";
import { debug } from "./debug";
import { BeatportApi } from "../api/beatport/BeatportApi";
import { config } from "./config";


export const AuthenticateBeatport = async () => {
    const { beatportToken } = await prompt<{ beatportToken: string; }>({
        type: "input",
        message: "Please Provide a Beatport Access Token",
        name: "beatportToken",
        initial: config.get(ConfigKeys.BeatportToken),
        required: true
    });

    try {
        const api = new BeatportApi(beatportToken, config.get(ConfigKeys.BeatportApiUrl) as string);
        const myAccount = await api.GetMyAccount();
        debug("beatport account response", myAccount);

        config.set(ConfigKeys.BeatportToken, beatportToken);

        return {
            token: beatportToken,
            api
        }
    } catch (err) {
        debug(err);
        throw err;
    }
};
