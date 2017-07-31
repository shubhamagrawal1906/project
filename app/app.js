var app = angular.module('TaskManager', ['ngRoute']);

app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                templateUrl : 'partials/home.html',
                controller  : 'homeController'
            })
            .when('/signup', {
                templateUrl : 'partials/signup.html',
                controller  : 'signupController'
            })
            .when('/login', {
                templateUrl : 'partials/login.html',
                controller  : 'loginController'
            })
            .when('/stage/create', {
                templateUrl : 'partials/stagecreate.html',
                controller  : 'stageCreateController'
            })
            .when('/stage', {
                templateUrl : 'partials/stage.html',
                controller  : 'stageAllController'
            })
            .when('/task/create', {
                templateUrl : 'partials/taskcreate.html',
                controller  : 'taskCreateController'
            })
            .when('/task', {
                templateUrl : 'partials/task.html',
                controller  : 'taskController'
            })
            .when('/subtask/create', {
                templateUrl : 'partials/subtaskcreate.html',
                controller  : 'subtaskCreateController'
            })
            .when('/subtask/:task_id', {
                templateUrl : 'partials/subtask.html',
                controller  : 'subtaskController'
            })
            .when('/subtask/history/:task_id', {
                templateUrl : 'partials/taskhistory.html',
                controller  : 'taskhistoryController'
            });
    });


app.factory("services", ["$http",

  function($http){
    // var socket = "http://127.0.0.1:3000";
    var socket = "http://52.221.212.105";
    // $http.defaults.headers.common.Content-Type = 'application/json';
    var obj = {};
      obj.signup = function(data){
        return $http.post(socket+'/users/signup/', data);
      }
      obj.login = function(data){
        return $http.post(socket+'/users/login/', data);
      }
      obj.users = function(data){
        return $http.post(socket+'/users/alluser/', data);
      }
      obj.createstage = function(data){
        return $http.post(socket+'/tasks/createtaskstage/', data);
      }
      obj.getallstage = function(data){
        return $http.post(socket+'/tasks/getallstaskstages/', data);
      }
      obj.updatestagename = function(data){
        return $http.post(socket+'/tasks/updatetaskstagename/', data);
      }
      obj.deletetaskstage = function(data){
        return $http.post(socket+'/tasks/deletetaskstage/', data);
      }
      obj.createtask = function(data) {
        return $http.post(socket+'/tasks/createtask/', data);
      }
      obj.getalltasks = function(data) {
        return $http.post(socket+'/tasks/getalltasks/', data);
      }
      obj.getallusertasks = function(data) {
        return $http.post(socket+'/tasks/getallusertasks/', data);
      }
      obj.changetaskstage = function(data){
        return $http.post(socket+'/tasks/changetaskstage/', data);
      }
      obj.deletetask = function(data) {
        return $http.post(socket+'/tasks/deletetask/', data);
      }
      obj.createsubtask = function(data) {
        return $http.post(socket+'/tasks/createsubtask/', data);
      }
      obj.createsubtask = function(data) {
        return $http.post(socket+'/tasks/createsubtask/', data);
      }
      obj.getallchild = function(data) {
        return $http.post(socket+'/tasks/getallchild/', data);
      }
      obj.fetchtaskhistories = function(data){
        return $http.post(socket+'/tasks/fetchtaskhistories/', data);
      }
      obj.logout = function(data){
        return $http.post(socket+'/users/logout/', data);
      }
    return obj;
  }
]);

// create the controller and inject Angular's $scope
app.controller('homeController', function($scope, services) {
    $scope.message = 'Everyone come and see how good I look!';
});

var isLoggedin = function() {
  if(window.localStorage['user'] != undefined) {
    return true;
  }
  return false;
}

var loggedinUser = function() {
  if(isLoggedin()){
    return angular.fromJson(window.localStorage['user']);
  }
  // console.log("error");
  //$location('/login/');
  // console.log("error1")
  return {};
}

app.controller('signupController', function($scope, $location, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  $scope.isLoader = true;
  $scope.is_admin = false;
  $scope.submitForm = function() {
    var usertype = 2
    if($scope.is_admin) {
      usertype = 1
    }
    var data = {
      "user_name":$scope.username,
      "email":$scope.email,
      "password":$scope.password,
      "user_type":usertype
    }
    services.signup(data).then(function(data){
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
    });
    $scope.isLoader = false;
  }
});

app.controller('loginController', function($scope, $location, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  $scope.isLoader = true;
  $scope.submitForm = function() {
    var data = {
      "user_name":$scope.username,
      "password":$scope.password,
    }
    services.login(data).then(function(data){
      if(isLoggedin()){
        $scope.error = "Already logged in.";
      }else{
        window.localStorage['user'] = angular.toJson(data.data.data);
        $scope.success = data.data.message;

      }
    },function(err){
      $scope.error = err.data.message;
    });
    $scope.isLoader = false;
  }
});

