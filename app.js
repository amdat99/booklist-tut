    const title = document.querySelector('#title')
    const author = document.querySelector('#author')
    const isbn = document.querySelector('#isbn')
// book class

class Book{
    constructor(title, author,isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//ui class

class Ui{
    static displayBooks(){
        
        let storedBooks  = Store.getBooks();

        const books = storedBooks;
        books.forEach(book => Ui.addBookToList(book));
        }
    
        static addBookToList(book){
        
        const list = document.querySelector('#book-list')
        const row = document.createElement('tr');
        
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a class = "btn btn-danger btn-sm delete" href ="#">X</a></td>`;
            
        list.appendChild(row);

        clearFields()
    }

    static deleteBook =  (el) => {
        if(el.classList.contains("delete")){
            el.parentElement.parentElement.remove()
        }
    }
}

class Store {
    static getBooks(){
        let books;

        if(localStorage.getItem("books")===null){
            books = []
        } else{
            books = JSON.parse(localStorage.getItem("books"))
        }

        return books;
    }

    static addBooks(book){
        const books = Store.getBooks()
        books.push(book);
        localStorage.setItem("books", JSON.stringify(books));
    }

    static deleteBooks(isbn){
        const books = Store.getBooks()

        books.forEach((book,i) => {
            if(book.isbn === isbn){
                books.splice(i,1)
            }

        })

        localStorage.setItem("books", JSON.stringify(books));
        

    }
}

    
    const clearFields = () => {
    title.value = ''
    author.value = ''
    isbn.value = ''
}

    const showAlert = (message, className) => {
     
    let alerts = document.querySelector('.alert')
    if(alerts){
        alerts.remove()
    }

    const div = document.createElement("div"); 
        
        div.className = `alert alert-${className}`
        div.innerHTML = message;

        const cont = document.querySelector('.container')
        const form = document.querySelector('#book-form')
        cont.insertBefore(div, form)

        setTimeout(() =>div.remove(), 3000 )
    }



//events: display book
document.addEventListener('DOMContentLoaded',Ui.displayBooks);

// add book 
document.getElementById('book-form').addEventListener('submit', e => {
    
    e.preventDefault();

    if(!title.value || !author.value || !isbn.value){
        return showAlert('please fill in all the inputs','danger')
    }

    const book = new Book(title.value, author.value, isbn.value);

   Ui.addBookToList(book)
   Store.addBooks(book)
   showAlert('book added','success');
})

// remove book

document.getElementById('book-list').addEventListener('click', (e) =>{
    Ui.deleteBook(e.target)
    // Store.deleteBooks()
    Store.deleteBooks(e.target.parentElement.previousElementSibling.innerHTML)
    showAlert('book removed','success');
})