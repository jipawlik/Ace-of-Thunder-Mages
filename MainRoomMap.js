class MainRoomMap {
    constructor(config) {
        this.gameObject = config.gameObject
        this.walls = config.walls || {}
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
    isSpaceTaken(currentX, currentY, direction) {
        const {x, y} = utils.nextPosition(currentX, currentY, direction)
        console.log("dir", direction)
        return this.walls[`${x}, ${y}`] || false
    }

}

window.maps = {
    MainRoom: {
        lowerSrc: "/images/maps/MainRoom.png",
        upperSrc: "",
        gameObject: {
            hero: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(18),
            })
        },
        walls: {
            [utils.asGridCoord(7,11)]: true,
            [utils.asGridCoord(8,11)]: true,
            [utils.asGridCoord(7,10)]: true,
            [utils.asGridCoord(8,10)]: true,
        }
    }

}