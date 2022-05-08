//require package
const axios = require('axios').default;

//new paramater
var tagname = '';
var tagline = '';

//command first say
function firstSay(client) {
    //Example Functionality
    client.on('message',
    function(msg){
        if(msg.content === "Vsay"){
            msg.reply("Hello my bot status valorant!")
        }   
    })
}

//command check status
 const statusMyAccount = async (client,force = 'false')=>{
     client.on('message',
       async (msg)=>{
            if(msg.content === "Vmy"){
                var store_featured = await axios.get("https://api.henrikdev.xyz/valorant/v1/store-featured");
                // if (tagname == '' || tagline == '') {
                //     msg.reply("Bạn Chưa Đăng Nhập !!");
                //     return;
                // }

                // try {
                    
                // let dataPUUID = await axios.get('https://api.henrikdev.xyz/valorant/v1/account/'+encodeURI(tagname)+'/'+encodeURI(tagline)+'?force='+force);
                
                // if(!dataPUUID.data.data){
                //     msg.reply("Không có thông tin tài khoản !!");
                //     return;
                // }
                // let response = await axios.get('https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/ap/'+dataPUUID.data.data.puuid);
                // var infoMSG = "``` \nTên In Game: "+dataPUUID.data.data.name+"#"+dataPUUID.data.data.tag
                // +"\nLevel In Game: "+dataPUUID.data.data.account_level
                // +"\nRank: "+(response.data.data.currenttierpatched??"none")
                // +"\nVị Trí Rank: "+(response.data.data.ranking_in_tier??"none")
                // +"\nElo: "+(response.data.data.elo??"none")+"```";
                // msg.reply(infoMSG);

                // var arrImg = [];
                // var store_featured = await axios.get("https://api.henrikdev.xyz/valorant/v1/store-featured");

                // if (arrImg.length <= 0) {
                //     return;
                // }

                // await msg.channel.send({files: arrImg});
                // } catch (error) {
                //     console.error(error);
                //     msg.reply("Không có thông tin tài khoản !!");
                // }
            }   
    });
}

//command login
const login = async (client)=>{
    client.on("message",async message => {
        if (message.content.startsWith('Vlogin')) {
            var arrString = message.content.replaceAll(/\s/g,'').split("!");
            if (arrString.length != 3) {
                msg.reply("Tài khoản không hợp lệ !!");
                return;
            }
            tagname = arrString[1];
            tagline = arrString[2];
            message.reply("Đã Lưu Thông Tin Người Dùng !!");
        }
    });
}
module.exports = {
    firstSay: firstSay,
    statusMyAccount: statusMyAccount,
    login: login
};