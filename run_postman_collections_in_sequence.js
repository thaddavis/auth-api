const path = require("path");
const async = require("async");
const newman = require("newman");
const fs = require("fs");

const directory = "newman";

fs.readdir(directory, (err, files) => {
  if (err) throw err;

  for (const file of files) {
    fs.unlink(path.join(directory, file), (err) => {
      if (err) throw err;
    });
  }
});

const postmanCollections = [
  {
    collection: path.join(
      __dirname,
      "postman/auth_flow_1__mock_password_reset.postman_collection.json"
    ), // your collection
    environment: path.join(
      __dirname,
      "postman/localhost.postman_environment.json"
    ), //your env
    reporters: ["htmlextra", "json-summary", "cli"],
  },
  {
    collection: path.join(
      __dirname,
      "postman/auth_flow_1__mock_password_reset.postman_collection.json"
    ), // your collection
    environment: path.join(
      __dirname,
      "postman/localhost.postman_environment.json"
    ), //your env
    reporters: ["htmlextra", "json-summary", "cli"],
  },
];

async.eachSeries(postmanCollections, function (collectionRunConfig, callback) {
  console.log("collectionRunConfig", collectionRunConfig);
  newman.run(collectionRunConfig, callback);
});
