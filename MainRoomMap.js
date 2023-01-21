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
            const coords = object.walls.map(el => {
                el[0] *= 16
                el[1] *= 16
            return el
            })
            
            let res = []
            coords.forEach(el => {
               if(`${el[0]},${el[1]}` === `${nextCoords.x},${nextCoords.y}`) {
                    res.push(el[0],el[1])
               }

            })
            return `${res[0]},${res[1]}` === `${nextCoords.x},${nextCoords.y}`
        })

        // debug to keep
        console.log({ match })

        if(!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }

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
                },
                walls: [
                    [14,2],[15,2],[15,3],[15,4],[16,4],[17,4],[18,4],[19,4]
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
                    [20,4],[21,4],[22,5],[22,6],[22,7]
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
                    [11,3],[12,3],[13,3],[14,3]
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
                    [-1,7],[-1,6], [-1,5],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4]
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
                    [7,4],[8,4],[9,4],[10,4],[11,4],[11,3]
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
                    [2,14],[3,14],[3,13],[3,12],[3,11],[3,10],[3,9],[2,8],[-1,7],[1,8],[0,8],
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
                    [13,9],[12,9],[11,9],[11,10],[11,11],[11,12],[11,13],[10,14],[9,14]
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
                    [22,8],[21,9],[20,9],[19,9],[18,9],[17,9],[16,9],[15,9],[14,9]
                ]
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
        walls: {}
    }

}