const { createCanvas, loadImage } = require("canvas");
const { MessageAttachment } = require("discord.js");

class Canvas {
    constructor() {
    }

    /**
    * @param {String} image Image link
    * @param {String} profileImage Profile image link
    * @param {String} tag Username tag
    * @returns {MessageAttachment} attachment
    */
    async welcomeBanner(image, profileImage, tag, options = {}) {
        const canvas = createCanvas(1000, 360);
        const ctx = canvas.getContext("2d");
        const background = await loadImage(image);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        //
        ctx.beginPath();
        ctx.lineWidth = 4;
        ctx.strokeStyle = "#ffffff";
        ctx.globalAlpha = 0.2;
        ctx.fillStyle = "#000000";
        ctx.fillRect(65, 280, 870, 65);
        ctx.fill();
        ctx.globalAlpha = 1;
        ctx.strokeRect(65, 280, 870, 65);
        ctx.stroke();
        //
        ctx.fillStyle = "#e67e22";
        ctx.globalAlpha = 0.6;
        ctx.fillRect(180, 216, 100);
        ctx.fill();
        ctx.globalAlpha = 1;
        //
        ctx.font = "30px Arial";
        ctx.textAlign = "center";
        ctx.fillStyle = "#ffffff";
        ctx.fillText(`${tag}`, 500, 325);
        //
        ctx.arc(500, 140, 120, 0, Math.PI * 2, true);
        ctx.lineWidth = 7;
        ctx.strokeStyle = "#ffffff";
        ctx.stroke();
        //
        ctx.closePath();
        ctx.clip();
        const avatar = await loadImage(profileImage);
        ctx.drawImage(avatar, 370, 20, 250, 250);
        const attachment = new MessageAttachment(canvas.toBuffer(), "welcome.png");

        return attachment;
    }

    /**
    * @param {String} profileImage Profile image link
    * @returns {MessageAttachment} attachment
    */
    async jail(profileImage) {
        let jailImage = "https://github.com/Zaetic/Nayoi/blob/master/images/others/jail.png?raw=true";

        const canvas = createCanvas(300, 300);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const avatar = await loadImage(profileImage);
        ctx.drawImage(avatar, 0, 0, 300, 300);
        const jail = await loadImage(jailImage);
        ctx.drawImage(jail, 0, 0, 300, 300);
        var imgPixels = ctx.getImageData(0, 0, canvas.width, canvas.height);
        for (var y = 0; y < imgPixels.height; y++) {
            for (var x = 0; x < imgPixels.width; x++) {
                var i = (y * 4) * imgPixels.width + x * 4;
                var avg = (imgPixels.data[i] + imgPixels.data[i + 1] + imgPixels.data[i + 2]) / 3;
                imgPixels.data[i] = avg;
                imgPixels.data[i + 1] = avg;
                imgPixels.data[i + 2] = avg;
            }
        }
        ctx.putImageData(imgPixels, 0, 0, 0, 0, imgPixels.width, imgPixels.height);
        const attachment = new MessageAttachment(canvas.toBuffer(), "busted.png");

        return attachment;
    }

    /**
     * @param {String} path1 First emoji
     * @param {String} path2 Second emoji
     * @returns {MessageAttachment} attachment 
     */
    async emojiMaker(path1, path2) {
        const canvas = createCanvas(150, 150);
        const ctx = canvas.getContext("2d");
        ctx.beginPath();
        const avatar = await loadImage(path1);
        ctx.drawImage(avatar, 0, 0, 150, 150);
        const avatar2 = await loadImage(path2);
        ctx.drawImage(avatar2, 0, 0, 150, 150);
        const attachment = new MessageAttachment(canvas.toBuffer(), "newEmoji.png");

        return attachment;
    }
}

module.exports = Canvas;