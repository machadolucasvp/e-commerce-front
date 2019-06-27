import { Injectable } from '@angular/core';
import { STORAGE_KEY } from 'src/config/localstorageKey.config';
import { LocalUser } from 'src/models/local_users';
import { Cart } from 'src/models/cart.dto';

@Injectable()
export class StorageService{

    getLocalUser() : LocalUser {
        let usr = localStorage.getItem(STORAGE_KEY.localUser);
        if (usr == null){
            return null;
        }
        else{
            return JSON.parse(usr);
        }
    }

    setLocalUser(object : LocalUser){
        if (object == null){
            localStorage.removeItem(STORAGE_KEY.localUser);
        }
        else{
            localStorage.setItem(STORAGE_KEY.localUser, JSON.stringify(object));
        }
    }

    getCart() : Cart{
        let cart = localStorage.getItem(STORAGE_KEY.cart);
        if (cart == null){
            return null;
        }
        else{
            return JSON.parse(cart);
        }

    }
    setCart(object : Cart){
        if (object == null){
            localStorage.removeItem(STORAGE_KEY.cart);
        }
        else{
            localStorage.setItem(STORAGE_KEY.cart, JSON.stringify(object));
        }

    }

}