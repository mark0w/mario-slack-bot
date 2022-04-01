import {App, LogLevel} from '@slack/bolt'
import {isGenericMessageEvent} from "./utils/helpers";

const app = new App({
    token: process.env.BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG
});

app.message('/startmario' || ':mario:', async ({message, say}) => {
    if (isGenericMessageEvent(message))
        await say(`It's a Mario Time! <@${message.user}>`);
});

(async () => {
    await app.start(3000);

    console.log("It's a Mario Time!");
})();
