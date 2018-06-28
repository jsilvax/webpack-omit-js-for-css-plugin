require('.../shared/one.css');
require('../shared/two.css');
const preact = require('preact');
preact.render(preact.h('div', null, 'hello'), document.body);