class TextMessage {
    constructor({ text, onComplete }) {
        this.text = text
        this.onComplete = onComplete
        this.element = null
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TextMessage")
        this.element.innerHTML = (`
            <button class="TextMessage_button TextMessage_close-button" id="close-button">x</button>
            <p class="TextMessage_p">${this.text}</p>
            <button class="TextMessage_button TextMessage_next-button" id="next-button">Next</button>
        `)
        this.element.querySelector("#next-button").addEventListener("click", () => {
            this.done()
        })
        this.element.querySelector("#close-button").addEventListener("click", () => {
            this.element.remove()
        })

        this.actionListener = new KeyPressListener("Enter", () => {
            this.actionListener.unbind()
            this.done()
        })

        this.escListener = new KeyPressListener("Escape", () => {
            this.escListener.unbind()
            this.element.remove()
        })
    }

    done() { 
        this.element.remove()
        this.onComplete()
    }

    init(container) {
        this.createElement()
        container.appendChild(this.element)

    }
}