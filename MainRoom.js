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

            Object.values(this.map.gameObjects).forEach(object => {
                object.update()
                object.sprite.draw(this.ctx)
            })

            requestAnimationFrame(() => {
                step()
            })
        }
        step()
    }

    init() {
        this.map = new Map(window.Maps.MainRoom)
        this.startGameLoop()

    }
}

