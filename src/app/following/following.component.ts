import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit {
  loggedInUser : any;
  followings : any; 
  constructor(private service : ServiceService, private toastr: ToastrService, private spinner: NgxSpinnerService) { 
    
  }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.service.getLocalData("user"));
    this.getAllFollowings();
  }

  getAllFollowings()
  {
    this.spinner.show();
    this.service.getAllFollowings(this.loggedInUser?.id).subscribe((res)=>{
      var result = JSON.parse(JSON.stringify(res));
        if(result?.successful == true)
        {
          this.followings = result?.data;
          this.spinner.hide();
          
        }
        else{
          //alert(result?.message);
          this.spinner.hide();
          this.toastr.error(result?.message);
        }
    },(err)=>{
      //alert("err");
      this.spinner.hide();
      this.toastr.error("Error");
    });
  }

  onUnFollow(otherUserId:any){
    this.spinner.show();
    this.service.unFollow(otherUserId,this.loggedInUser?.id).subscribe((res)=>{
      this.spinner.hide();
      var result = JSON.parse(JSON.stringify(res));
        if(result?.successful == true)
        {
          this.getAllFollowings();
          this.service.subject.next(true);
         //console.log(result?.message)
        }
        else{
          //alert(result?.message);
          this.toastr.error(result?.message);
        }
    },(err)=>{
      //alert("err")
      this.spinner.hide();
      this.toastr.error("Error");
    });
  }

}
