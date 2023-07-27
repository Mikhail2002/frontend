import { Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import { Book } from '../../../model/Book';
import { HttpClientService } from '../../../_services/http-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { FormGroup} from '@angular/forms';


@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  @Input()
  book: Book;

  @Output()
  bookAddedEvent = new EventEmitter();
  private selectedFile;
  imgURL: any;

  addBookForm: FormGroup

  
  constructor(private httpClientService: HttpClientService,
    private activedRoute: ActivatedRoute,
    private router: Router,
    private httpClient: HttpClient) { }
  
  bookId;
  ngOnInit() {
    this.bookId = null
    this.addBookForm = new FormGroup({})
    if (this.book){
      return this.bookId = this.book.id;    
    }
  }

  public onFileChanged(event) {
    console.log(event);
    this.selectedFile = event.target.files[0];

    let reader = new FileReader();
    reader.readAsDataURL(event.target.files[0]);
    reader.onload = (event2) => {
      this.imgURL = reader.result;
    };

  }

  bookName;
  bookAuthor;
  bookPrice;
  saveBook() {
    if (this.bookId == null) {
    this.book.name = this.bookName
    this.book.author = this.bookAuthor
    this.book.price = this.bookPrice

    const uploadData = new FormData();
    uploadData.append('imageFile', this.selectedFile, this.selectedFile.name);
    this.selectedFile.imageName = this.selectedFile.name;

    this.httpClient.post('http://localhost:8080/books/upload', uploadData, { observe: 'response' })
      .subscribe((response) => {
        if (response.status === 200) {
          this.httpClientService.addBook(this.book).subscribe(
            (book) => {
              this.bookAddedEvent.emit();
              this.router.navigate(['admin', 'books']);
            }
          );
          console.log('Image uploaded successfully');
        } else {
          console.log('Image not uploaded successfully');
        }
      }
      );
    }else {
      this.book.name = this.bookName
      this.book.author = this.bookAuthor
      this.book.price = this.bookPrice

      this.httpClientService.updateBook(this.book).subscribe(
        (book) => {
          
          this.bookAddedEvent.emit();
          this.router.navigate(['admin', 'books']);
        }
      );
    }
  }
}