app.controller('stageCreateController', function($scope, $location, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  $scope.isLoader = true;
  var user = loggedinUser();
  $scope.submitForm = function() {
    var data = {
      "task_sequence":$scope.stagesequence,
    	"task_name":$scope.stagename,
    	"user_id":user.user_id
    }
    services.createstage(data).then(function(data){
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
    });
    $scope.isLoader = false;
  }
});

app.controller('stageAllController', function($scope, $location, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  $scope.isLoader = true;
  $scope.updatedValue = '';
  var user = loggedinUser();
  var data = {
    "user_id":user.user_id
  }
  var getStage = function() {
    services.getallstage(data).then(function(data){
      $scope.stages = data.data.data;
      for(var i=0; i < $scope.stages.length; i++){
        $scope.stages[i]['serial_no']=i+1;
        $scope.stages[i]['is_update']=false;
      }
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
    });
  }
  getStage();
  $scope.edit = function(serial_no){
    $scope.stages[serial_no-1]['is_update']=true;
  }
  $scope.save = function(serial_no){
    $scope.stages[serial_no-1]['is_update']=false;
    data = {
      'new_name': $scope.stages[serial_no-1]['task_name'],
      'task_sequence': $scope.stages[serial_no-1]['task_sequence'],
      'user_id': user.user_id
    }
    services.updatestagename(data).then(function(data){
      getStage();
      $scope.success = data.data.message;
    },function(err){
      getStage();
      $scope.error = err.data.message;
    });
  }
  $scope.delete = function(serial_no){
    data={
      'stage_id': $scope.stages[serial_no-1]['_id'],
      'user_id': user.user_id,
      'user_name': user['user_name'],
      'stage_name': $scope.stages[serial_no-1]['task_name'],
    }
    services.deletetaskstage(data).then(function(data){
      getStage();
      $scope.success = data.data.message;
    },function(err){
      getStage();
      $scope.error = err.data.message;
    });
  }
  $scope.logout = function(){
    services.logout({"user_id":user.user_id}).then(function(data){
      if(!isLoggedin()){
        $scope.error = "Already logged out.";
      }else{
        localStorage.removeItem('user');
        $scope.success = data.data.message;
      }
    },function(err){
      $scope.error = err.data.message;
    });
  }
  $scope.isLoader = false;
});

app.controller('taskCreateController', function($scope, $location, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  $scope.isLoader = true;
  var user = loggedinUser();
  services.users({"user_id":user.user_id}).then(function(data){
    $scope.users = data.data.data;
    $scope.selectedUser = $scope.users[0];
    $scope.success = data.data.message;
  },function(err){
    $scope.error = err.data.message;
  });
  services.getallstage({"user_id":user.user_id}).then(function(data){
    $scope.stages = data.data.data;
    $scope.selectedStage = $scope.stages[0];
    $scope.success = data.data.message;
  },function(err){
    $scope.error = err.data.message;
  });
  $scope.submitForm = function() {
    var date = new Date($scope.taskdate);
    var data = {
      "task_name":$scope.taskname,
    	"task_description":$scope.taskdesc,
    	"due_date": date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate(),
      "user_name": user["user_name"],
    	"user_id":user.user_id,
    	"stage_id":$scope.selectedStage._id,
    	"assigned_user_id":$scope.selectedUser._id
    }
    // console.log(data);
    services.createtask(data).then(function(data){
      // console.log(data.data);
      $scope.success = data.data.message;

    },function(err){
      $scope.error = err.data.message;
      // console.log(data)
    });
    $scope.isLoader = false;
  }
});

