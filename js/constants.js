asanaModule.value("AsanaConstants", (function () {
    return {
        API_VERSION: "1.0",
        ASANA_HOST: "app.asana.com",
        REPORTER_API_HOST: "webhawks.oceanize.co.jp",
        ASANA_LOGIN_COOKIE_NAME: "ticket",
        DEADLINE_TYPE: {
            NONE: 0,
            DUE_ON: 1,
            DUE_AT: 2
        },

        getReporterBaseApiUrl: function () {
            return "http://localhost/task-reporter/public/api/v1/";
            // return "https://" + this.REPORTER_API_HOST + '/task-reporter/public/api/v1' + "/";
        },

        getBaseApiUrl: function () {
            return "https://" + this.ASANA_HOST + '/api/' + this.API_VERSION + "/";
        },

        getAsanaDomain: function() {
            return "https://" + this.ASANA_HOST + "/";
        },

        isValidAsanaTaskUrl: function (url) {
            let rgx = RegExp(`^https:\/\/${this.ASANA_HOST}\/0\/(home\/)?[0-9]+\/[0-9]+$`, 'gi'); 
            return rgx.test(url);
        },

        isAsanaLoginCookie: function (cookieName) {
            return cookieName === this.ASANA_LOGIN_COOKIE_NAME;
        },

        isAsanaDomain: function (domain) {
            return domain.endsWith(this.ASANA_HOST);
        },

        // plugin specific
        LOGIN_PROPERTY: "loggedIn",
        isLoggedIn: function() {
            return localStorage[this.LOGIN_PROPERTY] === 'true';
        },
        setLoggedIn: function (loggedIn) {
            localStorage[this.LOGIN_PROPERTY] = loggedIn;
        },

        HIDE_ARCHIVED_PROJECTS: "hideArchivedProjects",
        getHideArchivedProjects: function () {
            return localStorage[this.HIDE_ARCHIVED_PROJECTS] === 'true';
        },
        setHideArchivedProjects: function (hide) {
            localStorage[this.HIDE_ARCHIVED_PROJECTS] = hide;
        },

        DEFAULT_ASSIGNEE_ME: "defaultAssigneeMe",
        getDefaultAssigneeMe: function () {
            return localStorage[this.DEFAULT_ASSIGNEE_ME] === 'true';
        },
        setDefaultAssigneeMe: function (defaultMe) {
            localStorage[this.DEFAULT_ASSIGNEE_ME] = defaultMe;
        },

        PROJECT_OPTIONAL: "projectOptional",
        getProjectOptional: function () {
            return localStorage[this.PROJECT_OPTIONAL] === 'true';
        },
        setProjectOptional: function (value) {
            localStorage[this.PROJECT_OPTIONAL] = value;
        },

        REMEMBER_PROJECT: "rememberProject",
        getRememberProject: function () {
            return localStorage[this.REMEMBER_PROJECT] === 'true';
        },

        setRememberProject: function (value) {
            localStorage[this.REMEMBER_PROJECT] = value;
        },

        REMEMBER_TAG: "rememberTag",
        getRememberTag: function () {
            return localStorage[this.REMEMBER_TAG] === 'true';
        },

        setRememberTag: function (value) {
            localStorage[this.REMEMBER_TAG] = value;
        },

        REMEMBER_FOLLOWER: "rememberFollower",
        getRememberFollower: function () {
            return localStorage[this.REMEMBER_FOLLOWER] === 'true';
        },

        setRememberFollower: function (value) {
            localStorage[this.REMEMBER_FOLLOWER] = value;
        },

        CHATWORK_ACCESS_TOKEN: "chatworkAccessToken",
        getChatworkAccessToken: function () {
            return localStorage[this.CHATWORK_ACCESS_TOKEN];
        },
        setChatworkAccessToken: function (value) { 
            localStorage[this.CHATWORK_ACCESS_TOKEN] = value;
        },

        CURRENT_PROJECT_NAME: "currentProjectName",
        getCurrentProjectName: function () {
            return localStorage[this.CURRENT_PROJECT_NAME];
        },
        setCurrentProjectName: function (value) {
            localStorage[this.CURRENT_PROJECT_NAME] = value;
        },

        IN_PROGRESS_TASK_GID: "inProgressTaskGid",
        getInProgressTaskGid: function () {
            return localStorage[this.IN_PROGRESS_TASK_GID];
        },
        setInProgressTaskGid: function (value) {
            localStorage[this.IN_PROGRESS_TASK_GID] = value;
        },

        IN_PROGRESS_TASK_URL: "inProgressTaskUrl",
        getInProgressTaskUrl: function () {
            return localStorage[this.IN_PROGRESS_TASK_URL];
        },
        setInProgressTaskUrl: function (value) {
            localStorage[this.IN_PROGRESS_TASK_URL] = value;
        },

        IN_PROGRESS_TASK: "inProgressTask",
        getInProgressTask: function () { 
            if (!localStorage[this.IN_PROGRESS_TASK] || localStorage[this.IN_PROGRESS_TASK] === '') {
                return {};
            }
            
            return JSON.parse(localStorage[this.IN_PROGRESS_TASK]);
        },
        setInProgressTask: function (value) {
            localStorage[this.IN_PROGRESS_TASK] = JSON.stringify(value);
        },

        CURRENT_TASK_START_TIME: "currentTaskStartTime",
        getCurrentTaskStartTime: function () {
            return localStorage[this.CURRENT_TASK_START_TIME];
        },
        setCurrentTaskStartTime: function (value) {
            localStorage[this.CURRENT_TASK_START_TIME] = value;
        },

        setDefaultPictureUser: function (user) {
            if(user && user.photo == null){
                user.photo = {
                    "image_21x21": "../img/nopicture.png",
                    "image_27x27": "../img/nopicture.png",
                    "image_36x36": "../img/nopicture.png",
                    "image_60x60": "../img/nopicture.png",
                    "image_128x128": "../img/nopicture.png",
                    "image_1024x1024": "../img/nopicture.png"
                };
            }
        },

        setDefaultPicture: function (users) {
            users.forEach(function (user) {
                if(user.photo == null){
                    user.photo = {
                        "image_21x21": "../img/nopicture.png",
                        "image_27x27": "../img/nopicture.png",
                        "image_36x36": "../img/nopicture.png",
                        "image_60x60": "../img/nopicture.png",
                        "image_128x128": "../img/nopicture.png",
                        "image_1024x1024": "../img/nopicture.png"
                    };
                }
            });
        }
    };
})());