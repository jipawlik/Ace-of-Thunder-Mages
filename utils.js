const utils = {
    withGrid: function(n) {
        return n * 16
    },
    assignWalls: function(obj) {
        let x
        let y
        this.wallCoords.forEach(coord => {
            x = coord[0]
            y = coord[1]
            obj[`${x * 16}, ${y * 16}`] = true
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
    wallCoords: [
        // entrance bottom
        [5,18],[6,18],[7,18],
        // entrance left  
        [4,18],[4,17],[4,16],[4,15], [4,14],
        // entrance right
        [8,14],[8,15],[8,17],[8,16],[8,17],
        // piano area
        [2,14], [3,14],[3,13], [3,12], [3,11], [3,10], [3,9], [2,8], [-1,7], [1,8],[0,8]

    ]
   
}