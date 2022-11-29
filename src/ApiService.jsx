import axios from 'axios';

export const getAuth = async () => {
  return await axios.get(`/api/digit/GetUsername/`);
}

export const workerGet = async (workerName) => {
  return await axios.get(`/api/digit/worker/${workerName}`);
}

export const workerPost = async (workerName, body) => {
    return await axios.post(`/api/digit/worker/${workerName}`, body);
  }
  
export const workerPatch = async (workerName, body) => {
  return await axios.patch(`/api/digit/worker/${workerName}`, body);
}

export const workflowStart = async (workflowName, body) => {
  return await axios.post(`/api/digit/workflow/${workflowName}`, body);
}

export const authSignIn = () => {
  window.location.replace(`/Auth/SignIn?ReturnUrl=${window.location.href}&forceNewSignIn=true`)
  // window.location.replace(`http://localhost:8000/Auth/SignIn?ReturnUrl=${window.location.href}&forceNewSignIn=true`)
}

export const authSignOut = () => {
  window.location.replace(`/Auth/SignOut?ReturnUrl=${window.location.href}`)
  // window.location.replace(`http://localhost:8000/Auth/SignOut?ReturnUrl=${window.location.href}`)
}

