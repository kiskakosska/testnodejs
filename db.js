'use strict';


const mongoose = require('mongoose');

mongoose.connect(url, options, (err) => {
  console.log(JSON.stringify(`Error connect: ${err}`, null, 2));
});
