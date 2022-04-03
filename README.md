# LFG Discord Bot

Join our [support server](https://discord.gg/gyDAUwvjQU) for any questions.

This is a simple looking for group bot, to help members of a server find other members to play games with!

This bot is new, so it is fairly small (but simple) we will be updating the bot regularly and adding in more features.

## Notes

This bot is meant for one server only, this bot uses slash commands, and at this time, the slash commands will only work in one server. We may update this, so they work globally, but in the mean time, please note that you can only use the bot in one server.

## Requirements

* Node.js `v16.6.0` or higher
* Npm `v7.0.0` or higher

## Installation

#### I. Setting up your server

1. Create a category (you can name it anything)
2. Move all your LFG channels so they are listed under the category. (the commands only work in channels listed under the category you setup)

> At this time, the commands will only work in channels listed under the category you created. In future releases we may make this optional. Plus, it makes your server look clean.

#### II. Setting up the bot

1. *[Create](https://discordjs.guide/preparations/setting-up-a-bot-application.html#creating-your-bot)* a discord bot.
2. While still in discord developer page, scroll down to `Privileged Gateway Intents` section and turn on `Server Members Intent`.
3. *[Invite](https://discordjs.guide/preparations/adding-your-bot-to-servers.html#adding-your-bot-to-servers)* the bot to your server with following scopes and permissions.
   * Required scopes: `bot`, `application.commands`.
   * Required permissions: `Manage Channels`, `Read Messages/View Channels`, `Send Messages`, `Embed Links`, `Attach Files`, `Read Message History`, `Mention Everyone`

> If you don't understand Discord permissions rules, either give the bot `Administrator` permission or read this *[guide](https://discordjs.guide/popular-topics/permissions-extended.html#permissions-extended)*.
>
> You'll need to re-invite the bot with correct scopes if you get "Missing Access" error.

#### III. Preparing the source code

1. Download latest source code [here](https://github.com/qwikz/lfgbot/releases) and extract it.
2. Copy your *[bot token](https://discordjs.guide/preparations/setting-up-a-bot-application.html#your-token)* from discord developer page.
3. Open `.config.json` file and paste your bot token in `"BOT_TOKEN"` e.g. `"token": "YOUR_BOT_TOKEN",`
4. Copy your bots *client id* and paste it in `"CLIENT_ID"` e.g. `"clientId": "YOUR_CLIENT_ID",` (you can copy the client id by right clicking on the bots profile and clicking *Copy Id*) make sure you have *[developer mode](https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/)* turned on.
5. Copy your *server id* and paste it in `"GUILD_ID"` e.g. `"guildId": "YOUR_GUILD_ID",` (you can copy the server id by right clicking on your server and clicking *Copy Id*) make sure you have *[developer mode](https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/)* turned on.
6. Copy the id of the category you created where all the lfg channels are listed, the commands will only be available to use in the lfg channels. Paste the id into `"CATEGORY_ID"`e.g. `"category": "YOUR_CATEGORY_ID",` (you can copy the category id by right clicking the category and clicking *Copy Id*) make sure you have *[developer mode](https://www.howtogeek.com/714348/how-to-enable-or-disable-developer-mode-on-discord/)* turned on.
7. Add any games you would like the bot to show when a user runs the command to create a post. Make sure the games are entered into the array correctly, e.g `"games": ["Game 1", "Game 2"]` If you enter them incorrectly, it could cause your bot to crash.
8. Save the file. 

#### IIII. Hosting

If you have set up discord bots before and have succeded in hosting them 24/7, then it is recommended you host this bot where you have previously hosted bots.

Otherwise, if you are completely new to hosting discord bots, follour our guide below on how to host the bot on [Replit](https://replit.com/)

**Hosting On Replit**

Replit will not keep your bot online for 24/7 unless you upgrade your account to their paid plan. Because of this we have decided to include a tutorial on how to keep it online 24/7 using [UptimeRobot](https://uptimerobot.com/)

1. Create *[Replit](https://replit.com/signup)* account and login.
2. Click `+ Create Repl` button.
3. Choose `Node.js` as template, and then click `+ Create Repl`.
4. Go to your source code folder and select all the files.
5. Drag and drop them to `Files` pane on Replit and click `replace`.
6. Go to Replit shell (`ctrl`+`shift`+`s`) and run `npm install` command. 
7. Once the packages have installed, run the following command to install Node.js v16 (if you haven't already)

```
npm init -y && npm i --save-dev node@16 && npm config set prefix=$(pwd)/node_modules/node && export PATH=$(pwd)/node_modules/node/bin:$PATH
```

9. If the installation finished without any error, run the `node deploy-commands.js` command, this will make the slash commands available.
10. If there are no errors, click the `Run` button at the top of Replit page and your bot should be online.

> There may be an error with installing the `quick.db` package. If there is, run the command `npm rebuild` and that should fix it.

Keeping your bot online 24/7 using [UptimeRobot](https://uptimerobot.com/)

1. Create *[UptimeRobot](https://app.uptimerobot.com/signUp)* account and login.
2. Go to Dashboard and click `+ Add New Monitor` button.
3. Select `HTTP(s)` for Monitor Type and fill the name section.
4. Copy your Replit project webserver link and paste it to `URL` section. e.g. `https://projectName.replUsername.repl.co`
5. Set the Monitoring Interval to 30 minutes and then click `Create Monitor` button at the bottom.

## Command List

#### Slash Commands

| Name | Operation | Description | Usage |
| ------- | --------- | ----------- | ----- |
| **/lfg** | details | Create a looking for group post | /lfg `details`
| **/deletelfg** | - | Deletes the users looking for group post | /close
| **/stats** | - | Shows the guilds LFG stats 
| **/ping** | - | Replies with "Pong!" | /config 

## Support

For any questions join our [support server](https://discord.gg/gyDAUwvjQU)

Or open an [Issue](https://github.com/qwikz/lfgbot/issues)



