app.controller('PostsController', PostsController)

function PostsController ($scope, $http, $stateParams, Account, $location, toastr) {

  var vm = this;
  vm.all = [];

  vm.newMessage = {};
  vm.getPosts = getPosts;
  vm.newPost = newPost;
  vm.deletePost = deletePost;

  function getPosts (post) {
    console.log("getting all posts")
    var gardenId = $stateParams.gardenId;
    $http
      .get('/api/posts/')
      .then(function(response){
        console.log("getPosts:", response.data)
        vm.all = response.data
      })
  }

  getPosts();

  function newPost () {
    console.log("new post agular")
    console.log("vm.newPost:", vm.newPost)
    var gardenId = $stateParams.id;
    $http
      .post('/api/posts/' + gardenId, vm.newMessage)
      .then(function(response){
        vm.all.push(response.data)
      })
      vm.newPost = {}
      toastr.success('Message Sent!')
  }

  function deletePost(post) {
    $http
      .delete('/api/posts' + post._id)
      .then(function(response) {
        var index = vm.all.indexOf(post)
        vm.all.splice(index,1);
    })
  }


}