var asanaModule = angular.module("asana", ["ngRoute", "ngSanitize", "ui.select", "ui.bootstrap", "ui.bootstrap.datetimepicker","angular-clipboard"]);

asanaModule.config(function($routeProvider, $locationProvider) {
    $locationProvider.html5Mode(true);
    $routeProvider
        .when("/manage", {
            // task management page
            templateUrl : "pages/tasks.html",
            controller  : "tasksController",
            controllerAs: "tasksCtrl",
            activeTab   : "manage"
        })
        .when("/create", {
            // route for the create task page
            templateUrl : "pages/createTask.html",
            controller  : "createTaskController",
            controllerAs: "createTaskCtrl",
            activeTab   : "create"
        })
        .when("/settings", {
            // settings
            templateUrl : "pages/settings.html",
            controller  : "settingsController",
            controllerAs: "settingsCtrl",
            activeTab   : "settings"
        })
        .when("popup.html", {
            redirectTo  : "/manage"
        })
        .otherwise({
            //default
            redirectTo  : "/manage"
        });
});

asanaModule.config([
    "$compileProvider",
    function ($compileProvider) {
        $compileProvider.imgSrcSanitizationWhitelist(/^\s*((https?|chrome-extension):|data:image\/)/);
        $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|chrome-extension):/);
    }
]);
