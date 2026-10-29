const modal = document.querySelector("#book")
const openbtn = document.querySelector("#open")
const clsbtn = document.querySelector("#close")
const form = document.querySelector("#bookform")
const empty = document.querySelector("#empty")
const bookcard = document.querySelector("#bookcard")

openbtn.addEventListener("click", function () {
    modal.showModal()
})

clsbtn.addEventListener("click", function () {
    modal.close()
})
