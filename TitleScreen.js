class TitleScreen {
    constructor() {

    }

    getOptions() {
        return []
    }

    createElement() {
        this.element = document.createElement("div")
        this.element.classList.add("TitleScreen")
        this.element.innerHTML = (`
            <img class="TitleScreen_logo" scr="/images/logo.png" alt="Ace of Thunder Mages"/>
        `)

    }

    close() {
 
    } 

    init(container) {

    }
}