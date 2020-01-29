import { Component } from '@angular/core';
import { AlergensModal } from '../alergens-modal/alergens-modal.page';
import { ModalController, AlertController, LoadingController } from '@ionic/angular';
import { UsersService } from '../services/users.service';
import { AlerghastService } from '../services/alerghast.service';

@Component({
  selector: 'app-register-user',
  templateUrl: 'register-user.page.html',
  styleUrls: ['register-user.page.scss'],
  providers: [UsersService, AlerghastService]
})
export class RegisterUserComponent {

  formData: any = {
    alergens: [{}]
  };

  alergens: Array<any>;

  selectedAlergens: Array<any> = [];
  selectedAlergensAmount: number = 0;

  constructor(private loadingController: LoadingController, private usersService: UsersService, public modalController: ModalController, private alertController: AlertController, private alerghastService: AlerghastService) {
  }

  ngOnInit() {
    this.getAlergens();
  }

  async registerUser() {
    if (this.selectedAlergensAmount < 1) {
      this.presentAlert({
        header: 'Registrar cuenta Alerghast',
        message: 'Todos los campos son requeridos y debes seleccionar al menos 1 alérgeno.',
        buttons: ['OK']
      });
    } else {
      if (!this.validatePassword()) {
        this.presentAlert({
          header: 'Registrar cuenta Alerghast',
          message: 'La contraseña no es la misma',
          buttons: ['OK']
        });
      } else {
        let body = JSON.parse(JSON.stringify(this.formData));
        delete body.passwordRepeat;
        console.log("body", body);

        const loading = await this.loadingController.create({
          message: 'Registrando...',
          translucent: true
        });
        loading.present();

        this.usersService.addUser(body).subscribe((res: any) => {
          loading.dismiss();
          this.presentAlert({
            header: 'Registrar cuenta Alerghast',
            message: 'El usuario se ha registrado exitosamente.',
            buttons: ['OK']
          })
          console.log("res", res);
        }, err => {
          console.error(err);
          loading.dismiss();
          this.presentAlert({
            header: 'Registrar cuenta Alerghast',
            message: 'Hubo un error al intentar registrar el usuario',
            buttons: ['OK']
          })
        });
      }
    }
  }

  async presentModal() {
    const modal = await this.modalController.create({
      component: AlergensModal,
      componentProps: {
        'modalController': this.modalController,
        'alergens': this.selectedAlergens
      }
    });
    modal.onDidDismiss().then(data => {
      this.selectedAlergens = data.data.selectedAlergens;
      this.selectedAlergensAmount = this.selectedAlergens.filter(alergen => alergen.isChecked).length;
      this.formData.alergens = this.getAlergenSelection();
      console.log("test", this.selectedAlergens);
    });
    return await modal.present();
  }

  getAlergenSelection() {
    let selectedAlergens = JSON.parse(JSON.stringify(this.selectedAlergens.filter(alergen => alergen.isChecked)));
    selectedAlergens.map(alergen => {
      delete alergen.isChecked;
    })

    return selectedAlergens;
  }

  async presentAlert(alertObject: any) {
    const alert = await this.alertController.create(alertObject);
    await alert.present();
  }

  validatePassword() {
    return this.formData.password == this.formData.passwordRepeat
  }

  async getAlergens() {
    this.alerghastService.getAlergens().subscribe((res: any) => {
      this.alergens = res.alergens;
    }, error => {
      this.presentAlert({
        header: 'Registrar cuenta Alerghast',
        message: 'Hubo un error al intentar obtener los alergenos',
        buttons: ['OK']
      })
    })
  }
}
