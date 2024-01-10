import axios from "axios";

axios.defaults.baseURL = "http://192.168.2.9:8000";
axios.defaults.headers.common["Authorization"] = localStorage.getItem("jwt");

class base {
  createTimeoutPromise() {
    const timeoutDuration = 5000;
    return new Promise((_, reject) => {
      setTimeout(() => {
        reject(new Error("Request timed out"));
      }, timeoutDuration);
    });
  }

  async get(url) {
    try {
      const response = await Promise.race([
        axios.get(url),
        this.createTimeoutPromise(),
      ]);
      return response?.data;
    } catch (error) {
      return error;
    }
  }

  async post(url, data) {
    try {
      const response = await Promise.race([
        axios.post(url, data),
        this.createTimeoutPromise(),
      ]);
      return response?.data;
    } catch (error) {
      return error;
    }
  }

  async put(url, data) {
    try {
      const response = await Promise.race([
        axios.put(url, data),
        this.createTimeoutPromise(),
      ]);
      return response?.data;
    } catch (error) {
      return error;
    }
  }

  async delete(url) {
    try {
      const response = await Promise.race([
        axios.delete(url),
        this.createTimeoutPromise(),
      ]);
      return response?.data;
    } catch (error) {
      return error.response.data;
    }
  }
}

export const api = new base();