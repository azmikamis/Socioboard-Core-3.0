'use strict';

SocioboardApp.controller('ProfileSettingController', function ($rootScope, $scope, $http, $timeout, apiDomain) {
    //alert('helo');
    $scope.$on('$viewContentLoaded', function () {
        // initialize core components
        $scope.updateUser = {};
        $scope.updatePassword = {};
        $scope.mailSettings = {};
       

        //codes to fill update user details 
       
        if ($rootScope.UpdatedfirstName == '' || $rootScope.UpdatedfirstName == undefined) {
            $scope.updateUser.firstName = $rootScope.user.FirstName;
        }
        else
        {
            $scope.updateUser.firstName = $rootScope.UpdatedfirstName;
        }
        if ($rootScope.UpdatedlastName == '' || $rootScope.UpdatedlastName == undefined) {
            $scope.updateUser.lastName = $rootScope.user.LastName;
        }
        else {
            $scope.updateUser.lastName = $rootScope.UpdatedlastName;
        }
        if ($rootScope.UpdateduserName == '' || $rootScope.UpdateduserName == undefined) {
            $scope.updateUser.userName = $rootScope.user.UserName;
        } else {
            $scope.updateUser.userName = $rootScope.UpdateduserName;
        }
        if ($rootScope.UpdatedphoneNumber == '' || $rootScope.UpdatedphoneNumber == undefined) {
            $scope.updateUser.phoneNumber = $rootScope.user.PhoneNumber;
        } else {
            $scope.updateUser.phoneNumber = $rootScope.UpdatedphoneNumber;
        } 
        if ($rootScope.UpdatedaboutMe == '' || $rootScope.UpdatedaboutMe == undefined) {
            $scope.updateUser.aboutMe = $rootScope.user.aboutMe;
        } else {
            $scope.updateUser.aboutMe = $rootScope.UpdatedaboutMe;
        }
        var $input = $('.datepicker').pickadate();
        var picker = $input.pickadate('picker');
        picker.set('select', $rootScope.user.dateOfBirth, { format: 'yyyy-mm-dd HH:MM:ss' })
     //   $scope.updateUser.dob = $rootScope.user.dateOfBirth;
       
        Materialize.updateTextFields();
        // end codes to fill update user details

        //codes to intilize mail settings
        $scope.mailSettings.dailyGrpReportsSummery = $rootScope.user.dailyGrpReportsSummery;
        $scope.mailSettings.weeklyGrpReportsSummery = $rootScope.user.weeklyGrpReportsSummery;
        $scope.mailSettings.days15GrpReportsSummery = $rootScope.user.days15GrpReportsSummery;
        $scope.mailSettings.monthlyGrpReportsSummery = $rootScope.user.monthlyGrpReportsSummery;
        $scope.mailSettings.days60GrpReportsSummery = $rootScope.user.days60GrpReportsSummery;
        $scope.mailSettings.days90GrpReportsSummery = $rootScope.user.days90GrpReportsSummery;
        $scope.mailSettings.otherNewsLetters = $rootScope.user.otherNewsLetters;
       
        //end codes to intilize mail settings

        $scope.UpdateUser = function (updateUser) {
          
            var $input = $('.datepicker').pickadate();
            var picker = $input.pickadate('picker');
            var formData = new FormData();
            formData.append('files', $("#profileImage").get(0).files[0]);
            $http({
                method: 'POST',
                url: apiDomain + '/api/User/UpdateUser?firstName=' + updateUser.firstName + '&lastName=' + updateUser.lastName + '&userName=' + updateUser.userName + '&phoneNumber=' + updateUser.phoneNumber + '&dob=' + picker.get() + '&aboutMe=' + updateUser.aboutMe + '&userId=' + $rootScope.user.Id,
                data: formData,
                headers: {
                    'Content-Type': undefined
                },
                transformRequest: angular.identity,
            }).then(function (response) {
                alertify.set({ delay: 5000 });
                alertify.success("Profile Updated Successfully");
                $rootScope.UpdatedfirstName = updateUser.firstName;
                $rootScope.UpdatedlastName = updateUser.lastName;
                $rootScope.UpdateduserName = updateUser.userName;
                $rootScope.UpdatedphoneNumber = updateUser.phoneNumber;
                $rootScope.UpdatedaboutMe = updateUser.aboutMe;
            }, function (reason) {
                alertify.set({ delay: 5000 });
                alertify.error(reason.data);
                console.log(reason.data);
            });
        }


        $scope.UpdatePassword = function (updatePassword) {
            $http({
                method: 'POST',
                url: apiDomain + '/api/User/ChangePassword?currentPassword=' + updatePassword.currentPassword + '&newPassword=' + updatePassword.newPassword + '&conformPassword=' + updatePassword.conformPassword + '&userId=' + $rootScope.user.Id,
                crossDomain: true,
                //data: ,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                alertify.set({ delay: 5000 });
                alertify.success(response.data);
                updatePassword.currentPassword = '';
                updatePassword.newPassword = '';
                updatePassword.conformPassword = '';
            }, function (reason) {
                alertify.set({ delay: 5000 });
                alertify.error(reason.data);
                console.log(reason.data);
            });
        }



        //$scope.UpdatePassword = function (updateMailSettings) {
        //    $http({
        //        method: 'POST',
        //        url: apiDomain + '/api/User/ChangePassword?currentPassword=' + updatePassword.currentPassword + '&newPassword=' + updatePassword.newPassword + '&conformPassword=' + updatePassword.conformPassword + '&userId=' + $rootScope.user.Id,
        //        crossDomain: true,
        //        //data: ,
        //        headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        //    }).then(function (response) {
        //        alertify.set({ delay: 5000 });
        //        alertify.success("Mail Settings Updated Successfully");
        //        console.log(response);
        //    }, function (reason) {
        //        alertify.set({ delay: 5000 });
        //        alertify.error(reason.data);
        //        console.log(reason.data);
        //    });
        //}


        $scope.UpdateMailSettings = function (mailSettings) {
            $http({
                method: 'POST',
                url: apiDomain + '/api/User/UpdateMailSettings?dailyGrpReportsSummery=' + mailSettings.dailyGrpReportsSummery + '&weeklyGrpReportsSummery=' + mailSettings.weeklyGrpReportsSummery + '&days15GrpReportsSummery=' + mailSettings.days15GrpReportsSummery + '&monthlyGrpReportsSummery=' + mailSettings.monthlyGrpReportsSummery + '&days60GrpReportsSummery=' + mailSettings.days60GrpReportsSummery + '&days90GrpReportsSummery=' + mailSettings.days90GrpReportsSummery + '&otherNewsLetters=' + mailSettings.otherNewsLetters + '&userId=' + $rootScope.user.Id,
                crossDomain: true,
                //data: ,
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
            }).then(function (response) {
                alertify.set({ delay: 5000 });
                alertify.success("Mail Settings Updated Successfully");
                console.log(response);
            }, function (reason) {
                alertify.set({ delay: 5000 });
                alertify.error(reason.data);
                console.log(reason.data);
            });
        }


        profilesetting();
    });
});