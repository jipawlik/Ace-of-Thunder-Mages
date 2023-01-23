class MainRoomMap {
    constructor(config) {
        this.gameObject = config.gameObject
        this.walls = config.walls || {}
        this.lowerImg = new Image()
        this.lowerImg.src = config.lowerSrc
        this.upperImg = new Image()
        this.upperImg.src = config.upperSrc
        this.isCutscenePlaying = false
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
    mountObjects() {
        Object.keys(this.gameObject).forEach(key => {
            let object = this.gameObject[key]
            object.id = key
            object.mount(this)
        })
    }

    async startCutscene(events) {
        this.isCutscenePlaying = true
        for(let i = 0; i < events.length; i++) {
            const eventHandler = new MainRoomEvent({
                event: events[i],
                map: this,
            })
            await eventHandler.init()
        }

        this.isCutscenePlaying = false
        Object.values(this.gameObject).forEach(object => object.doBehaviorEvent(this))
    }

    checkForActionCutscene() {
        const hero = this.gameObject["hero"]
        const nextCoords = utils.nextPosition(hero.x, hero.y, hero.direction)
        const match = Object.values(this.gameObject).find(object => {
            const coords = object.walls
            let res = []
            coords.some((el) => {
                if(`${el[0]}` === `${nextCoords.x},${nextCoords.y}`){
                    res.push(el[0])
                }
            })
            return `${res[0]}`=== `${nextCoords.x},${nextCoords.y}`

        })
        console.log({ match })
    }

    addWall(coords) {
        this.walls[coords] = true;
    }

    removeWall(x,y) {
        delete this.walls[`${x},${y}`]
    }

    moveWall(wasX, wasY, direction) {
        this.removeWall(wasX, wasY);
        const {x,y} = utils.nextPosition(wasX, wasY, direction);
        this.addWall(x,y);
    }
}

window.maps = {
    MainRoom: {
        lowerSrc: "/images/maps/room.png",
        upperSrc: "",
        gameObject: {
            drawer: new GameObject({
                x: utils.withGrid(15.75),
                y: utils.withGrid(4.5),
                src: "/images/icons/drawer.png",
                spriteConfig: {
                    width: 80,
                    height: 59
                },
                walls: [
                    [utils.asGridCoord(14,2)],
                    [utils.asGridCoord(15,2)],
                    [utils.asGridCoord(15,3)],
                    [utils.asGridCoord(15,4)],
                    [utils.asGridCoord(16,4)],
                    [utils.asGridCoord(17,4)],
                    [utils.asGridCoord(18,4)],
                    [utils.asGridCoord(19,4)]
                ]
                
            }),
            bin: new GameObject({
                x: utils.withGrid(20.75),
                y: utils.withGrid(5.5),
                src: "/images/icons/bin.png",
                spriteConfig: {
                    width: 30,
                    height: 50
                },
                walls: [
                    [utils.asGridCoord(20,4)],
                    [utils.asGridCoord(21,4)]
                ]
            }),
            portrait: new GameObject({
                x: utils.withGrid(12.5),
                y: utils.withGrid(0.75),
                src: "/images/icons/portrait.png",
                spriteConfig: {
                    width: 49,
                    height: 60
                },
                walls: [
                    [utils.asGridCoord(11,3)],
                    [utils.asGridCoord(12,3)],
                    [utils.asGridCoord(13,3)],
                    [utils.asGridCoord(14,3)]
                ]

            }),
            bookshelf: new GameObject({
                x: utils.withGrid(0.75),
                y: utils.withGrid(0.5),
                src: "/images/icons/bookshelf.png",
                spriteConfig: {
                    width: 120,
                    height: 142
                },
                walls: [
                    [utils.asGridCoord(-1,5)],
                    [utils.asGridCoord(0,4)],
                    [utils.asGridCoord(1,4)],
                    [utils.asGridCoord(2,4)],
                    [utils.asGridCoord(3,4)],
                    [utils.asGridCoord(4,4)],
                    [utils.asGridCoord(5,4)],
                    [utils.asGridCoord(6,4)]
                ]
            }),
            cp: new GameObject({
                x: utils.withGrid(8),
                y: utils.withGrid(4),
                src: "/images/icons/cp.png",
                spriteConfig: {
                    width: 80,
                    height: 76
                },
                walls: [
                    [utils.asGridCoord(7,4)],
                    [utils.asGridCoord(8,4)],
                    [utils.asGridCoord(9,4)],
                    [utils.asGridCoord(10,4)],
                    [utils.asGridCoord(11,4)],
                    [utils.asGridCoord(11,3)]
                ]
            }),
            hero: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(16),
                src: "/images/chars/bert.png",
                useShadow: true
            }),
            piano: new GameObject({
                x: utils.withGrid(0.25),
                y: utils.withGrid(10.5),
                src: "/images/icons/piano.png",
                spriteConfig: {
                    width: 74,
                    height: 100
                },
                walls: [
                    [utils.asGridCoord(2,14)],
                    [utils.asGridCoord(3,14)],
                    [utils.asGridCoord(3,13)],
                    [utils.asGridCoord(3,12)],
                    [utils.asGridCoord(3,11)],
                    [utils.asGridCoord(3,10)],
                    [utils.asGridCoord(3,9)],
                    [utils.asGridCoord(2,8)],
                    [utils.asGridCoord(1,8)],
                    [utils.asGridCoord(0,8)]
                ]
    
            }),
            sofa: new GameObject({
                x: utils.withGrid(11.5),
                y: utils.withGrid(10.25),
                src: "/images/icons/sofa.png",
                spriteConfig: {
                    width: 137,
                    height: 99
                },
                walls: [
                    [utils.asGridCoord(13,9)],
                    [utils.asGridCoord(12,9)],
                    [utils.asGridCoord(11,9)],
                    [utils.asGridCoord(11,10)],
                    [utils.asGridCoord(11,11)],
                    [utils.asGridCoord(11,12)],
                    [utils.asGridCoord(11,13)]
                ]
            }),
            tv: new GameObject({
                x: utils.withGrid(19.25),
                y: utils.withGrid(10.5),
                src: "/images/icons/tv.png",
                spriteConfig: {
                    width: 50,
                    height: 90
                },
                walls: [
                    [utils.asGridCoord(21,9)],
                    [utils.asGridCoord(20,9)],
                    [utils.asGridCoord(19,9)],
                    [utils.asGridCoord(18,9)],
                    [utils.asGridCoord(17,9)],
                    [utils.asGridCoord(16,9)],
                    [utils.asGridCoord(15,9)],
                    [utils.asGridCoord(14,9)]
                ]
            }),
        },
        walls: {}
    }

}