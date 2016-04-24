var cluster = require('cluster');
var numCPUs = require('os').cpus().length;
cluster.schedulingPolicy = cluster.SCHED_RR;

if (cluster.isMaster) {
	
  for (var i = 0; i < numCPUs; i++) {
    var worker=cluster.fork();           
  }  
  
  cluster.on('online', function(worker) {
      console.log('Worker ' + worker.process.pid + ' is online');            
  });
  
  cluster.on('exit', function(worker, code, signal) {
    console.log('worker ' + worker.process.pid + ' died');
    cluster.fork();
  });
  
} else {		
    //change this line to Your Node.js app entry point.
	console.log("Child process "+process.pid+" being created and listening to ports 8080 and 9090");
	require('./www');
}