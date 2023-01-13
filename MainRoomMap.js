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
        return this.walls[`${x}, ${y}`] || false
    }

}

window.maps = {
    MainRoom: {
        lowerSrc: "/images/maps/room.png",
        upperSrc: "",
        gameObject: {
            drawer: new GameObject({
                x: utils.withGrid(15.5),
                y: utils.withGrid(5),
                src: "/images/icons/drawer.png",
                spriteConfig: {
                    width: 89,
                    height: 59
                }
            }),
            portrait: new GameObject({
                x: utils.withGrid(12.5),
                y: utils.withGrid(0.75),
                src: "/images/icons/portrait.png",
                spriteConfig: {
                    width: 49,
                    height: 60
                }
            }),
            bookshelf: new GameObject({
                x: utils.withGrid(0.75),
                y: utils.withGrid(0.5),
                src: "/images/icons/bookshelf.png",
                spriteConfig: {
                    width: 120,
                    height: 142
                }
            }),
            cp: new GameObject({
                x: utils.withGrid(8),
                y: utils.withGrid(4),
                src: "/images/icons/cp.png",
                spriteConfig: {
                    width: 80,
                    height: 76
                }
            }),
            hero: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(13),
                src: "/images/chars/bert.png",
                useShadow: true
            }),
            piano: new GameObject({
                x: utils.withGrid(0.5),
                y: utils.withGrid(10.5),
                src: "/images/icons/piano.png",
                spriteConfig: {
                    width: 74,
                    height: 100
                }
            }),
            sofa: new GameObject({
                x: utils.withGrid(11.25),
                y: utils.withGrid(10.25),
                src: "/images/icons/sofa.png",
                spriteConfig: {
                    width: 137,
                    height: 99
                }
            }),
            tv: new GameObject({
                x: utils.withGrid(19.25),
                y: utils.withGrid(10.5),
                src: "/images/icons/tv.png",
                spriteConfig: {
                    width: 50,
                    height: 90
                }
            }),
        },
        walls: {
            ["111,111"]: true,
        }
    }

}