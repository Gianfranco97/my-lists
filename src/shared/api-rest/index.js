const API = {
  serverURL: "https://apitrello.herokuapp.com/",

  makeRequest(request, callback) {
    return new Promise(async (resolve, reject) => {
      try {
        const res = await fetch(request.url, {
          method: request.method || "GET",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            AUTHORIZATION: `Bearer ${sessionStorage.getItem("session-token")}`
          },
          body: request.data && JSON.stringify(request.data),
        });

        let responseData

        const contentType = res.headers.get("content-type");
        if (contentType && contentType.indexOf("application/json") !== -1) {
          responseData = await res.json();
        } else {
          responseData = await res.text();
        }

        if (callback) callback(responseData);

        if (res.status >= 400 && res.status < 600) {
          reject(responseData);
        } else {
          resolve(responseData);
        }

      } catch (error) {
        reject(error);
      }
    });
  },

  login(username, password) {
    return this.makeRequest({
      url: `${this.serverURL}users/login`,
      method: "POST",
      data: { username, password },
    });
  },

  register(username, password) {
    return this.makeRequest({
      url: `${this.serverURL}users`,
      method: "POST",
      data: { username, password },
    });
  },

  logout() {
    return this.makeRequest({
      url: `${this.serverURL}logout`,
      method: "PUT",
    });
  },

  getMyLists() {
    return this.makeRequest({
      url: `${this.serverURL}list`,
    });
  },

  getList(id) {
    return this.makeRequest({
      url: `${this.serverURL}lists/${id}`,
    });
  },

  getTasks(listID) {
    return this.makeRequest({
      url: `${this.serverURL}list/tasks/${listID}`,
    });
  },

  getTask(id) {
    return this.makeRequest({
      url: `${this.serverURL}list/tasks/${id}`,
    });
  },

  deleteList(id) {
    return this.makeRequest({
      url: `${this.serverURL}list/${id}`,
      method: "DELETE",
    });
  },

  deleteTask(id) {
    return this.makeRequest({
      url: `${this.serverURL}tasks/${id}`,
      method: "DELETE",
    });
  },

  deleteAllTask(listID) {
    return this.makeRequest({
      url: `${this.serverURL}list/tasks/${listID}`,
      method: "DELETE",
    });
  },

  addNewList(data) {
    return this.makeRequest({
      url: `${this.serverURL}list`,
      method: "POST",
      data,
    });
  },

  addNewTask(data) {
    return this.makeRequest({
      url: `${this.serverURL}tasks`,
      method: "POST",
      data,
    });
  },

  updateList(data) {
    return this.makeRequest({
      url: `${this.serverURL}list/${data.id}`,
      method: "PUT",
      data,
    });
  },

  updateTask(data) {
    return this.makeRequest({
      url: `${this.serverURL}tasks/${data.id}`,
      method: "PUT",
      data,
    });
  },
};

export default API;
