app.controller('PostsController', PostsController)

function PostsController ($scope, $http, $stateParams, Account, $location, toastr) {

  var vm = this;
  vm.all = [];

  vm.newMessage = {};
  vm.getPosts = getPosts;
  vm.newPost = newPost;
  vm.deletePost = deletePost;
  vm.isUsersPost = isUsersPost;

  getPosts();
  // checkIfPostBelongsGarden();
  // gets posts and FIlters for garden match
  function getPosts (cb) {
    var gardenId = $stateParams.id;
    console.log(gardenId)
    $http
      // '/api/posts/:gardenId'
      .get('/api/posts/' + gardenId)
      .then(function(response){
        var allPosts = response.data
        console.log("RESPNSE of posts:", allPosts)
        vm.all = response.data
        // iterate through all posts to match id
        //Filter for matching post to garden on back end

            isUsersPost();
      })
  }

  function isUsersPost () {
    // get user id:
    var userId = Account.getUserIdFromJwt();
    var gardenId = $stateParams.id
    // iterate thru all messages
    // check if author matches current user id
    for(var i = 0; i < vm.all.length; i++) {
    var post = vm.all[i];
    $scope.msg = vm.all[i]
    console.log("post object:", post)
    var postUserId = vm.all[i].author[0]._id
      if (postUserId === userId) {
        // if msg belongs to user, allow delete
        $scope.msg.deletable = true
        // return true;
      }
    }
  }

  // in backend, also checking that the user id matches the post author

  function newPost() {
    // console.log("new post agular")
    // console.log("vm.newPost:", vm.newPost)
    var userId = Account.getUserIdFromJwt();
    var gardenId = $stateParams.id;
    $http
      .post('/api/users/' + userId +  '/posts/' + gardenId, vm.newMessage)
      .then(function(response){
        vm.all.push(response.data)
      })
      toastr.success('Message Sent!')
      vm.newMessage = {}
  }

  function deletePost(post) {
    var userId = Account.getUserIdFromJwt();
    $http
      // .delete('/api/posts/:postId/users/:id', post._id);
      // .delete('/api/posts/' + post._id)
      .delete('/api/posts/' + post._id + '/users/' + userId)
      .then(function(response) {
        var index = vm.all.indexOf(post)
        vm.all.splice(index,1);
    })
  }

}