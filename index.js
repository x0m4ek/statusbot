import { Client, GatewayIntentBits, ActivityType } from 'discord.js';
import fetch from 'node-fetch';
import 'dotenv/config'

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

const siteStatusUrl = process.env.SITE_URL; 



async function checkSiteStatus() {
  try {
    const response = await fetch(siteStatusUrl);
    const status = response.ok ? 'онлайн' : 'оффлайн';

    
    client.user.setPresence({
      activities: [{
        name: `Статус сайту: ${status}`,
        type: ActivityType.Watching,

      }],
      status: 'online'
    });

    console.log(`Updated site status to: ${status}`);
  } catch (error) {
    console.error('Error checking site status:', error.message);
  }
}

client.once('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);

  // Перевіряти статус сайту кожну хвилину
  setInterval(checkSiteStatus, 60000);
});

client.login(process.env.BOT_TOKEN);
