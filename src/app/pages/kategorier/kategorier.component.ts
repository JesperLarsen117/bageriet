import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-kategorier',
  templateUrl: './kategorier.component.html',
  styleUrls: ['./kategorier.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class KategorierComponent implements OnInit {
  data: any;
  commentCount: any;
  configUrlComments = 'https://api.mediehuset.net/bakeonline/comments/';


  constructor(private httpService: HttpService, private http: HttpClient) {
  }
  ngOnInit(): void {
    const li = document.querySelectorAll('.categories ul li') as unknown as HTMLElement;

    this.sortProduct(null, '1');
    li[0].style.color = '#324049';
    li[0].style.fontWeight = 'bold';



  }

  sortProduct($event, value) {
    const token = this.getCookie('token');
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    headers.append('Access-Control-Allow-Origin', '*');
    const li = document.querySelectorAll('.categories ul li') as NodeListOf<HTMLElement>;
    for (const item of li) {
      item.style.color = '#898989';
      item.style.fontWeight = 'regular';
    }

    const productContainer = document.getElementById('products');
    productContainer.innerHTML = '';
    if ($event != null) {
      $event.currentTarget.style.color = '#324049';
      $event.currentTarget.style.fontWeight = 'bold';
    }
    this.httpService.getData();
    this.data = this.httpService.getData().pipe().subscribe(async (res: any) => {
      const categories = res.categories;
      for (const item of categories) {
        const products = item.products;
        console.log(products.id);
        if (item.id === value) {
          for (const product of products) {
            productContainer.innerHTML += `
          <article>
            <figure>
                <img src="${product.image.fullpath}" alt="">
            </figure>
            <div class="comments">
                <p>8</p>
                <span class="material-icons">
                    message
                </span>
            </div>
            <h3>${product.title}</h3>
            <p class="teaser">${product.teaser}</p>
            <a href="product/${product.id}">Se mere</a>
          </article>
          `;
          }

        }
      }
    });
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
}

// SKal måske bruges
// this.http.get(this.configUrlComments + product.id, { headers }).subscribe(resp => resp)