asanaModule.controller("userController", function ($scope, AsanaGateway) {
    $scope.loggedIn = Asana.isLoggedIn();

    AsanaGateway.getUserData(function (response) {
        $scope.user = response;
    });

    $scope.createTab = function (url) {
        chrome.tabs.create({url: url}, function () {
            window.close();
        });
    }
});

asanaModule.controller("createTaskController", function ($scope, AsanaGateway, $timeout) {
    $scope.loggedIn = Asana.isLoggedIn();
    $scope.workspaceNotSelected = true;
    $scope.projectRequired = false;
    $scope.taskNameRequired = false;

    $scope.taskCreationStatus = {
        success: false,
        message: "",
        show: false
    };

    $scope.clearFields = function () {
        $scope.selectedProject = { list: [] };
        $scope.selectedUser = { selected : undefined};
        $scope.selectedTags = {list: []};
        $scope.taskName = undefined;
        $scope.taskNotes = undefined;
        $scope.dueDate = undefined;
        $scope.taskNameRequired = false;
    };

    $scope.clearFields();

    $scope.onProjectSelected = function (item, model) {
        $scope.projectRequired = false;
    };

    $scope.onWorkspaceSelect = function (item, model) {
        $scope.selectedWorkspaceId = $scope.selectedWorkspace.selected.id;
        $scope.clearFields();
        $scope.workspaceNotSelected = false;

        AsanaGateway.getWorkspaceTags(function (response) {
            $scope.tags = response;
        }, null, {workspace_id: $scope.selectedWorkspaceId});

        AsanaGateway.getWorkspaceUsers(function (response) {
            $scope.users = response;
        }, null, {workspace_id: $scope.selectedWorkspaceId});

        AsanaGateway.getWorkspaceProjects(function (response) {
            $scope.projects = response;
        }, null, {workspace_id: $scope.selectedWorkspaceId});
    };

    $scope.createTask = function () {
        var options = {data: {}};
        options.data.workspace = $scope.selectedWorkspaceId;
        if($scope.isDefined($scope.selectedUser.selected))
            options.data.assignee = $scope.selectedUser.selected.id;
        if($scope.isDefined($scope.dueDate))
            options.data.due_at = $scope.dueDate.date;

        var projectList = $scope.selectedProject.list;
        if($scope.selectedProject.list.length == 0){
            $scope.projectRequired = true;
            return;
        }
        var projectIds = projectList.map(function (element) {
            return element.id;
        });
        if(projectIds.length > 0){
            options.data.projects = projectIds;
        }

        var taglist = $scope.selectedTags.list;
        var tags = taglist.map(function (element) {
            return element.id;
        });
        if(tags.length > 0){
            options.data.tags = tags;
        }

        if(!$scope.isDefined($scope.taskName)){
            $scope.taskNameRequired = true;
            return;
        }
        options.data.name = $scope.taskName;
        options.data.notes = $scope.taskNotes;

        console.log("Creating task with parameters: " + JSON.stringify(options));
        AsanaGateway.createTask(function (response) {
            console.log("Success: creating task: " + JSON.stringify(response));
            //$scope.selectedWorkspace = {};
            $scope.clearFields();

            $scope.taskCreationStatus = {
                success: true,
                message: "Task created",
                show: true
            };
            $timeout(function () {
                $scope.taskCreationStatus.show = false;
            }, 5000);
        }, function (response) {
            console.log("Error: creating task: " + JSON.stringify(response));
            $scope.taskCreationStatus = {
                success: false,
                message: "Failed to create task", //@todo error message
                show: true
            };
            $timeout(function () {
                $scope.taskCreationStatus.show = false;
            }, 5000);
        }, options);
    };

    AsanaGateway.getWorkspaces(function (response) {
        $scope.workspaces = response;
        if($scope.isDefined(response) && response.length > 0){
            $scope.selectedWorkspace = response[0];
            $scope.selectedWorkspace.selected = response[0];
            $scope.onWorkspaceSelect(response[0], response[0]);
        }
    });

    $scope.isDefined = function (param) {
        return typeof param != 'undefined';
    };
});

asanaModule.controller("todoController", function ($scope, AsanaGateway) {
    $scope.loggedIn = Asana.isLoggedIn();
});
