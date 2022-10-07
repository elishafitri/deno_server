document.body.style.margin   = 0
document.body.style.overflow = `hidden`

const cnv = document.createElement (`canvas`)
cnv.width  = innerWidth
cnv.height = innerHeight

document.body.appendChild (cnv)

const ctx = cnv.getContext (`2d`)
ctx.fillStyle = `turquoise`
ctx.fillRect (0, 0, cnv.width, cnv.height)

const side = Math.min (cnv.width, cnv.height) / 3
const x_pos = (cnv.width / 2)  - (side / 2)
const y_pos = (cnv.height / 2) - (side / 2)

ctx.fillStyle = `deeppink`
ctx.fillRect (x_pos, y_pos, side, side)