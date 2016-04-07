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

  function getPosts (post) {
    var gardenId = $stateParams.id;
    console.log("this garden's id:", gardenId)
    $http
      .get('/api/posts/')
      .then(function(response){
        // console.log("getPosts:", response.data)
        var allPosts = response.data
        // iterate through all posts to match id
        // vm.all = response.data
        // console.log("gardenID", response.data[3].garden[0])
        for(var i = 0; i < response.data.length; i++) {
          console.log("checking if msg belongs to garden...")
          var postObj = allPosts[i]
          var postGardenId = postObj.garden[0];
          console.log("post's GardenId:", postGardenId)
          if (gardenId === postGardenId ){
          // if both ids match, push that post to vm.all
            vm.all.push(postObj)
            console.log("msg matchs!")
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