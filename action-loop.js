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
 * When using Router.configure the layout cannot be overridden by
 * controllers. Overriding in a route still works.
 *
 * When not using Router.configure overriding and inheriting works fine from
 * controllers.
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

/** Overriding in the route instead (see below). This works regardless of Router.configure */
FourthLevelController = ThirdLevelController.extend({});

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

  this.route('fourthLevel', {
    path: 'fourth',

    layoutTemplate: 'layout-blue',

    controller: FourthLevelController,
  });
});

if (Meteor.isServer) {
  Meteor.startup(function () {
    // code to run on server at startup
  });
}
