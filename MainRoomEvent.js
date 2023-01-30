class MainRoomEvent {
    constructor({ map, event} ) {
        this.map = map
        this.event = event
    }

    stand(resolve) {
        const who = this.map.gameObject[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: "stand",
            direction: this.event.direction,
            time: this.event.time
        })
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonStandComplete", completeHandler)
                resolve()
            }
        }

        document.addEventListener("PersonStandComplete", completeHandler)

    }

    walk(resolve) {
        const who = this.map.gameObject[this.event.who]
        who.startBehavior({
            map: this.map
        }, {
            type: "walk",
            direction: this.event.direction,
            retry: true
        })
        const completeHandler = e => {
            if (e.detail.whoId === this.event.who) {
                document.removeEventListener("PersonWalkingComplete", completeHandler)
                resolve()
            }
        }

        document.addEventListener("PersonWalkingComplete", completeHandler)

    }

    textMessage(resolve) {
        const message = new TextMessage({
            text: this.event.text,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-wrapper"))
    }

    optionalTextMessage(resolve) {
        const message = new OptionalTextMessage({
            locales: this.event.locales,
            onComplete: () => resolve()
        })
        message.init(document.querySelector(".game-wrapper"))
    }


    changeMap(resolve) {
        const sceneTransition = new SceneTransition()
        sceneTransition.init(document.querySelector(".game-wrapper"), () => {
            this.map.overworld.startMap(window.maps[this.event.map])
            resolve()
            sceneTransition.fadeOut()
        })
    }

    init() {
        return new Promise(resolve => {
            this[this.event.type](resolve)
        })
    }
}