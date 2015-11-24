export const Server = {
  loadJSON: function(url, json_data, done=()=>{}, error=()=>{}) {
    let response = {};

    switch(url) {
      case '/your/path/to/action':
        fetch('/your/path/to/data.json')
          .then(response => {
            return response.json();
          })
          .then(data => {
            response = data;
          });
        break;
    }
    setTimeout(() => {
      done(response);
    }, 500);
  },

  saveJSON: function(url, json_data, done=()=>{}, error=()=>{}) {
    let response = true;

    switch(url) {
      case '/your/path/to/action':
        response = { id: Math.floor(Math.random() * (1000000 - 1000 + 1)) + 1000 };
        break;
    }

    setTimeout(() => {
      done(response);
    }, 500);
  }
};
