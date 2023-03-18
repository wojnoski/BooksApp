{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    booksPanel: {
      wrapper: '.books-panel',
      booksList: '.books-list',
    },
    itemBook: {
      image: '.book__image',
    },
  };

  const templates = {
    book: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };

  const render = function(){
    const thisBook = this;
    thisBook.data = dataSource.books;
    for(let book in dataSource.books){
      const bookName = dataSource.books[book];
      const generatedHTML = templates.book(bookName);
      thisBook.element = utils.createDOMFromHTML(generatedHTML);
      const bookContainer = document.querySelector(select.booksPanel.booksList);
      bookContainer.appendChild(thisBook.element);
      console.log('HTML: ', generatedHTML);
    }
  };
  

  const favoriteBooks = [];
  function initActions(){
    const booklist = document.querySelector(select.booksPanel.booksList);
    booklist.addEventListener('dblclick', function(event){
      if(event.target.offsetParent.classList.contains('book__image')){
        const bookID = event.target.offsetParent.getAttribute('data-id');
        if(favoriteBooks.indexOf(bookID) == -1){
          event.target.offsetParent.classList.add('favorite');
          favoriteBooks.push(bookID);
        } else {
          event.target.offsetParent.classList.remove('favorite');
          const BookElement = favoriteBooks.indexOf(bookID);
          favoriteBooks.splice(BookElement, 1);
        }
        console.log(event.target);
        console.log('Favorite: ', favoriteBooks);
      }
    });
  }
  render();
  initActions();
}