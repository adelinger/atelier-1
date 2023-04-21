import axios from "axios";
import { Cookies as ReactCookies } from 'react-cookie';

export default class ApiService {
  constructor() {
    this._cookies = new ReactCookies();
    this.api_token = null;
    this.client = null;
    //this.api_url = "https://localhost:5001/api/ateliercars";
    this.api_url = process.env.NEXT_PUBLIC_URL;
  }
  init = () => {
    this.api_token = this._cookies.get("auth-token");
    let headers = {
      Accept: "application/json",
    };
    if (this.api_token) {
      headers.Authorization = `Bearer ${
        this.api_token
      }`;
    }
    this.client = axios.create({baseURL: this.api_url, timeout: 31000, headers: headers});
    return this.client;
  };
  getCarsPublic = (pageSize, sortOrder) => {
    return this.init().get('/' + '?pageSize='+pageSize +'&sortOrder=' + sortOrder);
  };
  getCars = (params) => {
    return this.init().get("get-private", {params: params});
  };
  addNewCar = async (data) => {
    try {
      const res = await this.init().post("/add", data);
      if (res.status === 200) {
        await fetch("/api/revalidate?path=/cars&secret=fDm8n8AuCG0xiYfFf6fY");
        await fetch("/api/revalidate?path=/cars/" + data.atelierCarID + "&secret=fDm8n8AuCG0xiYfFf6fY");
      }
      return res;
    } catch (error) {
      return error;
    };
    
  };
  
  updateCar = async (data) => {
    await this.init().put("/updateCar", data).then(async res => {
      if(res.status === 200){
        await fetch("/api/revalidate?path=/cars&secret=fDm8n8AuCG0xiYfFf6fY");
        await fetch("/api/revalidate?path=/cars/"+data.atelierCarID+"&secret=fDm8n8AuCG0xiYfFf6fY");
      }
      
      return res;
  })
  .catch((error) => {
    return error;
  });;
    
    
  };
  deleteCar = async (id) => {
     await this.init().delete("/"+id).then(async res => {
      if(res.status === 200){
        await fetch("/api/revalidate?path=/cars&secret=fDm8n8AuCG0xiYfFf6fY");
      }
      
      return res;
  })
  .catch((error) => {
    return error;
  });;
    
  };
  deleteFile = (fileName) => {
    return this.init().delete("/DeleteFile/"+ fileName);
  };
  updateCarStatus = async (carId, newCarStatusId) => {
    await this.init().put("/UpdateCarStatus?carId="+carId+"&newCarStatusId="+newCarStatusId)
    .then(async res => {
      if(res.status === 200){
        await fetch("/api/revalidate?path=/cars&secret=fDm8n8AuCG0xiYfFf6fY");
        await fetch("/api/revalidate?path=/cars/"+carId+"&secret=fDm8n8AuCG0xiYfFf6fY");
      }
      
      return res;
  })
  .catch((error) => {
    return error;
  });
  };
  sendEmail = (emailData) => {
    return this.init().post('/sendEmail', emailData);
  }
  checkAuth = () => {
    return this.init().post('auth');
  }
  getImages = (folderName) => {
    return this.init().post('get-images', folderName)
  }
}