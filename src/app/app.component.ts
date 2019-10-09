import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeStyle, SafeHtml } from '@angular/platform-browser';
import { conspService } from '../services/get-consp-service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css', '../assets/static/fonts.css']
})
export class AppComponent {
    title = 'conspectus-angular';
    consp_info:any;
    safe_images:SafeStyle[] = [];
    safe_prev: SafeStyle;
    description: SafeHtml;
    constructor(private conspServ: conspService, private sanitizer: DomSanitizer){
        this.consp_info = "";
    }
    ngOnInit(){
        this.consp_info = this.conspServ.getConspect();
        this.description = this.sanitizer.bypassSecurityTrustHtml(this.consp_info.description);
        this.safe_prev = this.sanitizer.bypassSecurityTrustStyle(`url(${this.consp_info.preview})`);
        for(let img of this.consp_info.images){
            this.safe_images.push(this.sanitizer.bypassSecurityTrustStyle(`url(${img})`));
        }
    }
}
