class Sprite {
    constructor(config) {

        // image setup
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }
        this.animations = config.animations || {
            idleDown: [
                [0,0]
            ]
        }

        // shadow
        // this.shadow = new Image()
        // this.useShadow = true // config.useShadow || false
        // if (this.useShadow) {
        //     this.shadow.src =  "/images/chars/shadow.png"
        // }
        // this.shadow.onload = () => {
        //     this.isShadowLoaded = true
        // }

        // animation and initial state
        this.currentAnimation = config.currentAnimation || "idleDown"
        this.currentAnimationFrame = 0

        // reference the game object
        this.gameObject = config.gameObject
    }

    draw(ctx) {
        const x = this.gameObject.x * 16
        const y = this.gameObject.y * 16

        // this.isShadowLoaded && ctx.drawImage(this.shadow, x,y)
        // if sprite sheets have same size every time replace values with fixed varibles
        this.isLoaded && ctx.drawImage(this.image,
            0,0,// cut a sprite sheet left,top
            32,32,// size of cut in px
            x,y,// position of sprite on canvas
            32,32 // size in which it should be drawn
            )
    }
}