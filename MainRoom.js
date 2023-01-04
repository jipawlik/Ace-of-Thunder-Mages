class MainRoom {
    constructor(config) {
        this.element = config.element
        this.canvas = this.element.querySelector(".game-canvas")
        this.ctx = this.canvas.getContext("2d")
    }

    init() {
       const image = new Image()

       image.onload = () => {
        this.ctx.drawImage(image, 0, 0)
       }
       image.src = "/images/maps/MainRoom.png"

       const hero = new GameObject({
        x: 7,
        y: 18,
        // src is given by default
       })

       // game loop - objects will be constantly fired/redrawn
       setTimeout(() => {
           hero.sprite.draw(this.ctx)
       }, 200)
       
    }
}

