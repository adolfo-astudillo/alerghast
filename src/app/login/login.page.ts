import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { LoadingController, AlertController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-login',
  templateUrl: 'login.page.html',
  styleUrls: ['login.page.scss'],
  providers: [UsersService]
})
export class LoginComponent {
  formData: any = {};

  constructor(private userService: UsersService, private loadingController: LoadingController, private alertController: AlertController, private router: Router, private storage: Storage) {
    this.storage.get("session").then((val) => {
      if (val) {
        this.router.navigate(['/home']);
      }
    });
  }

  ngOnInit() {
  }

  async login() {
    const loading = await this.loadingController.create({
      message: 'Logueando...',
      translucent: true
    });
    loading.present();

    this.userService.login(this.formData).subscribe((res: any) => {
      loading.dismiss();
      if (res.status == "OK") {
        this.storage.set('session', this.formData.email);
        this.router.navigate(['/home']);
      } else {
        this.presentAlert({
          header: 'Login Alerghast',
          message: 'Credenciales incorrectas',
          buttons: ['OK']
        });
      }
    }, err => {
      console.error(err);
      loading.dismiss();
      this.presentAlert({
        header: 'Login Alerghast',
        message: 'Hubo un error al intentar hacer login.',
        buttons: ['OK']
      });
    });
  }

  async presentAlert(alertObject: any) {
    const alert = await this.alertController.create(alertObject);
    await alert.present();
  }
}
