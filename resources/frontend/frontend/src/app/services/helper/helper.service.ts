import { NgxUiLoaderService } from 'ngx-ui-loader';
import { Observable } from 'rxjs';
import { ImageSnippet } from 'src/app/types/data-types';
import { Injectable } from '@angular/core';
import { FormArray } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})
export class HelperService {

  constructor() { }

  generateRandomSeries(lengthOfList:number,min:number,max:number){
    let series = [];

    for (let index = 0; index < lengthOfList; index++) {
      min = Math.ceil(min);
      max = Math.floor(max);
      let random = Math.floor(Math.random() * (max - min + 1)) + min;
      series.push(random);
    }

    return series;
  }

  generateRandomString(Stringlength:number):string{
    const charSet  = `ASDFGHJKLZXCVBNMQWERTYUIOP1234567890-=;<>?@#$^&*asdfghjklzxcvbnmqwertyuiop`
    let randomString = '';
    for (let i = 0; i < Stringlength; i++) {
      let randomPoz = Math.floor(Math.random() * charSet.length);
      randomString += charSet.substring(randomPoz,randomPoz+1);
   };

   return randomString;
  }

  editPhoneNumber(phone_no:string){
    if( (phone_no.length === 10) && (phone_no[0]=== "0") ){
      phone_no = phone_no.substring(1);
    }
    return phone_no;
  }

  getTagContent(text:string){
    let tag = document.createElement('div');
    tag.innerHTML = text;
    let images = tag.getElementsByTagName('img');
    let iframes = tag.getElementsByTagName('iframe');
    let imagesArray = Array.prototype.slice.call( images )
    imagesArray = imagesArray.map(
      (x) => {
        let obj = {
          tag : x.tagName,
          img : x.getAttribute('src')
        }
        return obj;
      }
    )
    let iframesArray = Array.prototype.slice.call(iframes)
    iframesArray = iframesArray.map(
      (x) => {
        let obj = {
          tag : x.tagName,
          iframe : x.getAttribute('src')
        }
        return obj;
      }
    )
    if(imagesArray.length>0){
      return imagesArray;
    }else{
      if(iframesArray.length>0){
        return iframesArray;
      }else{
        return [{
          tag : '',
          img : ''
        }]
      }
    }
  }

  createFinalForm(originalForm,selectedFile:ImageSnippet):FormData{
    originalForm.controls.image.setValue(selectedFile.file);
      let formData = new FormData();
      for (let key in originalForm.value) {
        formData.append(key, originalForm.value[key]);
      }
      formData.set('image',selectedFile.file);
      return formData;
  }

  formWithoutImage(originalForm){
    let formData = originalForm.value;
     delete formData.image;
     return formData;
   }

   getErrorsIntoArray(errorObject):any{
     let errorArray = [];
    for (const key in errorObject) {
      errorObject[key].forEach(element => {
        errorArray.push(element);
      });
    }

    return errorArray;
   }

   returnUrl(environment,text:string){
    let location =  environment.apiUrl+text;
    return `url(${location})`
   }





}
