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

function displayBook(book){
  let ul = document.querySelector("ul")
  let li = document.createElement("li")

  let author = document.querySelector("#author")
  let authorValue = author.value
  let authorCapital = capitalizeWords(authorValue)
    
  li.classList.add("book")
    
  const {title, authors, publisher} = book.volumeInfo

  let publisherAlt = "Unknown"
  if (book.volumeInfo.hasOwnProperty("publisher")) {
    publisherAlt = publisher
  }
    
  li.innerHTML += `<h2>${title}</h2>
  <h3>Author: ${authors}<h3>
  <h3>Publisher: ${publisherAlt}<h3>
  <h3>Wiki: <a href="https://en.wikipedia.org/wiki/${authorCapital}">Author Wiki</a><h3>
  <br>`

  ul.append(li)
}
