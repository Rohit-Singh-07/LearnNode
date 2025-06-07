const fs = require('fs');

const content = 'Hello, Node.js!';

fs.writeFileSync('output.txt', content, (err) => {
  if (err) {
    console.error('Error writing file:', err);
    return;
  }
  console.log('File written successfully');
});

fs.readFile('output.txt', 'utf8', (err, data) => {
  if (err) {
    console.error('Error reading file:', err);
    return;
  }
  console.log('File contents:', data);
});



fs.appendFile('output.txt', 'New Data.', (err, data) => {
    if (err) console.log("an error occured", err)
    else console.log("appended data")    
})

// fs.promises is a Promise-based version of the Node.js fs (File System) module.

// It provides the same file system functions (read, write, etc.) but instead of using callbacks, it returns Promises.

// This lets you use async/await syntax, which makes your asynchronous code cleaner and easier to read.



// const fs = require('fs').promises;

// async function readFile() {
//   try {
//     const data = await fs.readFile('file.txt', 'utf8');
//     console.log('File contents:', data);
//   } catch (err) {
//     console.error('Error reading file:', err);
//   }
// }

// readFile();