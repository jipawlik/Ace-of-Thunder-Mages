const utils = {
    withGrid: function(n) {
        return n * 16
    },
    asGridCoord(x,y) {
        return [x*16,y*16]
    },
    assignWalls: function(walls) {
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

    externalWalls: [
        // entrance bottom
        [5,18],[6,18],[7,18],
        // entrance left  
        [4,18],[4,17],[4,16],[4,15], [4,14],
        // entrance right
        [8,14],[8,15],[8,17],[8,16],[8,17],
        // piano area
        [2,14],[3,14],[3,13],[3,12],[3,11],[3,10],[3,9],[2,8],[-1,7],[1,8],[0,8],
        // bookshelf area
        [-1,6], [-1,5],[0,4],[1,4],[2,4],[3,4],[4,4],[5,4],[6,4],
        // cp
        [7,4],[8,4],[9,4],[10,4],[11,4],[11,3],
        // portrait 
        [11,3],[12,3],[13,3],[14,3],
        // drawer area
        [14,2],[15,2],[15,3],[15,4],[16,4],[17,4],[18,4],[19,4],
        // bin
        [20,4],[21,4],[22,5],[22,6],[22,7],
        // tv
        [22,8],[21,9],[20,9],[19,9],[18,9],[17,9],[16,9],[15,9],[14,9],
        // sofa area
        [13,9],[12,9],[11,9],[11,10],[11,11],[11,12],[11,13],[10,14],[9,14],
    ]
   
}