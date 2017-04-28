(function(angular) {
    'use strict';

    angular.module('util.service', [])
        .factory('util', [
            function() {
                return {
                    convertMM_DD_YYYY : function(dateString, delim) {
                        var arr = dateString.split((delim ? delim : '-'));
                        return (arr.length === 3) ? new Date(arr[2], arr[0] - 1, arr[1], 0,0,0,0) : new Date();
                    },
                    nthWeekdayOfMonth :function(weekday, n, date) {
                        var count = 0,
                            idate = new Date(date.getFullYear(), date.getMonth(), 1);
                        while (true) {
                            if (idate.getDay() === weekday) {
                                if (++count == n) {
                                    break;
                                }
                            }
                            idate.setDate(idate.getDate() + 1);
                        }
                        return idate;
                    },
                    calculateFairDate : function() {
                        var tmpFair = new Date(), addYear = 0;

                        //If the current month is after fair month, then find the date for next year
                        if(tmpFair.getMonth() > 8) {
                            addYear++;
                        }

                        //calculate ballpark fair date
                        tmpFair = new Date(tmpFair.getFullYear() + addYear, 8,  1, 0,0,0,0);

                        //if September falls on a Monday then it will be on the 3rd Saturday else the 4th
                        var nthSaturday = tmpFair.getDay() === 1 ? 3 : 4;
                        var fair =  this.nthWeekdayOfMonth(6, nthSaturday, tmpFair);

                        if(!addYear && moment(new Date()).isAfter(moment(fair))){
                            if(moment(new Date()).isAfter(moment(fair).add('days', 7))) {
                                //if still same month and fair week has past, then calculate next years date
                                var fair =  this.nthWeekdayOfMonth(6, nthSaturday, new Date(tmpFair.getFullYear() + 1, 8,  1, 0,0,0,0));
                            } else {
                                //else return todays date, so there will be zero days until fair
                                return new Date();
                            }
                        } else {
                            return fair;
                        }
                    }
                };
            }
        ]);
}(angular));