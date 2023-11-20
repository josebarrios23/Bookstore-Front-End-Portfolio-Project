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
      ]

    const randomIndex = Math.floor(Math.random() * randomSearchTerms.length)
    const randomTerm = randomSearchTerms[randomIndex]

    fetch(`https://www.googleapis.com/books/v1/volumes?q=${randomTerm}&maxResults=5&key=${API_KEY}`)
    .then((response) => response.json())
    .then((data) => {
        data.items.forEach((book) => displayBook(book))
      })
      .catch((error) => displayError(error))
}

loadRandomBooks()

function displayError(error) {
    const section = document.querySelector("section.error")
    section.style.display = "block"
  
    section.innerHTML = `
    <p>Something went wrong!</p>
    <p class="error-message">(${error})</p>`
}

/* <p>Please provide a "Book Title" or "Author Name".</p> */

let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const errorSection = document.querySelector("section.error")
    errorSection.style.display = "none"

    let bookshelf = document.querySelector("#bookshelf");
    bookshelf.innerHTML = ""
    
    let title = event.target.elements["title"]
    let titleValue = title.value
    let titleConversion = titleValue ? titleValue.
    //SUPER USEFUL "/ /g"
    replace(/ /g, "+") : "*"
    
    let author = event.target.elements["author"]
    let authorValue = author.value
    let authorConversion = authorValue ? authorValue.replace(/ /g, "+") : "*"
    
    let amount = event.target.elements["amount"]
    let maxResults = amount.value
    
    // fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${titleConversion}&maxResults=${maxResults}&key=${API_KEY}`)
    
    //FURTHER INSPECTION:
    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorConversion}+intitle:${titleConversion}&maxResults=${maxResults}&key=${API_KEY}`)
    
    .then((response) => response.json())
    .then((data) => data.items.forEach((book) => displayBook(book)))
    .catch((error) => {
        if (maxResults > 40) {
            displayError(`Max Book Limit Reached (40 Books) -- ${error}`)}
        else {
            displayError(`Please add Author Name or Book Title -- ${error}`)
        }})
    
})

function emptyBookshelf() {
const errorSection = document.querySelector("section.error")
let empty = document.querySelector("#empty")
let bookshelf = document.querySelector("#bookshelf")
empty.addEventListener("click", () => {
    errorSection.style.display = "none"
    bookshelf.innerHTML = ""
})
}
emptyBookshelf()

// function capitalizeWords(string) {
//   return string.replace(/\b\w/g, (first) => first.toUpperCase());
// }

// function capitalizeWords(string) {
//   return string.split(' ')
//   .map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')
// }

function displayBook(book){
  let ul = document.querySelector("ul")
  let li = document.createElement("li")

//   let author = document.querySelector("#author")
//   let authorValue = author.value
//   let authorCapital = capitalizeWords(authorValue)

li.classList.add("book")

const {title, authors, publisher, description, imageLinks, categories} = book.volumeInfo

  
  let publisherAlt = "Unknown"
  if (book.volumeInfo.hasOwnProperty("publisher")) {
    publisherAlt = publisher
  }

  let authorsAlt = "Unknown"
  if (book.volumeInfo.hasOwnProperty("authors")) {
    authorsAlt = authors
  }

  let genresAlt = "Unknown"
  if (book.volumeInfo.hasOwnProperty("categories")) {
    genresAlt = categories
  }

  let descriptionAlt = "Unavailable"
  if (book.volumeInfo.hasOwnProperty("description")) {
    descriptionAlt = description
  }
    
{/* <img src="${imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : 'placeholder-image.jpg'}" alt="${title}"></img> */}

  li.innerHTML += `
  <br>
  <img src="${imageLinks && imageLinks.thumbnail ? imageLinks.thumbnail : 'noBook.png'}" alt="${title}"></img>
  <h3>"${title}"</h3>
  <button id="add"> Add To Bookshelf</button>
  <h3>Author(s): ${authorsAlt}</h3>
  <h3>Genre(s): ${genresAlt}</h3>
  <h3>Publisher: ${publisherAlt}</h3>
  <p class="hidden description">${descriptionAlt}</p>
  <button value="show" id="unhide">Show Description</button>
  <br>`

  if (book.volumeInfo.hasOwnProperty("authors")) {
authors.forEach((author) => {
  let authorModified = author.replace(/ /g, "+")

  li.innerHTML += `<h3>Wiki: <a href="https://en.wikipedia.org/w/index.php?search=${authorModified}" target="_blank">${author}</a></h3>`
})
  }

  ul.append(li)
  
}

let addBook = document.querySelector("#add")
let myBooks = document.querySelector("#my-books")
document.addEventListener("click", (event) => {
    if (event.target.id === "add") {
        let closestLi = event.target.closest(".book");
        let newLi = document.createElement("li")
        newLi.classList.add("new-book")
        newLi.innerHTML = closestLi.innerHTML
        myBooks.append(newLi);

        let bookshelfButton = newLi.querySelector("#add");
            if (bookshelfButton) {
                bookshelfButton.remove();
            }
        
        let removeButton = document.createElement("button")
        removeButton.id = "remove-book"
        removeButton.innerText = "Remove Book"
        newLi.append(removeButton)
    }
});

let removeBook = document.querySelector("#remove-book")
document.addEventListener("click", (event) => {
    if (event.target.id === "remove-book") {
        let closestLi = event.target.closest(".new-book");
        closestLi.remove()
    }
});

let unhideDescrip = document.querySelector("#unhide")
let descrip = document.querySelector(".hidden")
document.addEventListener("click", (event) => {
  if (event.target.id === "unhide") {
    const listItem = event.target.closest('li');
    const descrip = listItem.querySelector('.description');
        descrip.classList.toggle('hidden')
  }
})

