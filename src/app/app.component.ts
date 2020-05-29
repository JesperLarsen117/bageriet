import { Component, OnInit } from '@angular/core';
import { HttpService } from './services/http.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],


})
export class AppComponent {
  data: any;
  constructor(private httpService: HttpService) {
  }
  ngOnInit() {
    this.httpService.getData();
    this.data = this.httpService.getData().pipe().subscribe(res => this.data = res);

  }
}
