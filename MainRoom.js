class MainRoom {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null
    }

    startGameLoop() {
        const step = () => {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            this.map.drawLowerImg(this.ctx)

            Object.values(this.map.gameObject).sort((a,b) => {
                return a.y - b.y
            }).forEach(object => {
                
                object.update({
                    arrow: this.directionInput.direction,
                    map: this.map,
                })
                object.sprite.draw(this.ctx)
            })
            
            requestAnimationFrame(() => {
                step()
            })
        }
        step()

    }

    init() {
        this.map = new MainRoomMap(window.maps.MainRoom)
        utils.assignWalls(this.map.walls)
        this.map.mountObjects();
        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.startGameLoop()
        // play around with the cutscenes
        this.map.startCutscene([
            {
                type: "textMessage", text: "Hi there"
            }
        ])
    }
}

