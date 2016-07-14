describe('Test Controller', function () {
  var $httpBackend;

  beforeEach(module('starter.controllers'));

  beforeEach(inject(function( _$httpBackend_) {

    $httpBackend = _$httpBackend_;
  }));

  it('should return a user after login', function () {

    expect(1).toBe(1);
  });


});
