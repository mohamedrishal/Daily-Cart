import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, } from '@angular/router';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-view-product',
  templateUrl: './view-product.component.html',
  styleUrls: ['./view-product.component.css']
})
export class ViewProductComponent implements OnInit {


  product :any={}
  constructor(private route:ActivatedRoute,private api:ApiService,private toaster:ToasterService){}

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log(res);
      const {id} = res

      // get details of particular product 
     this.getProdectDetails(id)
    

    })
  }

  getProdectDetails(id:any){
    this.api.getProductAPI(id).subscribe({
      next:(res:any)=>{
        this.product = res
      },
      error:(err:any)=>{
        console.log(err.error);
        
      }
    })
  }

  addtowishlist(product:any){
    if(sessionStorage.getItem("token")){
      
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          
          this.toaster.showSuccess(`${res.title} Added Your  Wishlist..!`)
          this.api.getWishlistCount()
        },
        error:(err:any)=>{
          this.toaster.showWarning(err.error)
        }
      })
    }else{
      this.toaster.showWarning("Operation Denied.. Please Login")
    }
  }


  addtocart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addtocartAPI(product).subscribe({
        next:(res:any)=>{
          this.toaster.showSuccess(res)
          this.api.getCartCount()
        },
        error:(err:any)=>{
          console.log(err);
          this.toaster.showError(err.error)
          
        }
      })
    }else{
      this.toaster.showWarning("Operation Denied.. Please Login")
    }
  }


}
