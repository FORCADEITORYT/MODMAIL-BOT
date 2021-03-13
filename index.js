require('dotenv').config();
const Discord = require("discord.js");
require('dotenv').config();
///////////////////////////BOT//////////////////////////////
require('dotenv').config();
const Discord = require("discord.js");
require('dotenv').config();

const keepAlive = require('./server');
const Monitor = require('ping-monitor');
 
keepAlive();
const monitor = new Monitor({
    website: 'https://bot-prueba-2.tomasgonzalez10.repl.co',
    title: 'Secundario',
    interval: 1 // seconds
});


//////////////////////////MONITOR///////////////////////////

monitor.on('up', (res) => console.log(`${res.website} está encedido.`));
monitor.on('down', (res) => console.log(`${res.website} se ha caído - ${res.statusMessage}`));
monitor.on('stop', (website) => console.log(`${website} se ha parado.`) );
monitor.on('error', (error) => console.log(error));


///////////////////////////BOT//////////////////////////////
const discord = require("discord.js");
const client = new discord.Client()
const { token, prefix, ServerID } = require("./config.json")



client.on("ready", () => {
console.log("I am ready to receive and Send Mails :D")


client.user.setActivity("Watching My DM's", {
    type: "STREAMING",
    url: "https://www.twitch.tv/unknown"
  })
})
    
client.on("channelDelete", (channel) => {
    if(channel.parentID == channel.guild.channels.cache.find((x) => x.name == "|I{•------» 𝕄𝕆𝔻𝕄𝔸𝕀𝕃 «------•}I|").id) {
        const person = channel.guild.members.cache.find((x) => x.id == channel.name)

      
    
    }


})


