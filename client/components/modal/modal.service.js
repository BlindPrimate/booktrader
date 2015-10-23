'use strict';

angular.module('bookbrokerApp')
  .factory('Modal', function ($rootScope, $modal) {
    /**
     * Opens a modal
     * @param  {Object} scope      - an object to be merged with modal's scope
     * @param  {String} modalClass - (optional) class(es) to be applied to the modal
     * @return {Object}            - the instance $modal.open() returns
     */
    function openModal(scope, modalClass, templateUrl, controllerName) {
      controllerName = controllerName || '';
      var modalScope = $rootScope.$new();
      scope = scope || {};
      modalClass = modalClass || 'modal-default';

      angular.extend(modalScope, scope);

      return $modal.open({
        templateUrl: templateUrl,
        controller: controllerName,
        windowClass: modalClass,
        scope: modalScope
      });
    }

    // Public API here
    return {

      /* Confirmation modals */
      confirm: {

        /**
         * Create a function to open a delete confirmation modal (ex. ng-click='myModalFn(name, arg1, arg2...)')
         * @param  {Function} del - callback, ran when delete is confirmed
         * @return {Function}     - the function to open the modal (ex. myModalFn)
         */
        delete: function(del) {
          del = del || angular.noop;

          /**
           * Open a delete confirmation modal
           * @param  {String} name   - name or info to show on modal
           * @param  {All}           - any additional args are passed straight to del callback
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                name = args.shift(),
                deleteModal;

            deleteModal = openModal({
              modal: {
                dismissable: true,
                title: 'Confirm Delete',
                html: '<p>Are you sure you want to delete <strong>' + name + '</strong> ?</p>',
                buttons: [{
                  classes: 'btn-danger',
                  text: 'Delete',
                  click: function(e) {
                    deleteModal.close(e);
                  }
                }, {
                  classes: 'btn-default',
                  text: 'Cancel',
                  click: function(e) {
                    deleteModal.dismiss(e);
                  }
                }]
              }
            }, 'modal-danger', 'components/modal/modal.html');

            deleteModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      },
      singleBook: function (book) {
          /**
           * Open a single book view modal
           * @param  {String} object   - book object 
           */
          return function() {
            var args = Array.prototype.slice.call(arguments),
                book = args.shift(),
                bookModal;

            bookModal = openModal({
              book: book,
              modal: {
                dismissable: true,
              }
            }, 'modal-danger', 'app/books/book/book.html', 'BookCtrl');

            bookModal.result.then(function(event) {
              del.apply(event, args);
            });
          };
        }
      }
  });
