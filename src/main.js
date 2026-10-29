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

form.addEventListener("submit", function (event) {
    event.preventDefault()

    const title = document.querySelector("#title").value.trim()
    const author = document.querySelector("#author").value.trim()
    const year = document.querySelector("#year").value.trim()
    const genre = document.querySelector("#genre").value.trim()
    const description = document.querySelector("#description").value.trim()
    const status = document.querySelector("#status").value

    if (title === "" || author === "") {
        alert("Le titre et l'auteur sont obligatoires !")
        return
    }

    const statusLabels = {
        toread: "A lire",
        reading: "En cours",
        read: "Lu"
    }

    empty.classList.add("hidden")
    bookcard.classList.remove("hidden")

    document.querySelector("#book-title").textContent = title
    document.querySelector("#book-author").textContent = "Auteur : " + author
    document.querySelector("#book-year").textContent = "Année : " + year
    document.querySelector("#book-genre").textContent = "Genre : " + genre
    document.querySelector("#book-description").textContent = "Description : " + description

    if (status === "toread") {
        document.querySelector("#book-status").textContent = "Statut : A lire"
    } else if (status === "reading") {
        document.querySelector("#book-status").textContent = "Statut : En cours"
    } else {
        document.querySelector("#book-status").textContent = "Statut : Lu"
    }
    
    form.reset()
    modal.close()
})