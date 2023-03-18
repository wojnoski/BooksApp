{
  'use strict';

  const select = {
    templateOf: {
      book: '#template-book',
    },
    all: {
      wrapper: 'container',
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
    books: Handlebars.compile(document.querySelector(select.templateOf.book).innerHTML),
  };
  const favoriteBooks = [];
  const filters = [];

  class BooksList {
    constructor(data){
      const thisBooksList = this;
      thisBooksList.data = data;
      thisBooksList.initData();
      thisBooksList.getElements();
      thisBooksList.initActions();
      thisBooksList.filterBooks();
      thisBooksList.determineRatingBgc();
    }
    initData(){
      const thisBooksList = this;
      this.data = dataSource.books;
      for(let book of dataSource.books){
        book.ratingBgc = thisBooksList.determineRatingBgc(book.rating);
        book.ratingWidth = book.rating * 10;
        const generatedHTML = templates.books(book);
        const utilsFunc = utils.createDOMFromHTML(generatedHTML);
        const bookContainer = document.querySelector(select.booksPanel.booksList);
        bookContainer.appendChild(utilsFunc);
      }
    }
    getElements(){
      const thisBooksList = this;
      thisBooksList.bookList = document.querySelector(select.booksPanel.booksList);
      thisBooksList.filter = document.querySelector(select.filters.section);
    }
    initActions(){
      const thisBooksList = this;
      thisBooksList.bookList.addEventListener('dblclick', function(event){
        event.preventDefault();
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
        }
      });
    }
    filterBooks(){
      const thisBooksList = this;
      thisBooksList.filter.addEventListener('click', function(event){
        if (event.target.tagName == 'INPUT' && event.target.type == 'checkbox' && event.target.name == 'filter'){
          console.log(event.target.value);
          if(event.target.checked == true){
            filters.push(event.target.value);
          } else {
            const ArrayElement = filters.indexOf(event.target.value);
            filters.splice(ArrayElement, 1);
          }
        }
        thisBooksList.hideBooks();
      });
    }
    determineRatingBgc(rating){
      const thisBooksList = this;
      if(rating<6){
        return 'linear-gradient(to bottom, #fefcea 0%, #f1da36 100%';
      } else if (rating > 6 && rating <= 8){
        return 'linear-gradient(to bottom, #b4df5b 0%, #b4df5b 100%';
      } else if (rating > 8 && rating <= 9){
        return 'linear-gradient(to bottom, #299a0b 0%, #299a0b 100%';
      } else if (rating > 9){
        return 'linear-gradient(to bottom, #ff0084 0%, #ff0084 100%';
      }
    }
    hideBooks(){
      const thisBooksList = this;
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
  }
  const app = new BooksList();
}