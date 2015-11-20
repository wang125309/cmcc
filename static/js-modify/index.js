require("../../bower_components/zepto/zepto.js");
require("../../bower_components/zeptojs/src/touch.js");
require("../../bower_components/velocity/velocity.min.js");
require("../../bower_components/angular/angular.js");
require("../js/share.min.js");

indexCtrl = angular.module('app',[]).controller('indexCtrl',['$scope',function($scope){
    if(localStorage['set']) {
        $.get("/backend/getUserBySet/?set="+localStorage['set'],function(data){
            date = new Date();
            if(data.error_no == '0') {
                if(data.data.date == localStorage['date'] && localStorage['date'] == (date.getDay() + date.getDate())) {
                    $scope.page1Show = false;
                    $scope.page2Show = false;
                    $scope.page3Show = false;
                    $scope.page4Show = true;
                    $scope.count = data.data.count;
                    if(data.data.count < 200) {
                        $scope.less200 = true;
                    }
                    else {
                        $scope.less200 = false;
                    }
                }
                else {
                    $scope.page1Show = true;
                }
            }
            else {
                $scope.page1Show = true;
            }
            $scope.$apply();
        });
    }
    else {
        $scope.page1Show = true;
    }
    $scope.enter = function() {
        $scope.page1Show = false;
        $scope.page2Show = true;
    };
    var checked = false;
    $scope.submitInfo = function() {
        date = new Date();
        if(localStorage['date'] != date.getDay() + date.getDate()) {
            var checkCallBack = function(data) {
                if(data.error_no == '0') {
                    $scope.page2Show = false;
                    $scope.page3Show = true;
                    $scope.$apply();
                    checked = true;
                }
                else {
                    alert(data.data.message);
                    checked = false;
                }
            }
            var checkNumOrStr = function(word) {
                var numcount = 0;
                for (i in word) {
                    if(word[i] <= '9' && word[i] >= '0') {
                        numcount ++ ;
                    }
                }
                if(numcount == word.length) {
                    alert('不能全为数字哦');
                    return false;
                }
                return true;
            };
            if($scope.info.title1.length && $scope.info.reason1.length && $scope.info.title2.length && $scope.info.reason2.length && $scope.info.title3.length && $scope.info.reason3.length) {
                if(checkNumOrStr($scope.info.title1) && checkNumOrStr($scope.info.title2) &&checkNumOrStr($scope.info.title3) && checkNumOrStr($scope.info.reason1)&&checkNumOrStr($scope.info.reason2) && checkNumOrStr($scope.info.reason3)) {
                    $.post('/backend/check/',$scope.info,checkCallBack); 
                }
            }
            else {
                alert("所有表单都不能为空哦");
            }
        }
        else {
            alert("您今天已经参加过了，明天再来吧~");
        }
    };
    $scope.submit = function() {
        var checkCallBack = function(data) {
            if(data.error_no == '0') {

            }
            else {
                alert(data.data.message);
                checked = false;
            }
        };
        if($scope.user.name.length && $scope.user.mobile.length == 11) {
            $scope.page2Show = false;
            $scope.page3Show = true;
            checked = true;
            localStorage['date'] = date.getDay() + date.getDate();
            localStorage['set'] = Date.parse(new Date()) + Math.random() * 1000;
            $.post('/backend/save/',{
                "title1":$scope.info.title1,
                "title2":$scope.info.title2,
                "title3":$scope.info.title3,
                "reason1":$scope.info.reason1,
                "reason2":$scope.info.reason2,
                "reason3":$scope.info.reason3,
                "name":$scope.user.name,
                "mobile":$scope.user.mobile,
                "date" : localStorage['date'],
                "set" : localStorage['set']
            },function(data){
                date = new Date();
                if(data.error_no == '0') {
                    $scope.page3Show = false;
                    $scope.page4Show = true;
                    $scope.count = data.data.count;
                    if(data.data.count < 200) {
                        $scope.less200 = true;
                    }
                    else {
                        $scope.less200 = false;
                    }
                    $scope.$apply();
                }
                else {
                    alert(data.data.message);
                }
            });
        }
        else {
            alert("请输入正确的手机号和真实姓名");
        }
          
    };
}]);

indexCtrl.$inject = ['$scope','indexCtrl']; 
