class TextMessage {
    constructor({ text, onComplete, isChoicePossible, isSetterOn }) {
        this.text = text
        this.onComplete = onComplete
        this.element = null
        this.isChoicePossible = isChoicePossible || false
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TextMessage")
        this.element.innerHTML = (`
            <button class="TextMessage_button TextMessage_close-button" id="close-button">x</button>
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button TextMessage_next-button" id="next-button">Next</button>
        `)
        if(this.isChoicePossible) {
            this.element.innerHTML = (`
                <button class="TextMessage_button TextMessage_close-button" id="close-button">x</button>
                <p class="TextMessage_p"></p>
                <div class="TextMessage_button-wrapper">
                    <button class="TextMessage_choice-button" id="choice-button-yes">Yes</button>
                    <button class="TextMessage_choice-button" id="next-button">No</button>
                </div>
            `)
            this.element.querySelector("#choice-button-yes").addEventListener("click", () => {
                if(!utils.messageHelper) {
                    utils.messageHelper = true
                    this.finish()
                    // download cv <- dodaj funkcję
                } else {
                    utils.messageHelper = false
                }
            }) 
        }

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

    }
}