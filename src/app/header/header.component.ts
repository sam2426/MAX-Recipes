import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { DataStorageService } from '../services/data-storage.service';
import { AuthService } from '../auth/auth.service';
import { User } from '../auth/user.model';
import { Router } from '@angular/router';

@Component({
    selector:'app-header',
    templateUrl:'./header.component.html',
    styleUrls:['./header.component.css']
})

export class HeaderComponent implements OnInit, OnDestroy{

    private userSub:Subscription;
    public collapsed=true;
    public isAuthenticated:boolean=false;


    constructor(private dataStoreService:DataStorageService, private authService:AuthService){}

    ngOnInit(){
        this.userSub=this.authService.user.subscribe(user=>{
            this.isAuthenticated=!!user;
            //!!user denotes true if there is a user, else if user is null it will yield false.
        });
    }

    onSaveData(){
        this.dataStoreService.storeRecipes();
    }

    fetchData(){
        this.dataStoreService.fetchRecipes().subscribe();
    }

    onLogout(){
        this.authService.logout();
    }

    ngOnDestroy(){
        this.userSub.unsubscribe();
    }

}