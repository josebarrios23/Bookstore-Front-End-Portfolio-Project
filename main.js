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
}

loadRandomBooks()

let form = document.querySelector("form")

form.addEventListener("submit", (event) => {
    event.preventDefault()
    
    
    let title = document.querySelector("#title")
    let titleValue = title.value
    let titleConversion = titleValue ? titleValue.
    //SUPER USEFUL "/ /g"
    replace(/ /g, "+") : "*"
    
    let author = document.querySelector("#author")
    let authorValue = author.value
    let authorConversion = authorValue ? authorValue.replace(/ /g, "+") : "*"
    
    let ammount = document.querySelector("#ammount")
    let maxResults = ammount.value
    
    // fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${titleConversion}&maxResults=${maxResults}&key=${API_KEY}`)
    
    //FURTHER INSPECTION:
    fetch(`https://www.googleapis.com/books/v1/volumes?q=inauthor:${authorConversion}+intitle:${titleConversion}&maxResults=${maxResults}&key=${API_KEY}`)
    
    .then((response) => response.json())
    .then((data) => data.items.forEach((book) => displayBook(book)))
    
})

let empty = document.querySelector("#empty")
let bookshelf = document.querySelector("#bookshelf")
empty.addEventListener("click", () => {
    bookshelf.innerHTML = ""
})

function capitalizeWords(string) {
  return string.replace(/\b\w/g, (first) => first.toUpperCase());
}

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

  let authorArr = authors[0].split(" ")
  let newAuthArr = [authorArr[0], authorArr[authorArr.length -1]]
  let newAuthStr = (newAuthArr.join(" ")).replace(/ /g, "_")

  let publisherAlt = "Unknown"
  if (book.volumeInfo.hasOwnProperty("publisher")) {
    publisherAlt = publisher
  }
    
  li.innerHTML += `<h2>${title}</h2>
  <h3>Author: ${authors}</h3>
  <h3>Publisher: ${publisherAlt}</h3>
  <h3>Wiki: <a href="https://en.wikipedia.org/wiki/${newAuthStr}">Author Wiki</a></h3>
  <br>`

  ul.append(li)
  
}
