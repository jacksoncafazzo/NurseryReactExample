import tsv from 'node-tsv-json';

function tsvToJson(input) {
  console.log(input)
  tsv({
    input: input.name,
    output: null,
    parseRows: true
  }, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      console.log(result);
    }
  });

}

module.exports = tsvToJson;
  // let readStream = fs.createReadStream(input);
  //
  // readstream.on('open', () => {
  //   readStream.pipe(res);
  // });
  // readStream.on('error', (err) => {
  //   res.end(err);
  // });
  //
  // console.log('stream', res);
  // fs.exists(input, (exists) => {
  //   if (exists) {
  //     fs.stat(input, 'r', (error, fd) => {
  //       let buffer = new Buffer(stats.size);
  //
  //       fs.read(fd, buffer, 0, buffer.length, null, (error, bytesRead, buffer) => {
  //         let data = buffer.toString('utf8', 0, buffer.length);
  //
  //         console.log('data', data);
  //         fs.close(fd);
  //       });
  //     });
  //   }
  // });
//
//
//   let info = input.replace(/['"]/g,'');
//   const lines = info.split('\n');
//   const firstLine = lines.shift().split('\t');
//   let json = [];
//
//   lines.forEach((line) => {
//     const lineItem = line.split('\t')
//     let jsonLineEntry = {};
//     lineItem.forEach((item, i) => {
//       jsonLineEntry[firstLine[i]] = removeQuotes(item);
//       json.push(jsonLineEntry);
//     });
//   });
//
//   return json;
//
// };
//
// function removeQuotes(string) {
//   // Helper function to remove quotes
//   // and parse numeric values
//   string = string.replace(/(['"])/g, '\\$1');
//   if (!isNaN(string)){
//     string = parseFloat(string);
//   }
//   return string;
// };
