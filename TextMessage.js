class TextMessage {
    constructor({ locales, onComplete }) {
        this.locales = locales
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
            <div class="TextMessage_nav-wrapper">
                <p>Next: Press Enter </p>
                <p>Reveal: Press Space</p>
            </div>
        `)
        
        this.escListener = new KeyPressListener("Escape", () => {
            this.escListener.unbind()
            this.element.remove()
        })

        this.element.querySelector("#close-button").addEventListener("click", () => {
            this.element.remove()
        })
      
    }

    showTextNode(textNodeIndex) {
        const buttonWrapper = this.element.querySelector(".TextMessage_button-wrapper")
        const textNode = this.locales.find(textNode => textNode.id === textNodeIndex)
        const paragraph = this.element.querySelector(".TextMessage_p")

        while (buttonWrapper.firstChild) {
            buttonWrapper.removeChild(buttonWrapper.firstChild)
        }
        while (paragraph.firstChild) {
            paragraph.removeChild(paragraph.firstChild)
        }

        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: textNode.text
        })
        this.revealingText.init()

        if(paragraph) {
            this.actionListener = new KeyPressListener("Space", () => {
                this.revealingText.warpToDone()
            })
        }

        if(textNode.options) {
            textNode.options.forEach(option => {
                if(this.showOption(option)) {
                    const button = document.createElement('button')
                    button.innerText = option.text
                    button.classList.add("TextMessage_choice-button")
                    button.addEventListener('click', () => this.selectOption(option))
                    buttonWrapper.appendChild(button)
                }
            })
        } else {
            this.actionListener = new KeyPressListener("Enter", () => {
                if (textNode.id < this.locales.length && textNode.flag !== "finish") {
                    this.showTextNode(textNode.id+1)
                } else  {
                    this.finish()
                }
            })
            
        }
    }

    showOption(option) {
        return option.requiredState == null || option.requiredState(this.state)
    }

    selectOption(option) {
        const nextTextNodeId = option.nextText
        if (nextTextNodeId <= 0) {
            return this.startAction()
        }
        this.state = Object.assign(this.state, option.setState)
        this.showTextNode(nextTextNodeId)
    }

    finish() {
        this.element.remove()
        this.actionListener.unbind()
        this.onComplete()
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)
        this.startAction()
    }
}

