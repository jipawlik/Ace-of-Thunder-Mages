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
        return this.walls[`${x}, ${y}`]
    }

}

window.maps = {
    MainRoom: {
        lowerSrc: "/images/maps/MainRoom.png",
        upperSrc: "",
        gameObject: {
            drawer: new GameObject({
                x: utils.withGrid(16.5),
                y: utils.withGrid(6),
                src: "/images/icons/drawer.png",
                spriteConfig: {
                    width: 89,
                    height: 59
                }
            }),
            portrait: new GameObject({
                x: utils.withGrid(13.5),
                y: utils.withGrid(1.75),
                src: "/images/icons/portrait.png",
                spriteConfig: {
                    width: 49,
                    height: 60
                }
            }),
            bookshelf: new GameObject({
                x: utils.withGrid(1.75),
                y: utils.withGrid(1.5),
                src: "/images/icons/bookshelf.png",
                spriteConfig: {
                    width: 120,
                    height: 142
                }
            }),
            cp: new GameObject({
                x: utils.withGrid(9),
                y: utils.withGrid(5),
                src: "/images/icons/cp.png",
                spriteConfig: {
                    width: 80,
                    height: 76
                }
            }),
            piano: new GameObject({
                x: utils.withGrid(1.25),
                y: utils.withGrid(11.5),
                src: "/images/icons/piano.png",
                spriteConfig: {
                    width: 74,
                    height: 100
                }
            }),
            hero: new Person({
                x: utils.withGrid(7),
                y: utils.withGrid(18),
                src: "/images/chars/bert.png",
                useShadow: true
            }),
            sofa: new GameObject({
                x: utils.withGrid(12.25),
                y: utils.withGrid(11.25),
                src: "/images/icons/sofa.png",
                spriteConfig: {
                    width: 137,
                    height: 99
                }
            }),
            tv: new GameObject({
                x: utils.withGrid(20.25),
                y: utils.withGrid(11.5),
                src: "/images/icons/tv.png",
                spriteConfig: {
                    width: 50,
                    height: 90
                }
            }),
        },
        walls: {
            [utils.asGridCoord(5.25,18)]: true,
            [utils.asGridCoord(5.25,19)]: true,
            [utils.asGridCoord(5.25,20)]: true,
            [utils.asGridCoord(5.25,21)]: true,

        }
    }

}