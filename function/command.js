//require package
const axios = require('axios').default;
const connect = require("../db/db");

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
                //check info empty
                if (tagname == '' || tagline == '') {
                    msg.reply("Bạn Chưa Đăng Nhập !!");
                    return;
                }

                try {
                    await handleApi(msg,tagname,tagline,force);
                } catch (error) {
                    console.error(error);
                    msg.reply("Thông Tin Tài Khoản Không Hợp Lệ !!");
                }
            }   
    });
}

//handle api
const handleApi = async (msg,tagname,tagline,force) =>{
    //get uuid account by tagname + tagline
    let dataPUUID = await axios.get('https://api.henrikdev.xyz/valorant/v1/account/'+encodeURI(tagname)+'/'+encodeURI(tagline)+'?force='+force);
                
    if(!dataPUUID.data.data){
        msg.reply("Không có thông tin tài khoản !!");
        return;
    }
    //get info account by uuid
    let response = await axios.get('https://api.henrikdev.xyz/valorant/v1/by-puuid/mmr/ap/'+dataPUUID.data.data.puuid);
    var infoMSG = "``` \nTên In Game: "+dataPUUID.data.data.name+"#"+dataPUUID.data.data.tag
    +"\nLevel In Game: "+dataPUUID.data.data.account_level
    +"\nRank: "+(response.data.data.currenttierpatched??"none")
    +"\nVị Trí Rank: "+(response.data.data.ranking_in_tier??"none")
    +"\nElo: "+(response.data.data.elo??"none")+"```";
    msg.reply(infoMSG);

    //get DataAssetID
    var store_featured = await axios.get("https://api.henrikdev.xyz/valorant/v1/store-featured");
    if (!store_featured.data.data.FeaturedBundle.Bundle.DataAssetID) {
        msg.reply("Hệ Thống Phát Hiện Ra Lỗi, Ngừng Hoạt Động !!");
        return;
    }
    //get info package by DataAssetID
    var store_img = await axios.get("https://valorant-api.com/v1/bundles/"+store_featured.data.data.FeaturedBundle.Bundle.DataAssetID);

    var dataItems = [];
    var sumDiscountedPrice = 0;

    //loop items get ItemID
    for (const item of store_featured.data.data.FeaturedBundle.Bundle.Items) {
        var dataItem = await axios.get("https://valorant-api.com/v1/weapons/skinlevels/"+item.Item.ItemID);

        var objItem = {
            "BasePrice" : item.BasePrice,
            "displayName" : dataItem.data.data.displayName,
            "displayIcon" : dataItem.data.data.displayIcon,
            "streamedVideo" : dataItem.data.data.streamedVideo,
        };
        sumDiscountedPrice += item.DiscountedPrice;
        dataItems.push(objItem);
    }
    //end loop

    msg.reply("Tên Gói Súng: "+store_img.data.data.displayName+"\nTổng Giá Gói Súng Giảm Giá: "+sumDiscountedPrice);
    await msg.channel.send({files: [store_img.data.data.displayIcon2]});
    
    //get list image & video
    var arrImages = [];
    var arrVideos = [];
    //set table show message
    var msgItems = "```\nTên Súng\t\t|\t\tGiá\n";
    dataItems.forEach(item => {
        msgItems += item.displayName+"\t\t|\t\t"+item.BasePrice+"\n";
        arrImages.push(item.displayIcon);
        arrVideos.push(item.streamedVideo);
    });
    msgItems += "```";
    //reply message info item
    msg.reply(msgItems);
    //send list image
    await msg.channel.send({files: arrImages});
    //send list video demo Gun
    await msg.channel.send({files: arrVideos});

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

//command test
const test = (client)=>{
    client.on("message", async msg=>{
        if (msg.content === "Vtest") {
            // msg.reply("Bot Tested !!");
            await connect.connect_db();
            // console.log("show user id 2: ",msg.author);
        }
    })
}
module.exports = {
    firstSay: firstSay,
    statusMyAccount: statusMyAccount,
    login: login,
    test: test,
};