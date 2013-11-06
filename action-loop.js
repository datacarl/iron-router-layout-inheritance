if (Meteor.isClient) {
  Template.hello.greeting = function () {
    return "Welcome to layoutTemplate.";
  };

  Template.hello.events({
    'click input' : function () {
      // template data, if any, is available in 'this'
      if (typeof console !== 'undefined')
        console.log("You pressed the button");
    }
  });
}

/**
 * Comment out the config and the layouts set by the controllers
 * will work.
 */
Router.configure({
  layoutTemplate: 'layout-red',
});

FirstLevelController = RouteController.extend({
  layoutTemplate: 'layout-blue',

  template: 'hello',
});

SecondLevelController = FirstLevelController.extend({
  layoutTemplate: 'layout-red',
});

/** Should just inherit and be red */
ThirdLevelController = SecondLevelController.extend({});

Router.map(function() {
  this.route('firstLevel', {
    path: '/',

    controller: FirstLevelController,
  });
  this.route('secondLevel', {
    path: 'second',

    controller: SecondLevelController,
  });
  this.route('thirdLevel', {
    path: 'third',

    controller: ThirdLevelController,
  });
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
