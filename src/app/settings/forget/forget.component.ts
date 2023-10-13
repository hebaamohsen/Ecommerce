import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ForgetpasswordService } from 'src/app/services/forgetpassword.service';



@Component({
  selector: 'app-forget',
  templateUrl: './forget.component.html',
  styleUrls: ['./forget.component.scss']
})
export class ForgetComponent {
  constructor(private _ForgetpasswordService:ForgetpasswordService, private _Router:Router){}

  step1:boolean= true;
  step2:boolean = false;
  step3:boolean = false;
  email:string='';
  userMsg:string='';

  forgetForm:FormGroup= new FormGroup({
    email:new FormControl('')
  })

  resetCodeForm:FormGroup= new FormGroup({
    resetCode:new FormControl('')
  })

  newPasswordForm:FormGroup= new FormGroup({
    newPassword:new FormControl('',[Validators.pattern(/^\w{6,}$/)])
  })

  forgetPassword():void{
    let userEmail = this.forgetForm.value;
    this.email = userEmail.email;
    
    this._ForgetpasswordService.forgetPassword(userEmail).subscribe({
      next:(response)=>{
        console.log(response);
        this.userMsg = response.message;
        this.step1 = false;
        this.step2 = true;
        
      },
      error:(err)=>{
        this.userMsg = err.error.message;
      }
    })

  }

  resetCode():void{
    let resetCode = this.resetCodeForm.value;
    this._ForgetpasswordService.resetCode(resetCode).subscribe({
      next:(response)=>{
        console.log(response);
        this.userMsg = response.status;
        this.step2=false;
        this.step3=true;
        
      },
      error:(err)=>{
        this.userMsg = err.error.message;
      }
    })

  }

  newPassword():void{
    let newPass = this.newPasswordForm.value;
    newPass.email = this.email;
    this._ForgetpasswordService.resetPassword(newPass).subscribe({
      next:(response)=>{
        console.log(response);
        if(response.token){
          localStorage.setItem('token',response.token);
          this._Router.navigate(['/home']);
        }
        
      },
      error:(err)=>{
        this.userMsg = err.error.message;
      }
    })
  }
}
