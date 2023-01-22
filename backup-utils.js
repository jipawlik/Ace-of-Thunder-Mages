const utils = {
    withGrid: function(n) {
        return n * 16
    },
    asGridCoord(x,y) {
        return `${x*16},${y*16}`
    },
    assignWalls: function(obj, walls) {
        // this adds walls to the walls object. for some reason the hero is walking
        // through those.
        Object.values(obj).forEach(el => {
            if (el.walls.length > 0) {
                el.walls.forEach(coord => {
                    walls[coord] = true
                })
            }
        })
        // this works though...
        this.externalWalls.forEach(coord => {
            walls[`${this.withGrid(coord[0])}, ${this.withGrid(coord[1])}`] = true
        })
    },
    nextPosition: function(initialX, initialY, direction) {
        let x = initialX
        let y = initialY
        const size = 16
        if (direction === "left") {
            x -= size
        } else if (direction === "right") {
            x += size
        } else if (direction === "up") {
            y -= size
        } else if (direction === "down") {
            y += size
        }
        return {x, y}
    },
    emitEvent: function(name, detail) {
        const event = new CustomEvent(name, {
            detail
        })
        document.dispatchEvent(event)
    },
    // this will probably be moved or removed
    externalWalls: [
        // entrance bottom
        [5,18],[6,18],[7,18],
        // entrance left  
        [4,18],[4,17],[4,16],[4,15], [4,14],
        // entrance right
        [8,14],[8,15],[8,17],[8,16],[8,17],
        // other walls
        [22,5],[22,6],[22,7],[22,8],[10,14],[9,14],[-1,7],[-1,6], 
    ]
   
}