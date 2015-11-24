export const Server = {
  loadJSON: function(url, json_data, done=()=>{}, error=()=>{}) {
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content')
      },
      body: JSON.stringify(json_data)
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        done(data);
      })
      .catch(err => {
        error(err);
      });
  },

  saveJSON: function(url, json_data, done=()=>{}, error=()=>{}) {
    fetch(url, {
      method: 'post',
      credentials: 'include',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json; charset=UTF-8',
        'X-CSRF-Token': document.querySelector('meta[name=csrf-token]').getAttribute('content')
      },
      body: JSON.stringify(json_data)
    })
      .then(response => {
        if (response.status >= 200 && response.status < 300) {
          // proceed to next then()
          return response
        } else {
          // catch(error)
          var error = new Error(response.statusText);
          error.response = response;
          throw error
        }
      })
      .then(response => {
        return response.json();
      })
      .then(data => {
        //console.log('JSON response', data);
        done(data);
      })
      .catch(err => {
        //console.log('Request failed', err);
        error(err);
      });
  }
};
