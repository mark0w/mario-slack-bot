import {App, LogLevel} from '@slack/bolt'
import {isGenericMessageEvent} from "./utils/helpers";

const app = new App({
    token: process.env.BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG
});

app.message('/mariostart' || ':mario:', async ({message, say}) => {
    if (isGenericMessageEvent(message))
        await say(`Mario Time! <@${message.user}>`);
});

app.message('/marioend', async ({say}) => {
    await say('Hey! Come back here! You big-a monkey! - Ending poll.');
});

app.message('/mariofinish' || ':checkered_flag:', async ({say}) => {
    await say('Wahoo! I will ask for positions in the leaderboard.');
});

app.message('/mariostats', async ({say}) => {
   await say('Here we go! Stats are:');
});

(async () => {
    await app.start(3000);

    console.log("It's a Mario Time!");
})();
