(function(module) {
try {
  module = angular.module('ionic-datepicker.templates');
} catch (e) {
  module = angular.module('ionic-datepicker.templates', []);
}
module.run(['$templateCache', function($templateCache) {
  $templateCache.put('template.html',
    '<div class=datepicker-modal-container><div class=datepicker-modal><div class="datepicker-modal-head datepicker-balanced white bold"><div class=datepicker-modal-title>{{datepickerCtrl.getSelectedWeekday()}}</div></div><div class="center datepicker-balanced-light"><div class=row><div class="col datepicker-month-js datepicker-month" ng-click="datepickerCtrl.changeType(\'month\')">{{datepickerCtrl.getSelectedMonth() | limitTo: 3 | uppercase}}</div></div><div class=row><div class="col datepicker-day-of-month" ng-click="datepickerCtrl.changeType(\'date\')">{{datepickerCtrl.selectedDate | date: \'d\'}}</div></div><div class=row><div class="col datepicker-year-js datepicker-year" ng-click="datepickerCtrl.changeType(\'year\')">{{datepickerCtrl.selectedDate | date: \'yyyy\'}}</div></div></div><div class="datepicker-month-content-js datepicker-content" ng-show="datepickerCtrl.showType(\'month\')"><div class="row center" ng-repeat="month in datepickerCtrl.getMonths() track by $index"><div class="col datepicker-selection" ng-class="{ \'datepicker-selected\': datepickerCtrl.isSelectedMonth($index), \'datepicker-current\': datepickerCtrl.isActualMonth($index) }" ng-click=datepickerCtrl.selectMonth($index)>{{month | limitTo: 3}}</div></div></div><div class="datepicker-content visible-overflow" ng-show="datepickerCtrl.showType(\'date\')"><div class="row col center">{{datepickerCtrl.getTempMonth()}} {{datepickerCtrl.tempDate | date: \'yyyy\'}}</div><div class="row center"><div class="col bold" ng-repeat="dayOfWeek in datepickerCtrl.getDaysOfWeek() track by $index">{{dayOfWeek | limitTo: 1 | uppercase}}</div></div><div class="row center" ng-repeat="row in datepickerCtrl.rows track by $index"><div class="col no-padding" ng-repeat="col in datepickerCtrl.cols track by $index" ng-class="{ \'datepicker-date-col\': datepickerCtrl.isDefined(datepickerCtrl.getDate($parent.$index, $index)), \'datepicker-selected\': datepickerCtrl.isSelectedDate(datepickerCtrl.getDate($parent.$index, $index)), \'datepicker-current\' : datepickerCtrl.isActualDate(datepickerCtrl.getDate($parent.$index, $index)), \'datepicker-disabled\': datepickerCtrl.isDisabled(datepickerCtrl.getDate($parent.$index, $index)) }"><div class=datepicker-date-cell ng-click="datepickerCtrl.selectDate(datepickerCtrl.getDate($parent.$index, $index))">{{ datepickerCtrl.getDate($parent.$index, $index) | date: \'d\' }}</div></div></div></div><div class="datepicker-year-content-js datepicker-content" ng-show="datepickerCtrl.showType(\'year\')"><div class="row center" ng-repeat="year in datepickerCtrl.getYears() track by $index"><div class="col datepicker-selection" ng-class="{ \'datepicker-selected\': datepickerCtrl.isSelectedYear(year), \'datepicker-current\': datepickerCtrl.isActualYear(year) }" ng-click=datepickerCtrl.selectYear(year)>{{year}}</div></div></div><div class=datepicker-modal-buttons><button class="datepicker-cancel-js button button-clear button-small col-offset-33">CANCEL</button> <button class="datepicker-ok-js button button-clear button-small datepicker-color-balanced-light">OK</button></div></div></div>');
}]);
})();
