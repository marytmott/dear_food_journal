(function() {
  'use strict';

  angular
    .module('dearFoodJ.auth')
    .controller('AuthController', AuthController);

  AuthController.$inject = ['$location', 'UserService'];

  function AuthController($location, UserService) {
//     var vm = this;

// // console.log(currentUser);
//     vm.user = {};
//     vm.signup = signup;
//     vm.login = login;
//     vm.logout = logout;
//     // vm.currentUser = currentUser;
//     // vm.currentUser = UserService.getCurrentUser();
//     // console.log('user?', vm.currentUser);

//     function signup() {
//       // console.log(vm.user);
//       return UserService.signup(vm.user).then(function(data) {
//         console.log(data);
//         $location.path('/' + data.data.user.id + '/' + data.data.user.journal);
//         // token data?
//       });
//     }

//     function login() {
//       UserService.login(vm.user).then(function(data) {
//         console.log('DATA from LOGIN', data);
//         // bad requests are coming here too....add handling
//         UserService.setCurrentUser(data);
//         getCurrentUser();
//         // console.log('/' + data.data.user.id + '/' + data.data.user.journal);
//         $location.path('/' + data.data.user.id + '/' + data.data.user.journal);
//       }).catch(function(errors) {
//         console.log('errors: ', errors);
//       });
//     }

//     function logout() {
//       UserService.logout();
//       // getCurrentUser();
//       $location.path('/login');
//     }

//     function getCurrentUser() {
//       vm.currentUser = UserService.getCurrentUser();
//       // .then(function(data) {
//       //   console.log(data);
//       //   // vm.currentUser = data;
//       // });
//     }
//     getCurrentUser();

  }
})();