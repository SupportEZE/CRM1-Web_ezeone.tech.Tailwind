import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule, Location } from '@angular/common';


@Component({
  selector: 'app-error404',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './error404.component.html',
  styleUrl: './error404.component.scss'
})


export class Error404Component {
  lat: number | null = null;
  lng: number | null = null;
  
  constructor(public location: Location){}
  
  back(): void {
    this.location.back()
  }
  
  // getCurrentLocation() {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const latitude = position.coords.latitude;
  //         const longitude = position.coords.longitude;
          
  //         console.log('User location:', latitude, longitude);
          
  //         // Save to form / component state
  //         this.lat = latitude;
  //         this.lng = longitude;
  //         this.getAddressFromCoords(latitude, longitude);
          
  //       },
  //       (error) => {
  //         console.error('Error getting location:', error);
  //       },
  //       {
  //         enableHighAccuracy: true, // more accurate
  //         timeout: 5000,
  //         maximumAge: 0
  //       }
  //     );
  //   } else {
  //     alert('Geolocation is not supported by your browser.');
  //   }
  // }
  
  // getAddressFromCoords(lat: number, lng: number) {
  //   const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}&zoom=18&addressdetails=1`;
    
  //   fetch(url, {
  //     headers: {
  //       'Accept-Language': 'en'  // Optional: set language
  //     }
  //   })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data, 'data');
      
  //     const address = data.address;
  //     const pincode = address.postcode || '';
  //     const city = address.city || '';
  //     const district = address.county || address.state_district || '';
  //     const state = address.state || '';
  //     const display_name = data.display_name || '';

      
  //     console.log('📌 Pincode:', pincode);
  //     console.log('🏙️ City:', city);
  //     console.log('🏙️ District:', district);
  //     console.log('🗺️ State:', state);
  //     console.log('🗺️ Address:', display_name);

      
      
  //   })
  //   .catch(error => {
  //     console.error('Reverse geocoding error:', error);
  //   });
  // }
}
