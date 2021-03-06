'use strict';

SocioboardApp.controller('LinkedinCompFeedsController', function ($rootScope, $scope, $http, $timeout,$stateParams, apiDomain,grouptask) {
    //alert('helo');
    $scope.$on('$viewContentLoaded', function () {

        likedinfeeds();

        $scope.LoadTopFeeds = function () {
            //codes to load  recent Feeds
            $http.get(apiDomain + '/api/LinkedIn/GetTopCompanyPagePosts?pageId=' + $stateParams.profileId + '&userId=' + $rootScope.user.Id + '&skip=0&count=30')
                          .then(function (response) {
                              $scope.companypagedata = response.data._LinkedinCompanyPage;
                              $scope.postdate(response.data._LinkedinCompanyPagePosts);
                              if (response.data == null) {
                                  reachLast = true;
                              }
                          }, function (reason) {
                              $scope.error = reason.data;
                          });
            // end codes to load  recent Feeds
        }

        $scope.LoadTopFeeds();
        $scope.postdate = function (parm) {

            for (var i = 0; i < parm.length; i++) {
                var date = moment(parm[i].postDate);
                var newdate = date.toString();
                var splitdate = newdate.split(" ");
                date = splitdate[0] + " " + splitdate[1] + " " + splitdate[2] + " " + splitdate[3];
                parm[i].postDate = date;
            }
            $scope.lstlincmpnypageFeeds = parm;

        }

        $scope.getpostcomment = function (OAuthToken, PageId, UpdateKey) {
            //codes to load  comments of  Feeds
            $http.get(apiDomain + '/api/LinkedIn/GetLinkdeinPagePostComment?pageId=' + PageId + '&userId=' + $rootScope.user.Id + '&updatekey=' + UpdateKey + '&OAuthToken=' + OAuthToken)
                        .then(function (response) {
                            $scope.commentdate(response.data);

                        }, function (reason) {
                            $scope.error = reason.data;
                        });
            // end codes to load   comments of  Feeds
        }

        $scope.commentdate = function (parm) {

            for (var i = 0; i < parm.length; i++) {
                var date = moment(parm[i].commentTime);
                var newdate = date.toString();
                var splitdate = newdate.split(" ");
                date = splitdate[0] + " " + splitdate[1] + " " + splitdate[2] + " " + splitdate[3];
                parm[i].commentTime = date;
            }
            $scope.lstlincmpnypagecommentFeeds = parm;

        }

        $scope.commentpost = function (OAuthToken, PageId, UpdateKey)
        {
            var comment = $('#comment').val();
            //codes to post  comments on  Feeds
            $http.post(apiDomain + '/api/LinkedIn/PostCommentOnLinkedinCompanyPage?pageId=' + PageId + '&userId=' + $rootScope.user.Id + '&updatekey=' + UpdateKey + '&comment=' + comment)
                        .then(function (response) {
                            $scope.getpostcomment(OAuthToken, PageId, UpdateKey);
                            $('#comment').val('');
                        }, function (reason) {
                            $scope.error = reason.data;
                        });
            // end codes to post  comments on  Feeds
        }

        $scope.TaskModal = function (linfeednotification) {
            $rootScope.linfeednotification = linfeednotification;
            $('#TaskModal').openModal();

        }

        $scope.addTask = function (feedTableType) {

            var memberId = $('.task-user-member:checked');
            var taskComment = $('#linkedFeedComment').val();
            if (!memberId.val()) {
                swal('please select any member for assign task')
            }
            else if (!taskComment) {
                swal('please write any comment for assign task')
            }
            else {
                var assignUserId = memberId.val();
                grouptask.addtasks(assignUserId, feedTableType, taskComment, $rootScope.linfeednotification.posts, $rootScope.linfeednotification.postId, $rootScope.linfeednotification.postImageUrl);

            }
        }

            
    });
});