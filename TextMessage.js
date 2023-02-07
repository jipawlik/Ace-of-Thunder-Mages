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
            <p class="TextMessage_p"></p>
            <div class="TextMessage_button-wrapper"></div>
            <div class="TextMessage_nav-wrapper">
                <p>Next: Press Enter </p>
            </div>
        `)
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

        if(textNode.options) {
            this.revealingText.warpToDone()
            textNode.options.forEach(option => {
                if(this.showOption(option)) {
                    const disapproveSound = new Audio("/sounds/disapprove.wav")
                    const approveSound = new Audio("/sounds/approve.wav")
                    
                    const button = document.createElement('button')
                    button.innerText = option.text
                    button.classList.add("TextMessage_choice-button")
                    button.addEventListener('click', () => 
                        {
                            if(option.flag === "download") {
                                approveSound.play()
                                window.open('https://drive.google.com/file/d/1DOJHA8MdoUNblxUxPSnAu7Qirgv5_Q0U/view?usp=sharing')
                            }
                            if(option.flag === "copyToClipboard") {
                                approveSound.play()
                                navigator.clipboard.writeText("joannaizabelapawlik@gmail.com")
                            }
                            if(option.flag === "Nevermind") {
                                disapproveSound.play()
                            }
                            this.selectOption(option)

                        }
                    )
                    buttonWrapper.appendChild(button)
                }
            })
            const buttons = document.querySelectorAll("button")
            let selected = 0
            buttons[selected].classList.add("selected")

            this.actionListener = new KeyPressListener("ArrowLeft", () => {
                buttons[selected].classList.remove("selected")
                selected = selected > 0 ? --selected : 0
                buttons[selected].classList.add("selected")
            })
            this.actionListener = new KeyPressListener("ArrowRight", () => {
                buttons[selected].classList.remove("selected")
                selected = selected < buttons.length - 1 ? ++selected : buttons.length -1
                buttons[selected].classList.add("selected")
            })
            this.actionListener = new KeyPressListener("Enter", () => {
                this.actionListener.unbind()
                buttons[selected].click()
            })

            
        } else {
            this.actionListener = new KeyPressListener("Enter", () => {
                if(this.revealingText.isDone) {
                    this.actionListener.unbind()
                    if (textNode.id < this.locales.length && textNode.flag !== "finish") {
                        this.showTextNode(textNode.id+1)
                    } else {
                        this.finish()
                    }
                } else {
                    this.revealingText.warpToDone()
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

