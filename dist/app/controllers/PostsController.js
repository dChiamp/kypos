app.controller('PostsController', PostsController)

function PostsController ($scope, $http, $stateParams, Account, $location, toastr) {

  var vm = this;
  vm.all = [];

  vm.newMessage = {};
  vm.getPosts = getPosts;
  vm.newPost = newPost;
  vm.deletePost = deletePost;

  getPosts();
  // checkIfPostBelongsGarden();

  // gets posts and FIlters for garden match
  function getPosts (post) {
    var gardenId = $stateParams.id;
    // console.log("this garden's id:", gardenId)
    $http
      .get('/api/posts/')
      .then(function(response){
        var allPosts = response.data
        // iterate through all posts to match id
        for(var i = 0; i < response.data.length; i++) {
          console.log("checking if msg belongs to garden...")
          var postObj = allPosts[i]
          var postGardenId = postObj.garden[0];
          console.log("post's GardenId:", postGardenId)
          if (gardenId === postGardenId ){
          // if both ids match, push the full post to vm.all,  parse in view
            vm.all.push(postObj)
            console.log("msg matchs!")
            console.log("view model:", vm.all)
          } else { console.log("not a match")} ;
        }

      })
  }


  // function to check if the id params match the 
  // referenced gardenId for page 

  // get id from url

function checkIfPostBelongsGarden () {
  // console.log("are you my mommy?")
  var gardenId = $stateParams.id
  // var post = vm.all
  // console.log("view model:", vm.all)

 }
  // get id in post.garden[i]

  // show if match = true


  function newPost () {
    // console.log("new post agular")
    // console.log("vm.newPost:", vm.newPost)
    var gardenId = $stateParams.id;
    $http
      .post('/api/posts/' + gardenId, vm.newMessage)
      .then(function(response){
        vm.all.push(response.data)
      })
      toastr.success('Message Sent!')
      vm.newMessage = {}
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