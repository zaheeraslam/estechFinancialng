import { Component, Input, OnInit } from '@angular/core';
import { CardService } from '../../../../shared';

@Component({
    selector: 'app-notification',
    templateUrl: './notification.component.html',
    styleUrls: ['./notification.component.scss']
})
export class NotificationComponent implements OnInit {
   
    favourites: any[];
    userId:any;
    cardType: any=2;
    constructor(private service: CardService) { 
        this.userId = sessionStorage.getItem('user_ID');
        this.service.getCards(this.userId, this.cardType)
        .subscribe(res =>{
            this.favourites = res.json();
        });
    }
    ngOnInit() { }
}
