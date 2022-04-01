import {App, LogLevel} from '@slack/bolt'

const app = new App({
    token: process.env.BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG
});

app.command('/mariostart', async ({command, say}) => {
        await say(`Mario Time! <@${command.user_name}>`);
});

app.command('/marioend', async ({say}) => {
    await say('Hey! Come back here! You big-a monkey! - Ending poll.');
});

app.command('/mariofinish', async ({say}) => {
    await say('Wahoo! I will ask for positions in the leaderboard.');
});

app.command('/mariostats', async ({say}) => {
   await say('Here we go! Stats are:');
});

(async () => {
    await app.start(3000);

    console.log("It's a Mario Time!");
})();
