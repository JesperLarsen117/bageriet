import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ViewEncapsulation } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None

})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    const formData: any = new FormData();
    formData.append('username', this.loginForm.get('username').value);
    formData.append('password', this.loginForm.get('password').value);
    if (this.loginForm.get('username').value !== '' && this.loginForm.get('password').value !== '') {
      this.http.post('https://api.mediehuset.net/token', formData).subscribe(
        (response: any) => {
          console.log(response.access_token);
          if (response.access_token) {
            this.setCookie('token', response.access_token, 7);
            this.setCookie('user_id', response.user_id, 7);
            window.location.href = '/forside';
            return true;
          } else {

            return;
          }
        },
        error => {
          const err = document.getElementsByTagName('form')[0] as unknown as HTMLElement;
          console.log(err);
          if (!document.getElementsByClassName('error')[0]) {
            err.insertAdjacentHTML('afterbegin', `<p class="error">Der er noget der er gået helt galt!</p>`);
          }
        }
      );
    } else {
      const err = document.getElementsByTagName('form')[0] as unknown as HTMLElement;
      if (!document.getElementsByClassName('error')[0]) {
        err.insertAdjacentHTML('afterbegin', `<p class="error">Du skal lige huske og udfylde felterne!</p>`);
      }
    }
  }
  setCookie(cnamne, cvalue, exdays) {
    const d = new Date();
    d.setTime(d.getTime() + (exdays * 24 * 60 * 60 * 1000));
    const expires = 'expires=' + d.toUTCString;
    document.cookie = `${cnamne} = ${cvalue}; ${expires};path=/`;
  }

  focus() {
    const errMessage = document.getElementsByClassName('error')[0].remove();
  }
}
