const { canModifyQueue } = require("../util/MilratoUtil");
const { Client, Collection, MessageEmbed } = require("discord.js");

const { attentionembed } = require("../util/attentionembed"); 
const { PREFIX } = require(`../util/configv2`);
module.exports = {
  name: "dur",
  description: "Pause the currently playing music",
  cooldown: 5,
  edesc: `Type this command to pause the Song!\nUsage: ${PREFIX}pause`,
  execute(message) {
    //If not in a guild return
    if(!message.guild) return;
    //get the queue
    const queue = message.client.queue.get(message.guild.id);
    //if no queue return error
    if (!queue) return attentionembed(message, "Şuan Hiçbir Müzik Çalmıyor").catch(console.error);
    //If not in the same channel return
    if (!canModifyQueue(message.member)) return;
    //If its playing
    if (queue.playing) {
      //set playing to false
      queue.playing = false;
      //pause the music
      queue.connection.dispatcher.pause(true);
      //define the pause embed
      const pausemebed = new MessageEmbed().setColor("RANDOM")
      .setAuthor(`${message.author.username} Müzik Durduruldu`, "https://cdn.discordapp.com/emojis/769912238236106793.png")
      //react with approve emoji
      message.react("✅")
      //return message
      return queue.textChannel.send(pausemebed).catch(console.error);
    }
  }
};
