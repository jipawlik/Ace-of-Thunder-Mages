class MainRoomMap {
    constructor(config) {
        this.overworld = null
        this.gameObject = config.gameObject
        this.walls = config.walls || {}
        this.lowerImg = new Image()
        this.lowerImg.src = config.lowerSrc
        this.upperImg = new Image()
        this.upperImg.src = config.upperSrc
        this.isCutscenePlaying = false
        this.cutsceneSpaces = config.cutsceneSpaces || {}
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
            let result = []
            coords.some((el) => {
                if(`${el[0]}` === `${nextCoords.x},${nextCoords.y}`){
                    result.push(el[0])
                }
            })
            return `${result[0]}`=== `${nextCoords.x},${nextCoords.y}`

        })
        // console.log({ match })
        if(!this.isCutscenePlaying && match && match.talking.length) {
            this.startCutscene(match.talking[0].events)
        }
    }

    checkForFootstepCutscene() {
        const hero = this.gameObject["hero"]
        const match = this.cutsceneSpaces[`${hero.x},${hero.y}`]
        if(!this.isCutscenePlaying && match) {
            this.startCutscene(match[0].events)
        } 
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
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.drawer.approach}`},
                          { type: "optionalTextMessage", locales: drawerNodes },
                      ]
                    },
                ],
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
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.bin.approach}`},
                          { type: "textMessage", text: `${messages.bin.text.see}`},
                          { type: "textMessage", text: `${messages.bin.text.mine}`},
                          { type: "textMessage", text: `${messages.bin.text.thought}`},
                      ]
                    }
                ],
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
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.info.approach}`},
                          { type: "textMessage", text: `${messages.info.text.greet}`},
                          { type: "textMessage", text: `${messages.info.text.personal}`},
                          { type: "textMessage", text: `${messages.info.text.room}`},
                      ]
                    }
                ],
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
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.education.approach}`},
                          { type: "textMessage", text: `${messages.education.text.university}`},
                          { type: "textMessage", text: `${messages.education.text.technical}`},
                      ]
                    }
                ],
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
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.exp.approach}`},
                          { type: "textMessage", text: `${messages.exp.text.relevant}`},
                          { type: "textMessage", text: `${messages.exp.text.pervious}`},
                          { type: "textMessage", text: `${messages.exp.text.irrelevant}`},
                      ]
                    }
                ],
                
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
                x: utils.withGrid(14),
                y: utils.withGrid(4),
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
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.skills.approach}`},
                          { type: "textMessage", text: `${messages.skills.text.technical}`},
                          { type: "textMessage", text: `${messages.skills.text.languages}`},
                          { type: "textMessage", text: `${messages.skills.text.learning}`},
                      ]
                    }
                ],
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
                    width: 70,
                    height: 99
                },
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.sofa.approach}`},
                          { type: "textMessage", text: `${messages.sofa.text.sit}`},
                      ]
                    }
                ],
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
            table: new GameObject({
                x: utils.withGrid(16),
                y: utils.withGrid(10.25),
                src: "/images/icons/table.png",
                spriteConfig: {
                    width: 54,
                    height: 99
                },
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.cookie.approach}`},
                          { type: "textMessage", text: `${messages.cookie.text.see}`},
                          { type: "textMessage", text: `${messages.cookie.text.mine}`},
                          { type: "textMessage", text: `${messages.cookie.text.question}`},
                          { type: "textMessage", text: `${messages.cookie.text.share}`},
                      ]
                    }
                ],
                walls: [
                    [utils.asGridCoord(13,9)],
                    [utils.asGridCoord(12,9)],
                    [utils.asGridCoord(11,9)],
                    [utils.asGridCoord(17,9)],
                    [utils.asGridCoord(16,9)],
                    [utils.asGridCoord(15,9)],
                    [utils.asGridCoord(14,9)]
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
                talking: [
                    {
                      events: [
                          { type: "textMessage", text: `${messages.hobbies.approach}`},
                          { type: "textMessage", text: `${messages.hobbies.text.watch}`},
                          { type: "textMessage", text: `${messages.hobbies.text.game}`},
                          { type: "textMessage", text: `${messages.hobbies.text.dev}`},
                      ]
                    }
                ],
                walls: [
                    [utils.asGridCoord(21,9)],
                    [utils.asGridCoord(20,9)],
                    [utils.asGridCoord(19,9)],
                    [utils.asGridCoord(18,9)],
                ]
            }),
        },
        walls: {},
        cutsceneSpaces: {
            [utils.asGridCoord(6,18)]: [
                {
                    events: [
                        { type: "textMessage", text: `${messages.prompts.leave}`},
                        // only if no leaving room
                        { who: "hero", type: "walk",  direction: "up" },
                        { who: "hero", type: "walk",  direction: "up" },
                    ]
                }
            ],
            // [utils.asGridCoord(6,19)]: [
            //     {
            //         events: [
            //             { type: "changeMap", map: "Elevator" },
            //         ]
            //     }
            // ]

        }
    },
    Elevator: {
        lowerSrc: "/images/maps/mockup.png",
        gameObject: {
            hero: new Person({
                x: utils.withGrid(6),
                y: utils.withGrid(14),
                src: "/images/chars/bert.png",
                useShadow: true
            }),
            // object with instructions
        }
    }

}