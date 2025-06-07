const path = require('path');

const filePath = '/users/john/docs/letter.txt';

console.log(path.basename(filePath));     // Output: 'letter.txt'
console.log(path.dirname(filePath));      // Output: '/users/john/docs'
console.log(path.extname(filePath));      // Output: '.txt'

const joinedPath = path.join('/users/john', 'docs', 'file2.txt');
console.log(joinedPath);                      // Output: '/users/john/docs/file2.txt'

const messyPath = '/foo/bar//baz/.././qux/';

console.log(path.normalize(messyPath));

console.log(path.resolve('foo', 'bar', 'file.txt'));