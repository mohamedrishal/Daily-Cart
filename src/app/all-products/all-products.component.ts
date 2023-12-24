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
      this.toastr.showSuccess("Proceed to add item to wishlist")
    }else{
      this.toastr.showWarning("Operation Denied.. Please Login")
    }
  }

  addtocart(product:any){
    if(sessionStorage.getItem("token")){
      this.toastr.showSuccess("Proceed to add item to cart")
    }else{
      this.toastr.showWarning("Operation Denied.. Please Login")
    }
  }

}
