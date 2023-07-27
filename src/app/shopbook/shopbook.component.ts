import { Component, OnInit, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClientService } from '../_services/http-client.service';
import { Book } from '../model/Book';
import { UserAuthService } from '../_services/user-auth.service';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-shopbook',
  templateUrl: './shopbook.component.html',
  styleUrls: ['./shopbook.component.css']
})
export class ShopbookComponent implements OnInit {

  books: Array<Book>;
  booksRecieved: Array<Book>;
  

  cartBooks: any;

  constructor(private router: Router, private httpClientService: HttpClientService, private userAuthService: UserAuthService, private httpClient: HttpClient) { }


  ngOnInit() {
    this.httpClientService.getBooks().subscribe(
      response => this.handleSuccessfulResponse(response),
    );
    let data = localStorage.getItem('cart');
    if (data !== null) {
      this.cartBooks = JSON.parse(data);
    } else {
      this.cartBooks = [];
    }
    
    
  }



 
  handleSuccessfulResponse(response) {
    this.books = new Array<Book>();
    this.booksRecieved = response;
    for (const book of this.booksRecieved) {

      const bookwithRetrievedImageField = new Book();
      bookwithRetrievedImageField.id = book.id;
      bookwithRetrievedImageField.name = book.name;
      bookwithRetrievedImageField.retrievedImage = 'data:image/jpeg;base64,' + book.picByte;
      bookwithRetrievedImageField.author = book.author;
      bookwithRetrievedImageField.price = book.price;
      bookwithRetrievedImageField.quantity = book.quantity;
      bookwithRetrievedImageField.picByte = book.picByte;
      this.books.push(bookwithRetrievedImageField);
    }
  }

  addToCart(item: Book) {
    if(!this.userAuthService.isLoggedIn()){
      this.router.navigate(['login'])
    }
    else if(this.userAuthService.isLoggedIn()){
    
    let book = this.books.find(book => {
      return book.id === +item.id;
    });
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    
    book.quantity = 1; 
    cartData.push(book);
    this.updateCartData(cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  }

  plus(item: Book){
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    const book = cartData.find((book) => book.id === item.id)
    book.quantity += 1
    this.updateCartData(cartData);
    localStorage.setItem('cart', JSON.stringify(cartData));
  }
  minus(item: Book){
    if(item.quantity === 1){
     item.quantity = 1
    } else {
      let cartData = [];
      let data = localStorage.getItem('cart');
      if (data !== null) {
        cartData = JSON.parse(data);
      }
      const book = cartData.find((book) => book.id === item.id)
      book.quantity -= 1;
      this.updateCartData(cartData);
      localStorage.setItem('cart', JSON.stringify(cartData));
    }
  }
  deleteFromCart(item: Book){
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }
    const book = cartData.find(book => book.id === item.id)
    book.isAdded = false;
    const index = cartData.findIndex(n => n.id === item.id);
    if (index !== -1) {
      cartData.splice(index, 1);
    }

    if (cartData.length > 0){
      this.updateCartData(cartData);
      localStorage.setItem('cart', JSON.stringify(cartData));
    } else{
      this.emptyCart();
    }
    
  }
  updateCartData(cartData) {
    this.cartBooks = cartData;
  }

  goToCart() {
    this.router.navigate(['/cart']);
  }

  emptyCart() {
    this.cartBooks = [];
    localStorage.removeItem('cart');
  }

  isLoggedIn(){
    return this.userAuthService.isLoggedIn();
  }

  isInCart(item: Book){
    let cartData = [];
    let data = localStorage.getItem('cart');
    if (data !== null) {
      cartData = JSON.parse(data);
    }

    if(cartData.find(book => book.id === item.id)){
      return true
    } else{
      return false
    }
  }
}
