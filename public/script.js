const socket = new WebSocket (`ws://localhost/`)
socket.onopen  = () => console.log (`client websocket opened`)
socket.onclose = () => console.log (`client websocket closed`)
socket.onerror =  e => console.dir (e)

const squares = []

socket.onmessage = e => {
    console.log (`websocket message received:`)

    // convert the string back into an object
    const pos = JSON.parse (e.data)

    // add the position object to the squares array
    squares.push (pos)

    // display the position object in the console
    console.dir (pos)
}

document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.createElement (`canvas`)
document.body.appendChild (cnv)
cnv.width  = innerWidth
cnv.height = innerHeight

const ctx = cnv.getContext (`2d`)

requestAnimationFrame (draw_frame)

function draw_frame () {
    ctx.fillStyle = `turquoise`
    ctx.fillRect (0, 0, cnv.width, cnv.height)

    squares.forEach (s => {

        // converting the ratio back to pixels
        const x_pos = s.x_phase * cnv.width
        const y_pos = s.y_phase * cnv.height

        ctx.fillStyle = `deeppink`
        ctx.fillRect (x_pos - 10, y_pos - 10, 20, 20)
    })

    requestAnimationFrame (draw_frame)
}

document.body.onclick = e => {

    // converting the .offset positions
    // to a ratio of the total length
    // between 0 - 1
    const pos = {
        x_phase : e.offsetX / cnv.width,
        y_phase : e.offsetY / cnv.height,
    }

    // turn the pos object into a string
    const pos_string = JSON.stringify (pos)

    // send to the websocket server
    socket.send (pos_string)
}