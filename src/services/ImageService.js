import axios from "axios";

const BASE_URL = process.env.REACT_APP_IMAGE_SERVICE_URL;

class ImageService {
  getTest() {
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + '/api/data') 
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
          console.log(data);
        })
        .catch(error => {
          reject(error);
          console.error('Error fetching data:', error);
        });
    });
  }


bufferToBase64(buffer) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([new Uint8Array(buffer)], { type: 'image/png' });
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result;
      console.log("Base64 String (Client):", base64String.substring(0, 50)); 
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}

getAllImages() {
  return new Promise((resolve, reject) => {
    fetch(BASE_URL + '/api/images', {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Network response was not ok: ${response.statusText}`);
        }
        return response.json();
      })
      .then(async data => {
        console.log('Received raw data from server:', data);


        const promises = data.map(async imageData => {
          const base64String = await this.bufferToBase64(imageData.image.data);
          imageData.image = base64String;
          console.log("Image length (Client):", base64String.length);
        });
        await Promise.all(promises);

        resolve(data);
        console.log('Transformed data with base64 images (Client):', data);
      })
      .catch(error => {
        reject(error);
        console.error('Error fetching data:', error);
      });
  });
}

  
  
bufferToBase64(buffer) {
  return new Promise((resolve, reject) => {
    const blob = new Blob([new Uint8Array(buffer)], { type: 'image/png' });
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = atob(reader.result.split(',')[1]);
      console.log("Base64 String (Client):", base64String.substring(0, 50)); 
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
}
  
  
  

  postImage(base64String){     
    console.log("Posting image=",base64String)
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + '/api/image', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ image: base64String }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
          console.log(data);
        })
        .catch(error => {
          reject(error);
          console.error('Error fetching data:', error);
        }); 
    });
  }

  putImage(base64String,id){
    console.log("Putting image=",base64String)
    return new Promise((resolve, reject) => {
      fetch(BASE_URL + '/api/image', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: id, image: base64String }),
      })
        .then(response => {
          if (!response.ok) {
            throw new Error(`Network response was not ok: ${response.statusText}`);
          }
          return response.json();
        })
        .then(data => {
          resolve(data);
          console.log(data);
        })
        .catch(error => {
          reject(error);
          console.error('Error fetching data:', error);
        }); 
    });
  }
}

export default new ImageService();
