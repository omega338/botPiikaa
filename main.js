const Discord = require('discord.js');
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')

const adapter= new FileSync('database.json');
const db = low(adapter);

db.defaults({ histoires: [], xp: []}).write()

var bot = new Discord.Client();
var prefix = ("+");
var randnum = 0;

bot.on('ready', () => {
    bot.user.setPresence({game: { name: '[+help] - https://discord.gg/AmxnNGb', type: 0}})
    console.log("Bot Ready !");
});

bot.login('NDA0Mjc5MjcwOTk1OTE4ODQ5.DUTnCw.AqzeOcuDe9pF4kdJDbiZpsGsgQ0');

bot.on('message', message => {

    var msgauthor = message.author.id;

    if(message.author.bot)return;

    if(!db.get("xp").find({user: msgauthor}).value()){
        db.get("xp").push({user: msgauthor, xp: 1}).write();
    }else{
        var userxpdb = db.get("xp").filter({user: msgauthor}).find('xp').value();
        console.log(userxpdb)
        var userxp = Object.values(userxpdb)
        console.log(userxp);
        console.log(`Nombre d'xp : ${userxp[1]}`)

        db.get("xp").find({user: msgauthor}).assign({user: msgauthor, xp: userxp[1] += 1}).write();
    }
    

    if (message.content === "ping"){
        message.reply("pong");
        console.log('ping pong')
    }
    
    if (!message.content.startsWith(prefix)) return;
    var args = message.content.substring(prefix.length).split(" ");

    switch (args[0].toLowerCase()){

        case "newstory":
        var value = message.content.substr(10);
        var author = message.author;
        var number = db.get('histoires').map('id').value();
        console.log(value);
        message.reply("Ajout de l'histoire à la base de données")

        db.get('histores')
            .push({ story_value: value, story_author: author}).write()
        
        break;
    }

    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("**__Commandes du bot___** !", "- +help : Affiche les commandes du bot !\n- +xpstat : Afficher votre xp !\n- +youtube : Afficher la chaîne YouTube !\n- +maj : Permet d'être au courant des nouvelles majs !\n- +play : Cette commande nous permet d'écouter de la musique avec le bot(PAS DISPONIBLE). ")
        .addField("**__Commandes diverses !__**", "- ping : Le bot répond pong !\n- +slap : Donner une claque à quelqu'un !\n- +hug : Permet de faire un calin aux autres ! :wink:")
        .setFooter("Fait par Piikaa et Corentin !")
        message.channel.sendEmbed(help_embed);
        console.log("Commande Help demandée !");
    }

    if (message.content === prefix + "youtube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCMvvK_zUwYtr4F7hkHl0sTQ>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "Youtube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCMvvK_zUwYtr4F7hkHl0sTQ>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "YouTube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCMvvK_zUwYtr4F7hkHl0sTQ>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "yt"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCMvvK_zUwYtr4F7hkHl0sTQ>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "YT"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCMvvK_zUwYtr4F7hkHl0sTQ>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === prefix + "Yt"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCMvvK_zUwYtr4F7hkHl0sTQ>")
        .setFooter("Merci de vous abonner à la chaine ! :wink:");
        message.channel.sendEmbed(help_embed);
        console.log("Chaîne YouTube demandé !");
    }

    if (message.content === "Comment vas-tu OxyBot ?"){
        random();

        if (randnum == 1){
            message.reply("Merci je vais très bien !");
            console.log(randnum);
        }

        if (randnum == 2){
            message.reply("Je ne vais pas très bien, merci de te soucier de moi !");
            console.log(randnum);
        }

    }

    if (message.content === prefix + "xpstat"){
        var xp = db.get("xp").filter({user: msgauthor}).find('xp').value()
        var xpfinal = Object.values(xp);
        var xp_embed = new Discord.RichEmbed()
            .setTitle(`XP de ${message.author.username}`)
            .setDescription("Voici tout vos xp !")
            .addField("XP :", `${xpfinal[1]}xp`)
        message.channel.send({embed: xp_embed});
        console.log("Commande xpstat demandé");
        if (message.content === prefix + "salut")
        message.reply("Salut !")
        console.log("Réponse demandée !")

    }
    
    if (message.content === prefix + "slap"){
        random();
        if (randnum == 1){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Vous avez claqué quelqu'un**", "<https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif>")
        .setFooter("Merci d'utiliser le bot ! :wink:");
        message.reply("https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif");
        console.log(randnum);   

        }
        if (randnum == 2){
            message.reply("https://media3.giphy.com/media/R7TbTsGdsfkmQ/giphy.gif");
            console.log(randnum);

        }
        
    }
    if (randnum == 3){
        message.reply("https://media.giphy.com/media/2ad2VkmKR1ore/giphy.gif");
        console.log(randnum);
    }

    if (message.content === prefix + "maj"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**__Nouveautés récentes__**","[+slap] : Permet de donner une claque aux autres ! (BETA)\n[+youtube] : Affiche la chaine Youtube de Oxydaz Youtube.\n[+hug} : Permet de faire un calin aux autres ! (BETA)")
        message.channel.sendEmbed(help_embed);
        console.log('pingpong');
    }
    
    if (message.content === prefix + "hug"){
        random();
        if (randnum == 1){
            message.reply("https://media.giphy.com/media/49mdjsMrH7oze/giphy.gif");
            console.log(randnum);   

        }
        if (randnum == 2){
            message.reply("https://media.giphy.com/media/ba92ty7qnNcXu/giphy.gif")
            console.log(randnum);

        }

        if (randnum == 3){
            message.reply("https://media.giphy.com/media/nFL0SBciehEw8/giphy.gif");
            console.log(randnum);
        }
        
        if (randnum == 4){
            message.reply("https://media.giphy.com/media/mLYVrZR44EcU0/giphy.gif")
            console.log(randnum);
        }  
        
        if (randnum == 5){
            message.reply("https://media.giphy.com/media/jIZwY2M1Ac8tq/giphy.gif")
            console.log(randnum); 

          }

           
          }                          

   
});


function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(4);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}