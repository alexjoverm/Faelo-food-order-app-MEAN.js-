'use strict';

angular.module('faeloApp')
  .controller('ArticlesCtrl', function ($scope, $http) {



    var date = new Date();
    var twoDaysAfter = new Date(date.getFullYear(), date.getMonth(), date.getDate() + 2);

    var article1 = '5543d224a1a5f8df637deffd';
    var article2 = '5543d24fa1a5f8df637deffe';


    // ********  TEST

    // 1 - InsertMonth (today)
    $http.post('/api/dates/month', {date: date, _article: article1}).success(function(){
      console.log(arguments);

      // 2 - Insert 15 times (twoDaysAfter) ERROR
      $http.post('/api/dates/' + 15, {date: twoDaysAfter, _article: article2}).success(function(){
        console.log(arguments);
      }).error(function(){
        console.log(arguments);
      });

      // 3 - Insert 8 times (twoDaysAfter)
      $http.post('/api/dates/' + 8, {date: twoDaysAfter, _article: article2}).success(function(){
        console.log(arguments);

        // 4 - Get week
        $http.get('/api/dates/week').success(function(){
          console.log(arguments);

          // 5 - Get months
          $http.get('/api/dates/month').success(function(){
            console.log(arguments);

            // 6 - Delete days of today
            $http.delete('/api/dates/month/' + date.toISOString()).success(function(){
              console.log(arguments);

              // 8 - THERE SHOULD BE ONLY 1
              $http.get('/api/dates/default/').success(function() {
                console.log(arguments);

                // 7 - Delete from twoDaysAfter + 1 week
                var auxDate = new Date(twoDaysAfter.getFullYear(), twoDaysAfter.getMonth(), twoDaysAfter.getDate() + 7);

                $http.delete('/api/dates/from/' + auxDate.toISOString()).success(function(){
                  console.log(arguments);

                  // 8 - THERE SHOULD BE ONLY 1
                  $http.get('/api/dates/default/').success(function() {
                    console.log(arguments);
                  }).error(function(){
                    console.log(arguments);
                  });

                }).error(function(){
                  console.log(arguments);
                });

              }).error(function(){
                console.log(arguments);
              });



            }).error(function(){
              console.log(arguments);
            });

          }).error(function(){
            console.log(arguments);
          });

        }).error(function(){
          console.log(arguments);
        });

      }).error(function(){
        console.log(arguments);
      });

    }).error(function(){
      console.log(arguments);
    });



});
