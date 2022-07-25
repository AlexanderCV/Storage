import { Component, OnInit } from '@angular/core';
import { Storage, ref , uploadBytes , listAll ,getDownloadURL } from '@angular/fire/storage'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  images: string[];

  constructor(private storage:Storage){
    
    this.images = [];
  }
  ngOnInit(): void {
    this.getImages();
  }
  uploadImage($event: any){

  const file = $event.target.files[0];
  console.log(file);
  
  // ACA SE TIENE LA REFERENCIA EL ESPACIO DONDE SE TIENE LA IMAGEN
  const imgRef =  ref(this.storage,`images/${file.name}`); 

  //SUBIENDO LAS IMÁGENES
  uploadBytes(imgRef, file)
    .then( response => {
      console.log(response)
      this.getImages();
    })
    .catch(err => console.log(err));

  }

  getImages(){
    const imagesRef = ref(this.storage, 'images');

    listAll(imagesRef)
      .then (async response =>{
        console.log(response);
        this.images = [];

        for (const item of response.items) {
          const url = await getDownloadURL(item);
          this.images.push(url);
        }

    }).catch(error => console.log(error));
  }

}
