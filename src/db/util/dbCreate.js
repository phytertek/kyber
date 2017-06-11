/* eslint no-console: 0 */

// node module
const exec = require('child_process').exec
const path = require('path')

// directory for db storage
const dbPath = path.join(__dirname, '..', '..', '..', 'data')

// docker run command
const cmd = `docker run -d -p 28015:28015 -p 8090:8080 -v ${dbPath}:/data --name genericdbname rethinkdb`

// execute command
const start = exec(cmd)

// remember if docker is installing image
let dbImage = false

// runs when command writes to stdout
start.stdout.on('data', (data) => {
  if (data) {
    console.log(data)
    dbImage = true
  } else {
    console.log('Error while creating the db:', data)
  }
})
