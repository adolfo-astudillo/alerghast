import { Component } from '@angular/core';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { OpenFoodService } from '../services/openfood.service';
import { AlerghastService } from '../services/alerghast.service';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage';
import { ScanResultModal } from '../scan-result/scan-result.page';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  providers: [OpenFoodService, AlerghastService]
})
export class HomeComponent {
  currentImage: any;
  barcodeData: any;
  results: any;

  constructor(private barcodeScanner: BarcodeScanner, private openFoodService: OpenFoodService, private alerghastService: AlerghastService, private loadingController: LoadingController, private alertController: AlertController, private storage: Storage, private router: Router, private modalController: ModalController) { }

  ngOnInit() {
    //this.scanBarcode();
  }

  async getProductByBarcode(code: any) {
    const loading = await this.loadingController.create({
      message: 'Analizando...',
      translucent: true
    });
    loading.present();

    this.alerghastService.getBarcodeAnalisis(code).subscribe((res: any) => {
      loading.dismiss();
      this.barcodeData = res.product.product_name + ` - ${res.product.brands}`;
    }, err => {
      console.error(err);
      loading.dismiss();
      this.presentAlert({
        header: 'Análisis producto',
        message: 'Hubo un error al intentar analizar el producto',
        buttons: ['OK']
      })
    });
  }


  // getProductByBarcode(code:any){
  //   this.openFoodService.getProductByBarcode(code).subscribe((res: any) => {
  //     this.barcodeData = res.product.product_name + ` - ${res.product.brands}`;
  //   })
  // }


  scanBarcode() {
    this.presentModal();

    // this.barcodeScanner.scan().then(barcodeData => {
    //   if (barcodeData.text) {
    //     this.getProductByBarcode(barcodeData.text);
    //     //this.barcodeData = JSON.stringify(barcodeData);
    //     console.log('Barcode data', barcodeData);
    //   } else {
    //     this.presentModal();
    //   }
    // }).catch(err => {
    //   console.log('Error', err);
    // });
  }

  async presentAlert(alertObject: any) {
    const alert = await this.alertController.create(alertObject);
    await alert.present();
  }

  logout() {
    this.storage.remove("session");
    this.router.navigate(["/login"]);
  }

  async presentModal() {
    this.results = {
      result: 'found',
      ingredients: [
        "Avena",
        "Maní",
        "Etc",
        "122323",
        "adwkdjawd"
      ]
    };
    const modal = await this.modalController.create({
      component: ScanResultModal,
      componentProps: {
        'modalController': this.modalController,
        'results': this.results
      }
    });
    return await modal.present();
  }

}