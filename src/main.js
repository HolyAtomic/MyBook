const modal = document.querySelector("#book")

const openbtn = document.querySelector("#open")
const clsbtn = document.querySelector("#close")

openbtn.addEventListener("click", function(){
    modal.showModal()
})
clsbtn.addEventListener("click", function(){
    modal.close()
})
const form = document.querySelector("#bookform")

const booklist = document.querySelector("#booklist")

form.addEventListener("submit", function(event){
    event.preventDefault()

    const title = document.querySelector("#title").value.trim()
    const year = document.querySelector("#year").value.trim()
    const genre = document.querySelector("#genre").value.trim()
    const description = document.querySelector("#description").value.trim()
    const author = document.querySelector("#author").value.trim()
    const status = document.querySelector("#status").value.trim()

    if(title === "" || author === ""){
        alert("Le titre et l'auteur sont obligatoires !")
        return
    }
    const books = {
        title: title,
        year: year,
        genre: genre,
        description: description,
        status: status,
        author: author,
    }
    empty.classList.add("hidden")
    bookcard.bookcard.remove("hidden")
    document.querySelector("#book-title").textContent = title
    document.querySelector("#book-author").textContent = "Author" + author
    document.querySelector("#book-year").textContent = "Year" + year
    document.querySelector("#book-genre").textContent = "Genre" + genre
    document.querySelector("#book-description").textContent = "Description" + description
    document.querySelector("#book-status").textContent = "Status" + status

    if(status === "toread"){
        document.querySelector("#book-status").textContent = "Status : A lire"
    }else if(status === "reading"){
        document.querySelector("#book-status").textContent = "Statut : En cours"
    }else{
        document.querySelector("#book-status").textContent = "Statut : Lu"
    }
    form.reset()
    modal.close()
})