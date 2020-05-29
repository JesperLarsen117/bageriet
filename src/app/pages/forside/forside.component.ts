import { Component, OnInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
import { HttpService } from '../../services/http.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forside',
  templateUrl: './forside.component.html',
  styleUrls: ['./forside.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ForsideComponent implements OnInit {
  form: FormGroup;

  data: any;
  constructor(private httpService: HttpService) {


  }

  ngOnInit() {



    this.httpService.getData();
    this.data = this.httpService.getData().pipe().subscribe(res => this.data = res);

    window.addEventListener('load', (event) => {
      const imageslider = document.querySelector('.slider');
      const btnLeft = document.getElementById('button_left');
      const btnRight = document.getElementById('button_right');
      const sliders = document.querySelectorAll('.slider figure') as NodeListOf<HTMLElement>;
      const points = document.getElementById('points');
      let move = 1;
      let counter = 0;

      btnRight.onclick = _ => {
        const allPoints = document.getElementsByClassName('point') as HTMLCollectionOf<HTMLElement>;
        console.log(typeof allPoints);

        console.log(allPoints);

        for (let i = 0; i < allPoints.length; i++) {
          allPoints[i].style.opacity = '.5';
        }
        allPoints[counter + 1].style.opacity = '1';

        if (counter < sliders.length - 1) {
          counter++;
          move = imageslider.clientWidth * counter;
          for (let i = 0; i < sliders.length; i++) {
            sliders[i].style.transform = `translateX(-${move}px)`;
          }
        }
      };
      btnLeft.onclick = _ => {
        const allPoints = document.getElementsByClassName('point') as HTMLCollectionOf<HTMLElement>;
        if (counter >= 1) {
          counter--;
          for (let i = 0; i < allPoints.length; i++) {
            allPoints[i].style.opacity = '.5';
          }
          allPoints[counter].style.opacity = '1';
          move = imageslider.clientWidth * counter;
          for (let i = 0; i < sliders.length; i++) {
            sliders[i].style.transform = `translateX(-${move}px)`;
          }
        }
      };
      for (let i = 0; i < sliders.length; i++) {
        points.innerHTML += `<div class="point"></div>`;
      }
    });
  }
}
