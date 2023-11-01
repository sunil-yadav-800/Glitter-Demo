import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http'
import { Subject } from 'rxjs/internal/Subject';
@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  public subject = new Subject<boolean>();
  basrUrl = "https://sunil801.bsite.net";
  //basrUrl = "https://localhost:44314";
  constructor(private httpClient: HttpClient) { 

  }
  isLoggedIn()
  {
    return !!localStorage.getItem("token");
  }
  login(email:any, password:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/User/login/${email}/${password}`);
  }
  register(formData:any)
  {
   // debugger;
  //  const headers = new HttpHeaders();
  //  headers.set('Accept', 'application/json');
  //  headers.delete('Content-Type');
  //,{reportProgress:true,observe:'events'}
    return this.httpClient.post(this.basrUrl+'/api/User/addUser/',formData);
  }

  addTweet(payload:any)
  {
    return this.httpClient.post(this.basrUrl+'/api/Tweet/addTweet/',payload);
  }
  getAllTweets(id:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Tweet/getAllTweets/${id}`);
  }
  deleteTweet(id:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Tweet/deleteTweet/${id}`);
  }
  like(tweetId:any, userId:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Like/like/${tweetId}/${userId}`);
  }
  disLike(tweetId:any, userId:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Like/disLike/${tweetId}/${userId}`);
  }
  followerCount(userId:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Follower/followerCount/${userId}`);
  }
  followingCount(userId:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Follower/followingCount/${userId}`);
  }
  editTweet(payload:any)
  {
    return this.httpClient.post(this.basrUrl+'/api/Tweet/editTweet/',payload);
  }
  getAllFollowers(userId:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Follower/getAllFollowers/${userId}`);
  }
  getAllFollowings(userId:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Follower/getAllFollowings/${userId}`);
  }
  follow(otherUserId: any, loggedInUserId : any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Follower/follow/${otherUserId}/${loggedInUserId}`);
  }
  unFollow(otherUserId: any, loggedInUserId : any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Follower/unFollow/${otherUserId}/${loggedInUserId}`);
  }
  searchPeople(searchTerm:any, loggedInUserId:any)
  {
    return this.httpClient.get(this.basrUrl+`/api/Search/searchPeople/${searchTerm}/${loggedInUserId}`);
  }
  searchTweet(searchTerm:any, loggedInUserId:any){
    return this.httpClient.get(this.basrUrl+`/api/Search/searchTweet/${searchTerm}/${loggedInUserId}`);
  }

  setLocalData(key:any, value:any) {
    localStorage.setItem(key, value);
  }
 
  getLocalData(key:any) :any {
    return localStorage.getItem(key);  
  }

  removeLocalData(key:any) {
    localStorage.removeItem(key);
  }

  removeAllLocalData() {
    localStorage.clear();
  }
}
