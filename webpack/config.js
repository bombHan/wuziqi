import fs from "fs";
import WebpackConstants from "../src/constant/WebpackConstants";


const nodeEnv = process.env.NODE_ENV || WebpackConstants.NODE_ENV.DEVELOPMENT;
const flags = process.env.FLAG != null
    ? process.env.FLAG.split("|")
    : [];


//-----------------------------------------------------------------------------
const configFile = `${__dirname}/webpack.config.json`;
let configData;
if (fs.existsSync(configFile)) {
    configData = JSON.parse(fs.readFileSync(configFile));

} else {

    const defaultConfig = {
        "proxyServer": "http://127.0.0.1:8080"
    };
    configData = defaultConfig;

    fs.writeFileSync(configFile, JSON.stringify(defaultConfig));
}

const proxyServer = (configData && configData.proxyServer) || "http://127.0.0.1:8080";

//-----------------------------------------------------------------------------


export default {
    nodeEnv,
    flags,
    proxyServer,
};
