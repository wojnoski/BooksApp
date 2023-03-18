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
    filters: {
      section: '.filters',
    }
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
  const filters = [];
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
    const filter = document.querySelector(select.filters.section);
    filter.addEventListener('click', function(event){
      if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
        console.log(event.target.value);
        if(event.target.checked == true){
          filters.push(event.target.value);
        } else {
          const ArrayElement = filters.indexOf(event.target.value);
          filters.splice(ArrayElement, 1);
        }
      }
      hideBooks();
      console.log(filters);
    });
  }
  const hideBooks = function(){
    for(let book of dataSource.books){
      let ShouldBeHidden = false;
      for(let filter of filters){
        if(!book.details[filter]){
          ShouldBeHidden = true;
          break;
        }
      }
      console.log(book.id);
      const BookImg = document.querySelector('[data-id="' + book.id + '"]');
      console.log(BookImg);
      if(ShouldBeHidden == true){
        BookImg.classList.add('hidden');
      } else {
        BookImg.classList.remove('hidden');
      }
    }
  }
  render();
  initActions();
}