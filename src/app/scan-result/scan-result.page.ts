import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-scan-result',
  templateUrl: 'scan-result.page.html',
  styleUrls: ['scan-result.page.scss']
})
export class ScanResultModal {
  @Input() modalController: ModalController;
  @Input() results: any;
  

  constructor() {
  }

  ngOnInit() {

  }

  dismissModal() {
    this.modalController.dismiss();
  }
}
