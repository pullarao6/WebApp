var expect    = require("chai").expect;
var converter = require("../utils/converter");
var request = require("request");

describe("Color Code Converter", function() {
	
	describe("RGB to Hex conversion", function() {
		 var url = "http://localhost:8080/rgbToHex?red=255&green=255&blue=255";
		 	    	    
	    it("returns status 200", function(done) {
	    	request(url, function(error, response, body) {
	            expect(response.statusCode).to.equal(200);
	            done();
	          });
	    });

	    it("converts the basic colors", function() {
	    	var redHex   = converter.rgbToHex(255, 0, 0);
	        var greenHex = converter.rgbToHex(0, 255, 0);
	        var blueHex  = converter.rgbToHex(0, 0, 255);

	        expect(redHex).to.equal("ff0000");
	        expect(greenHex).to.equal("00ff00");
	        expect(blueHex).to.equal("0000ff");
	    	
	    });

	  });
});