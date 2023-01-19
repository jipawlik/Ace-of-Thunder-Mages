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


    addWall(x,y) {
        this.walls[`${x},${y}`] = true;
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
                }
            }),
            bin: new GameObject({
                x: utils.withGrid(20.75),
                y: utils.withGrid(5.5),
                src: "/images/icons/bin.png",
                spriteConfig: {
                    width: 30,
                    height: 50
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
                }
            }),
            sofa: new GameObject({
                x: utils.withGrid(11.5),
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
            // use loops for rendering the window animation
            // npc: new Person({
            //     x: utils.withGrid(19.25),
            //     y: utils.withGrid(10.5),
            //     src: "",
            //     behaviorLoop:[
            //         { type: "walk", direction: "left" },
            //         { type: "stand", direction: "left", time: 800 },
            //     ],
            // })
        },
        walls: {
            ["176,176"]: true
        }
    }

}