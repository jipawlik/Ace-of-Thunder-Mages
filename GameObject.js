class GameObject {
    constructor(config) {
        this.id = null
        this.isMounted = false
        this.x = config.x || 0
        this.y = config.y || 0
        this.direction = config.direction || "down"
        this.sprite = new Sprite({
            gameObject: this,
            src: config.src,
            useShadow: config.useShadow,
            spriteConfig: config.spriteConfig
        })
        this.behaviorLoop = config.behaviorLoop || []
        this.behaviorLoopIndex = 0
        this.walls = config.walls || []
        this.talking = config.talking || []
    }

    mount(map){
        this.isMounted = true
        setTimeout(() => {
            this.doBehaviorEvent(map)
        }, 10)
    }

    async doBehaviorEvent(map) {
        if(map.isCutscenePlaying || this.behaviorLoop.length === 0 || this.isStanding) {
            return
        }

        let eventConfig = this.behaviorLoop(this.behaviorLoopIndex)
        eventConfig.who = this.id

        const eventHandler = new MainRoomEvent({ map, event: eventConfig })
        await eventHandler.init()

        this.behaviorLoopIndex += 1
        if (this.behaviorLoopIndex === this.behaviorLoop.length) {
            this.behaviorLoopIndex = 0
        }
        this.doBehaviorEvent(map)

    }
    update() {

    }
}