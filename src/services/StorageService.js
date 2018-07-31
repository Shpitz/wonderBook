

function store(key, any) {
    localStorage[key] = JSON.stringify(any);
}

function load(key) {
    var str = localStorage[key] || 'null';
    return JSON.parse(str);
}

// function getRandomColor() {
//     var letters = '0123456789ABCDEF';
//     var color = '#';
//     for (var i = 0; i < 6; i++) {
//       color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
//   }
  

export default {
    store,
    load,
}