
 var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
 Handlebars.partials = Handlebars.templates;
 var tmpl = Handlebars.templates; var tmpl_compile = Handlebars.compile;
templates['default/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Default Create</h1>";
  });
templates['default/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Default Edit</h1>";
  });
templates['default/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Default List View</h1>";
  });
templates['default/view'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<h1>Default View / Form</h1>";
  });
templates['widgets/form'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<form onsubmit=\"return false\"><h1>Create a new widget:</h1><button class=\"create\">Make widget</button></form>";
  });
templates['widgets/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  this.compilerInfo = [3,'>= 1.0.0-rc.4'];
helpers = helpers || Handlebars.helpers; data = data || {};
  


  return "<p>got widgets?</p>how come this wont render into my list?";
  });
