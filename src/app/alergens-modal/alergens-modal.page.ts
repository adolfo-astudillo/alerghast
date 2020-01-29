import { Component, Input } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alergens-modal',
  templateUrl: 'alergens-modal.page.html',
  styleUrls: ['alergens-modal.page.scss']
})
export class AlergensModal {
  @Input() modalController: ModalController;
  @Input() alergens: Array<any> = [];
  

  constructor() {
  }

  ngOnInit() {
  }

  dismissModal() {
    this.modalController.dismiss({
      selectedAlergens: this.alergens
    });
  }
}
