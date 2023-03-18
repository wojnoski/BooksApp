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
    const click = document.querySelectorAll(select.itemBook.image);
    for(let item of click){
      item.addEventListener('dblclick', function(event){
        event.preventDefault();
        const bookID = item.getAttribute('data-id');
        if (favoriteBooks.indexOf(bookID) == -1){
          item.classList.add('favorite');
          favoriteBooks.push(bookID);
        } else {
          item.classList.remove('favorite');
          const BookElement = favoriteBooks.indexOf(bookID);
          favoriteBooks.splice(BookElement, 1);
        }
        console.log('Item: ', item);
        console.log('Favorite: ', favoriteBooks);
      });
    }
  }
  render();
  initActions();
}