app.controller('taskController', function($scope, $location, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  $scope.isLoader = true;
  var user = loggedinUser();
  services.getallstage({"user_id":user.user_id}).then(function(data){
    $scope.stages = data.data.data;
    $scope.success = data.data.message;
  },function(err){
    $scope.error = err.data.message;
  });
  var getTasks = function(){
    if(user["user_type"] == "admin"){
      services.getalltasks({"user_id":user.user_id}).then(function(data){
        $scope.tasks = data.data.data[0];
        $scope.success = data.data.message;
        console.log($scope.tasks);
      },function(err){
        $scope.error = err.data.message;
      });
    }else{
      services.getallusertasks({"user_id": user["user_id"]}).then(function(data){
        $scope.tasks = data.data.data;
        $scope.success = data.data.message;
      },function(err){
        $scope.error = err.data.message;
      });
    }
  }
  getTasks();
  $scope.updateStage = function(task){
    var stage_name = "";
    for(var i = 0;i < $scope.stages.length;i++){
      if($scope.stages[i]["_id"]==task["stage_id"]){
        stage_name=$scope.stages[i]["task_name"];
        break;
      }
    }
    var data = {
      task_id: task._id,
      user_id: user["user_id"],
      task_stage_id: task.stage_id,
      stage_name: stage_name,
      user_name: user["user_name"]
    }
    services.changetaskstage(data).then(function(data){
      getTasks();
      $scope.success = data.data.message;
      console.log($scope.success);
    },function(err){
      getTasks();
      $scope.error = err.data.message;
    });
  }
  $scope.delete = function(task_id, task_name){
    var data = {
      task_id: task_id,
      user_id: user["user_id"],
      task_name: task_name,
      user_name: user["user_name"],
    }
    services.deletetask(data).then(function(data){
      getTasks();
      $scope.success = data.data.message;
    },function(err){
      getTasks();
      $scope.error = err.data.message;
    });
  }
  $scope.isLoader = false;
});

app.controller('subtaskCreateController', function($scope, $location, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  $scope.isLoader = true;
  var user = loggedinUser();
  services.getalltasks({"user_id":user.user_id}).then(function(data){
    $scope.tasks = data.data.data[0];
    $scope.selectedTask = $scope.tasks[0];
    // $scope.success = data.data.message;
  },function(err){
    // $scope.error = err.data.message;
  });
  services.users({"user_id":user.user_id}).then(function(data){
    $scope.users = data.data.data;
    $scope.selectedUser = $scope.users[0];
    // $scope.success = data.data.message;
  },function(err){
    // $scope.error = err.data.message;
  });
  services.getallstage({"user_id":user.user_id}).then(function(data){
    $scope.stages = data.data.data;
    $scope.selectedStage = $scope.stages[0];
    // $scope.success = data.data.message;
  },function(err){
    // $scope.error = err.data.message;
  });
  $scope.submitForm = function() {
    var date = new Date($scope.subtaskdate);
    var data = {
      "parent_id":$scope.selectedTask._id,
      "user_id":user.user_id,
      "task_name":[$scope.subtaskname],
    	"task_description":[$scope.subtaskdesc],
    	"due_date": [date.getFullYear()+'-' + (date.getMonth()+1) + '-'+date.getDate()],
    	"stage_id":[$scope.selectedStage._id],
    	"assigned_user_id":[$scope.selectedUser._id]
    }
    services.createsubtask(data).then(function(data){
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
    });
    $scope.isLoader = false;
  }
});

app.controller('subtaskController', function($scope, $location, $routeParams, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  var task_id = $routeParams.task_id;
  $scope.isLoader = true;
  var user = loggedinUser();
  services.getallstage({"user_id":user.user_id}).then(function(data){
    $scope.stages = data.data.data;
    $scope.success = data.data.message;
  },function(err){
    $scope.error = err.data.message;
  });
  var getSubtasks = function(){
    services.getallchild({"task_id":task_id}).then(function(data){
      $scope.tasks = data.data.data;
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
    });
  }
  getSubtasks();
  $scope.updateStage = function(task){
    var stage_name = "";
    for(var i = 0;i < $scope.stages.length;i++){
      if($scope.stages[i]["_id"]==task["stage_id"]){
        stage_name=$scope.stages[i]["task_name"];
      }
    }
    var data = {
      task_id: task._id,
      user_id: user["user_id"],
      task_stage_id: task.stage_id,
      parent_id: task.parent_id,
      stage_name: stage_name,
      user_name: user["user_name"]
    }
    services.changetaskstage(data).then(function(data){
      getSubtasks();
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
      getSubtasks();
    });
  }
  $scope.delete = function(task_id, task_name){
    var data = {
      task_id: task_id,
      user_id: user["user_id"],
      task_name: task_name,
      user_name: user["user_name"],
    }
    services.deletetask(data).then(function(data){
      getSubtasks();
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
      getSubtasks();
    });

  }
  $scope.isLoader = false;
});

app.controller('taskhistoryController', function($scope, $location, $routeParams, services) {
  $scope.removeAlert = function(){
    $scope.success = '';
    $scope.error = '';
  }
  $scope.removeAlert();
  var task_id = $routeParams.task_id;
  $scope.isLoader = true;
  var user = loggedinUser();
  var getTaskHistory = function(){
    services.fetchtaskhistories({"task_id":task_id,"user_id":user.user_id}).then(function(data){
      $scope.histories = data.data.data;
      $scope.success = data.data.message;
    },function(err){
      $scope.error = err.data.message;
    });
  }
  getTaskHistory();
  $scope.isLoader = false;
});
