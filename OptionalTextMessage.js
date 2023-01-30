class OptionalTextMessage {
    constructor({  onComplete }) {
        // this.textNodes = textNodes || []
        this.onComplete = onComplete
        this.element = null
        this.state = {}
    }

    startAction() {
        this.state = {}
        this.showTextNode(1)
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TextMessage")
        this.element.innerHTML = (`
            <button class="TextMessage_button TextMessage_close-button" id="close-button">x</button>
            <p class="TextMessage_p"></p>
            <div class="TextMessage_button-wrapper"></div>
            <button class="TextMessage_button TextMessage_next-button" id="next-button">Next</button>
        `)
     
        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.text
        })
        
        this.actionListener = new KeyPressListener("Enter", () => {
            this.done()
        })
        
        this.escListener = new KeyPressListener("Escape", () => {
            this.escListener.unbind()
            this.element.remove()
        })

        this.element.querySelector("#next-button").addEventListener("click", () => {
            this.finish()
        })

        this.element.querySelector("#close-button").addEventListener("click", () => {
            this.element.remove()
        })
      
    }

    showTextNode(textNodeIndex) {
        const buttonWrapper = this.element.querySelector(".TextMessage_button-wrapper")
        const textNode = drawerNodes.find(textNode => textNode.id === textNodeIndex)
        this.element.querySelector(".TextMessage_p").innerText = textNode.text
        while (buttonWrapper.firstChild) {
            buttonWrapper.removeChild(buttonWrapper.firstChild)
        }
        textNode.options.forEach(option => {
            if(this.showOption(option)) {
                const button = document.createElement('button')
                button.innerText = option.text
                button.classList.add(".TextMessage_choice-button")
                button.addEventListener('click', () => this.selectOption(option))
                buttonWrapper.appendChild(button)
            }
        })
    }

    showOption(option) {
        return option.requiredState == null || option.requiredState(state)
    }

    selectOption(option) {
        const nextTextNodeId = option.nextText
        if (nextTextNodeId <= 0) {
            return this.startAction()
        }
        this.state = Object.assign(state, option.setState)
        this.showTextNode(nextTextNodeId)
    }



    finish() {
        this.element.remove()
        this.actionListener.unbind()
        this.onComplete()
    }

    done() {
        if(this.revealingText.isDone) { 
            this.finish()
        } else {
            this.revealingText.warpToDone()
        }
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
        this.revealingText.init()
        // najpierw na sztywno jaką tablicę użyć
        // potem dodaj parametr do funkcji event, tak, żeby była reusable
        this.startAction()

    }
}

