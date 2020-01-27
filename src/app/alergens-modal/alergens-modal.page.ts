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
    if(this.alergens.length === 0) {
      this.alergens = [
        {
          id: 1,
          alergen: "Pescado"
        },
        {
          id: 2,
          alergen: "Maní"
        },
        {
          id: 3,
          alergen: "Leche"
        },
        {
          id: 4,
          alergen: "Gluten"
        }
      ]
    }
  }

  dismissModal() {
    this.modalController.dismiss({
      selectedAlergens: this.alergens
    });
  }
}
