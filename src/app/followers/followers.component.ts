import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';

import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from "ngx-spinner";
@Component({
  selector: 'app-followers',
  templateUrl: './followers.component.html',
  styleUrls: ['./followers.component.css']
})
export class FollowersComponent implements OnInit {
 loggedInUser : any;
 followers : any; 
  constructor(private service: ServiceService, private toastr: ToastrService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.loggedInUser = JSON.parse(this.service.getLocalData("user"));
    this.getAllFollowers();
  }

  getAllFollowers()
  {
    this.spinner.show();
    this.service.getAllFollowers(this.loggedInUser?.id).subscribe((res)=>{
      var result = JSON.parse(JSON.stringify(res));
        if(result?.successful == true)
        {
          this.followers = result?.data;
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

  onFollow(otherUserId:any){
    this.spinner.show();
    this.service.follow(otherUserId,this.loggedInUser?.id).subscribe((res)=>{
      this.spinner.hide();
      var result = JSON.parse(JSON.stringify(res));
        if(result?.successful == true)
        {
          this.getAllFollowers();
          this.service.subject.next(true);
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
  onUnFollow(otherUserId:any){
    this.spinner.show();
    this.service.unFollow(otherUserId,this.loggedInUser?.id).subscribe((res)=>{
      this.spinner.hide();
      var result = JSON.parse(JSON.stringify(res));
        if(result?.successful == true)
        {
          this.getAllFollowers();
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
