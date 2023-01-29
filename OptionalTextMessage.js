class OptionalTextMessage {
    constructor({ textA, textB, bool, onComplete }) {
        this.textA = textA
        this.textB = textB
        this.selectedText = ''
        this.onComplete = onComplete
        this.element = null
        this.bool = bool || false
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TextMessage")
        this.element.innerHTML = (`
            <button class="TextMessage_button TextMessage_close-button" id="close-button">x</button>
            <p class="TextMessage_p"></p>
            <button class="TextMessage_button TextMessage_next-button" id="next-button">Next</button>
        `)
        

        this.revealingText = new RevealingText({
            element: this.element.querySelector(".TextMessage_p"),
            text: this.selectedText
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