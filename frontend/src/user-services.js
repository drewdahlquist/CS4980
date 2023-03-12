import axios from 'axios';


export async function getTasks() {
  return await resolve(axios.get('http://localhost:4980/user/1/task').then(res => res.data));
}

export async function getUser(id) {
  return await resolve(axios.get(`http://some-api.com/users/${id}`).then(res => res.data));
}

async function resolve(promise) {
    const resolved = {
      data: null,
      error: null
    };
  
    try {
      resolved.data = await promise;
    } catch(e) {
      resolved.error = e;
    }
  
    return resolved;
  }