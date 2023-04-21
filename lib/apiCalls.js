import { Cookies as ReactCookies } from 'react-cookie';
const { URL } = process.env;

export async function loadCars(pageSize, sort) {
      const pageParam = pageSize ? '?pageSize='+pageSize : ''
      const sortParam = pageSize !== '' ? '&sortOrder=' + sort : '?sortOrder='+sort;
      const res = await fetch(URL+pageParam+sortParam)
      const data = await res.json()

      return data
  
  }

  export async function getSingleCar(id) {
    const res = await fetch(URL+'/'+id)
    const data = await res.json()

    return data

}

export async function getPictures(folder) {
  const res = await fetch(URL+'/get-pictures?folderName='+folder)
  const data = await res.json()

  return data

}

export async function uploadeImages (body) {
  const cookies = new ReactCookies();
  let apiToken = cookies.get("auth-token");
  
  const publicURL = process.env.NEXT_PUBLIC_URL
  const response = await fetch(publicURL + "/uploadFile", {
            method: "POST",
            headers: {
               'Authorization': `Bearer ${
                apiToken
              }`
             },
            body
        });

        const data = await response.json()

    return data;
}


export async function addNewCar (data) {
  const publicURL = process.env.NEXT_PUBLIC_URL
  const response = await fetch(publicURL, {
            method: "POST",
            headers: {
             // 'Authorization': 'Basic ' + base64.encode("APIKEY:X"),
              'Content-Type': 'application/json',
            },
            data
        });

    if(!response.ok) throw new Error(response.status);
    else return response;
}