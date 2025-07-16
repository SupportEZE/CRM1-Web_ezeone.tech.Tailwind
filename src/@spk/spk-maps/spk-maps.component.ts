import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, EventEmitter, forwardRef, Input, Output, SimpleChanges } from '@angular/core';
import { MaterialModuleModule } from '../../app/material-module/material-module.module';
import * as L from 'leaflet';
import { DataNotFoundComponent } from '../../app/shared/components/data-not-found/data-not-found.component';


@Component({
  selector: 'app-spk-maps',
  imports: [CommonModule, MaterialModuleModule, DataNotFoundComponent],
  templateUrl: './spk-maps.component.html',
})
export class SpkMapsComponent {
  @Input() data !: any
  myMap: any;
  address:any;
  hasLocation = false;
  constructor(public cdr:ChangeDetectorRef) {
  }
  
  
  ngOnChanges(){}
  
  ngOnInit() {
    // const mapContainerId = 'map';
    // setTimeout(() => {
    //   this.myMap = L.map(mapContainerId).setView([this.data.lat, this.data.long], 16);

    //   L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    //     maxZoom: 22,
    //     attribution: '&copy; OpenStreetMap contributors'
    //   }).addTo(this.myMap);

    //   const icon = L.icon({
    //     iconUrl: 'assets/images/pin-marker.gif',
    //     iconSize: [30, 33],
    //     iconAnchor: [15, 33],
    //     popupAnchor: [0, -30]
    //   });

    //   const marker = L.marker([this.data.lat, this.data.long], { icon }).addTo(this.myMap);

    //   const showPopup = (popupAddress: string) => {
    //     marker.bindPopup(`<strong>Address:</strong><br>${popupAddress}`).openPopup();
    //   };

    //   if (this.address?.trim()) {
    //     showPopup(this.address);
    //   } else {
    //     // Reverse geocode using Nominatim
    //     const lat = this.data.lat;
    //     const lng = this.data.long;

    //     fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, {
    //       headers: {
    //         'User-Agent': 'YourAppNameHere/1.0'
    //       }
    //     })
    //       .then(response => response.json())
    //       .then(data => {
    //         const generatedAddress = data.display_name || 'No address found';
    //         showPopup(generatedAddress);
    //       })
    //       .catch(error => {
    //         console.error('Reverse geocoding failed:', error);
    //         showPopup('No address available');
    //       });
    //   }
    // }, 100);

    const lat = this.data?.lat;
    const lng = this.data?.long;

    if (lat == null || lng == null) {
      this.hasLocation = false;
      return;
    }

    this.hasLocation = true;
    const mapContainerId = 'map';

    setTimeout(() => {
      this.myMap = L.map(mapContainerId).setView([lat, lng], 16);

      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 22,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(this.myMap);

      const icon = L.icon({
        iconUrl: 'assets/images/pin-marker.gif',
        iconSize: [30, 33],
        iconAnchor: [15, 33],
        popupAnchor: [0, -30]
      });

      const marker = L.marker([lat, lng], { icon }).addTo(this.myMap);

      const showPopup = (popupAddress: string) => {
        marker.bindPopup(`<strong>Address:</strong><br>${popupAddress}`).openPopup();
      };

      if (this.address?.trim()) {
        showPopup(this.address);
      } else {
        fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${lat}&lon=${lng}`, {
          headers: {
            'User-Agent': 'YourAppNameHere/1.0'
          }
        })
          .then(response => response.json())
          .then(data => {
            const generatedAddress = data.display_name || 'No address found';
            showPopup(generatedAddress);
          })
          .catch(error => {
            console.error('Reverse geocoding failed:', error);
            showPopup('No address available');
          });
      }
    }, 100);
  }
}
