import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styleUrls: ['./product.component.scss'],
  encapsulation: ViewEncapsulation.None

})


export class ProductComponent implements OnInit {
  singleData: any;
  ingredients: any;
  users: any
  comments: any;
  comment: FormGroup;
  userId = this.getCookie('user_id');
  configUrlComments = 'https://api.mediehuset.net/bakeonline/comments/';

  constructor(private httpService: HttpService, private router: Router, private http: HttpClient, private fb: FormBuilder) {

  }

  ngOnInit(): void {
    this.comment = this.fb.group({
      message: ['', Validators.required],
    });


    const id = this.router.url.replace('/product/', '');
    const headers = new Headers();
    const token = this.getCookie('token');

    console.log(token);
    this.singleData = this.httpService.getSingleData(id).subscribe(res => {
      this.singleData = res;

    });
    this.getComments(token, id);
  }
  getCookie(name: string): string {
    const nameLenPlus = (name.length + 1);
    return document.cookie
      .split(';')
      .map(c => c.trim())
      .filter(cookie => {
        return cookie.substring(0, nameLenPlus) === `${name}=`;
      })
      .map(cookie => {
        return decodeURIComponent(cookie.substring(nameLenPlus));
      })[0] || null;
  }

  getComments(auth, id) {

    const headers = new HttpHeaders().set('Authorization', `Bearer ${auth}`);
    headers.append('Access-Control-Allow-Origin', '*');

    this.comments = this.http.get(this.configUrlComments + id, { headers }).subscribe((res: any) => {

      this.comments = {
        count: res.count,
        posts: this.reverseComments(res.posts)
      };
    });
  }

  reverseComments(comment) {
    const arr = [];
    for (const singleComment of comment) {
      arr.push(singleComment);
    }
    return arr.reverse();
  }

  onSubmit() {
    const token = this.getCookie('token');
    const user_id = this.getCookie('user_id');
    const product_id = this.router.url.replace('/product/', '');

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log(this.comment.get('message').value);
    this.getComments(token, product_id);
    const formData: any = new FormData();
    formData.append('title', 'Jesper');
    formData.append('comment', this.comment.get('message').value);
    formData.append('user_id', user_id);
    formData.append('product_id', product_id);
    console.dir(formData);

    this.http.post('https://api.mediehuset.net/bakeonline/comments', formData, { headers }).subscribe(
      (response: any) => {
        console.log(response.access_token);
        if (response.access_token) {
          return true;
        } else {
          return;
        }
      },
      error => console.log
    );
    setTimeout(() => {
      document.location.reload(true);
    }, 100);
  }


  deleteComment(id) {
    const token = this.getCookie('token');
    console.log(id);

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    this.http.delete('https://api.mediehuset.net/bakeonline/comments/' + id, { headers }).subscribe(
      (response: any) => {
        console.log(response);
        setTimeout(() => {
          document.location.reload(true);
        }, 100);
      },
      error => console.log
    );
  }

  editComment(message, commentId) {
    const text = document.getElementById('edit').parentElement.parentElement.childNodes[3] as HTMLElement;
    text.innerHTML = `
    <input class="editText" type="text" value="${message}" />
    <button class="editButton" (click)="editText('test')" type="button">Ret</button>`;
  }
  editText(id) {
    const text = document.getElementsByClassName('editText')[0] as HTMLElement;
  }

}
