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
            // draw map layer
            //map layer is is wrong on x axis
            this.map.drawLowerImg(this.ctx)
            // draw character
            Object.values(this.map.gameObject).forEach(object => {
                
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
        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.startGameLoop()
    }
}

