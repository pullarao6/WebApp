var parking = angular.module("parking", []);
describe('Testing MEAN Module', function() {
var mainModule;
beforeEach(function() {
mainModule = angular.module('parking');
});
it('Should be registered', function() {
expect(mainModule).toBeDefined();
});
});
parking.factory("parkingService", function () {
 var _calculateTicket = function (car) {
 var departHour = car.depart.getHours();
 var entranceHour = car.entrance.getHours();
 var parkingPeriod = departHour - entranceHour;
 var parkingPrice = parkingPeriod * 10;
 return {
 period: parkingPeriod,
 price: parkingPrice
 };
 };
 return {
 calculateTicket: _calculateTicket
 };
});

describe("Parking Service Specification", function () {
 var parkingService;
 beforeEach(module("parking"));

 beforeEach(inject(function (_parkingService_) {
   parkingService = _parkingService_;
}));
it("Should calculate the ticket for a car that arrives any day at 08:00 and departs in the same day at 16:00", function () {
var car = {place: "AAA9988", color: "Blue"};
car.entrance = new Date("October 13, 2014 11:00:00");
car.depart = new Date("October 13, 2014 19:00:00");
var ticket = parkingService.calculateTicket(car);
expect(ticket.period).toBe(8);
expect(ticket.price).toBe(80);
});
});

parking.controller("parkingCtrl", function ($scope) {
 $scope.appTitle = "[Packt] Parking";

 $scope.cars = [];

 $scope.colors = ["White", "Black", "Blue", "Red", "Silver"];

 $scope.park = function (car) {
 car.entrance = new Date();
 $scope.cars.push(car);
 delete $scope.car;
 };
});

describe("Parking Controller Specification", function () {
 var $scope;

 beforeEach(module("parking"));

 beforeEach(inject(function ($controller, $rootScope) {
 $scope = $rootScope.$new();
 $controller("parkingCtrl", {
 $scope: $scope
 });
 }));
 it("The title of the application should be [Packt] Parking",
function () {
 var expectedAppTitle = "[Packt] Parking";
 expect($scope.appTitle).toBe(expectedAppTitle);
 });
 it("The available colors should be white, black, blue, red and silver", function () {
 var expectedColors = ["White", "Black", "Blue", "Red", "Silver"];
 expect($scope.colors).toEqual(expectedColors);
 });
 it("The car should be parked", function () {
 var car = {
 plate: "AAAA9999",
 color: "Blue"
 };
 $scope.park(car);
 expect($scope.cars.length).toBe(1);
 expect($scope.car).toBeUndefined();
 });
});

parking.filter("plate", function() {
 return function(input, separator) {
 var firstPart = input.substring(0,3);
 var secondPart = input.substring(3);
 return firstPart + separator + secondPart;
 };
});

describe("Plate Filter Specification", function () {
 var plateFilter;

 beforeEach(module("parking"));

 beforeEach(inject(function (_plateFilter_) {
 plateFilter = _plateFilter_;
 }));

 it("Should format the plate", function () {
 var plate = "AAA9999"
 var expectedPlate = "AAA-9999";
 expect(plateFilter(plate, "-")).toBe(expectedPlate);
});
});
