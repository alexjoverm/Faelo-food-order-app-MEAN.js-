'use strict';

angular.module('faeloApp')
  .factory('ArticlesSvc', function() {

    'use strict';

    return {
      selection: {
        dish: { index: 0, amount: 0 },
        snacks: []
      }
    }

  });
