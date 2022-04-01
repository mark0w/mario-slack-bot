import {App, LogLevel} from '@slack/bolt'

let acceptedPlayers: string[];

const app = new App({
    token: process.env.BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true,
    logLevel: LogLevel.DEBUG
});

app.command('/mariostart', async ({say}) => {
    await say({
        blocks: [
            {
                type: 'section',
                text: {
                    type: 'plain_text',
                    text: 'Would You like to join Mario Kart?'
                }
            },
            {
                type: 'actions',
                block_id: 'mario_kart_poll',
                elements: [
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: ':white_check_mark:'
                        },
                        action_id: 'player_accepted'
                    },
                    {
                        type: 'button',
                        text: {
                            type: 'plain_text',
                            text: ':x:'
                        },
                        action_id: 'player_declined'
                    }
                ]
            }
        ]
    });
});

app.action('player_accepted', async ({body, ack, say}) => {
    await ack();
    if (acceptedPlayers.length == 4) {
        await say('Mama mia... Slots are full...');
        return;
    }
    acceptedPlayers.push(body.user.id);
    await say(`Let-s a go! ${body.user.id} joined: ${4 - acceptedPlayers.length} slots left!`);
    if (acceptedPlayers.length == 4) await say('Slots are filled! Happy karting!')
});

app.action('player_declined', async ({body, ack, say}) => {
    await ack();
    if (acceptedPlayers.includes(body.user.id)) {
        delete acceptedPlayers[acceptedPlayers.indexOf(body.user.id)];
        await say(`${body.user.id} Hey! Come back here! You big-a monkey!`);
    } else await say('So long, eh Bowser!');
})

app.command('/marioend', async ({say}) => {
    await say('Buh-bye! - Ending poll.');
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
