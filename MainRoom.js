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

    bindActionInput() {
        new KeyPressListener("Enter", () => {
            this.map.checkForActionCutscene()
        })
    }

    bindHeroPositionCheck() {
        document.addEventListener("PersonWalkingComplete", e => {
            if (e.detail.whoId === "hero") {
                this.map.checkForFootstepCutscene()
            }
        })
    }

    startMap(mapConfig) {
        this.map = new MainRoomMap(mapConfig)
        this.map.overworld = this
        utils.assignWalls(this.map.walls)
        this.map.mountObjects()
    }

    init() {
        this.startMap(window.maps.MainRoom)
        this.bindActionInput()
        this.bindHeroPositionCheck()
        this.directionInput = new DirectionInput()
        this.directionInput.init()
        this.startGameLoop()
        console.log(utils.messageHelper)
    }
}

