import { Component,OnInit  } from '@angular/core';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';

@Component({
  selector: 'app-all-products',
  templateUrl: './all-products.component.html',
  styleUrls: ['./all-products.component.css']
})
export class AllProductsComponent implements OnInit {

  allProducts:any = []


  constructor(private api: ApiService,private toastr:ToasterService) {}


  ngOnInit(): void {
    this.api.getAllProductsAPI().subscribe((res: any) => {
      this.allProducts = res; // Ensure that res is an array or the expected structure
    });
  }

  addtowishlist(product:any){
    if(sessionStorage.getItem("token")){
      
      this.api.addToWishlistAPI(product).subscribe({
        next:(res:any)=>{
          this.toastr.showSuccess(`${res.title} Added Your  Wishlist..!`)
          this.api.getWishlistCount()
        },
        error:(err:any)=>{
          this.toastr.showWarning(err.error)
        }
      })
    }else{
      this.toastr.showWarning("Operation Denied.. Please Login")
    }
  }

  addtocart(product:any){
    if(sessionStorage.getItem("token")){
      Object.assign(product,{quantity:1})
      this.api.addtocartAPI(product).subscribe({
        next:(res:any)=>{
          this.toastr.showSuccess(res)
          this.api.getCartCount()
        },
        error:(err:any)=>{
          console.log(err);
          this.toastr.showError(err.error)
          
        }
      })
    }else{
      this.toastr.showWarning("Operation Denied.. Please Login")
    }
  }

}
