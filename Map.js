class Map {
    constructor(config) {
        this.gameObject = config.gameObject
        this.lowerImg = new Image()
        this.lowerImg.src = config.lowerSrc
        this.upperImg = new Image()
        this.upperImg.src = config.upperSrc
    }

    drawLowerImg(ctx) {
        ctx.drawImage(this.lowerImg, 0, 0)
    }
    drawUpperImg(ctx) {
        ctx.drawImage(this.upperImg, 0, 0)
    }

}

window.Maps = {
    MainRoom: {
        lowerSrc: "/images/maps/MainRoom.png",
        upperSrc: "",
        gameObject: {
            hero: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(18),
            })
        }
    }

}