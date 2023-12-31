import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { ToasterService } from '../services/toaster.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  constructor(private fb:FormBuilder,private api:ApiService,private toaster:ToasterService,private router:Router){}

loginForm = this.fb.group({
    email:['',[Validators.required,Validators.email]],
    password:['',[Validators.required,Validators.pattern('[a-zA-Z0-9]*')]]
  })

  
login(){

  if(this.loginForm.valid){
   const password = this.loginForm.value.password
   const email = this.loginForm.value.email
   const user = {email,password}
   this.api.loginAPI(user).subscribe({
     next:(res:any)=>{
       this.toaster.showSuccess(`${res.existingUser.username} Login Successfully!!`)
       sessionStorage.setItem("username",res.existingUser.username)
       sessionStorage.setItem("token",res.token)
       this.api.getWishlistCount()
       this.api.getCartCount()
       this.loginForm.reset()
       this.router.navigateByUrl("")
     },
     error:(data:any)=>{
       this.toaster.showError(data.error)
     }
   })
  }else{
   this.toaster.showWarning("Invalid Form!!")
  }
 }
  

}
