const modal = document.querySelector("#book");
const openbtn = document.querySelector("#open");
const clsbtn = document.querySelector("#close");

const form = document.querySelector("#bookform");
const empty = document.querySelector("#empty");
const booksContainer = document.querySelector("#books-container");
const booktemplate = document.querySelector("#book-template");

const search = document.querySelector("#searching");
const sort = document.querySelector("#sort");

let books = JSON.parse(localStorage.getItem("books")) || [];

let editId = null;

function saveBooks() {
    localStorage.setItem("books", JSON.stringify(books));
}

function displayBooks() {
    booksContainer.querySelectorAll(".book-card").forEach(function (card) {
        card.remove();
    });

    const searchValue = search.value.toLowerCase();

    let filteredBooks = books.filter(function (book) {
        return (
            book.title.toLowerCase().includes(searchValue) ||
            book.author.toLowerCase().includes(searchValue)
        );
    });

    const sortValue = sort.value;

    filteredBooks.sort(function (a, b) {
        if (sortValue === "year") {
            return Number(a.year || 0) - Number(b.year || 0);
        }

        return a[sortValue].localeCompare(b[sortValue]);
    });

    if (books.length === 0) {
        empty.textContent = "Aucun livre dans votre collection.";
        empty.classList.remove("hidden");
        return;
    }

    empty.classList.add("hidden");

    if (filteredBooks.length === 0) {
        empty.textContent = "Aucun résultat trouvé.";
        empty.classList.remove("hidden");
        return;
    }

    filteredBooks.forEach(function (book) {
        const bookcard = booktemplate.content.cloneNode(true);

        const card = bookcard.querySelector(".book-card");

        card.querySelector(".book-title").textContent = book.title;
        card.querySelector(".book-author").textContent = "Auteur : " + book.author;
        card.querySelector(".book-year").textContent = "Année : " + (book.year || "Non précisée");
        card.querySelector(".book-genre").textContent = "Genre : " + (book.genre || "Non précisé");
        card.querySelector(".book-description").textContent = "Description : " + (book.description || "Aucune description");

        const statusLabels = {
            toread: "À lire",
            reading: "En cours",
            read: "Lu"
        };

        card.querySelector(".book-status").textContent =
            "Statut : " + statusLabels[book.status];

        card.querySelector(".edit-btn").dataset.id = book.id;
        card.querySelector(".delete-btn").dataset.id = book.id;

        booksContainer.appendChild(bookcard);
    });
}

openbtn.addEventListener("click", function () {
    editId = null;
    form.reset();

    modal.querySelector("h2").textContent = "Ajouter un livre";

    modal.showModal();
});

clsbtn.addEventListener("click", function () {
    modal.close();
});

form.addEventListener("submit", function (event) {
    event.preventDefault();

    const title = document.querySelector("#title").value.trim();
    const author = document.querySelector("#author").value.trim();
    const year = document.querySelector("#year").value.trim();
    const genre = document.querySelector("#genre").value.trim();
    const description = document.querySelector("#description").value.trim();
    const status = document.querySelector("#status").value;

    if (title === "" || author === "") {
        alert("Le titre et l'auteur sont obligatoires !");
        return;
    }

    const book = {
        id: editId || Date.now(),
        title: title,
        author: author,
        year: year,
        genre: genre,
        description: description,
        status: status
    };

    if (editId !== null) {
        books = books.map(function (item) {
            if (item.id === editId) {
                return book;
            }

            return item;
        });
    } else {
        books.push(book);
    }

    saveBooks();
    displayBooks();

    form.reset();
    modal.close();

    editId = null;
});

booksContainer.addEventListener("click", function (event) {
    const id = Number(event.target.dataset.id);

    if (event.target.classList.contains("edit-btn")) {
        const book = books.find(function (item) {
            return item.id === id;
        });

        if (!book) return;

        editId = id;

        document.querySelector("#title").value = book.title;
        document.querySelector("#author").value = book.author;
        document.querySelector("#year").value = book.year;
        document.querySelector("#genre").value = book.genre;
        document.querySelector("#description").value = book.description;
        document.querySelector("#status").value = book.status;

        modal.querySelector("h2").textContent = "Modifier un livre";

        modal.showModal();
    }

    if (event.target.classList.contains("delete-btn")) {
        const confirmDelete = confirm("Voulez-vous supprimer ce livre ?");

        if (confirmDelete) {
            books = books.filter(function (item) {
                return item.id !== id;
            });

            saveBooks();
            displayBooks();
        }
    }
});

search.addEventListener("input", function () {
    displayBooks();
});

sort.addEventListener("change", function () {
    displayBooks();
});

displayBooks();