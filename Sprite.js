class Sprite {
    constructor(config) {

        // image setup
        this.image = new Image()
        this.image.src = config.src
        this.image.onload = () => {
            this.isLoaded = true
        }

        // shadow
        this.shadow = new Image()
        this.useShadow = config.useShadow || false
        if (this.useShadow) {
            this.shadow.src =  "images/chars/shadow.png"
        }
        this.shadow.onload = () => {
            this.isShadowLoaded = true
        }

        this.spriteConfig = config.spriteConfig || {
            // pixel size of sprite sheet to cut
            width: 40,
            height: 70
        }

        this.animations = config.animations || {
            "idle-down": [ [0,0] ],
            "idle-right": [ [0,2] ],
            "idle-up": [ [0,1] ],
            "idle-left": [ [0,3] ],
            "walk-down": [ [1,0], [0,0], [3,0], [0,0]],
            "walk-right": [ [1,2], [0,2], [3,2], [0,2]],
            "walk-up": [ [1,1], [0,1], [3,1], [0,1]],
            "walk-left": [ [1,3], [0,3], [3,3], [0,3]],
        }

        // animation and initial state
        this.currentAnimation = "idle-down"
        this.currentAnimationFrame = 0

        this.animationFrameLimit = config.animationFrameLimit || 10 // how fast sprites are changing
        this.animationFrameProgress = this.animationFrameLimit

        // reference the game object
        this.gameObject = config.gameObject
    }

    get frame() {
        return this.animations[this.currentAnimation][this.currentAnimationFrame]
    }

    setAnimation(key) {
        if (this.currentAnimation !== key) {
            this.currentAnimation = key
            this.currentAnimationFrame = 0
            this.animationFrameProgress = this.animationFrameLimit
        }
    }

    updateAnimationProgress() {
        if(this.animationFrameProgress > 0){
            this.animationFrameProgress -= 1
            return
        }
        this.animationFrameProgress = this.animationFrameLimit
        this.currentAnimationFrame += 1
        if(this.frame === undefined) {
            this.currentAnimationFrame = 0
        }

    }

    draw(ctx) {
        const x = this.gameObject.x
        const y = this.gameObject.y
        const width = this.spriteConfig.width
        const height = this.spriteConfig.height

        this.isShadowLoaded && ctx.drawImage(this.shadow, x, y - 3)
        
        const [frameX, frameY] = this.frame
        this.isLoaded && ctx.drawImage(this.image,
            frameX * width, frameY * height,// cut a sprite sheet left,top
            width,height,// size of cut in px
            x,y,// position of sprite on canvas
            width,height // size in which it should be drawn
            )
        this.updateAnimationProgress()
    }
}