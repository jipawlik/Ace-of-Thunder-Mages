class MainRoom {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
        this.map = null
    }

    startGameLoop() {
        const step = () => {
            // clear the canvas to reload from fresh start every time
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
            // TODO: camera movement, maybe x-axis only, but for now not necessary
            // draw map layer
            this.map.drawLowerImg(this.ctx)
            // draw character
            Object.values(this.map.gameObject).forEach(object => {
                object.update({
                    arrow: this.directionInput.direction
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
        this.map = new MainRoomMap(maps.MainRoom)
        console.log(this.map)
        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.startGameLoop()

    }
}