client.on("message", async message => {
  
  if(message.author.bot) return;

  let args = message.content.slice(prefix.length).split(' ');
  let command = args.shift().toLowerCase();



  if(message.guild) {
      if(command == "setup") {
          if(!message.member.hasPermission("ADMINISTRATOR")) {
              return message.channel.send("You need Admin Permissions to setup the modmail system!")
          }

          let role = message.guild.roles.cache.find((x) => x.name == "〘♨️〙┊𝑆𝑡𝑎𝑓𝑓┊〘♨️〙")
          let everyone = message.guild.roles.cache.find((x) => x.name == "@everyone")

          if(!role) {
              role = await message.guild.roles.create({
                  data: {
                      name: "〘♨️〙┊𝑆𝑡𝑎𝑓𝑓┊〘♨️〙",
                      color: "GREEN"
                  },
                  reason: "Role needed for ModMail System"
              })
          }

          await message.guild.channels.create("|I{•------» 𝕄𝕆𝔻𝕄𝔸𝕀𝕃 «------•}I|", {
              type: "category",
              topic: "All the mail will be here ",
              permissionOverwrites: [
                  {
                      id: role.id,
                      allow: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  }, 
                  {
                      id: everyone.id,
                      deny: ["VIEW_CHANNEL", "SEND_MESSAGES", "READ_MESSAGE_HISTORY"]
                  }
              ]
          })


          return message.channel.send("Setup is Completed ")

      } else if (command === "slowmode") {
         let rate = await message.channel.setRateLimitPerUser(5, ["test"]) ;

         let embed = new discord.MessageEmbed()
         .setColor('BLUE')
         .setDescription(`The slowmode has been changed to ${message.channel.rateLimitPerUser}`);

         message.channel.send(embed);
      } else if(command == "close") {


        if(message.channel.parentID == message.guild.channels.cache.find((x) => x.name == "|I{•------» 𝕄𝕆𝔻𝕄𝔸𝕀𝕃 «------•}I|").id) {
            
            const person = message.guild.members.cache.get(message.channel.name)

            if(!person) {
                return message.channel.send("I am Unable to close the channel and this error is coming because probaly channel name is changed.")
            }

            await message.channel.delete()

            let yembed = new discord.MessageEmbed()
            .setAuthor("Thread Closed")
            .setColor("RED")
            .setFooter("Replying will create a new thread")
            .setDescription(`${message.author} has closed the Modmail Thread`)

            return person.send(yembed)

        }
      } else if(command == "open") {
          const category = message.guild.channels.cache.find((x) => x.name == "|I{•------» 𝕄𝕆𝔻𝕄𝔸𝕀𝕃 «------•}I|")

          if(!category) {
              return message.channel.send("Moderation system is not setuped in this server, use " + prefix + "setup")
          }

          if(!message.member.roles.cache.find((x) => x.name == "〘♨️〙┊𝑆𝑡𝑎𝑓𝑓┊〘♨️〙")) {
              return message.channel.send("You need supporter role to use this command")
          }

          if(isNaN(args[0]) || !args.length) {
              return message.channel.send("Please Give the ID of the person")
          }

          const target = message.guild.members.cache.find((x) => x.id === args[0])

          if(!target) {
              return message.channel.send("Unable to find this person.")
          }


          const channel = await message.guild.channels.create(target.id, {
              type: "text",
            parent: category.id,
            topic: "Thread is Direct Opened by **" + message.author.username + "** to make contact with " + message.author.tag
          })

          let nembed = new discord.MessageEmbed()
          .setAuthor("DETAILS", target.user.displayAvatarURL({dynamic: true}))
          .setColor("BLUE")
          .setThumbnail(target.user.displayAvatarURL({dynamic: true}))
          .setDescription(message.content)
          .addField("Name", target.user.username)
          .addField("Account Creation Date", target.user.createdAt)
          .addField("Direct Contact", "Yes(it means this mail is opened by a supporter)");

          channel.send(nembed)

          let uembed = new discord.MessageEmbed()
          .setAuthor("Direct Thread Opened")
          .setColor("GREEN")
          .setThumbnail(client.user.displayAvatarURL())
          .setDescription("You have been contacted by Supporter of **" + message.guild.name + "**, Please wait until he send another message to you!");
          
          
          target.send(uembed);

          let newEmbed = new discord.MessageEmbed()
          .setDescription("Opened The Thread: <#" + channel + ">")
          .setColor("GREEN");

          return message.channel.send(newEmbed);
      } else if(command == "help") {
          let embed = new discord.MessageEmbed()
          .setAuthor('SUPPORT BOT', client.user.displayAvatarURL())
          .setColor("RANDOM")

          
        .setDescription("This bot is made by FORCADEITOR")
        .addField(prefix + "setup", "Setup the modmail system (This is not for multiple server.)", true)
        .addField(prefix + "open", 'Let you open the mail to contact anyone with his ID', true)
        .setThumbnail(client.user.displayAvatarURL())
                    .addField(prefix + "close", "Close the mail in which you use this command.", true);

                    return message.channel.send(embed)
          
      } else if(command == "ping") {
        let embed = new discord.MessageEmbed()
          .setColor("BLUE")
          .setDescription(`🏓 Bot's Latency is ${message.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ws.ping)}ms`)

        message.channel.send(embed)
      }
  } 
  




          
  
  if(message.channel.parentID) {

    const category = message.guild.channels.cache.find((x) => x.name == "|I{•------» 𝕄𝕆𝔻𝕄𝔸𝕀𝕃 «------•}I|")
    
    if(message.channel.parentID == category.id) {
        let member = message.guild.members.cache.get(message.channel.name)
    
        if(!member) return message.channel.send('Unable To Send Message')
    
        let lembed = new discord.MessageEmbed()
        .setColor("GREEN")
        .setFooter(message.author.username, message.author.displayAvatarURL({dynamic: true}))
        .setDescription(message.content)
    
        return member.send(lembed)
    }
    
    
      } 
  if(!message.guild) {
    await message.react("✅");
      const guild = await client.guilds.cache.get(ServerID);
      if(!guild) return;
      const main = guild.channels.cache.find((x) => x.name == message.author.id)
      const category = guild.channels.cache.find((x) => x.name == "|I{•------» 𝕄𝕆𝔻𝕄𝔸𝕀𝕃 «------•}I|")


      if(!main) {
          let mx = await guild.channels.create(message.author.id, {
              type: "text",
              parent: category.id,
              topic: "This mail is created for helping  **" + message.author.tag + " **"
          })

          let sembed = new discord.MessageEmbed()
          .setAuthor("Thread Opened")
          .setColor("GREEN")
           .setThumbnail(client.user.displayAvatarURL())
          .setDescription("The staff team will get back to you as soon as possible. Please don't forget to read <#805020548429381632>")
          .setFooter("Your message has been sent")

          message.author.send(sembed)


          let eembed = new discord.MessageEmbed()
          .setAuthor("DETAILS", message.author.displayAvatarURL({dynamic: true}))
          .setColor("BLUE")
          .setThumbnail(message.author.displayAvatarURL({dynamic: true}))
          .setDescription(message.content)
          .addField("Name", message.author.username)
          .addField("Account Creation Date", message.author.createdAt)
          .addField("Direct Contact", "No (it means this mail is opened by person not a supporter)")


        return mx.send(eembed)
      }

      let xembed = new discord.MessageEmbed()
      .setColor("YELLOW")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setDescription(message.content)


      main.send(xembed)

  } 
})

client.login(token)
