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

bot.login(process.env.TOKEN);

bot.on('message', message => {
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
	const command = args.shift().toLowerCase()
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
    if (message.content === prefix + "help"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#D9F200')
        .addField("**__Commandes du bot___** !", "- +help : Affiche les commandes du bot !\n- +xpstat : Afficher votre xp !\n- +youtube : Afficher la chaîne YouTube !\n- +maj : Cette commande vous permet de voir les mises à jour de la semaine ! !\n- +paypal : Permet de faire un don aux créateurs du bot !\n- +invite : Cette commande vous permet d'avoir le lien pour ajouter le bot dans votre serveur !")
        .addField("**__Commandes diverses !__**", "- ping : Le bot répond pong !\n- +test : Permet de voir si tout est ok !")
        .addField("**__Fun !__**", " - +slap : Donner une claque à quelqu'un !\n- +hug : Permet de faire un calin aux autres ! :wink:\n- +bang : Vous pouvez tirer sur les personnes avec cette commande !\n- +avatar : Le bot envoie votre **photo de profil**")
        .addField("**__Musique !__**"," - +play : Permet d'écouter de la musique ! (PAS DISPONIBLE)") 
        .setFooter("Fait par Piikaa, AnonymoCraft et Corentin ! (v1.0)")
	.setThumbnail(message.author.avatarURL)
        message.channel.sendEmbed(help_embed);
        console.log("Commande Help demandée !");
    }

    if (message.content === prefix + "youtube"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Salut!**", "Voici le lien de la chaine youtube : <https://www.youtube.com/channel/UCMvvK_zUwYtr4F7hkHl0sTQ>")
        .setFooter("Merci de vous abonner à la chaine ! ;)");
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
	    .setThumbnail(message.author.avatarURL)
        message.channel.send({embed: xp_embed});
        console.log("Commande xpstat demandé");

        if (message.content === prefix + "salut")
        message.reply("Salut !")
        console.log("pong");

    }
    
   if ( command === "slap" ){
    random2(1, 2)
    let slap = message.mentions.members.first().user.username
    if (randnum2 == 1){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Vous avez claqué **" + slap +".", "Ouille ça fait mal !")
        .setFooter("Merci d'utiliser le bot ! :wink:");
        message.channel.send(help_embed)
        message.channel.send("https://media.giphy.com/media/jLeyZWgtwgr2U/giphy.gif")  
    }

    if (randnum2 == 2){
        var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**Vous avez claqué **" + slap +".", "Méchant !!!")
        .setFooter("Merci d'utiliser le bot ! :wink:")
        message.channel.send(help_embed)
        message.channel.send("https://media3.giphy.com/media/R7TbTsGdsfkmQ/giphy.gif")

    }
}
  
    if (message.content === prefix + "maj"){
    var help_embed = new Discord.RichEmbed()
        .setColor('#25c059')
        .addField("**__Nouveautés récentes__**","[+slap] : Permet de donner une claque aux autres ! (BETA)\n[+youtube] : Affiche la chaine Youtube de Oxydaz Youtube.\n[+hug} : Permet de faire un calin aux autres ! (BETA)\n[+ban] : Cette commande vous permetra de bannir des membres(Uniquement pour Gardien Discord et pour la créatrice).[A venir]\n- +bang : Pour tirer sur quelqu'un !\n- +avatar : Affiche votre avatar !")
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
            message.reply("https://media.giphy.com/media/mLYVrZR44EcU0/giphy.gif");
            console.log(randnum);
        }  
        
        if (randnum == 5){
            message.reply("https://media.giphy.com/media/jIZwY2M1Ac8tq/giphy.gif");
            console.log(randnum);
        }
        
        if (randnum == 6){
            message.reply("data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBxISEhUSEhIVFRUVFxYXFRYVFRUVFRUVFRUWFhUWFRUYHSggGBolGxUVITEhJSkrLi4uFx8zODMtNygtLisBCgoKDg0OFxAQGi0dHx0tLS0tLS0rLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0tLS0rLS0tLS0tLS0tLf/AABEIAKUBMgMBIgACEQEDEQH/xAAbAAABBQEBAAAAAAAAAAAAAAADAAIEBQYBB//EAD8QAAIBAgMGBAQEBQIFBQEAAAECAAMRBCExBRJBUWFxIoGRsRMyocEGQlLRFCNy4fAV8WKSorLCJDNTg9IW/8QAGAEAAwEBAAAAAAAAAAAAAAAAAAECAwT/xAAgEQEBAQEAAgMBAQEBAAAAAAAAARECEiEDMVFBMhNh/9oADAMBAAIRAxEAPwDzdqlzeGpt1laMQBJlCsCJyOnLU+kZLptIVMyXSMmw0+k0lUmkGkZLpmRYacjR2JfwN2MDTaLEt4G7GR4q1nPi56yTTq9ZWtUzhqdSaeKb17WtOrJVOr1lUlSSadSReT8ltTrSQKsrKdSGWoTplIskOW0TAVfEc+H3k8VesraaAcITfEz1eLFakMlSVKVTwJ+kPSxPP14f2j0rFqtSPFSQ0eP35WJ1JFTrEakjB4t+GDRXqQLVIx3gXeGDUgVJ0P1kUVI7fhg0SpUkZ6kVWpIlSpH4jTnqyO9XrB1Kkj1Kkc5PyPqVpHat1g3qQDVI5yPIVqvWXWxH8Ldx7TNs8vdhN4W7j2h1z6Eq0qPItVoR2kWq0jD0Gq8h1n6w9VpDqtKnJWnB4oNTOzQtY2sM4ehcZyLiX8UJhMQRfPhN+ubiJU04o21I7Q2FxmYuzSCat4XBE3yI7H+8mRPX60uHr6eIMNLjIjlcSwptMnWNvylT00gxWbmfWHicrcI8WKqeBuxmLFduZ9TOmu3MxeB6Iz5wyNIW/mIZGl4i1YI8lU3lajSVRN8pNgizonifKSC1+ch0m4+naFDzl691vz6g+U6bczAB53fk4pK+JO/EkU1JxK14vEassFWbS4IHA626GTt+UaVbEHl7cZZipNefpl19pJed35G34t+ViRXeBZ4yo8Azx4epAeO35F347fiwafVeQ6lSPrPIdR45yNKo8jVKkVR5Gd5XiXk67wDPOO8AzSsLT2aX+wW8Ldx7TMs0ItUjQmK8+lSti7yLVaZg1m5n1g2qtzMjwPWgqtItRpSvVPM+sC9Q85U5K1fqcopRrUNhnOyvEtQ8VstySQQfpIv8O66qRCptVwTexlm2OANmHAadek0ts9J9KOxk3Cjv6XHpJ6/AfkP+mHobIU5o31+4ivc/os0zCUwzAEgjPQnW36TpLJNm0+UgjCujDjYjkePOXVMxb+AFdl0+X1nMRs2mEJA0Bk1TGYxvA3Yw0MjUexnVxI5QNfWcWkZaampihyMtcGbrfS+Q7cZRJSMudn38V+lugtYTP5PpXCez6Af7DjHUz/n3kW92Pp5cf86wrPaYY1HDx29ItI5RzN9chFh6Pv5jsftE3PjLHYWCFVag0sF3TyIJt7GVtWmVLIwsQcxyiEroqadY5drhRukE2yvIqnwnpf6aSvrLvMSNDNOIXS6O3F/SfURv+vr+k+olN8Hr9Iz+HN9R3zmmROLltvL+k+ogzttf0n1EgpstiLhlI7xHZL8x6ysidTf9aH6T6zv+uD9J9ZA/0p+Y9Z3/AEl+YjyDYlvtkH8p9YFtqDl9ZHfZjjisE2BbpFg2DNtAcoJsYOUC2FbpGNQPSPC9CtiYI1ow0zBlTHg9CmpLvZGFR1JYXsR7TO2M02wD4W7j2k9HEh9m0+UC+z6fKWDmR6hkGr3wKcpHqYNOUsKhkaoY4KAuEW2kUOs7LTjMYimM8hxhcbRuwPQe0l4zD2U+cmpQQgE3vYdvaVqWe+CRxkhqjKE3SRkdMvzGW1eku6e3SQWS4Hb7mFEplDaNS9ib9/3mmpHKZpKWfnNJe1gDe4v2PKRfVVNsSFaMxR8Ddj7TimMxTeBuxjDK1vmHnHoYzEHxDznVMuI6SqZk/BNmR0+/95XUzJuEUllCgknIAZk3i7mwc32l0Tx7+5naudhG0siRyMcmdz5DsP7zmbiiSdmYU1qgUaDU8gPmPsO5gqNItoOXmToB1P7nhNPhsCMNh3JtvlfEeROQA8z9ZJifhemN12AsC1h2Av8A+UB+K8KoX42hUhT1B0872lpsih8OioIzI3j3bO328pl/xljy1T4KnJM2/qI+w9zFJvQ/igqNe99OUGTyvOCIGbyYR6vecd9BOXnIYEmhXKm/qOf95Zq4IuOMpASJPwFXIjlp5xxHUTQY4Qd528aQqxkSq0kVmkSoY5CBcyO5hXMjOZWEY5gSY9zAM0eFrpM0ewzZW7j2mZJmk2O/hPce0npfKzcwDmPZoBzM8VobmRqhhXMA5jI9TFGqcopWEiY9hut/nOS6FWlugNfetwv7yPjkG43n941aQ1sTkNCOUZH1TTINiemv7QdJfAP84mKpTFsg3qI/Djwj/OMBA66gDzknD1L1COh9xI+JFh5wmH/91ux9xFftU+loDBYo+BuxnQYPEnwN2MeJZmo3ihEMjsfEPOHWaJqRTMuNg1AtamSbDeAJ5Xyv9ZTU5Z7PoXIJHhv6n9IkdfR8/a629SAqFgLFhnp4iCVDWHE6H+mQ8LRZm3UBIFt4hS26OoEtEomqy75BK52/+TMXXe4G3qeWd9KtDcT/ANOqZ52JKhr8d4A5zltxviDgKmHpAWFS44tTe9zq2mtsu2Um4kCt8NVzQtvP2TMAg6XYrl3kRam0GJ/l0KQ5szVD5BZa0lYbpaxa1mI48refvJpo228Q1OmWDBQBm2rcgqjS5J1Ok85rVCSSxJJzJOZJ4kzX/jer4aa3PzE2vlYC2Y46zD1XzPSafHPRU7ev2Gv7RymCQcPM94QmaFDp2NaKIOkw2GezD09f8Eib2vTOFU+Jf6h7xwr9LkGItGgxpaUzDqmRKhhqpkVzKhaG5kZzC1DI7mMg3MAzQjmBYxgiZodit4T3+0zTtNBsRvC3f7SeormrUvBO0TGCcyMUa7SO5hGMC5lQhF0ijVOUUZYWPXwN2P3nVW65b17DQZTuPfwnz+8k4al4QbnTQD7ybTxVsTncH1hMKxsB/msm1MKpByN+rAZyNRwzAAEgW14w8oeVHxLZecfhn/mv/nGPqYQW+b6f3kSpV3Ga2pOcJ7F9RcgweJPgbsZym0biW8DdjKQzJ+aSEkb83rNNsDZG/ao48PAfqtxPSO9STaV90PA7KZkLnwixI5t+wl7Qw4W3QWHIdhJ1SldSOYI+khioTkBnxJ0B4i3Ezm67vTb44dUb8upP0HO/CX2wMXl8NjmNPcge48+UokS33PEzq1irAp8w5ZWHU+37Xkf+NL+ttEZC2dtBagGYDW09yP8AMpKeoNM79iR6yLMGsb+N6n81ByS/qx/aZBj7k/tNT+Mz/P8A/rX/ALnmXpjOdHx/5R19irO6zkPg8KzuqKLs5t25+kolhgdmF6FWrb5bbnkQXPpl6yrbWeoYPALTpCkBdQu6etx4j53PrPOtt7PahUKnQaH9SnQyZ1tNWtq3aGoZsts+OXIZ/aBtr2/eXuxdnspFRha6XXnYk2JHDT6ytxNMBnC0Li6BVjYeHXsD9gfcSIzSp7ZmVTIzmEqNIztLkIyoZHcwrGAcysINzAsYRjAtGDHl9sNvC3ce0oHMvNiHwt3+0jpUWhME5nSYN2knprtAuY5jAsY8GjK2U5Gqcp2PCKptWmL+IeQg8RtcKbWP2zmaKNcmxtnLLG0CWBvwHtF/zmq8qkvtonQDzzkzDU3qqD8XcyN8hnnwlMMMBzlvg1Fh2PuYeMn0W6FisMoAPxCzX0JGnOCxvzHuZJ2gPEO33kbHnxN3iCzpnIdhOYg+E9jGIchOYhvCe0pOoey8CH36h0TdsOZY8fJTN1haW6oHIATKbDb/ANPW579P0s816GYfLVnSJXTdN+Da9G0B89P95KJ4xmEwnxzvOD8IfKum+eZ6TOKlQt8t8uQ/V+w+8eiADL/fvH1aZRyh4fKea8D9vKDepbqeA4/7RVtHS4U3N9b5X3gf1LbO/uJoMLtKwG+d4HRh9wNe49JnUU6nX26COGJ+HpmDw5Hn25/5e5l9Vn1LPcB/GFdXqqVN/wCWOBH5mI16GZ2jT+p+9gJc7cp23CDfPh/xC9yepv6S3/D+yaFfD2emCwdrsMmvkRmOhEv/ADEy6o8FslnbxEKo/MM7n9KWyZuGU2mxNjil4iAGIsBe+4vK/FjxP2j9n/h+hRffQG40uchroNOMsqtO9uV7nrbT6+0jrrVyAV/jb1kFMLzYsSfIaesibU2b8dN2oqdGBIKnpcfSc28MSLPQN7WBSxJPNsiPSxkfZe08VUYh8MEC5FizrfqqsuekUgY6psxqVf4L2J3kF+DBiLX9dJomrKzvutvWNv8AlyuByve3S0g7YcVMdYcHpqfLdvY+okzbOCCD41Mbu6fEBpbnbh17yr7TTSLsRyFv+bM/QD1lJj8K1P8Ap4H7HlLfAVt5SeNzfz0+lvSExDqBZs78Nb+XKLnq81FZKo0ju0mbQpbrGw8OozvboSMpXu06ZdRTWaBcxzNBMZchGkwTGPYwTGKgOoZe7FPhPf7TPuZe7HPhbuPaLo4s2aCYzpMY7STNYwLGPJgWMYGU5CKNU5TkCQ69HwtJL0blew9o7FsCrAWhkPy+XtDVA1cPYeUNhRkOx9zO4lrg9o7Z4Hh7H3MkA4/5hBY9PE3eF2gfEIzHamH9H8ERspyu3hPaMRo2u3hPaUkvw9W/91L/ADJvDvTYN7Fpt8O11B5ge0802ZVK1VIzzItzByI9CZ6Ds2t/LXey4C+hsSBn2mXzRUG2gf5Z8vcS82eP5af0L/2iUmNW6N2v6Z/aW+x6m9RQ8hb/AJfD9pj/ABfIO0sJo2e7fxc0v+cX4A6jlfrKpqBRirfNxP6hwI6dOE1BldVwoYGmciudNtSAfe2hHK0Fy4pXe2WpOg/zhEi8Tmef7dIWnhGG8SpuDZm/LfoxsLQhw7W0Hmw+14eNVsV+LUbjJwPiH/Cwzz6G1pM/BGMs70yfmsR3A+4v6Rgw9vmdRfX/AA8JW7OpKmJCn5b2B057hvwz3ZrObZlZ/wB9PSxFeQsHiyfA3zgZHg3XvzEkAtb5Rfvl6kTKyy5ViyPjsQKaM5/KL9zwHmYSpWC2vqdAMyew+8q8fdyFbgQxXULY3W54sdegHWPnnbhVkMGxbFgtkQ4v3C3J+k19SnvEDhqettB65+UzNHDH+Jew3t0sTp+YkjX+r6S9w9Ug7tm3zmgsQptqGGgGfzD68dO+E6rK1Bkr1Att1rNfgL5+t97LtOpRQG9wWPFje/bgPKX9HZSi7Od9iSc/lBOll42FhnfSGq0GtYvlbgilvrl9Jj5H4sxjlBpsNcj6jMe0xOJQqbW7drkfaemYjBU3+SqFYi1msfVMiDnMx+Itk/DoC9t6mbgj81NjY+jH69Zr8XWXGfXLIsYItHPBNOpm4TAO0KxkdjA3GMu9jN4T3HtKEy72OfCe/wBodT0IsmMYxnC0YTIDjGDYzrGDYwgGXSKMVshFKCO7kk3MsFIspvKb+IUE3PGEG0VAy+uZi8acsWteoCMh6wmFVhY5ADif2lEm0zfTPmYZ8SW1N4rzT2LWtiaY0G+eZ09JAq1S2cjrnDigToIZIXuioZysfCe04wIyMHWPhPaMlXQezAjhPR9j1xUoo3Sx7rkfaeZrrNd+GseKdNgTcX0uLjLUcx+0Xy87BL7aTFpuoxXLLhp1O7pLHYlN0pLo4PiyyIvwzyP0mdq7WHDO/wCU6n04R+zduNTAp+FgL8T4Qevec/hcaRrWqK+Vyrai+TA8xfX2gMW7FTnuuoztndTkxXnlnbgQJG2btRKysH3cjYXyBy6yXVoGwKHTNb52PRtbdDeT9VbtFTVoKq23qR+XmpvYjnr9Dzg6eGXU+Lv7bugkagxXNAUdL3Q53T9Q/UvAjpeXFCtTr6Hcqet//wBj69pvzSv6irTUaADsAJX4zDg1hyZLE8QyneRvK3tLaujJ84t/xDNfXh5yFi6qqVYkZcNTY2zA6EAzX0aQVuNbHgRqG4ESfh6lV1B8AuM2zJ6+G1gb34mVDY0cFY+W6P8AqkbE7SqotlFluS1m8Vib8suOkx+XKNaNytJWc8BcsdTbPX7aSo/il1LXJzO7c5nXSQKNZXG9r/UbkHzhLzLjrxTendmC5qMAWZmuQBpkN1STpaXuDwu5mTdjqf8AxHQfWUuGrbjBuGjdV5+Ws0YMXyfJb6XyRmF2/wDiSrSxDor2VSBawPAX1m4dp43+IK+9VqNzZveHw8y26n5LkaGn+JbjxqrakHdBNzzvwvnIQ/EbVBukKRmCtrAgix008pjRXYHIxoqm975zqnxRj/0q4elkekhtGfxrEWMV5eUtcMCTHs0CxjkGleW+yT4T3lNLbZJ8J7/aHU9CVY70axjS0YWkYeukxjCIGXG36Yp0KZFwwRdDa988xJvWWT9VJs1VroIpCXaFSw8ZnZeUelW+pjY59TGzRkUscG95XQtHEMukVmnKu1pAZsY99p2G6ot14ylSuTqbyRYDNsunEzOz9VL+JSOWJPqTG1zke0jrWvkMhyhKvyntF/cOxWLrDCuRpACdM1rMf+Me97ztLGMBa+pkYTkMg1qdnbQa4sxUAcCR3vaXFPbrhsn9APre9/OYQYhgLAwlLFEDXjM78bSdt622yxAckkG67pCkEcQVAI9Y4YxB+Ujj87ZcbjPKYShjWuTftCnahvnpIvxDzeirtffspqO3AAk27G2vneGRQNAB2Fphdl7SZqihRc3052l822yMimdzfP8AtM+uL9KlXxMaTKI7WexYBQMteunH7SDX2xU4sB2y/vJnx9DV3spvE68j7Fl+wlleY2ltg07nwm/989c9YT/+gcZ76npYaSr8XRa114Wl+IjZUSnvtugGzHUC3KY5fxAxF99fQTmD/EbILIygf0gnzPGL/jTnWNviKtcozVHCAKTuUx04uc/S08qxzaze1Nr/ABcG7/msVPK+mXlPPca2Uv4uc0u6r4oop1Mj6YzhmaDoreGNAyaYJMGZJOGPMTn8IeYhsCNLLZh8J7/aRv4Q8xJGGG6CIWw5E3ejSY2lWXiIZmpiRqpzoay4/G72RV5BR6ASibFoDO7c2mK1iOcnxt6l/FbnNiCmgiiTQRTdiY1HM5znwesUUAXwesXwesUUAfTTdzGvaNZCdTFFADYWnY3ve0nb+Wgz+kUUmqlNCgg5DKV9Wjmc4oo4KYKPWL4PWKKNJfB6xfB6xRQDq0es4aPWKKAPpAqQQbEQxxNT9XC2kUUMGmPVc6t9INlJ1YxRQBppdYvg9YooAvg9YhStxiigGmwlQjCMnNwSewlDi0z1iimc/wBKv0j/AAesXwesUU0S6lO3GEuecUUWQ5Tt485wsecUUXjD1wk8/pG58/pFFHkLXN08/pO2POcihkG034PWL4PWKKMh1p5DOKKKI3//2Q==")
           console.log(randnum);
        }
    }

    if (message.content === prefix + 'test'){
        var help_embed = new Discord.RichEmbed()
        .setColor('#01a6fc')
        .addField("Tout est ok !", 'Le contenu du texte peut changer à tout moment !',true)
        .setFooter("Fait par Piikaa et Corentin !")
        message.channel.sendEmbed(help_embed);
        console.log("Commande test demandée !");
    }

    if (message.content === prefix + "paypal"){
        var help_embed = new Discord.RichEmbed()
        .setColor('#01a6fc')
        .addField("Voici le Paypal des créateurs : https://www.paypal.me/worldcraftofficiel", 'Le lien peut changer à tout moment !',true)
        .setFooter("Fait par Piikaa et Corentin !")
        message.channel.sendEmbed(help_embed);
        console.log('pong')
    }

    if (message.content === "#grosvent"){
        message.reply("Ouais c'est le cas de l'dire !")
        console.log('Gros vent')
    }

    if (message.content === "t moche"){
        message.reply("Euh, tu t'es vu toi ?")
        console.log('Tu es moche !')
    }

    if (message.content === prefix + "invite"){
        message.reply("Voici le lien pour m'ajouter dans votre serveur : https://discordapp.com/api/oauth2/authorize?client_id=404279270995918849&permissions=8&scope=bot")   
         console.log('pong')
    }    

    if (message.content === prefix + "play"){
        message.reply("Desolé, mais cette commande est en train d'être retravailée, merci d'attendre 5 jours pour l'utiliser !")
        console.log('pong')
    }    
        
    if (message.content === prefix + "Bon anniversaire @Kasaiye#9381 !"){
        message.reply("Bon anniversaire @Kasaiye#9381 ! Je te souhaite tout plein de bonheur ! :wink:")
        console.log('pong')
    }
    if (message.content === prefix +"avatar"){
        message.reply(message.author.avatarURL);
	console.log('avatar demandé !')}

    if (message.content === prefix + "oxydaz"){
        message.reply("Ne l'appelle pas! :rage:")}

    if (message.content === prefix + "pika"){
        message.reply("On appelle le bg ? :smirk:")}

    if (message.content === prefix + "aldjia"){
       message.reply("Joyeux anniversaire !")}
	
    if (message.content === prefix + "tavli"){
	message.reply("Tavli c'est la plus Gro$$eBiatch")} 
	    
    if (message.content === prefix + "eliott"){
	message.reply("ton père le chauve qui a le crâne aussi lisse qu'une boule de billard")
    }
    if (message.content === prefix + "bang"){
        random();
        if (randnum == 1){
        message.reply("https://media.giphy.com/media/cXjQ9tr9aUFm8/giphy.gif")
        console.log(randnum);}

        if (randnum == 2){
            message.reply("https://media.giphy.com/media/NxZOqhqjIYwRG/giphy.gif")
            console.log(randnum);}
	
	if (message.content === "ntr"){
            message.reply(":x: Évite d'envoyer des insultes sous peine de mute ou de ban !")
    } }
	
	if (message.content === "t ki ?"){
            message.reply("Je suis ta mère. (:")
            console.log('Tu es moche !')
    }
	
	
	if (message.content === "T ki ?"){
            message.reply("Je suis ta mère. :smirk:")
            console.log('Tu es moche!')
    }
	if (message.content === "vent"){
            message.reply("j'aurais pas aimé :p")
	    console.log("vent")
	    
	    
})


function random(min, max) {
    min = Math.ceil(0);
    max = Math.floor(7);
    randnum = Math.floor(Math.random() * (max - min +1) + min);
}
function random2(min, max){
    min2 = Math.ceil(min)
    max2 = Math.floor(max)
    randnum2 = Math.floor(Math.random() * (max2 - min2 +1) + min2)
}
