import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  SERVER_URL = "http://localhost:3000"

  wishlistCount = new BehaviorSubject(0)
  cartCount = new BehaviorSubject(0)

  constructor(private http:HttpClient) { 
    if (sessionStorage.getItem("token")) {
      this.getWishlistCount()
      this.getCartCount()
      
    }
  }


  getAllProductsAPI(){
    return this.http.get(`${this.SERVER_URL}/products/all`)
  }

  registerAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/register`,user)
  }

  loginAPI(user:any){
    return this.http.post(`${this.SERVER_URL}/user/login`,user)
  }

  getProductAPI(id:any){
    return this.http.get(`${this.SERVER_URL}/product/get/${id}`)
  }


  appendTokenToHeader(){
    let headers = new HttpHeaders()
    const token = sessionStorage.getItem("token")
    if(token){
      headers = headers.append("Authorization",`Bearer ${token}`)
    }
    return {headers}
  }

  addToWishlistAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/wishlist/add`,product,this.appendTokenToHeader())
  }

  // wishlist/get-allproducts
  getWishlistAPI(){
    return this.http.get(`${this.SERVER_URL}/wishlist/get-allProducts`,this.appendTokenToHeader())
  }

  getWishlistCount(){
    this.getWishlistAPI().subscribe((res:any)=>{
      this.wishlistCount.next(res.length)
    })
  }

  deleteWishlistAPI(id:any){
    return this.http.delete(`${this.SERVER_URL}/wishlist/remove/${id}`,this.appendTokenToHeader())
  }

  // addto cart
  addtocartAPI(product:any){
    return this.http.post(`${this.SERVER_URL}/cart/add`,product,this.appendTokenToHeader())
  }

  // getcart
  getCartAPI(){
    return this.http.get(`${this.SERVER_URL}/car/get-all-products`,this.appendTokenToHeader())
  }

  getCartCount(){
    this.getCartAPI().subscribe((res:any)=>{
      this.cartCount.next(res.length)
    })
  }

}
