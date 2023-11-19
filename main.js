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
        "fitness",
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
    <p>Please provide a "Book Title" or "Author Name".</p>
    <p class="error-message">(${error})</p>`
  }

let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()

    const errorSection = document.querySelector("section.error")
    errorSection.style.display = "none"

    let bookshelf = document.querySelector("#bookshelf");
    bookshelf.innerHTML = ""
    
    let title = document.querySelector("#title")
    let titleValue = title.value
    let titleConversion = titleValue ? titleValue.
    //SUPER USEFUL "/ /g"
    replace(/ /g, "+") : "*"
    
    let author = document.querySelector("#author")
    let authorValue = author.value
    let authorConversion = authorValue ? authorValue.replace(/ /g, "+") : "*"
    
    let amount = document.querySelector("#amount")
    let maxResults = amount.value
    
    // fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${titleConversion}&maxResults=${maxResults}&key=${API_KEY}`)
    
    //FURTHER INSPECTION:
    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorConversion}+intitle:${titleConversion}&maxResults=${maxResults}&key=${API_KEY}`)
    
    .then((response) => response.json())
    .then((data) => data.items.forEach((book) => displayBook(book)))
    .catch((error) => displayError(error))
    
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

const {title, authors, publisher} = book.volumeInfo

  
  let publisherAlt = "Unknown"
  if (book.volumeInfo.hasOwnProperty("publisher")) {
    publisherAlt = publisher
  }
    
  li.innerHTML += `
  <br>
  <h2>${title}</h2>
  <h3>Author(s): ${authors}</h3>
  <h3>Publisher: ${publisherAlt}</h3>
  <br>`

authors.forEach((author) => {
  let authorModified = author.replace(/ /g, "+")

  li.innerHTML += `<h3>Wiki: <a href="https://en.wikipedia.org/w/index.php?search=${authorModified}" target="_blank">${author}</a></h3>`
})

  ul.append(li)
  
}
