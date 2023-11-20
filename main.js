function loadRandomBooks() {
    const randomSearchTerms = [
        "fantasy",
        "history",
        "science",
        "fiction",
        "mystery",
        "romance",
        "biography",
        "self-help",
        "travel",
        "business",
        "technology",
        "philosophy",
        "art",
        "music",
        "health",
        "cooking",
        "sports",
        "education",
        "psychology",
        "comedy",
        "drama",
        "poetry",
        "religion",
        "nature",
        "programming",
        "design",
        "mathematics",
        "economics",
        "politics",
    ];

    const randomIndex = Math.floor(Math.random() * randomSearchTerms.length);
    const randomTerm = randomSearchTerms[randomIndex];

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${randomTerm}&maxResults=5&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => {
            data.items.forEach((book) => displayBook(book));
        })
        .catch((error) => displayError(error));
}

loadRandomBooks();

function displayError(error) {
    const section = document.querySelector("section.error");
    section.style.display = "block";

    section.innerHTML = `
    <p>Something went wrong!</p>
    <p class="error-message">(${error})</p>`;
}

let form = document.querySelector("form");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    const errorSection = document.querySelector("section.error");
    errorSection.style.display = "none";

    let bookshelf = document.querySelector("#bookshelf");
    bookshelf.innerHTML = "";

    const title = event.target.elements["title"];
    const titleValue = title.value;
    const titleConversion = titleValue ? titleValue.replace(/ /g, "+") : "*";

    const author = event.target.elements["author"];
    const authorValue = author.value;
    const authorConversion = authorValue ? authorValue.replace(/ /g, "+") : "*";

    const amount = event.target.elements["amount"];
    const maxResults = amount.value;

    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorConversion}+intitle:${titleConversion}&maxResults=${maxResults}&key=${API_KEY}`)
        .then((response) => response.json())
        .then((data) => data.items.forEach((book) => displayBook(book)))
        .catch((error) => {
            if (maxResults > 40) {
                displayError(`Max Book Limit Reached (40 Books) -- ${error}`);
            } else {
                displayError(`Please add Author Name or Book Title -- ${error}`);
            }
        });
});

function emptyBookshelf() {
    const errorSection = document.querySelector("section.error");
    const empty = document.querySelector("#empty");
    const bookshelf = document.querySelector("#bookshelf");
    empty.addEventListener("click", () => {
        errorSection.style.display = "none";
        bookshelf.innerHTML = "";
    });
}
emptyBookshelf();

function displayBook(book) {
    const ul = document.querySelector("ul");
    const li = document.createElement("li");

    li.classList.add("book");

    const { title, authors, publisher, description, imageLinks, categories, pageCount } = book.volumeInfo;

    let publisherAlt = "Unknown";
    if (book.volumeInfo.hasOwnProperty("publisher")) {
        publisherAlt = publisher;
    }

    let authorsAlt = "Unknown";
    if (book.volumeInfo.hasOwnProperty("authors")) {
        authorsAlt = authors;
    }

    let genresAlt = "Unknown";
    if (book.volumeInfo.hasOwnProperty("categories")) {
        genresAlt = categories;
    }

    let pageCountAlt = "Unknown";
    if (book.volumeInfo.hasOwnProperty("pageCount")) {
        pageCountAlt = pageCount;
    }

    let descriptionAlt = "Unavailable";
    if (book.volumeInfo.hasOwnProperty("description")) {
        descriptionAlt = description;
    }

    li.innerHTML += `
    <br>
    <img src="${imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : 'noBook.png'}" alt="${title}"></img>
    <h3 id="title-color">"${title}"</h3>
    <button id="add"> Add To Bookshelf</button>
    <h3>AUTHOR(S) - ${authorsAlt}</h3>
    <h3>GENRE(S) - ${genresAlt}</h3>
    <h3>PAGE COUNT - ${pageCountAlt} pages</h3>
    <h3>PUBLISHER - ${publisherAlt}</h3>
    <p class="hidden description">${descriptionAlt}</p>
    <button value="show" id="unhide">Description</button>
    <br>`;

    if (book.volumeInfo.hasOwnProperty("authors")) {
        authors.forEach((author) => {
            const authorModified = author.replace(/ /g, "+");

            li.innerHTML += `<h3>Wiki: <a href="https://en.wikipedia.org/w/index.php?search=${authorModified}" target="_blank">${author}</a></h3>`;
        });
    }

    ul.append(li);
}

const addBook = document.querySelector("#add");
const myBooks = document.querySelector("#my-books");
document.addEventListener("click", (event) => {
    if (event.target.id === "add") {
        const closestLi = event.target.closest(".book");
        const newLi = document.createElement("li");
        newLi.classList.add("new-book");
        newLi.innerHTML = closestLi.innerHTML;
        myBooks.append(newLi);

        const bookshelfButton = newLi.querySelector("#add");
        if (bookshelfButton) {
            bookshelfButton.remove();
        }

        const removeButton = document.createElement("button");
        removeButton.id = "remove-book";
        removeButton.innerText = "Remove Book";
        newLi.append(removeButton);
    }
});

const removeBook = document.querySelector("#remove-book");
document.addEventListener("click", (event) => {
    if (event.target.id === "remove-book") {
        const closestLi = event.target.closest(".new-book");
        closestLi.remove();
    }
});

const unhideDescrip = document.querySelector("#unhide");
const descrip = document.querySelector(".hidden");
document.addEventListener("click", (event) => {
    if (event.target.id === "unhide") {
        const listItem = event.target.closest('li');
        const descrip = listItem.querySelector('.description');
        descrip.classList.toggle('hidden');
    }
});
