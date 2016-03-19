var request = require('request');
var expect    = require("chai").expect;
var myapp_common = require('myapp-common');
var database  = require('../utils/database');
var logger = require('../utils/logger');
var should = require('should');
var User = myapp_common.manf;
var UserModel = User.ManfModel;

var payload = {
		name : "test",
		branch : true,
		tin : "123",
		email : "def@gmail.com",
		password : "abc",		
		street : "asde",
		city : "Bangalore",
		state : "Karnataka",
		country : "India",
		pincode : 560034,
		landmark : 'Near Marathahalli Kalamandir',		
		phone_numbers : "9090909090" ,
		fax_numbers :  '04021212349' ,
		verified : false
	};

var userObj = new UserModel(payload);

describe('Creating a new User',function(){       
	var tests = [];	
    it('posting a request for signup',function(done){
      request({
    	  url : 'http://localhost:8080/users/signup',
    	  method : 'POST',
    	  form : payload    	     	 
      },function(error, response, body) {
    	  if(error)
    	  {
    		  logger.debug(error);
    		  done();
    	  }
    	  else{
    	  logger.debug(body);
	      expect(response.statusCode).to.equal(302);
	      done();}
      });          	    
    });
    
    after(function(done){
    	UserModel.remove({name:"test"},function(err, res)
    	{
    		if(err){
    			done(err);
    		}
    		done();
    	});
    })
  });