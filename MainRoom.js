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
       
       const personCoordX = 7
       const personCoordY = 18
       const person = new Image()
       person.onload = () => {
           this.ctx.drawImage(
               person,
               0,
               0,
               32,
               32,
               personCoordX * 16,
               personCoordY * 16,
               32,
               32
               )
            }    
        person.src = "/images/chars/erio.png"

        // const shadow = new Image()
        // shadow.onload = () => {
        //     this.ctx.drawImage(
        //         shadow,
        //         0,
        //         0,
        //         32,
        //         32,
        //         personCoordX * 16,
        //         personCoordY * 16,
        //         32,
        //         32
        //         )
        // }
        // shadow.src = "/images/chars/shadow.png"

    }
}

