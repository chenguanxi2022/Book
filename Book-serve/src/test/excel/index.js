const xlsx = require('node-xlsx');
// Or var xlsx = require('node-xlsx').default;

// Parse a file
const workSheet = xlsx.parse(`${__dirname}/test.xlsx`);
console.log(workSheet[0].data)