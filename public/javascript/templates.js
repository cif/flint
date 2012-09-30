
var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
Handlebars.partials = Handlebars.templates;
var tmpl = Handlebars.templates; var tmpl_compile = Handlebars.compile;
templates['navigation'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <li id=\"clients\">";
  stack1 = {};
  stack1['rel'] = "Clients";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#clients", "&nbsp;", {hash:stack1}) : helperMissing.call(depth0, "link", "#clients", "&nbsp;", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>    <li id=\"reports\">";
  stack1 = {};
  stack1['rel'] = "Reports";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#reports", "&nbsp;", {hash:stack1}) : helperMissing.call(depth0, "link", "#reports", "&nbsp;", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <li id=\"setup\">";
  stack1 = {};
  stack1['rel'] = "Setup";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#setup", "&nbsp;", {hash:stack1}) : helperMissing.call(depth0, "link", "#setup", "&nbsp;", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "          <li id=\"account\">";
  stack1 = {};
  stack1['class'] = "pm";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#account", "Account Settings", {hash:stack1}) : helperMissing.call(depth0, "link", "#account", "Account Settings", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>        ";
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "          <li>";
  stack1 = {};
  stack1['class'] = "pm";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#accounts", "Flybook Administration", {hash:stack1}) : helperMissing.call(depth0, "link", "#accounts", "Flybook Administration", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>        ";
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "          <li class=\"uf\">Use Flybook On Behalf of:</li>          ";
  stack1 = depth0.accounts;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "          ";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "            <li><a href=\"#accounts/switch/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "/\">";
  stack1 = depth0.company;
  foundHelper = helpers.truncate;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 30, {hash:{}}) : helperMissing.call(depth0, "truncate", stack1, 30, {hash:{}});
  buffer += escapeExpression(stack1) + "</a></li>          ";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " style=\"background-image:url('https://s3.amazonaws.com/flybook/icon_";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ".jpg');\"";
  return buffer;}

function program14(depth0,data) {
  
  
  return "style=\"background-image:url('https://s3.amazonaws.com/flybook-asset/images/gone-default-user.gif');\"";}

  buffer += "<ul id=\"main-nav\">  <li id=\"reservation\">";
  stack1 = {};
  stack1['rel'] = "New Reservation";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#reservation", "&nbsp;", {hash:stack1}) : helperMissing.call(depth0, "link", "#reservation", "&nbsp;", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  <li id=\"dashboard\">";
  stack1 = {};
  stack1['rel'] = "Dashboard";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#dashboard", "&nbsp;", {hash:stack1}) : helperMissing.call(depth0, "link", "#dashboard", "&nbsp;", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  <li id=\"calendar\"><em>";
  foundHelper = helpers.date_today;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.date_today; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</em>";
  stack1 = {};
  stack1['rel'] = "Calendar";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#calendar", "&nbsp;", {hash:stack1}) : helperMissing.call(depth0, "link", "#calendar", "&nbsp;", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  ";
  stack1 = depth0.role;
  foundHelper = helpers.check_role;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "super,manager,staff", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "check_role", stack1, "super,manager,staff", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.role;
  foundHelper = helpers.check_role;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "super,manager", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "check_role", stack1, "super,manager", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  <li id=\"tip\"></li></ul><ul id=\"user\">      <li class=\"a\"><span class=\"arrow\"> </span>      <ul>        <li id=\"prefs\">";
  stack1 = {};
  stack1['class'] = "pm";
  foundHelper = helpers.link;
  stack1 = foundHelper ? foundHelper.call(depth0, "#preferences", "Personal Preferences", {hash:stack1}) : helperMissing.call(depth0, "link", "#preferences", "Personal Preferences", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>        ";
  stack1 = depth0.role;
  foundHelper = helpers.check_role;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "super,manager", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "check_role", stack1, "super,manager", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "        ";
  stack1 = depth0.flybook_admin;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "        ";
  stack1 = depth0.accounts;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "        <li class=\"lo\">";
  stack1 = {};
  stack1['class'] = "logout";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Logout", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Logout", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>      </ul>      </li>    <li><span class=\"cover\" ";
  stack1 = depth0.has_icon;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(14, program14, data),fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">&nbsp;</span></li>    <li><a class=\"profile\"><span>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span> ";
  stack1 = depth0.account;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.company;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a></li></ul><div id=\"arrow-ind\"></div>";
  return buffer;});
templates['navigation_sidebar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, self=this, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.search_box, 'search_box', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<h3>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h3>";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <ul>  ";
  stack1 = depth0.contents;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </ul>";
  return buffer;}
function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><a href=\"";
  foundHelper = helpers.href;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.href; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a></li>  ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  <div id=\"side-calendar\"> </div>      <div id=\"toggles\"> ";
  stack1 = depth0.trips;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.staff;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.lodges;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<!--  ";
  stack1 = depth0.meals;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " --></div> ";
  return buffer;}
function program9(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  <h4><span class=\"up\"></span>";
  stack1 = depth0.attributes;
  stack2 = {};
  stack2['class'] = "all";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "trip", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "trip", {hash:stack2});
  buffer += escapeExpression(stack1) + " Trips &amp; Activities</h4>  <div class=\"group\" id=\"trip\">  ";
  stack1 = depth0.trips;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div> ";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    <p class=\"checkbox color";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.color;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" id=\"";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><input type=\"checkbox\" name=\"trip\" value=\"";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><label>";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label></p>  ";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  <h4><span class=\"up\"></span>";
  stack1 = depth0.attributes;
  stack2 = {};
  stack2['class'] = "all";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "staff", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "staff", {hash:stack2});
  buffer += escapeExpression(stack1) + " Guides &amp; Staff</h4>  <div class=\"group\" id=\"staff\">  ";
  stack1 = depth0.staff;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div> ";
  return buffer;}
function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    <p class=\"checkbox color";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.color;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" id=\"";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><input type=\"checkbox\" name=\"staff\" value=\"";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><label>";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nickname;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label></p>  ";
  return buffer;}

function program15(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  <h4><span class=\"up\"></span>";
  stack1 = depth0.attributes;
  stack2 = {};
  stack2['class'] = "all";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lodge", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lodge", {hash:stack2});
  buffer += escapeExpression(stack1) + " Lodging</h4>  <div class=\"group\" id=\"lodge\">  ";
  stack1 = depth0.lodges;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div> ";
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    <p class=\"checkbox color";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.color;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" id=\"";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><input type=\"checkbox\" name=\"lodge\" value=\"";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><label>";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</label></p>  ";
  return buffer;}

function program18(depth0,data) {
  
  
  return "  <h4><span class=\"up\"></span>Meals</h4>  <div class=\"group\" id=\"meals\">  <p class=\"checkbox\" id=\"breakfast\"><input type=\"checkbox\" name=\"meal\" value=\"breakfast\"><label>Breakfast</label></p>  <p class=\"checkbox\" id=\"lunch\"><input type=\"checkbox\" name=\"meal\" value=\"lunch\"><label>Lunch</label></p>  <p class=\"checkbox\" id=\"dinner\"><input type=\"checkbox\" name=\"meal\" value=\"dinner\"><label>Dinner</label></p>  </div>   ";}

  buffer += "<div id=\"nav\">  ";
  stack1 = depth0.search;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.title;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.contents;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.calendar;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>";
  return buffer;});
templates['notification'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<button class=\"undo\">";
  foundHelper = helpers.undo_text;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.undo_text; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</button>";
  return buffer;}

  buffer += "<h2>";
  foundHelper = helpers.message;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.message; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2><button class=\"close\">";
  foundHelper = helpers.dismiss;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dismiss; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</button>";
  stack1 = depth0.undo_callback;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;});
templates['accounts/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"settings\" onsubmit=\"return false\"><h1>Create A New Account</h1><p class=\"step\"><span>1</span> New model company name:</p><fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Company Name)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "company", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "company", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset><p class=\"step\"><span>2</span> Primary Industry and Account Settings:</p><fieldset><p class=\"field\"><label>Outfitter Type</label>";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.industries;
  stack2 = depth0.model;
  stack3 = {};
  stack3['style'] = "width:210px";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "industry", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "industry", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Booking URL: http://</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['style'] = "width:110px";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "flybook_url", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "flybook_url", {hash:stack2});
  buffer += escapeExpression(stack1) + "<label>.flybook.com</label></p></fieldset><p class=\"step\"><span>3</span> Account Contact Information. (You can enter more details next)</p><fieldset><p class=\"field\"><label>Full Name</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Contact Name)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Email Address</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Contact Email)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "email", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p></fieldset><div class=\"buttons-right\"> <button class=\"save continue\">Save &amp; Continue</button><br /> <a href=\"javascript:void(0)\" class=\"cancel\">or cancel</a></div></form>";
  return buffer;});
templates['accounts/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<ul class=\"list\">";
  stack1 = depth0.users;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li><div><span>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>&nbsp;&nbsp;<span>(";
  foundHelper = helpers.email;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</div></li>";
  return buffer;}

function program4(depth0,data) {
  
  var stack1;
  stack1 = depth0.email;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }}
function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  <p>No users added to this account yet.<br />  <strong>Create the primary admin account now for ";
  stack1 = depth0.account;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.email;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "?</strong> The user will be notified by email.   <br />You may optionally set a temporary password which will be emailed to the user.</p>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Temporary Password)";
  stack2['style'] = "width:200px";
  foundHelper = helpers.password;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "new_user_password", {hash:stack2}) : helperMissing.call(depth0, "password", stack1, "new_user_password", {hash:stack2});
  buffer += escapeExpression(stack1) + "  <p class=\"field\">  <button class=\"new-user-account\">Yes, Create it!</button>  </p>  <br />  <p class=\"small\">Note &mdash; creating an admin account will cause this view to reset.</p>  ";
  return buffer;}

function program7(depth0,data) {
  
  
  return "  <p>To create an admin user for the account, <strong>enter a contact email for the account</strong>.<br />    Once you have entered one, save your changes then re-manage this account.</p>  ";}

  buffer += "<form class=\"account\" onsubmit=\"return false\"><button class=\"cancel\">Cancel</button><button class=\"done\">Done</button> ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "title";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "company", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "company", {hash:stack2});
  buffer += escapeExpression(stack1) + "<br style=\"clear:both;\" />&nbsp;&nbsp;&nbsp;<a href=\"#accounts/switch/";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "/\">Use FLyBOOK as ";
  foundHelper = helpers.company;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.company; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</a><ul class=\"tabs\"><li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Contact", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Contact", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Commissions &amp; Fees", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Commissions &amp; Fees", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Settings", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Settings", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Users", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Users", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Notes", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Notes", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li></ul><div class=\"tabshell\">		<div class=\"tab\"> <div class=\"left\">	<h3>Primary Contact</h3>	<fieldset>		";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Contact Name)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "		";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Contact Phone)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "phone", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "phone", {hash:stack2});
  buffer += escapeExpression(stack1) + "		";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Contact Email)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "email", {hash:stack2});
  buffer += escapeExpression(stack1) + "		";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Website)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "url", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "url", {hash:stack2});
  buffer += escapeExpression(stack1) + "		<!-- 		todo: quick links		<a href=\"tel:";
  foundHelper = helpers.phone;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.phone; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"call\"><span>Call ";
  foundHelper = helpers.contact;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.contact; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></a>		<a href=\"mailto:";
  foundHelper = helpers.email;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.email; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" class=\"email\"><span>Email ";
  foundHelper = helpers.contact;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.contact; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></a>		-->	</fieldset>	 </div> <div class=\"right\">	 <h3>Physical Address</h3>	  <fieldset>		";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Address)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "address", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "address", {hash:stack2});
  buffer += escapeExpression(stack1) + "		";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(City/Town)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "city", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "city", {hash:stack2});
  buffer += escapeExpression(stack1) + "		<p class=\"field\">";
  stack1 = depth0.states;
  stack2 = depth0.model;
  stack3 = {};
  stack3['style'] = "width:210px";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "state", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "state", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</p>		";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Zip/Postal Code)";
  stack2['style'] = "width:150px";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "zip", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "zip", {hash:stack2});
  buffer += escapeExpression(stack1) + "<br />		<p class=\"field\">";
  stack1 = depth0.countries;
  stack2 = depth0.model;
  stack3 = {};
  stack3['style'] = "width:130px";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "country", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "country", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</p> </div>		</div>					<div class=\"tab three-column\"> <div class=\"left\"> 	<!--<h3>Base Commissions</h3>  <fieldset>	 <p class=\"field\"><label>Trip Commission</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "commission_trip", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "commission_trip", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>%</span></p> 	 <p class=\"field\"><label>Lodge Commission</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "commission_lodging", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "commission_lodging", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>%</span></p> 	 <p class=\"field\"><label>Product Commission</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "commission_product", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "commission_product", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>%</span></p>	</fieldset>--> </div> <div class=\"center\">		<h3>Origin Commissions</h3>	<fieldset>	 <p class=\"field\"><label>Booked Online</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "commission_web", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "commission_web", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>%</span></p> 	 <p class=\"field\"><label>Admin Entered</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "commission_entered", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "commission_entered", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>%</span></p>	 <p class=\"field\"><label>gone. Referral</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "commission_referral", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "commission_referral", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>%</span></p> 	</fieldset> </div> <div class=\"right\">  <h3>Account Plan &amp; Fees</h3>	<fieldset>		<p class=\"field\"><label>Monthly Fee $</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "monthly_fee", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "monthly_fee", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>		<p class=\"field\"><label>Mail Send Quota</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "mail_send_quota", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "mail_send_quota", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>/mo.</span></p>	</fieldset> </div>		</div>	<div class=\"tab\"> <div class=\"full\">  <h3>Settings / Admin</h3>   <fieldset>		<p class=\"select\"><label>Outfitter Type</label>";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.industries;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "industry", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "industry", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>    <p class=\"field\"><label>Booking URL: http://</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['style'] = "width:110px";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "flybook_url", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "flybook_url", {hash:stack2});
  buffer += escapeExpression(stack1) + "<label>.theflybook.com</label></p>    <p class=\"field\"><label>gone profile default theme color</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['style'] = "width:60px";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "theme_color", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "theme_color", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>    <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "allow_auto_balance", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "allow_auto_balance", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Enable this account to use automatic balance collection</label></p>		    <p><a href=\"/api/accounts/_export/?id=";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">Export account data to SQL file</a></p>  </fieldset> </div>		</div><div class=\"tab\">";
  stack1 = depth0.users;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(4, program4, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	</div>	<div class=\"tab\"><h3>Private Account / Sales Notes</h3><fieldset>";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "notes", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "notes", {hash:{}});
  buffer += escapeExpression(stack1) + "</fieldset></div></div>	<br /></form>	";
  return buffer;});
templates['accounts/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.company;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.company; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">Delete</button></li>";
  return buffer;}

  buffer += "<h1>";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h1><button class=\"create\">New Account</button><ol id=\"accounts\" class=\"list\">";
  stack1 = depth0.accounts;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No account matches", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No account matches", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol>";
  return buffer;});
templates['calendar/day'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "   <div class=\"trip ";
  stack1 = depth0.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-sql=\"";
  stack1 = depth1.sql;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.twofour;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">    <h4 class=\"color";
  stack1 = depth0.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.color;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  foundHelper = helpers.truncate;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 20, {hash:{}}) : helperMissing.call(depth0, "truncate", stack1, 20, {hash:{}});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.start;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " (";
  foundHelper = helpers.available;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.available; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</h4>    ";
  stack1 = depth0.schedule;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program6, data, depth0, depth1)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   </div>    ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-time=\"";
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.twofour;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program4(depth0,data) {
  
  var stack1;
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.start;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  return escapeExpression(stack1);}

function program6(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <div class=\"group ";
  stack1 = depth0.empty;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">      <div class=\"guide ";
  stack1 = depth0.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-number=\"";
  foundHelper = helpers.number;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.number; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-space=\"";
  stack1 = depth0.available;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.length;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">       <p class=\"guide-name\">";
  stack1 = depth0.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nickname;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.filled;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.filled; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</p>       ";
  stack1 = depth0.reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "       ";
  stack1 = depth0.available;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program12, data, depth0, depth1, depth2)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "      </div>    </div>    ";
  return buffer;}
function program7(depth0,data) {
  
  
  return "empty";}

function program9(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "         <div class=\"reservation client-group ";
  foundHelper = helpers.status;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-activity=\"";
  foundHelper = helpers.activity_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.activity_id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-people=\"";
  foundHelper = helpers.people;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.people; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.people;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.people; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</div>         ";
  stack1 = depth0.clients;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program10, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "       ";
  return buffer;}
function program10(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "           <div class=\"reservation client ";
  stack1 = depth1.status;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-activity=\"";
  foundHelper = helpers.activity_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.activity_id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>         ";
  return buffer;}

function program12(depth0,data,depth1,depth2,depth3) {
  
  var buffer = "", stack1;
  buffer += "        <div class=\"available seat\" id=\"";
  stack1 = depth2.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-sql=\"";
  stack1 = depth3.sql;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-guide=\"";
  stack1 = depth1.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-time=\"";
  stack1 = depth1.time;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">Available</div>       ";
  return buffer;}

function program14(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "       <div class=\"lodge ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">          <h4>";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</h4>          ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.booked;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "          ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.available;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program17, data, depth0, depth1)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "       </div>    ";
  return buffer;}
function program15(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "            <div class=\"reservation lodging ";
  foundHelper = helpers.status;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.room;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.room; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</div>          ";
  return buffer;}

function program17(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "            <div class=\"available lodging\" id=\"";
  stack1 = depth1.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-sql=\"";
  stack1 = depth2.sql;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-room=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>          ";
  return buffer;}

function program19(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "     <div class=\"lodge ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">        <h4>";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</h4>        ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.checking_in;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(23, program23, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "             </div>  ";
  return buffer;}
function program20(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "          ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.checking_in;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(21, program21, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "        ";
  return buffer;}
function program21(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "            <div class=\"reservation lodging ";
  foundHelper = helpers.status;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.room;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.room; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</div>          ";
  return buffer;}

function program23(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "         <p class=\"no-action\">No one is checking into ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " today.</p>        ";
  return buffer;}

function program25(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "     <div class=\"lodge ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">        <h4>";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</h4>        ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.checking_out;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(29, program29, data),fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "             </div>  ";
  return buffer;}
function program26(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "          ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.checking_out;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(27, program27, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "        ";
  return buffer;}
function program27(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "            <div class=\"reservation lodging ";
  foundHelper = helpers.status;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.room;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.room; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</div>          ";
  return buffer;}

function program29(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "         <p class=\"no-action\">No one is checking out of ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " today.</p>        ";
  return buffer;}

function program31(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "   ";
  stack1 = depth0.arrivals;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(32, program32, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  return buffer;}
function program32(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"time\">";
  foundHelper = helpers.time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>       ";
  stack1 = depth0.parties;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(33, program33, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  return buffer;}
function program33(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"travel\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">          <span>";
  foundHelper = helpers.who;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.who; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " via ";
  foundHelper = helpers.via;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.via; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>       </div>       ";
  return buffer;}

function program35(depth0,data) {
  
  
  return "    <p class=\"no-action\">No one to pick up today.</p>  ";}

function program37(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "   ";
  stack1 = depth0.departures;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(38, program38, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  return buffer;}
function program38(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"time\">";
  foundHelper = helpers.time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>       ";
  stack1 = depth0.parties;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  return buffer;}
function program39(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"travel\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">          <span>";
  foundHelper = helpers.who;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.who; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " via ";
  foundHelper = helpers.via;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.via; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>       </div>       ";
  return buffer;}

function program41(depth0,data) {
  
  
  return "    <p class=\"no-action\">No one to drop off today.</p>    ";}

  buffer += "<table class=\"fc-header\" style=\"width:100%\">  <tbody>  <tr>    <td class=\"fc-header-left\"></td>    <td class=\"fc-header-center\"></td>    <td class=\"fc-header-right\">      <span class=\"fc-header-title\"><h2>";
  foundHelper = helpers.label;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.label; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2></span>    </td></tr></tbody></table><div class=\"view-opts\"> <p class=\"checkbox show-availability sha-staff\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sha-staff", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "sha-staff", {hash:{}});
  buffer += escapeExpression(stack1) + " <label>Available Staff</label></p> <p class=\"checkbox show-availability sha-space\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sha-space", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "sha-space", {hash:{}});
  buffer += escapeExpression(stack1) + " <label>Available Space</label></p> <p class=\"checkbox show-availability sha-client\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sha-client", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "sha-client", {hash:{}});
  buffer += escapeExpression(stack1) + " <label>Individual Clients</label></p></div><a class=\"print\" href=\"javascript:window.print()\"><span>Print</span></a><br /><div class=\"day-view\"><div class=\"program\">  <h3>Activity Schedule</h3>  ";
  stack1 = depth0.trips;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program1, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div>    <div class=\"lodge-assign\">  <h3>Lodge Assignments</h3>     ";
  stack1 = depth0.lodging;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program14, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </div> <div class=\"checks\"><h3>Checking In</h3>  ";
  stack1 = depth0.lodging;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   <h3>Checking Out</h3>  ";
  stack1 = depth0.lodging;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(25, program25, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "     </div>  <div class=\"travelers\">  <h3>Arrivals</h3>  ";
  stack1 = depth0.arrivals;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(35, program35, data),fn:self.program(31, program31, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  <h3>Departures</h3>  ";
  stack1 = depth0.departures;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(41, program41, data),fn:self.program(37, program37, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>      </div>";
  return buffer;});
templates['calendar/prompt'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <p class=\"small\">";
  foundHelper = helpers.guide;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.guide; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</p>";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"col\"><p><b>Book A Trip:</b></p> ";
  stack1 = depth0.trips;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program4, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>";
  return buffer;}
function program4(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "    <a href=\"#reservation/trip/";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.start;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth1.end;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a> ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"col\"><p><b>Book A Lodge:</b></p> ";
  stack1 = depth0.lodges;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program7, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>";
  return buffer;}
function program7(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "    <a href=\"#reservation/lodge/";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "/";
  stack1 = depth1.start;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1);
  stack1 = depth1.end;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</a> ";
  return buffer;}

  buffer += "<p class=\"small\">";
  foundHelper = helpers.display;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.display; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</p>";
  stack1 = depth0.guide;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.trips;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.lodges;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<button class=\"close cancel\">Cancel</button>";
  return buffer;});
templates['calendar/main'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div class=\"cal-buttons\">  <button class=\"prev\">‹</button>    <button class=\"day unselected\">Day</button>  <button class=\"week unselected\">Week</button>  <button class=\"month unselected\">Month</button>  <button class=\"next\">›</button></div>  <div id=\"month-view\" class=\"schedule-view\"></div><div id=\"week-view\" class=\"schedule-view\"></div><div id=\"day-view\" class=\"schedule-view\"></div>";});
templates['calendar/week'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "   <div class=\"week-day ";
  foundHelper = helpers.sql;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sql; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"> <em>";
  foundHelper = helpers.slash;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.slash; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</em> ";
  stack1 = depth0.trips;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program2, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "     </div>";
  return buffer;}
function program2(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <div class=\"trip ";
  stack1 = depth0.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-sql=\"";
  stack1 = depth1.sql;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" ";
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.twofour;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">    <h4 class=\"color";
  stack1 = depth0.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.color;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">";
  stack1 = depth0.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  foundHelper = helpers.truncate;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 20, {hash:{}}) : helperMissing.call(depth0, "truncate", stack1, 20, {hash:{}});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.start;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " (";
  foundHelper = helpers.available;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.available; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</h4>    ";
  stack1 = depth0.schedule;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program7, data, depth0, depth1)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div>   ";
  return buffer;}
function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "data-time=\"";
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.twofour;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"";
  return buffer;}

function program5(depth0,data) {
  
  var stack1;
  stack1 = depth0.time;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.start;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  return escapeExpression(stack1);}

function program7(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <div class=\"group ";
  stack1 = depth0.empty;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">      <div class=\"guide ";
  stack1 = depth0.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-number=\"";
  foundHelper = helpers.number;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.number; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-space=\"";
  stack1 = depth0.available;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.length;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">       <p class=\"guide-name\">";
  stack1 = depth0.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nickname;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.filled;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.filled; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</p>       ";
  stack1 = depth0.reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "       ";
  stack1 = depth0.available;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program13, data, depth0, depth1, depth2)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "      </div>    </div>    ";
  return buffer;}
function program8(depth0,data) {
  
  
  return "empty";}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "         <div class=\"reservation client-group ";
  foundHelper = helpers.status;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-activity=\"";
  foundHelper = helpers.activity_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.activity_id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-people=\"";
  foundHelper = helpers.people;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.people; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.people;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.people; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</div>         ";
  stack1 = depth0.clients;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program11, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "       ";
  return buffer;}
function program11(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "           <div class=\"reservation client ";
  stack1 = depth1.status;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-activity=\"";
  foundHelper = helpers.activity_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.activity_id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>         ";
  return buffer;}

function program13(depth0,data,depth1,depth2,depth3) {
  
  var buffer = "", stack1;
  buffer += "        <div class=\"available seat\" id=\"";
  stack1 = depth2.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-sql=\"";
  stack1 = depth3.sql;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-guide=\"";
  stack1 = depth1.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-time=\"";
  stack1 = depth1.time;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">Available</div>       ";
  return buffer;}

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  <h3>Lodging</h3>  ";
  stack1 = depth0.days;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "     <div class=\"week-day ";
  foundHelper = helpers.sql;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sql; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">    <em>";
  foundHelper = helpers.slash;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.slash; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</em>    ";
  stack1 = depth0.lodging;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program17, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </div>       ";
  return buffer;}
function program17(depth0,data,depth1) {
  
  var buffer = "", stack1;
  buffer += "       <div class=\"lodge ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">          <h4>";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</h4>          ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.booked;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "          ";
  stack1 = depth0.schedule;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.available;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program20, data, depth0, depth1)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "       </div>    ";
  return buffer;}
function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "            <div class=\"reservation lodging ";
  foundHelper = helpers.status;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.status; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.room;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.room; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</div>          ";
  return buffer;}

function program20(depth0,data,depth1,depth2) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "            <div class=\"available lodging\" id=\"";
  stack1 = depth1.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-sql=\"";
  stack1 = depth2.sql;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\" data-room=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>          ";
  return buffer;}

function program22(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "     <div class=\"week-day ";
  foundHelper = helpers.sql;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sql; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">    <em>";
  foundHelper = helpers.slash;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.slash; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</em>    ";
  stack1 = depth0.arrivals;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(23, program23, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </div>       ";
  return buffer;}
function program23(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"time\">";
  foundHelper = helpers.time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>       ";
  stack1 = depth0.parties;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(24, program24, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  return buffer;}
function program24(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"travel\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">          <span>";
  foundHelper = helpers.who;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.who; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " via ";
  foundHelper = helpers.via;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.via; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>       </div>       ";
  return buffer;}

function program26(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "     <div class=\"week-day ";
  foundHelper = helpers.sql;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sql; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">    <em>";
  foundHelper = helpers.slash;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.slash; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</em>    ";
  stack1 = depth0.departures;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(27, program27, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </div>       ";
  return buffer;}
function program27(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"time\">";
  foundHelper = helpers.time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div>       ";
  stack1 = depth0.parties;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(28, program28, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  return buffer;}
function program28(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <div class=\"travel\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">          <span>";
  foundHelper = helpers.who;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.who; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " via ";
  foundHelper = helpers.via;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.via; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>       </div>       ";
  return buffer;}

  buffer += "<table class=\"fc-header\" style=\"width:100%\">  <tbody>  <tr>    <td class=\"fc-header-left\"></td>    <td class=\"fc-header-center\"></td>    <td class=\"fc-header-right\">      <span class=\"fc-header-title\"><h2>";
  foundHelper = helpers.range;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.range; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2></span>    </td></tr></tbody></table><div class=\"view-opts\"> <p class=\"checkbox show-availability sha-staff\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sha-staff", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "sha-staff", {hash:{}});
  buffer += escapeExpression(stack1) + " <label>Available Staff</label></p> <p class=\"checkbox show-availability sha-space\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sha-space", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "sha-space", {hash:{}});
  buffer += escapeExpression(stack1) + " <label>Available Space</label></p> <p class=\"checkbox show-availability sha-client\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sha-client", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "sha-client", {hash:{}});
  buffer += escapeExpression(stack1) + " <label>Individual Clients</label></p></div><a class=\"print\" href=\"javascript:window.print()\"><span>Print</span></a><div class=\"weeks\"><h3>Activity</h3>";
  stack1 = depth0.days;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.is_lodging;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br /><h3>Arrivals</h3>  ";
  stack1 = depth0.days;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  <br /><h3>Departures</h3>  ";
  stack1 = depth0.days;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(26, program26, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   </div>";
  return buffer;});
templates['clients/addresses'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">Delete</button></li>";
  return buffer;}

  buffer += "<h1>Address Book</h1><button class=\"create top-right\">New Client</button><ol id=\"clients\" class=\"list addresses\">";
  stack1 = depth0.clients;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No clients match your search", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No clients match your search", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol>";
  return buffer;});
templates['clients/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Add New Client Record</h1>";});
templates['clients/data_tools'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Import &amp; Export Client Data</h1><img src=\"https://flybook-asset.s3.amazonaws.com/images/climb-soon.jpg\"/>";});
templates['clients/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Edit Client<h1>";});
templates['clients/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">Delete</button></li>";
  return buffer;}

  buffer += "<h1>Clients</h1><button class=\"create top-right\">New Client</button><ol id=\"clients\" class=\"list\">";
  stack1 = depth0.clients;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No clients match your search", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No clients match your search", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol>";
  return buffer;});
templates['clients/mailing_list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Mailing Lists</h1><img src=\"https://flybook-asset.s3.amazonaws.com/images/surf-soon.jpg\"/>";});
templates['clients/postcards'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Postcards</h1><img src=\"https://flybook-asset.s3.amazonaws.com/images/climb-soon.jpg\"/>";});
templates['dashboard/home'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>FlyBook Home</h1><p>The following shortcuts are provided to make it easier getting around.</p>";});
templates['employees/activity'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<form onsubmit=\"return false;\"><h1>Guide activity report</h1>    <div class=\"buttons-left\"> <button class=\"save-activity\">Save Changes</button> <button class=\"cancel\">Cancel</button></div> </form>";});
templates['employees/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form id=\"employee\" onsubmit=\"return false\"><h1>Add a new staff member</h1><fieldset><p class=\"step\"><span>1</span> Enter the employee <strong>Name.</strong> &nbsp; It doesn't have to be their real name.</p> ";
  stack1 = depth0.employee;
  stack2 = {};
  stack2['placeholder'] = "(Sparky, Pork Chop, Lil' John, etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "nickname", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "nickname", {hash:stack2});
  buffer += escapeExpression(stack1) + "<p class=\"step\"><span>2</span> Enter the <strong>employee's email address.</strong> &nbsp; Required if you want them to manage their own schedule.</p> ";
  stack1 = depth0.employee;
  stack2 = {};
  stack2['placeholder'] = "(No email)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "email", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fielset><p class=\"step\"><span>3</span> What <strong>role</strong> does the staff member play in your organization?</p> <div class=\"role\" id=\"manager\">  <input type=\"radio\" name=\"role\" value=\"manager\" id=\"rd-manager\" />  <label for=\"admin\">Manager</label>  <p>A manager staff member will have all administrative privileges.</p> </div> <div class=\"role\" id=\"staff\">  <input type=\"radio\" name=\"role\" value=\"staff\" id=\"rd-staff\" />  <label for=\"staff\">Staff Member</label>  <p>Office staff can manage reservations, but not employees or the account.</p> </div> <div class=\"role\" id=\"guide\">  <input type=\"radio\" name=\"role\" value=\"guide\" id=\"rd-guide\" checked=\"true\" />  <label for=\"guide\">Guide</label>  <p>Guides can see their scheduled trips, client group information, and manage their availability.</p> </div> <div class=\"role\" id=\"assistant\">  <input type=\"radio\" name=\"role\" value=\"assistant\" id=\"rd-assistant\" />  <label for=\"assistant\">Assistant</label>  <p>Assistants can be scheduled on trips. They only see their scheduled days and group sizes.</p> </div>  <div class=\"buttons-right\">  <button class=\"save continue\">Save &amp; Continue</button><br />  <a href=\"javascript:void(0)\" class=\"cancel\">... or cancel</a> </div> </form>";
  return buffer;});
templates['employees/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;


  buffer += "<form id=\"employee\" onsubmit=\"return false\" class=\"wider-right\"><button class=\"dummy\"></button>  <button class=\"cancel\">Cancel</button>  <button class=\"done\">Done</button> ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "title";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "nickname", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "nickname", {hash:stack2});
  buffer += escapeExpression(stack1) + " <div class=\"col left\">   <h3>Contact Information</h3>    <fieldset>    ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Phone Number)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "phone", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "phone", {hash:stack2});
  buffer += escapeExpression(stack1) + "    ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Email Address)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "email", {hash:stack2});
  buffer += escapeExpression(stack1) + "    </fieldset>  <h3>Role &amp; Options</h3>   <fieldset>   ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.roles;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "role", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "role", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>   <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "self_managed", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "self_managed", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Allow employee to set own schedule</label></p>   <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "active", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "active", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>This employee is active</label></p>   <p class=\"small\"><strong>Note</strong>: For employes to set their own schedule make sure a valid email is entered</p>   </fieldset></div>  <div class=\"col right\">    <h3>Availability</h3>    <p class=\"small\"><span class=\"blackout\">Black days</span> indicate the guide/staff member is unavailable. Click the calendar dates and/or days of the week to change available dates.</p>    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.weekday_calendar, 'weekday_calendar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div></form>";
  return buffer;});
templates['employees/help'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<button class=\"close cancel\">Close</button>";}

function program3(depth0,data) {
  
  
  return "<button class=\"create\">Add A Staff Member</button>";}

  buffer += "<h1>Help: Guides &amp; Staff</h1>";
  stack1 = depth0.help;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br /><br /><p>Staff members are assigned a role of Manager, Staff Member, Guide or Assistant.</p><p>If an employee fits more than one role, select the highest rank. <strong>You will be able to schedule Managers and Staff Members as guides</strong> 	if you would like to do so.</p><br /><p>It's important that you <strong>assign a correct email</strong> to your employees if you want them to login to FlyBook and view their schedule. </p><br />	<p class=\"small\">Still need more help? <a href=\"mailto:support@theflybook.com\">Contact FlyBook Support</a></p>";
  return buffer;});
templates['employees/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"info ";
  foundHelper = helpers.role;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.role; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.role;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.role; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"name\">";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"info ";
  foundHelper = helpers.role;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.role; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.role;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.role; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"name\">";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"info ";
  foundHelper = helpers.role;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.role; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.role;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.role; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"name\">";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>";
  return buffer;}

  buffer += "<h1>Guides &amp; Staff</h1><button class=\"help\">Help</button><button class=\"create\">Add Staff</button><ol id=\"employee-list\" class=\"sortable list\">";
  stack1 = depth0.active;
  foundHelper = helpers.filtered_list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "role", "guide,staff,manager", "No active guides, managers or staff right now", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "filtered_list", stack1, "role", "guide,staff,manager", "No active guides, managers or staff right now", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br /><h3>Assistants</h3><ol id=\"assistant-list\" class=\"sortable list\">";
  stack1 = depth0.active;
  foundHelper = helpers.filtered_list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "role", "assistant", "No active assistants right now", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "filtered_list", stack1, "role", "assistant", "No active assistants right now", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br /><h3>Inactive Staff</h3><ol id=\"inactive-list\" class=\"sortable list\">";
  stack1 = depth0.inactive;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No inactive employees right now", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "list", stack1, "No inactive employees right now", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol>";
  return buffer;});
templates['forms_preview'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " ";
  stack1 = depth0.copy;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "empty", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "empty", {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  ";
  stack1 = depth0.copy;
  stack2 = {};
  stack2['style'] = "height:130px";
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "empty", {hash:stack2}) : helperMissing.call(depth0, "text_area", stack1, "empty", {hash:stack2});
  buffer += escapeExpression(stack1);
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  ";
  stack1 = depth0.copy;
  stack2 = {};
  stack2['style'] = "width:50px";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "empty", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "empty", {hash:stack2});
  buffer += escapeExpression(stack1);
  return buffer;}

function program7(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  ";
  stack1 = depth0.copy;
  stack2 = {};
  stack2['style'] = "width:90px";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "empty", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "empty", {hash:stack2});
  buffer += escapeExpression(stack1);
  return buffer;}

function program9(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  <select name=\"preview\">  ";
  stack1 = depth0.answers;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </select>";
  return buffer;}
function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <option value=\"";
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">";
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</option>  ";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  ";
  stack1 = depth0.answers;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <input type=\"radio\" name=\"preview\" /><label>";
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label><br />  ";
  return buffer;}

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  ";
  stack1 = depth0.answers;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <input type=\"checkbox\" name=\"";
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" /><label>";
  foundHelper = helpers.val;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.val; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label><br />  ";
  return buffer;}

  buffer += "<label>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label><fieldset>";
  stack1 = depth0.type;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "text", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "eq", stack1, "text", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.type;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "textarea", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "eq", stack1, "textarea", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.type;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "number", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "eq", stack1, "number", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.type;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "short", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)}) : helperMissing.call(depth0, "eq", stack1, "short", {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.type;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dropdown", {hash:{},inverse:self.noop,fn:self.program(9, program9, data)}) : helperMissing.call(depth0, "eq", stack1, "dropdown", {hash:{},inverse:self.noop,fn:self.program(9, program9, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.type;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "radio", {hash:{},inverse:self.noop,fn:self.program(12, program12, data)}) : helperMissing.call(depth0, "eq", stack1, "radio", {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.type;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "checkbox", {hash:{},inverse:self.noop,fn:self.program(15, program15, data)}) : helperMissing.call(depth0, "eq", stack1, "checkbox", {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</fieldset>";
  return buffer;});
templates['forms/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"store\" onsubmit=\"return false\"><h1>Add a question to your client form:</h1><fieldset><p class=\"step\"><span>1</span> What do you want to ask the client? &nbsp;&nbsp;</p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Height, weight, shoe size, ability, allergies etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "<p class=\"step\"><span>2</span> How do you want them to answer? &nbsp;&nbsp;</p>";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.types;
  stack2 = depth0.model;
  stack3 = {};
  stack3['id'] = "types";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "type", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "type", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</fieldset><div class=\"buttons-right\"> <button class=\"save continue\">Save &amp; Continue</button><br /> <a href=\"javascript:void(0)\" class=\"cancel\">or cancel</a></div></form>";
  return buffer;});
templates['forms/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"store\" onsubmit=\"return false\"><button class=\"dummy\"></button><button class=\"cancel\">Cancel</button><button class=\"done\">Done</button> <h1>Edit Client Form Field</h1> <div class=\"tabshell\"><div class=\"tab wider-right\"> <div class=\"left\">  <h3>Ask A Question</h3>  <fieldset>  <label>What do you want to know?</label>    ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Height, weight, age, ability etc.)";
  stack2['id'] = "quest";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "  <br />  <label>How would you like them to answer?</label>  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.types;
  stack2 = depth0.model;
  stack3 = {};
  stack3['id'] = "types";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "type", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "type", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "  </fieldset>  <div id=\"value-specs\" style=\"display:none;\">    <label>Provide answer choices:</label>    <ul class=\"list sortable checklist\" id=\"responses\"></ul>    <fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['id'] = "response";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "nv", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "nv", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset>    <button class=\"add-to add-value\">Add Response Option</button>  </div>   </div> <div class=\"right\"> <h3>Preview</h3>  <p>This is how the question will look on your client form:</p>  <div id=\"preview\">    </div>  <br />  <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "marketing", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "marketing", {hash:{}});
  buffer += escapeExpression(stack1) + " <label>This question is for marketing purposes only.</label></p>   </div> </div></div></form>  ";
  return buffer;});
templates['forms/help'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<button class=\"close cancel\">Close</button>";}

function program3(depth0,data) {
  
  
  return "<button class=\"create\">Add Question/Field</button>";}

  buffer += "<h1>Help: Client Data</h1>";
  stack1 = depth0.help;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<p>If you're like most companies that guide tours you need more than a name and a phone number.   You probably want to know some other things about your clients for marketing purposes too.  The FLyBOOK saves everyone time by turning making your forms digital.</p><p class=\"small\">Still need more help? <a href=\"mailto:support@theflybook.com\">Contact FlyBook Support</a></p>";
  return buffer;});
templates['forms/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>  ";
  return buffer;}

  buffer += "<h1>Client Form Data</h1><button class=\"help\">Help</button><button class=\"create add-form-field\">Add Question</button><ol id=\"item-list\" class=\"sortable list items\"> ";
  stack1 = depth0.fields;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No fields have been created", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No fields have been created", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br />";
  return buffer;});
templates['lodging_room'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">  <div>   <span class=\"long\">";
  foundHelper = helpers.type;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.type; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>   <span class=\"short\">";
  foundHelper = helpers.sleeps;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.sleeps; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>   <span class=\"short\">$";
  stack1 = depth0.price;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</span>   <span>";
  foundHelper = helpers.display_start_month;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.display_start_month; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.start_date;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.start_date; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>   <span>";
  foundHelper = helpers.display_end_month;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.display_end_month; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.end_date;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.end_date; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>  </div> <button class=\"del remove-room\">Delete</buton></li>";
  return buffer;});
templates['lodging/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"lodge\" onsubmit=\"return false\"><h1>Add a new lodge</h1><fieldset><p class=\"step\"><span>1</span> <strong>Lodge Name</strong></p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(The Yurt, Cabin B, The Plaza Hotel etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "<br /><p class=\"step\"><span>2</span> <strong>Where is the lodge located?</strong></p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(White Mountains NH, Swiss Alps, North Shore Hawaii, etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "location", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "location", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset><br /><div class=\"buttons-right\"> <button class=\"save continue\">Save &amp; Continue</button><br /> <a href=\"javascript:void(0)\" class=\"cancel\">or cancel</a></div></form>";
  return buffer;});
templates['lodging/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  
  return "<button class=\"cancel\">Cancel</button>  <button class=\"done\">Done</button>  ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "   <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "ups";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "t", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "t", {hash:stack2});
  buffer += escapeExpression(stack1) + "<span>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div></li>  ";
  return buffer;}

function program5(depth0,data) {
  
  
  return " ";}

function program7(depth0,data) {
  
  
  return "<div class=\"buttons-right\"> <button class=\"next-step continue\">Continue Setup</button><br /> <a href=\"javascript:void(0)\" class=\"done\">or save and make changes later</a></div>";}

  buffer += "<form class=\"lodge\" onsubmit=\"return false\"><button class=\"dummy\"></button>";
  stack1 = depth0.setup_complete;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "title";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "<ul class=\"tabs\">  <li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Details", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Details", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Photos &amp; Location", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Photos &amp; Location", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Rooms &amp; Pricing", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Rooms &amp; Pricing", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Upsell Settings", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Upsell Settings", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li></ul>  <div class=\"tabshell\"><div class=\"tab wider-right\"> <div class=\"left\">  <h3>Lodging Type</h3>  <label>What kind of \"lodge\" is this?</label>  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.styles;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "style", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "style", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "  <br />  <h3>Publish Settings</h3>  <fieldset>  <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "standalone", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "standalone", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Allow room reservations without a trip</label></p>  <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "web_active", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "web_active", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Allow online reservations to be made</label></p>	<p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "published", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "published", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Publish lodging to the <a href=\"http://www.guideoutdoornetwork.com\" target=\"_blank\">gone.</a> network</label></p>  </fieldset> </div> <div class=\"right\">   <h3>Description</h3>   <fieldset>   ";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "description", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "description", {hash:{}});
  buffer += escapeExpression(stack1) + "    </fieldset>  </div> </div><div class=\"tab wider-right\"> ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.progress_bar, 'progress_bar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   <div class=\"left photos\">  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.photos, 'photos', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>      <div class=\"right map\">  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.location, 'location', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>   </div> <div class=\"tab\"> <div class=\"full-width\">  <h3>Available Room Types</h3>  <div class=\"longer-headings\">    <span class=\"long\">Room Type Description</span>    <span class=\"short\">Sleeps</span>    <span class=\"short\">$ Per Night</span>    <span>Start Date</span>    <span>Ending Date</span>  </div>  <ul class=\"list longer sortable\" id=\"rooms\"></ul>  <div class=\"longer-add-fields room-inputs\">   ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "long";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "type", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "type", {hash:stack2});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "short";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sleeps", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "sleeps", {hash:stack2});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "short";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "price", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "price", {hash:stack2});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.months;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_month", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "start_month", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.days;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_date", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "start_date", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.months;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "end_month", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "end_month", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.days;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "end_date", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "end_date", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "  </div><br style=\"clear:both;\" />  <button class=\"create add-new-room\">Add New Room</button>     </div></div><div class=\"tab wider-left\"> <div class=\"left\">  <h3>Upsell Settings</h3>  <span class=\"long\">Check the boxes to add this lodge as a checkout upsell to trips</span>  <ul class=\"list checklist\">  ";
  stack1 = depth0.trips;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "You must have trips for this feature to work.", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "list", stack1, "You must have trips for this feature to work.", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </ul> </div> <div class=\"right\">	 <div class=\"tip\">			<p><strong>How do upsells work?</strong><br />When a trip is selected and a customer is booking that trip online, 				this lodge will be presented as an additional purchase option at checkout. 				<br /><br />If the lodge is already included as part of the trip package, it will not be presented.	 </div> </div>	  </div> </div>";
  stack1 = depth0.setup_complete;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br /><br /> &nbsp;</form>  ";
  return buffer;});
templates['lodging/help'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<button class=\"close cancel\">Close</button>";}

function program3(depth0,data) {
  
  
  return "<button class=\"create\">Add Lodging</button>";}

  buffer += "<h1>Help: Lodging &amp; Meals</h1>";
  stack1 = depth0.help;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<p>Manage reservations for lodging and indicate which and when you serve meals. Learn more about how these tools work by watching the video:</p><p>VIDEO!</p><p class=\"small\">Still need more help? <a href=\"mailto:support@theflybook.com\">Contact FlyBook Support</a></p>";
  return buffer;});
templates['lodging/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>";
  return buffer;}

  buffer += "<h1>Lodges</h1><button class=\"help\">Help</button><button class=\"create\">New Lodge</button><ol id=\"lodges\" class=\"list sortable\">";
  stack1 = depth0.lodges;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No lodges at the moment", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No lodges at the moment", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br /><h1>Meal Service</h1><p class=\"small\">If you offer meal service on any of your trips, check each weekday you serve each meal.</p><div id=\"meals\"> </div>";
  return buffer;});
templates['lodging/meals'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<span class=\"data heading\">&nbsp;</span><span class=\"data heading served\">SMTWTFS</span><span class=\"data heading\">Price</span><span class=\"data heading\">Overhead</span><ol class=\"list\"><li><div class=\"breakfast\"><span class=\"name\">Breakfast</span><p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "0";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "breakfast[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "breakfast[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "1";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "breakfast[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "breakfast[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "2";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "breakfast[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "breakfast[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "3";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "breakfast[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "breakfast[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "4";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "breakfast[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "breakfast[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "5";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "breakfast[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "breakfast[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "6";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "breakfast[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "breakfast[]", {hash:stack2});
  buffer += escapeExpression(stack1) + "  </p>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "price", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "price", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "overhead", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "overhead", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div></li><li><div class=\"lunch\"><span class=\"name\">Lunch</span><p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "0";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lunch[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lunch[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "1";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lunch[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lunch[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "2";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lunch[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lunch[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "3";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lunch[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lunch[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "4";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lunch[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lunch[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "5";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lunch[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lunch[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "6";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lunch[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "lunch[]", {hash:stack2});
  buffer += escapeExpression(stack1) + "  </p>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "price", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "price", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "overhead", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "overhead", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div></li><li><div class=\"dinner\"><span class=\"name\">Dinner</span><p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "0";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dinner[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "dinner[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "1";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dinner[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "dinner[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "2";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dinner[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "dinner[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "3";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dinner[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "dinner[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "4";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dinner[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "dinner[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "5";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dinner[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "dinner[]", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['value'] = "6";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "dinner[]", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "dinner[]", {hash:stack2});
  buffer += escapeExpression(stack1) + "  </p>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "price", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "price", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "overhead", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "overhead", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div></li></ol><button class=\"update-meals\">Update</button>";
  return buffer;});
templates['pages/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, foundHelper, self=this, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;

function program1(depth0,data) {
  
  
  return "done";}

function program3(depth0,data) {
  
  
  return "save done";}

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.photos, 'photos', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   ";
  return buffer;}

  buffer += "<form onsubmit=\"return false\"><button class=\"dummy\"></button><button class=\"cancel\">Cancel</button><button class=\"";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">Done</button>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "title";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "title", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "title", {hash:stack2});
  buffer += escapeExpression(stack1) + "<ul class=\"tabs\"> <li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Content", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Content", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li> <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Settings", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Settings", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>  </ul> <div class=\"tabshell\">  <div class=\"tab page-editor wider-right\">";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.progress_bar, 'progress_bar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "      <div class=\"left\">   <h3>Summary</h3>   <fieldset>   ";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "summary", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "summary", {hash:{}});
  buffer += escapeExpression(stack1) + "   </fieldset>   ";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   </div>    <div class=\"right\">    <h3>Page Content</h3>    <fieldset>    ";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "content", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "content", {hash:{}});
  buffer += escapeExpression(stack1) + "    </fieldset>   </div>    </div><div class=\"tab\"> <div class=\"left\">   <h3>Page Properties</h3>	 <p class=\"error-msg\"><p><b>Warning!</b> Don't mess with these unless you know what you are doing.</p>	 <p class=\"field\"><label>Address</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "address", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "address", {hash:{}});
  buffer += escapeExpression(stack1) + "</p>	 <p class=\"field\"><label>Identifier</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "identifier", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "identifier", {hash:{}});
  buffer += escapeExpression(stack1) + "</p>  </div> <div class=\"right\">   <h3>Publish Settings</h3> 	 <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "active", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "active", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Publish this page</label></p> </div>        </div>   </div> <div class=\"buttons-right\"> </div><br /><br />  </form>";
  return buffer;});
templates['pages/help'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<button class=\"close cancel\">Close</button>";}

function program3(depth0,data) {
  
  
  return "<button class=\"create\">Add Page</button>";}

  buffer += "<h1>Help: Website Pages</h1>";
  stack1 = depth0.help;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<p>Flybook has a CMS too!?  Yup! However, to use it you'll want to talk to us before you get setup.</p><p class=\"small\">Still need more help? <a href=\"mailto:support@theflybook.com\">Contact FlyBook Support</a></p>";
  return buffer;});
templates['pages/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.title;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.title; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>  ";
  return buffer;}

  buffer += "<h1>Website Pages</h1><button class=\"help\">Help</button><button class=\"create\">Add Page</button><ol id=\"item-list\" class=\"sortable list items\"> ";
  stack1 = depth0.items;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No pages have been created", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No pages have been created", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br />";
  return buffer;});
templates['address_fields'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"address\">";
  stack1 = depth0.countries;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "country";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "country", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "country", stack1, {hash:stack3});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "street";
  stack2['placeholder'] = "Street Address, Apt./Unit";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "address", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "address", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "city";
  stack2['placeholder'] = "City";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "city", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "city", {hash:stack2});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.states;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "state";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "state", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "state", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "zip";
  stack2['placeholder'] = "Zip/Post";
  stack2['class'] = "zip";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "zip", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "zip", {hash:stack2});
  buffer += escapeExpression(stack1) + "  </div>";
  return buffer;});
templates['loader'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<p class=\"loader\"><em class=\"one\">&nbsp;</em><em class=\"two\">&nbsp;</em><em class=\"three\">&nbsp;</em><em class=\"four\">&nbsp;</em></p>";});
templates['location'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Location</h3><fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "Landmark or address";
  stack2['id'] = "location";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "location", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "location", {hash:stack2});
  buffer += escapeExpression(stack1) + "<button class=\"lookup\">Find Location On The Map</button></fieldset><div id=\"gmap\" style=\"-webkit-transform: none; z-index: 10;\"><p>Maps are unavailable right now.</p></div><p class=\"field\"><label>Latitude</label>";
  stack1 = depth0.trip;
  stack2 = {};
  stack2['placeholder'] = "Lat";
  stack2['class'] = "num";
  stack2['id'] = "lat";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lat", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "lat", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Longitude</label>";
  stack1 = depth0.trip;
  stack2 = {};
  stack2['placeholder'] = "Lng";
  stack2['class'] = "num";
  stack2['id'] = "lng";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lng", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "lng", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>";
  return buffer;});
templates['month'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<tr>  ";
  stack1 = depth0.day_labels;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</tr>";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <th>";
  foundHelper = helpers.day;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.day; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</th>  ";
  return buffer;}

  buffer += "<div class=\"month\"><h3>";
  foundHelper = helpers.month_name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.month_name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  foundHelper = helpers.year;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.year; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h3><button class=\"next\"><span>›</span></button><button class=\"previous\"><span>‹</span></button><table>";
  stack1 = depth0.day_labels;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.year;
  stack2 = depth0.month;
  foundHelper = helpers.month_grid;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{}}) : helperMissing.call(depth0, "month_grid", stack2, stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</div>";
  return buffer;});
templates['photos'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<div class=\"upload-field\" id=\"photo";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"upload\"><p class=\"tip\">click or drop</p><div id=\"photo-upload-";
  foundHelper = helpers.num;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.num; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"></div></div></div>";
  return buffer;}

  buffer += "<h3>Photos</h3>";
  foundHelper = helpers.repeater;
  stack1 = foundHelper ? foundHelper.call(depth0, 1, 6, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "repeater", 1, 6, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<div class=\"tip\"><p class=\"small\"><b>Photo Tips:</b>Upload files at least 500 pixels wide for the best results. JPG formats will work best, though others may work as well.</p></div>";
  return buffer;});
templates['progress_bar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div id=\"progress\"><span>Uploading...</span><div id=\"bar\"></div></div>";});
templates['search_box'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression;


  buffer += "<div id=\"search\"> <div>  <div id=\"find\"></div>  <div id=\"close\">X</div>  <input type=\"text\" placeholder=\"";
  foundHelper = helpers.search;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.search; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" /> </div></div>";
  return buffer;});
templates['weekday_calendar'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<div id=\"weekday-calendar\"></div><div id=\"weekdays\"> <p class=\"checkbox\"><input type=\"checkbox\" name=\"dow[]\" value=\"0\" id=\"dow0\" /><label>Sunday</label></p> <p class=\"checkbox\"><input type=\"checkbox\" name=\"dow[]\" value=\"1\" id=\"dow1\" /><label>Monday</label></p> <p class=\"checkbox\"><input type=\"checkbox\" name=\"dow[]\" value=\"2\" id=\"dow2\" /><label>Tuesday</label></p> <p class=\"checkbox\"><input type=\"checkbox\" name=\"dow[]\" value=\"3\" id=\"dow3\" /><label>Wednesday</label></p> <p class=\"checkbox\"><input type=\"checkbox\" name=\"dow[]\" value=\"4\" id=\"dow4\" /><label>Thursday</label></p> <p class=\"checkbox\"><input type=\"checkbox\" name=\"dow[]\" value=\"5\" id=\"dow5\" /><label>Friday</label></p> <p class=\"checkbox\"><input type=\"checkbox\" name=\"dow[]\" value=\"6\" id=\"dow6\" /><label>Saturday</label></p></div>";});
templates['preferences/password'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"settings\" onsubmit=\"return false\"><h1>Change your password</h1><p>When setting your password, be smart and clever about it.<br />  Your password <strong>must be at least six characters long</strong>.    For added security, we suggest using numbers and symbols in addition to letters.</p><br /><fieldset><p class=\"field\"><label>Current Password</label>";
  stack1 = depth0.user;
  foundHelper = helpers.password;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "old_password", {hash:{}}) : helperMissing.call(depth0, "password", stack1, "old_password", {hash:{}});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>New Password</label>";
  stack1 = depth0.user;
  foundHelper = helpers.password;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "new_password", {hash:{}}) : helperMissing.call(depth0, "password", stack1, "new_password", {hash:{}});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Confirm</label>";
  stack1 = depth0.user;
  foundHelper = helpers.password;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "confirmed", {hash:{}}) : helperMissing.call(depth0, "password", stack1, "confirmed", {hash:{}});
  buffer += escapeExpression(stack1) + "</p></fieldset><br /><div class=\"buttons-right\"> <button class=\"passchange\">Change</button> <button class=\"cancel\">Cancel</button></div></form>";
  return buffer;});
templates['preferences/profile'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"settings\" onsubmit=\"return false\"><h1>Edit Your Profile</h1><p class=\"field\"><label>Your Full Name</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:{}});
  buffer += escapeExpression(stack1) + "</p><h3>Contact Information</h3><div class=\"left\"><fieldset><p class=\"field\"><label>Email Address</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "email", {hash:{}});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Phone Number</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "phone", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "phone", {hash:{}});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Alternate Phone</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "phone", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "phone", {hash:{}});
  buffer += escapeExpression(stack1) + "</p></fieldset></div><div class=\"right\"><fieldset>  <p class=\"field\"><label>Website URL</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "www.myhomepage.com";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "url", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "url", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Facebook URL</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "facebook.com/myfacebook";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "facebook_url", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "facebook_url", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Twitter Account</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "@mytwitter";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "twitter", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "twitter", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p></fieldset></div><h3>Upload A Nice Picture</h3><div id=\"progress\"><span>Uploading...</span><div id=\"bar\"></div></div><div class=\"upload-field\" id=\"icon\"><label>Your mugshot or icon</label><div class=\"upload\"><p class=\"tip\">click or drop to upload</p><div id=\"logo-upload\"></div></div></div><h3>Quick Bio (Optional)</h3><fieldset>";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "description", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "description", {hash:{}});
  buffer += escapeExpression(stack1) + "</fieldset><br /><div class=\"buttons-right\"><button class=\"done\">Save</button> <button class=\"cancel\">Cancel</button></form>";
  return buffer;});
templates['products/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"product\" onsubmit=\"return false\"><h1>Add A New Purchase or Rental Item</h1><p class=\"step\"><span>1</span> Give your item a good <strong>name.</strong> &nbsp;&nbsp;</p><fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Fly Rod Rental, Dry Suit Rental, Hooded sweatshirt etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset><div class=\"buttons-right\"> <button class=\"save continue\">Save &amp; Continue</button><br /> <a href=\"javascript:void(0)\" class=\"cancel\">or cancel</a></div></form>";
  return buffer;});
templates['products/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "   <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div><span>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "ups";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "t", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "t", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "ren";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "t", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "t", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div></li>  ";
  return buffer;}

function program3(depth0,data) {
  
  
  return "<div class=\"buttons-left\"> <button class=\"done\">Save Changes</button> <button class=\"cancel\">Cancel</button></div>";}

function program5(depth0,data) {
  
  
  return "<div class=\"buttons-right\"> <button class=\"next-step continue\">Continue Setup</button><br /> <a href=\"javascript:void(0)\" class=\"done\">or save and make changes later</a></div>";}

  buffer += "<form class=\"product\" onsubmit=\"return false\"><button class=\"dummy\"></button>  <fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "title";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset><ul class=\"tabs\"><li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Product Settings", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Product Settings", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Photos &amp; Description", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Photos &amp; Description", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Upsell &amp; Rental", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Upsell &amp; Rental", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li></ul> <div class=\"tabshell\"><div class=\"tab wider-right\"> <div class=\"left\">  <h3>Pricing</h3>  <fieldset>  <p class=\"field\"><label>Standard Price $</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "price", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "price", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"field\"><label>Rental Price $</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "rental_price", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "rental_price", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"field\"><label>Sale Price $</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sale_price", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "sale_price", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"field\"><label>Sales Tax %</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "sales_tax", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "sales_tax", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  </fieldset>  <h3>Options</h3>  <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "rental", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "rental", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>This item is available as a rental</label></p>  <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "web_active", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "web_active", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Allow this product to be purchased online</label></p>  <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "published", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "published", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Publish this product to the <a href=\"http://www.guideoutdoornetwork.com\" target=\"_blank\">gone.</a> network</label></label></p> </div>  <div class=\"right\">  <h3>Sizes, Colors &amp; Variations</h3>  <ul id=\"variations\" class=\"list sortable checklist\"> </ul>  <div class=\"add\">   <fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['id'] = "variant";
  stack2['placeholder'] = "(Large, Medium Blue etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "v", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "v", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset>   <button class=\"add-var create\">Add New Variation</button>  </div>  <div class=\"tip\"><p class=\"small\">Users who purchase or rent this product will be able to select a variation. For example \"Large\" or \"Medium Blue\" might be variations of your t-shirt.</p></div> </div> </div><div class=\"tab wider-right\"> ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.progress_bar, 'progress_bar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <div class=\"left\"> ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.photos, 'photos', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"right\"> <h3>Product Description</h3> <fieldset>";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "description", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "description", {hash:{}});
  buffer += escapeExpression(stack1) + "</fieldset>  </div>     </div><div class=\"tab wider-left\"> <div class=\"left\">  <h3>Upsell Options</h3>  <div class=\"longer-headings\">    <span class=\"long\">Add product as featured upsell to specific trips</span>		<span class=\"float-right\">As Rental</span>		<span class=\"float-right\">Upsell</span>	  </div>    <ul class=\"list checklist\">  ";
  stack1 = depth0.trips;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "You must have trips for created to use upsell settings.", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "You must have trips for created to use upsell settings.", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </ul> </div> <div class=\"right\">  <div class=\"tip\">			<p><strong>How upsells work:</strong><br />When a trip is selected and a customer is booking that trip online, 				this product will be presented as an additional purchase or rental option at checkout. The checkboxes determine whether or 				not the product will be upsold as a rental item or an item for sale.	 </div> </div>      </div>    </div>";
  stack1 = depth0.setup_complete;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </form>  ";
  return buffer;});
templates['products/help'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<button class=\"close cancel\">Close</button>";}

function program3(depth0,data) {
  
  
  return "<button class=\"create\">Add Product</button>";}

  buffer += "<h1>Help: Products &amp; Rentals</h1>";
  stack1 = depth0.help;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<p>Products and rentals allow you to create items for sale or rental. 	Whether you rent gear for your trips or upsell your t-shirt on checkout, you're in the right place.</p><p class=\"small\">Still need more help? <a href=\"mailto:support@theflybook.com\">Contact FlyBook Support</a></p>";
  return buffer;});
templates['products/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"price\">$";
  stack1 = depth0.price;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>  ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "   <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span><span class=\"price\">$";
  stack1 = depth0.price;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li>  ";
  return buffer;}

  buffer += "<h1>Products &amp; Rentals</h1><button class=\"help\">Help</button><button class=\"create\">New Product</button><ol id=\"item-list\" class=\"sortable list items\"> ";
  stack1 = depth0.active;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No active products or rental items currently", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No active products or rental items currently", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br /><h3>Inactive Items</h3> <ol id=\"items\" class=\"list items\">  ";
  stack1 = depth0.inactive;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No inactive products right now", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "list", stack1, "No inactive products right now", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol>";
  return buffer;});
templates['reports/clients'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Client Insights</h1>";});
templates['reports/revenue'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Revenue</h1>";});
templates['reports/sources'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Referral Sources</h1>";});
templates['reports/statements'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Statements</h1>";});
templates['reports/traffic'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Traffic</h1>";});
templates['reservations_activity'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var stack1, functionType="function", escapeExpression=this.escapeExpression, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <div class=\"reservation\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">  ";
  stack1 = depth0.activities;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  return buffer;}
function program2(depth0,data) {
  
  
  return "      ";}

  stack1 = depth0.trip_reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { return stack1; }
  else { return ''; }});
templates['reservations_addons'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Add Products / Rentals</h3><p class=\"small\">Select rental and purchase items from the list to add them to this reservation. <br />To ensure accuracy in rental items cost, enter the quantity as: <b>each rental day X number of guests renting.</b></p><fieldset class=\"addons\">";
  stack1 = depth0.products;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "product";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "product_id", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "product_id", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "<select name=\"variation\" class=\"product-variations\" style=\"display:none;\" /><p class=\"field\"><label>Qty.</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "quantity", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "quantity", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p> <p class=\"add-it\">  ";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "rental", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "rental", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Add as rental</label><span>&nbsp;</span>  <button class=\"create add-product\">Add Item</button></p></fieldset>";
  return buffer;});
templates['reservations_auto_balances'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div class=\"balances-due\"><h5>Collect balances due:</h5><p class=\"radio\">  <input type=\"radio\" name=\"auto_collect_balances\" class=\"custom-auto\" value=\"2\">  <label>Automatically ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num balance-days";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "auto_collect_days_prior", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "auto_collect_days_prior", {hash:stack2});
  buffer += escapeExpression(stack1) + " day(s) prior</label></p><p class=\"radio\">  <input type=\"radio\" name=\"auto_collect_balances\" class=\"day-auto\" value=\"1\">  <label>Automatically on first day of the trip</label></p><p class=\"radio\">  <input type=\"radio\" name=\"auto_collect_balances\" class=\"no-auto\" value=\"0\" checked=\"true\">  <label>Manually</label></p></div>";
  return buffer;});
templates['reservations_confirmation'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<div id=\"confirmation\">  <h3>Send Client(s) Itinerary</h3>  <p class=\"radio\"><input type=\"radio\" name=\"notify\" value=\"1\" ><label>Send itinerary and statement to <b>primary contact</b> via email</label></p>  <p class=\"radio\"><input type=\"radio\" name=\"notify\" value=\"2\" ><label>Send itinerary and statement to client via email and <b>CC all guests</b> as well</label></p>  <p class=\"radio\"><input type=\"radio\" name=\"notify\" value=\"3\" checked=\"true\"><label><strong>Do not</strong> send anything to the guest(s)</label></p>  <p class=\"small\">Include an optional message to the client:</p>  <fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['style'] = "height:230px";
  stack2['class'] = "confirm-letter";
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "confirmation", {hash:stack2}) : helperMissing.call(depth0, "text_area", stack1, "confirmation", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset></div>";
  return buffer;});
templates['reservations_contact'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function";


  buffer += "<p class=\"field\"><label>Full Name</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "name";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"view-client\"><a href=\"#clients/edit/";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.attributes;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.client;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\">View all client details</a></p><div id=\"search-results\"> </div><p class=\"field\"><label>Email Address</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['type'] = "email";
  stack2['class'] = "email";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "email", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Phone Number</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "phone";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "phone", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "phone", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>";
  return buffer;});
templates['reservations_enter_payment'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Enter Payment</h3><p>Choose a method or <a class=\"swipe-msg\" href=\"javascript:void(0)\">click to swipe card</a></p>  ";
  stack1 = depth0.payment;
  stack2 = {};
  stack2['class'] = "swipe-focus";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "swipe_focus", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "swipe_focus", {hash:stack2});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.payment_methods;
  stack2 = depth0.payment;
  stack3 = {};
  stack3['id'] = "pay-method";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "method", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "method", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "<fieldset>  ";
  stack1 = depth0.payment;
  stack2 = {};
  stack2['placeholder'] = "Payer's Name";
  stack2['class'] = "payer-name";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "_name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "_name", {hash:stack2});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.payment;
  stack2 = {};
  stack2['placeholder'] = "Email Address";
  stack2['class'] = "payer-email";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "_email", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "_email", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset><fieldset class=\"card-info\">  ";
  stack1 = depth0.payment;
  stack2 = {};
  stack2['placeholder'] = "Card Number";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "number", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "number", {hash:stack2});
  buffer += escapeExpression(stack1) + "    <p class=\"num-field\"><label>Exp. Date</label>";
  stack1 = depth0.payment;
  stack2 = {};
  stack2['class'] = "num";
  stack2['placeholder'] = "mm/yy";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "expires", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "expires", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"num-field\"><label>Billing Zip </label>";
  stack1 = depth0.payment;
  stack2 = {};
  stack2['class'] = "num zip";
  stack2['placeholder'] = "";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "_zip", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "_zip", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"num-field\"><label>CVV Code</label>";
  stack1 = depth0.payment;
  stack2 = {};
  stack2['class'] = "num";
  stack2['placeholder'] = "";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "cvv", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "cvv", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p></fieldset><p class=\"field pay-field\"><label>Pay Amount $</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num amount";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "amount", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "amount", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  <button class=\"enter-payment create\">Add Payment</button><p>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "add-as-guest";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "add_as_guest", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "add_as_guest", {hash:stack2});
  buffer += escapeExpression(stack1) + "<label>Add the payer as reservation guest</label></p> ";
  return buffer;});
templates['reservations_guest_list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Additional Guests</h3> <ul class=\"list checklist guest-list\"><div class=\"empty\"><span>No additional guests are assigned to this reservation.</span></ul> <div class=\"add-guests\">  <p>Create or add a client record for guests:</p>  <fieldset>    ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Guest name)";
  stack2['class'] = "guest-name";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "guest_name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "guest_name", {hash:stack2});
  buffer += escapeExpression(stack1) + "    ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Guest email)";
  stack2['class'] = "guest-email";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "guest_email", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "guest_email", {hash:stack2});
  buffer += escapeExpression(stack1) + "  </fieldset>  <button class=\"create add-guest\">Add Guest</button></div>     ";
  return buffer;});
templates['reservations_lodge_nights'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Lodging Dates</h3>";
  stack1 = depth0.lodges;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "lodge";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "lodge_id", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "lodge_id", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "<p class=\"checkbox include\">";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "inc-lodge";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "inc", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "inc", {hash:stack2});
  buffer += escapeExpression(stack1) + "<label>Include / Comp</label></p>";
  stack1 = depth0.rooms;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "secondary lodge-rooms";
  stack3['style'] = "display:none;";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "room_id", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "room_id", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "<div id=\"lodge-calendar\"><p class=\"small\" style=\"padding:20px 0\">Select a lodge from the menu above to view availability.</p></div>";
  return buffer;});
templates['reservations_lodging_item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "$";
  stack1 = depth0.total;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program3(depth0,data) {
  
  
  return "(Incl./Comp.)";}

  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">  <div>    <span>      <b>";
  foundHelper = helpers.dates;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dates; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</b>      <br />";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ": ";
  stack1 = depth0.room;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.type;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</b>      <br />";
  foundHelper = helpers.party;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.party; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.total;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </span>   </div>  <button class=\"del remove-lodge\">X</button></li>";
  return buffer;});
templates['reservations_overview'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  ";
  stack1 = depth0.trip_reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    ";
  stack1 = depth0.merged_activities;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.programWithDepth(program3, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  return buffer;}
function program3(depth0,data,depth1) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "        <div class=\"item activity\">          <b>";
  stack1 = depth0.date;
  foundHelper = helpers.date_format;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "MMM Do YYYY", {hash:{}}) : helperMissing.call(depth0, "date_format", stack1, "MMM Do YYYY", {hash:{}});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.time;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b>          <em>";
  stack1 = depth1.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " </em> with ";
  foundHelper = helpers.guide;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.guide; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "        </div>      ";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " at ";
  foundHelper = helpers.time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " at ";
  foundHelper = helpers.arrival_time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.arrival_time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <span>via ";
  foundHelper = helpers.arriving_by;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.arriving_by; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>    ";
  return buffer;}

function program10(depth0,data) {
  
  
  return "      <span class=\"small\"> (No arrival details provided.)</span>    ";}

function program12(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  <div class=\"lodging check-ins\">  ";
  stack1 = depth0.lodge_reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div> ";
  return buffer;}
function program13(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <div class=\"item lodge\">      <b>";
  stack1 = depth0.check_in;
  foundHelper = helpers.date_format;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "MMM Do YYYY", {hash:{}}) : helperMissing.call(depth0, "date_format", stack1, "MMM Do YYYY", {hash:{}});
  buffer += escapeExpression(stack1) + "</b>      <em>Check in </em> to ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ", ";
  stack1 = depth0.room;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.type;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "       (";
  foundHelper = helpers.adults;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.adults; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")    </div>    ";
  return buffer;}

function program15(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  ";
  stack1 = depth0.lodge_reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  return buffer;}
function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <div class=\"item lodge\">      <b>";
  stack1 = depth0.check_out;
  foundHelper = helpers.date_format;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "MMM Do YYYY", {hash:{}}) : helperMissing.call(depth0, "date_format", stack1, "MMM Do YYYY", {hash:{}});
  buffer += escapeExpression(stack1) + "</b>      <em>Check out </em> of ";
  stack1 = depth0.lodge;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ", ";
  stack1 = depth0.room;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.type;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "       (";
  foundHelper = helpers.adults;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.adults; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")    </div>    ";
  return buffer;}

function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " at ";
  foundHelper = helpers.departure_time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.departure_time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  return buffer;}

function program20(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <span>via ";
  foundHelper = helpers.departing_by;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.departing_by; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>    ";
  return buffer;}

function program22(depth0,data) {
  
  
  return "      <span class=\"small\"> (No departure details provided.)</span>    ";}

  buffer += "<div class=\"itinerary activity\"><h3>Activity Summary</h3>    ";
  stack1 = depth0.trip_reservations;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div> <div class=\"itinerary travel-lodge\"><h3>Travel/Stay Summary</h3>  <div class=\"item arrive\">  <b>";
  foundHelper = helpers.arrival_date;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.arrival_date; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.arrival_time;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b>  <em>Arriving</em>     ";
  stack1 = depth0.arriving_by;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(10, program10, data),fn:self.program(8, program8, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>  ";
  stack1 = depth0.lodge_reservations;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  stack1 = depth0.lodge_reservations;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    <div class=\"item depart\">  <b>";
  foundHelper = helpers.departure_date;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.departure_date; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.departure_time;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b>  <em>Departing</em>    ";
  stack1 = depth0.departing_by;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(22, program22, data),fn:self.program(20, program20, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div></div> </div>  ";
  return buffer;});
templates['reservations_payment_history'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h3>Payment History</h3><div class=\"longer-headings\">  <span>Amount</span>  <span>Name</span>  <span>Method</span>  <span>Date</span></div><ul class=\"list longer payment-list\"><li><div><span class=\"data\" style=\"width:80%\">No payments have been made on this reservation yet.</span></div></li></ul>";});
templates['reservations_payment_info'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this;


  buffer += "<h3>Amounts Due</h3><div class=\"price-wrap\">  <label>Discount:</label>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "discount num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "discount", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "discount", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div>  <div class=\"price-wrap\">  <label>Total:</label>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "total num";
  stack2['disabled'] = "true";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "total", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "total", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div><div class=\"price-wrap\">  <label>Balance Due:</label>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "balance num";
  stack2['disabled'] = "true";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "balance", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "balance", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div><div class=\"price-wrap\" id=\"deposit\">  <label>Deposit Amount:</label>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "deposit num";
  stack2['disabled'] = "true";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "deposit", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "deposit", {hash:stack2});
  buffer += escapeExpression(stack1) + "</div><br /><div class=\"discounts\"><p class=\"field\">";
  stack1 = depth0.discounts;
  stack2 = depth0.order;
  stack3 = {};
  stack3['class'] = "promo-codes";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "promotion_id", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "promotion_id", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</p> <div id=\"discount-info\"></div></div>";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_auto_balances, 'reservations_auto_balances', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  return buffer;});
templates['reservations_purchase_item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += ", ";
  foundHelper = helpers.variation;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.variation; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program3(depth0,data) {
  
  
  return " (Rental) ";}

  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"> <div>  <span>    <b>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</b>";
  stack1 = depth0.variation;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.rental;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    <br />";
  foundHelper = helpers.quantity;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.quantity; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " @ $";
  stack1 = depth0.price;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "  </span> </div> <button class=\"del remove-product\">X</button></li>";
  return buffer;});
templates['reservations_summary'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h3>Reservation Summary</h3><h5>Lodging:</h5><ul class=\"list checklist lodge-list\">  <li><div class=\"empty\"><p class=\"small\">No lodging selected.<p></div></li></ul><h5>Activities:</h5><ul class=\"list checklist trip-list\">  <li><div class=\"empty\"><p class=\"small\">No trips selected.<p></div></li></ul><h5>Products:</h5><ul class=\"list checklist product-list\"></ul>";});
templates['reservations_trip_dates'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Trip / Activity Dates</h3>";
  stack1 = depth0.trips;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "trip";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "trip_id", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "trip_id", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "<p class=\"checkbox include\">";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "inc-trip";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "inc", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "inc", {hash:stack2});
  buffer += escapeExpression(stack1) + "<label>Include / Comp</label></p>";
  stack1 = depth0.trips;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "secondary trip-times";
  stack3['style'] = "display:none;";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_time", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "start_time", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "<div id=\"trip-calendar\"><p class=\"small\" style=\"padding:20px 0\">Select a trip above to view availability.</p></div>  ";
  return buffer;});
templates['reservations_trip_item'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var stack1, foundHelper;
  stack1 = depth0.start_time;
  foundHelper = helpers.twenty_four_to_twelve;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "twenty_four_to_twelve", stack1, {hash:{}});
  return escapeExpression(stack1);}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "$";
  stack1 = depth0.total;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program5(depth0,data) {
  
  
  return "(Incl./Comp.)";}

  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">  <div>    <span>      <b>";
  foundHelper = helpers.dates;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dates; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.start_time;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</b>      <br />";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</b>      <br />";
  foundHelper = helpers.party;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.party; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.total;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(5, program5, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </span>   </div>  <button class=\"del remove-trip\">X</button></li>";
  return buffer;});
templates['reservations/approval_list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "(";
  foundHelper = helpers.count;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.count; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <p>The following reservations require your attention:</p><ul class=\"list reservation-list\">  ";
  stack1 = depth0.reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">      <div class=\"edit\">        <span class=\"dates\">";
  foundHelper = helpers.dates;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dates; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>         <span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.party;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.party; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</span>        <span class=\"balance";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>				<span class=\"trip\">";
  foundHelper = helpers.trip;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.trip; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>      </div>    </li> ";
  return buffer;}
function program5(depth0,data) {
  
  
  return " due";}

function program7(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Balance Due: $";
  stack1 = depth0.balance_due;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program9(depth0,data) {
  
  
  return "PAID IN FULL.";}

function program11(depth0,data) {
  
  
  return "<p>There are no reservations waiting for approval at this time.</p> ";}

function program13(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<ul class=\"list reservation-list\">  ";
  stack1 = depth0.hold;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>";
  return buffer;}
function program14(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">      <div class=\"edit\">        <span class=\"dates\">";
  foundHelper = helpers.dates;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dates; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>         <span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.party;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.party; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</span>        <span class=\"balance";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(15, program15, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(19, program19, data),fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>				<span class=\"trip\">";
  foundHelper = helpers.trip;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.trip; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>      </div>    </li> ";
  return buffer;}
function program15(depth0,data) {
  
  
  return " due";}

function program17(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Balance Due: $";
  stack1 = depth0.balance_due;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program19(depth0,data) {
  
  
  return "PAID IN FULL.";}

function program21(depth0,data) {
  
  
  return "<p>There are no reservations on hold at this time.</p>";}

  buffer += "<h1>Awaiting Final Approval ";
  stack1 = depth0.count;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1>";
  stack1 = depth0.reservations;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(11, program11, data),fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br /><h3>Reservations On Hold</h3>";
  stack1 = depth0.hold;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(21, program21, data),fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br /><br />";
  return buffer;});
templates['reservations/balances_due'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <p>These reservations have payments due:</p><ul class=\"list reservation-list\">  ";
  stack1 = depth0.reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">      <div class=\"edit\">        <span class=\"dates\">";
  foundHelper = helpers.dates;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dates; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>         <span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.party;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.party; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</span>        <span class=\"balance";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>				<span class=\"trip\">";
  foundHelper = helpers.trip;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.trip; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>      </div>    </li> ";
  return buffer;}
function program3(depth0,data) {
  
  
  return " due";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Balance Due: $";
  stack1 = depth0.balance_due;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program7(depth0,data) {
  
  
  return "PAID IN FULL.";}

function program9(depth0,data) {
  
  
  return "<p>There are no pending reservations at this time.</p> ";}

  buffer += "<h1>Balances Due</h1>";
  stack1 = depth0.reservations;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br />";
  return buffer;});
templates['reservations/form'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, stack3, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <h1>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (<span class=\"heads\">";
  foundHelper = helpers.head_count;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.head_count; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>)</h1>  <button class=\"cancel\">Cancel</button>  <button class=\"done\">Done</button> ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "  <h1>Start a new reservation ";
  stack1 = depth0.start_date;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1><br /><br />";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "on ";
  stack1 = depth0.start_date;
  foundHelper = helpers.sql_to_slash;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "sql_to_slash", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program6(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " <li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Overview", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Overview", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li> <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Activity", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Activity", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program8(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Activity", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Activity", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Lodging", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Lodging", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program12(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Add-Ons", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Add-Ons", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program14(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Invoice", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Invoice", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program16(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Payments", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Payments", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program18(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "<div class=\"tab overview\"> <div class=\"left\">   <h3>Actions</h3>   ";
  stack1 = depth0.status;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "3", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)}) : helperMissing.call(depth0, "eq", stack1, "3", {hash:{},inverse:self.program(21, program21, data),fn:self.program(19, program19, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	 ";
  stack1 = depth0.status;
  foundHelper = helpers.eq;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "4", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)}) : helperMissing.call(depth0, "eq", stack1, "4", {hash:{},inverse:self.program(25, program25, data),fn:self.program(23, program23, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	 	 <button class=\"action del cancel-reservation\">Cancel</button>	 <p class=\"checkbox\">";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "notify-guides";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "notify-guides", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "notify-guides", {hash:stack2});
  buffer += escapeExpression(stack1) + "<label>Notify assigned guides</label></p>	 <p>Total amount:<br /> <b>$";
  stack1 = depth0.total;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</b></p>	 ";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(29, program29, data),fn:self.program(27, program27, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div><div class=\"right\">   <div id=\"overview\"></div> </div>      </div>  ";
  return buffer;}
function program19(depth0,data) {
  
  
  return "    <p>This reservation is <strong>approved.</strong></p>   ";}

function program21(depth0,data) {
  
  
  return "    	  <button class=\"action approve\">Approve</button>	 ";}

function program23(depth0,data) {
  
  
  return "    <p>This reservation is <strong>on hold</strong>.</p>   ";}

function program25(depth0,data) {
  
  
  return "    	  <button class=\"action hold\">Place On Hold</button>	 ";}

function program27(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "	  <p>Balance due:<br /> <b>$";
  stack1 = depth0.balance_due;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</b></p>	 ";
  return buffer;}

function program29(depth0,data) {
  
  
  return "	  <p><b>PAID IN FULL</b></p>	 ";}

function program31(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "   <h3>Stay</h3>   <p class=\"num-field\"><label>Nights</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "stay-length";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "nights", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "nights", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</p>   ";
  return buffer;}

function program33(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "   <div class=\"tab reservation lodging\">  <div class=\"party\">   <h3>Party</h3>   <p class=\"num-field\"><label>Adults</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "adults", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "adults", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>   <p class=\"num-field\"><label>Children</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "children", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "children", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>   <p class=\"num-field\"><label>Seniors</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "seniors", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "seniors", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>   ";
  stack1 = depth0.lodges;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(34, program34, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>    <div class=\"left\">    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_lodge_nights, 'reservations_lodge_nights', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"right\">   <h3>Lodging Summary</h3>  <p class=\"error small lodge-warn\"></p>    <ul class=\"list checklist lodge-list\">    <li><div><p class=\"small\">Select number of guests, stay length and date(s) to add to this reservation.<p></div></li>  </ul> </div> <br /></div>  ";
  return buffer;}
function program34(depth0,data) {
  
  var buffer = "", stack1, stack2, stack3, foundHelper;
  buffer += "   <h3>Stay</h3>   <p class=\"num-field\"><label>Nights</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "stay-length";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "nights", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "nights", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</p>   ";
  return buffer;}

function program36(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <div class=\"tab\"> <div class=\"right\">      ";
  stack1 = depth0.products;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(37, program37, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"left purchase-summary no-edit\">  <h3>Purchased Summary</h3>  <ul class=\"list checklist product-list\"></ul> </div>      </div>";
  return buffer;}
function program37(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_addons, 'reservations_addons', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  return buffer;}

function program39(depth0,data) {
  
  
  return "  ";}

function program41(depth0,data) {
  
  
  return "<div class=\"buttons-right\">  <button class=\"next-step continue\">Save &amp; Continue</button><br />  <a href=\"javascript:void(0);\" class=\"cancel\">or cancel</a></div>  ";}

  buffer += "<form class=\"\" onsubmit=\"return false\"><button class=\"dummy\"></button>";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  <ul class=\"tabs\">";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " ";
  stack1 = depth0.lodges;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.products;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(12, program12, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(16, program16, data),fn:self.program(14, program14, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Client Info", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Client Info", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Travel Info", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Travel Info", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Confirm / Admin", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Confirm / Admin", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li></ul><div class=\"tabshell\">";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  <div class=\"tab reservation activity\"> <div class=\"party\">   <h3>Party</h3>   <p class=\"num-field\"><label>Adults</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "adults", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "adults", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>   <p class=\"num-field\"><label>Children</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "children", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "children", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>   <p class=\"num-field\"><label>Seniors</label>";
  stack1 = depth0.peoples;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "seniors", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "seniors", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>   ";
  stack1 = depth0.lodges;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(31, program31, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>    <div class=\"left\">    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_trip_dates, 'reservations_trip_dates', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"right\">  <h3>Activity Summary</h3>  <ul class=\"list checklist trip-list\">    <li><div><p class=\"small\">Select the party size and trip and date(s) to add to this reservation.<p></div></li>  </ul>   </div> <br /></div> ";
  stack1 = depth0.lodges;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(33, program33, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  ";
  stack1 = depth0.products;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(36, program36, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<div class=\"tab wider-right payments\"> <div class=\"left payment\">  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_enter_payment, 'reservations_enter_payment', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"right\">   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_payment_history, 'reservations_payment_history', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   <br />   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_payment_info, 'reservations_payment_info', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>      </div> <div class=\"tab client-info\"> <div class=\"left\">   <h3>Primary Contact</h3>   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_contact, 'reservations_contact', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   <br />   <h3>Physical Address (optional)</h3>   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.address_fields, 'address_fields', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>     <div class=\"right\">   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_guest_list, 'reservations_guest_list', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </div>   </div>  <div class=\"tab three-column schedule\">  <div class=\"left\">  <h3>Arrival Date &amp; Time</h3>  <div id=\"arrive-cal\"></div>  <p class=\"at\">AT:</p>  <div class=\"adder\">";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hours;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "hrs";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "arrive_hr", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "arrive_hr", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + ":";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.minutes;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "mins";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "arrive_min", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "arrive_min", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</div> </div> <div class=\"center\">  <h3>Departure Date &amp; Time</h3>  <div id=\"depart-cal\"></div>  <p class=\"at\">AT:</p>  <div class=\"adder\">";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hours;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "hrs";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "depart_hr", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "depart_hr", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + ":";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.minutes;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "mins";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "depart_min", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "depart_min", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</div> </div> <div class=\"right\">  <h3>Flights / Notes</h3>    <p>How is the party arriving?</p>    <fieldset>    ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "short";
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "arriving_by", {hash:stack2}) : helperMissing.call(depth0, "text_area", stack1, "arriving_by", {hash:stack2});
  buffer += escapeExpression(stack1) + "    <p>How is the party leaving?</p>    ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "short";
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "departing_by", {hash:stack2}) : helperMissing.call(depth0, "text_area", stack1, "departing_by", {hash:stack2});
  buffer += escapeExpression(stack1) + "    </fieldset> </div></div>           <div class=\"tab wider-left\"> <div class=\"left purchase-summary no-edit\">    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.reservations_confirmation, 'reservations_confirmation', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div> <div class=\"right\">  <h3>Administration</h3>  <p><label>Who is taking/managing this reservation?</label></p>  ";
  stack1 = depth0.staff;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "entered_by", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "entered_by", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "<br />     <p><label>Current Reservation Status:</label>  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.statuses;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "status", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "status", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "  <h3>Private Notes</h3>  <fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['style'] = "height:100px";
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "notes", {hash:stack2}) : helperMissing.call(depth0, "text_area", stack1, "notes", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset>  </div>  </div>   <!-- admin <div class=\"tab wider-right\"> <div class=\"left\">    </div> <div class=\"right\">    </div>    </div>   --></div>";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(41, program41, data),fn:self.program(39, program39, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br /><br /></form>  ";
  return buffer;});
templates['reservations/manifest'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " at ";
  foundHelper = helpers.time;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.time; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1);
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<ul class=\"list group\" data-number=\"";
  foundHelper = helpers.number;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.number; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">  <li class=\"guide ";
  stack1 = depth0.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.id;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "\"><div>";
  stack1 = depth0.guide;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.nickname;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + "</div></li>   ";
  stack1 = depth0.reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(4, program4, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   ";
  stack1 = depth0.available;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(7, program7, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>";
  return buffer;}
function program4(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "     ";
  stack1 = depth0.clients;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   ";
  return buffer;}
function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "       <li class=\"client\" id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" data-activity=\"";
  foundHelper = helpers.activity_id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.activity_id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</div></li>     ";
  return buffer;}

function program7(depth0,data) {
  
  
  return "    <li class=\"available\"><div>Empty Seat</div></li>   ";}

  buffer += "<form class=\"\" onsubmit=\"return false\"><button class=\"dummy\"></button><h1>";
  stack1 = depth0.trip;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.name;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + " Manifest: ";
  stack1 = depth0.date;
  foundHelper = helpers.sql_to_slash;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "sql_to_slash", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.time;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</h1><br /><br /><p>Drag and drop clients to adjust their exact grouping for the day.</p><div class=\"manifest\">";
  stack1 = depth0.program;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.schedule;
  foundHelper = helpers.break_list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, 4, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "break_list", stack1, 4, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div>  <br /><br />&nbsp;<div class=\"buttons-left\"> <button class=\"done\">Save Changes</button> <button class=\"cancel\">Cancel</button></div> </form>";
  return buffer;});
templates['reservations/search_results'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, functionType="function", self=this;

function program1(depth0,data) {
  
  var buffer = "", stack1;
  buffer += " <ul class=\"list reservation-list\">  ";
  stack1 = depth0.reservations;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(2, program2, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ul>";
  return buffer;}
function program2(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "    <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">      <div class=\"edit\">        <span class=\"dates\">";
  foundHelper = helpers.dates;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.dates; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>         <span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + " (";
  foundHelper = helpers.party;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.party; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + ")</span>        <span class=\"balance";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "\">";
  stack1 = depth0.balance_due;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(7, program7, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</span>				<span class=\"trip\">";
  foundHelper = helpers.trip;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.trip; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>      </div>    </li> ";
  return buffer;}
function program3(depth0,data) {
  
  
  return " due";}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "Balance Due: $";
  stack1 = depth0.balance_due;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  return buffer;}

function program7(depth0,data) {
  
  
  return "PAID IN FULL.";}

function program9(depth0,data) {
  
  
  return "<p>You search returned no results.</p> ";}

  buffer += "<h1>Search Results</h1>";
  stack1 = depth0.reservations;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(9, program9, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<br />";
  return buffer;});
templates['settings/bank_account'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"settings bank\" onsubmit=\"return false\"><h1>Bank Account</h1><p>FLyBOOK deposits payments into your bank account. &nbsp;Where do you want to receive payments for trips and shop purchases?</p><fieldset>  <p class=\"field\"><label>Bank Name</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "distribution_reference", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "distribution_reference", {hash:{}});
  buffer += escapeExpression(stack1) + "</p> <p class=\"field\"><label>Bank Routing No.</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "distribution_route", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "distribution_route", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p> <p class=\"field\"><label>Bank Account No.</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "distribution_number", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "distribution_number", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p></fieldset><br /><p class=\"small\">You can easily find this information on any check:</p><img src=\"https://s3.amazonaws.com/flybook_dev/__flybook/images/check-sample.gif\" alt=\"Example Check\" /><br /> <div class=\"buttons-right\">  <button class=\"done\">Save</button>  <button class=\"cancel\">Cancel</button> </div></form>";
  return buffer;});
templates['settings/company_profile'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"settings\" onsubmit=\"return false\"><h1>Company Profile</h1> <fieldset class=\"profile-top\">  <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "publish", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "publish", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>List my company in the <a href=\"http://www.guideoutdoornetwork.com\" target=\"_blank\">gone.</a> network</label></p>  <p class=\"field\"><label>Primary Business</label>";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.industries;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "industry", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "industry", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"field\"><label>Company Name</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "company", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "company", {hash:{}});
  buffer += escapeExpression(stack1) + "</p> </fieldset><h3>Contact Information</h3> <div class=\"left\">  <fieldset>  <p class=\"field\"><label>Email Address</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "email", {hash:{}});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"field\"><label>Phone</label>";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "phone", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "phone", {hash:{}});
  buffer += escapeExpression(stack1) + "</p>  <p class=\"field\"><label>Website URL</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "www.mywebsite.com";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "url", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "url", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  </fieldset> </div><div class=\"right\"> <fieldset>   <p class=\"field\"><label>Facebook URL</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "facebook.com/mycompany";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "facebook_url", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "facebook_url", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p> <p class=\"field\"><label>Twitter Account</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "@mycompany";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "twitter_model", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "twitter_model", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p> </fieldset> </div><div class=\"address\"> <fieldset> <label>Physical Address (optional)</label>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "street";
  stack2['placeholder'] = "Street Address, Apt./Unit";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "address", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "address", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "city";
  stack2['placeholder'] = "City";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "city", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "city", {hash:stack2});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.states;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "state";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "state", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "state", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "zip";
  stack2['placeholder'] = "Zip/Post";
  stack2['class'] = "zip";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "zip", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "zip", {hash:stack2});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.countries;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "country";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "country", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "country", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + " </fieldset> </div><h3>Logo &amp; Feature Photo</h3> <div id=\"progress\"><span>Uploading...</span><div id=\"bar\"></div></div> <div class=\"upload-field\" id=\"logo\"><label>Company Logo</label><div class=\"upload\"><p class=\"tip\">click or drop to upload</p><div id=\"logo-upload\"></div></div></div> <div class=\"upload-field\" id=\"photo\"><label>Feature Photo</label><div class=\"upload\"><p class=\"tip\">click or drop to upload</p><div id=\"photo-upload\"></div></div></div><br /> <br /> <br />&nbsp;<h3>Company Description</h3><fieldset>";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "description", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "description", {hash:{}});
  buffer += escapeExpression(stack1) + "</fieldset><br /> <div class=\"buttons-right\">  <button class=\"done\">Save</button>  <button class=\"cancel\">Cancel</button> </div> </form>";
  return buffer;});
templates['settings/documents'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, self=this;


  buffer += "<h1>Documents</h1><button class=\"cancel\">Cancel</button><button class=\"done\">Done</button><form style=\"clear:both;\" class=\"documents\" onsubmit=\"return false\"><div class=\"longer-headings\"> <span class=\"long\">Name</span> <span>Download</span></div><ul id=\"docs\" class=\"list docs\"><li>No documents have been uploaded yet.</li></ul><br /><h3>Upload a new document:</h3>";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.progress_bar, 'progress_bar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<div class=\"doc-upload-field\"><div class=\"upload\"><p class=\"tip\">click or drop</p><div id=\"doc-upload\"></div></div></div></div></form>";
  return buffer;});
templates['settings/partners'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Partner Up. Offer More.</h1><p>By partnering with other tour guides, hospitality providers or adventure guides you can expand your offerings and earn commission on referrals.</p><br /><p>The Gone Network is in development and will be your source for other partners.";});
templates['settings/partners_intro'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<h1>Partner Up. Offer More.</h1><p>By partnering with other tour guides, hospitality providers or adventure guides you can both expand your offerings and earn commission on referrals.</p><p>The Gone Network is in development and will be your source for finding partners in providing the world's greatest adventures.</p><br /><center><a href=\"http://www.guideoutdoornetwork.com\" target=\"_blank\"><img src=\"https://flybook-asset.s3.amazonaws.com/images/gone-soon.gif\" alt=\"Gone. Dropping 2012-2013\" /></a><br /> <button class=\"cancel\">Cool. I'll check this out later</button></center>  ";});
templates['settings/payment'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  


  return "<form class=\"settings\" onsubmit=\"return false\"><h1>Payment Method</h1><p>How do you want to pay for FLyBOOK services? If you enter a credit or debit card, you can also use this method to pay your partners commissions automatically.</p></form>";});
templates['settings/promotions'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"promos\" onsubmit=\"return false\"><h1>Promotion Codes</h1><button class=\"cancel\">Cancel</button><button class=\"done\">Done</button><div class=\"headings\"><span class=\"long\">Code</span><span>% Discount</span><span>$ Discount</span><span>Valid Through</span></div><ul id=\"promotion-codes\" class=\"list\"></ul><div class=\"add-fields code-fields\">";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "long";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "code", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "code", {hash:stack2});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "percent_discount", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "percent_discount", {hash:{}});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "flat_discount", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "flat_discount", {hash:{}});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "mm/dd/yyyy";
  stack2['class'] = "long";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "valid_through", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "valid_through", {hash:stack2});
  buffer += escapeExpression(stack1) + "<button class=\"add-to add-code\">Add Code</button></div><br /><br /></form>";
  return buffer;});
templates['trips_capacity'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Group Size &amp; Capacity</h3><p class=\"field\"><label>Group Size (per Guide)</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "group_size", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "group_size", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Max. Trip Capacity</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "capacity", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "capacity", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "capacity_only", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "capacity_only", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Book this trip to capacity</label></p>";
  return buffer;});
templates['trips_deposit_rules'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Deposit Rules</h3><div class=\"headings\">  <span>Days Prior</span>  <span>% Due</span></div><ul class=\"list\" id=\"deposits\"></ul>  <div class=\"add-fields deposits\"> ";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "days_prior", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "days_prior", {hash:{}});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "percent_due", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "percent_due", {hash:{}});
  buffer += escapeExpression(stack1) + "</div><button class=\"add-to add-deposit-rule\">Add Deposit Rule</button><br /><!-- deposit rules help <div class=\"deposit-help tip\"><p class=\"small\">Deposit rules allow you to specify a percent(%) to collect under the condition they are booking before the date you set.</p></div>-->";
  return buffer;});
templates['trips_fees'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Taxes &amp; Fees</h3><div class=\"longer-headings\">    <span class=\"long\">Description</span>    <span class=\"short\">% Fee</span>    <span class=\"short\">Flat Fee $</span>  </div>  <ul class=\"list longer sortable\" id=\"fees\"></ul>  <div class=\"longer-add-fields add-fees\">   ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "long";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "fee_name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "fee_name", {hash:stack2});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "short";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "percent", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "percent", {hash:stack2});
  buffer += escapeExpression(stack1) + "   ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "short";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "flat", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "flat", {hash:stack2});
  buffer += escapeExpression(stack1) + "  </div><button class=\"add-to add-fee\">Add Fee / Tax</button>    ";
  return buffer;});
templates['trips_price'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing;


  buffer += "<li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\">  <div>   <span>";
  foundHelper = helpers.people;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.people; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span>   <span>$";
  stack1 = depth0.price;
  foundHelper = helpers.dollar;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, {hash:{}}) : helperMissing.call(depth0, "dollar", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</span>   <span class=\"long\">";
  stack1 = depth0.start_date;
  foundHelper = helpers.date_format;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "MMM [  ] Do [  ] YYYY", {hash:{}}) : helperMissing.call(depth0, "date_format", stack1, "MMM [  ] Do [  ] YYYY", {hash:{}});
  buffer += escapeExpression(stack1) + "</span>   <span>";
  stack1 = depth0.end_date;
  foundHelper = helpers.date_format;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "MMM  [  ] Do [  ] YYYY", {hash:{}}) : helperMissing.call(depth0, "date_format", stack1, "MMM  [  ] Do [  ] YYYY", {hash:{}});
  buffer += escapeExpression(stack1) + "</span>  </div> <button class=\"del remove-price-point\">Delete</buton></li>";
  return buffer;});
templates['trips_pricing'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Pricing</h3><div class=\"headings\"> <span>People</span> <span>$ / Person</span> <span class=\"long\">Start Date</span> <span>End Date</span></div><ul class=\"list\" id=\"prices\"></ul>  <div class=\"add-fields\"> ";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "people", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "people", {hash:{}});
  buffer += escapeExpression(stack1) + " ";
  stack1 = depth0.model;
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "price", {hash:{}}) : helperMissing.call(depth0, "text_field", stack1, "price", {hash:{}});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.months;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "mo";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_month", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "start_month", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.days;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "dt";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_dt", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "start_dt", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.years;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "yr";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_year", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "start_year", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.months;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "mo";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "end_month", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "end_month", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.days;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "dt";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "end_dt", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "end_dt", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "  ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.years;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "yr";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "end_year", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "end_year", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "  <p class=\"checkbox nodates\">";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "nope";
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "nodates", {hash:stack2}) : helperMissing.call(depth0, "checkbox", stack1, "nodates", {hash:stack2});
  buffer += escapeExpression(stack1) + "<label>Apply date restrictions</label></p>  </div><br /><button class=\"add-to add-price-point\">Add New Price</button><div class=\"pricing-help tip\"><p class=\"small\">This feature allows you to create price points for your trip. For single and double occupancy, create a price for 1 and 2 people. To create a group discount, enter the group size and a price for that number of people. If you leave pricing blank, clients will be able to book without having to pay first.</p></div>	";
  return buffer;});
templates['trips_rates'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<h3>Special Rates</h3><p class=\"field\"><label>Child Rate (12-)</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "child_rate", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "child_rate", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><p class=\"field\"><label>Senior Rate (65+)</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "senior_rate", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "senior_rate", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p><!--<div class=\"tip\"><p class=\"small\">TAX: Entering a tax amount will cause the tax to show up as a line item on purchases and receipts. <b>If you do not want to show taxes, build the tax into your trip pricing.</b></p><p class=\"small\">OVERHEAD: Enter the amount this trip costs you per person. <strong>Do not factor in lodging and meals</strong> as they are accounted for separately.</p>	</div>-->";
  return buffer;});
templates['trips/create'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, stack2, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression;


  buffer += "<form class=\"trip\" onsubmit=\"return false\"><h1>Add a new activity, trip or package</h1><fieldset><p class=\"step\"><span>1</span> <strong>What do you call this activity or trip?</strong> &nbsp; Be descriptive, but not too long!</p> ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(2hr Waterfall Hike, Half Day Surf Lesson, 5 Day Heli Ski Package etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "<br /><p class=\"step\"><span>2</span> <strong>Where is the trip or activity located?</strong> &nbsp; This can be a river, national park, city, town or an address, state or country.</p> ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['placeholder'] = "(Deschutes River, Grand Canyon, Swiss Alps, North Shore Hawaii, etc.)";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "location", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "location", {hash:stack2});
  buffer += escapeExpression(stack1) + "<p class=\"step\"><span>3</span> Is this <strong>part of your activities schedule</strong> or is it a <strong>inclusive package?</strong> &nbsp;Not sure? <a href=\"javascript:void(0)\">Learn more...</a></p> <div class=\"trip-type\" id=\"activity\">  <input type=\"radio\" name=\"package\" value=\"0\" checked=\"true\" />  <label for=\"admin\">Scheduled Activity</label>  <p>This is an activity or event which I need to see on the calendar so I can schedule reservations and guides</p> </div> <div class=\"trip-type\" id=\"package\">  <input type=\"radio\" name=\"package\" value=\"1\" />  <label for=\"admin\">Inclusive Package</label>  <p>This is a trip package that includes lodging or shares availability with other trips and/or activities.</p> </div>  <br /><!--<p class=\"step\"><span>3</span> <strong>How do you schedule this tour?</strong> I want to take reservations on:</p> ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.scheduling;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "scheduled", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "scheduled", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "</fieldset><p>Which would should I choose?</p><p class=\"small\"><strong>Flexible Dates</strong> allows clients &amp; staff to reserve this trip on any date that is not blacked out, is not booked to capacity and least one guide is available. <strong>Scheduled Dates</strong> will allow clients &amp; staff to reserve this trip only on specific dates which have been scheduled on your FLyBOOK calendar.</p><br />--></fieldset><div class=\"buttons-right\"> <button class=\"save continue\">Save &amp; Continue</button><br /> <a href=\"javascript:void(0)\" class=\"cancel\">or cancel</a></div></form>";
  return buffer;});
templates['trips/edit'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  
  return "<button class=\"cancel\">Cancel</button>  <button class=\"done\">Done</button>  ";}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += " <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Guides", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Guides", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "  <fieldset>   ";
  stack1 = depth0.activities;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "activity_id", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "activity_id", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "    <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "activities_scheduled", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "activities_scheduled", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Schedule daily activities manually</label></p>  ";
  stack1 = depth0.lodges;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    </fieldset> ";
  return buffer;}
function program6(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "   <h3>Package Lodging</h3>   ";
  stack1 = depth0.lodges;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "lodge_id", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "lodge_id", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "   <p class=\"field\"><label>Nights Included</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "lodging_nights", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "lodging_nights", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>   <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "arrive_night_prior", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "arrive_night_prior", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Guests arrive night before first day</label></p>   <p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "active_last_day", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "active_last_day", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Guests participate on check-out day</label></p>  ";
  return buffer;}

function program8(depth0,data) {
  
  
  return " <p class=\"small\">You have indicated this is an activity. If you would like to make it a package, you can do so in settings. Finish editing this trip and return to this section to see package options here.</p> ";}

function program10(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "			<ol class=\"list sortable checklist\" id=\"guides\">				";
  stack1 = depth0.guides;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No guides or staff members have been added to your account. Don't worry, we can do this later.", {hash:{},inverse:self.noop,fn:self.programWithDepth(program11, data, depth0)}) : helperMissing.call(depth0, "list", stack1, "No guides or staff members have been added to your account. Don't worry, we can do this later.", {hash:{},inverse:self.noop,fn:self.programWithDepth(program11, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "			</ol>		";
  return buffer;}
function program11(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "				 <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div>";
  stack1 = depth0.id;
  stack2 = depth1.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{}}) : helperMissing.call(depth0, "checkbox", stack2, stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "<span>";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div></li>  				";
  return buffer;}

function program13(depth0,data) {
  
  
  return "    <p class=\"small\">This is a package and will not display on your activity schedule.</p>    <p class=\"radio\"><input type=\"radio\" name=\"package\" value=\"1\" checked=\"true\" ><label>Keep this as a package</label></p>    <p class=\"radio\"><input type=\"radio\" name=\"package\" value=\"0\" ><label>Change to scheduled activity</label></p>   ";}

function program15(depth0,data) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "         ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.colors;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "color", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "color", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "          <p class=\"radio\"><input type=\"radio\" name=\"package\" value=\"0\" checked=\"true\" ><label>Keep this on the calendar</label></p>    <p class=\"radio\"><input type=\"radio\" name=\"package\" value=\"1\" ><label>Change to a package</label></p>    ";
  return buffer;}

function program17(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "	<p class=\"small\">Select which documents you want to attach to the confirmation email</p>	";
  stack1 = depth0.account;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.documents;
  stack1 = helpers.each.call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(18, program18, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	";
  return buffer;}
function program18(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "	<p class=\"checkbox\"><input type=\"checkbox\" value=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\" name=\"frms\" class=\"frm\"><label>";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</label></p>	";
  return buffer;}

function program20(depth0,data) {
  
  
  return "	<p class=\"small\">When you upload documents such as waivers, information packets, or other paper forms you can configure these settings to automatically attach documents to your confirmation email.</p>	";}

function program22(depth0,data) {
  
  
  return " ";}

function program24(depth0,data) {
  
  
  return "<div class=\"buttons-right\"> <button class=\"next-step continue\">Continue Setup</button><br /> <a href=\"javascript:void(0)\" class=\"done\">or save and make changes later</a></div>";}

  buffer += "<form class=\"trip\" onsubmit=\"return false\"><button class=\"dummy\"></button>";
  stack1 = depth0.setup_complete;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "title";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "<ul class=\"tabs\"> <li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Details", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Details", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>   <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Availability", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Availability", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  stack1 = depth0.guides;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Pricing", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Pricing", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li> <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Fees &amp; Taxes", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Fees &amp; Taxes", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li> <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Photos &amp; Location", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Photos &amp; Location", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li> <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Settings", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Settings", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li> <li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Confirm", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Confirm", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li></ul>  <div class=\"tabshell\">  <div class=\"tab wider-right\"> <div class=\"left\">  <h3>Activity Duration</h3>  <p class=\"field\"><label>Trip Length (days)</label>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "duration", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "duration", {hash:stack2});
  buffer += escapeExpression(stack1) + "</p>	<p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "require_same_guide", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "require_same_guide", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Require same guide for this duration</label></p> <h3>PACKAGE ACTIVITY</h3>  ";
  stack1 = depth0['package'];
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(8, program8, data),fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   </div> <div class=\"right\" id=\"trip-includes\">	<h3>Description</h3>	<fieldset>  <p class=\"small\">This will be included along with the location and photos on <a href=\"http://";
  stack1 = depth0.account;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.flybook_url;
  stack1 = typeof stack1 === functionType ? stack1() : stack1;
  buffer += escapeExpression(stack1) + ".theflybook.com/\" target=\"blank\">your booking website</a></p>  ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['style'] = "height:340px";
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "description", {hash:stack2}) : helperMissing.call(depth0, "text_area", stack1, "description", {hash:stack2});
  buffer += escapeExpression(stack1) + "	</fieldset></div></div> <div class=\"tab wider-right\"> <div class=\"left\">	";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_capacity, 'trips_capacity', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "	<h3>Season</h3>	<p class=\"small\">If this trip happens seasonally specify the start and end dates here.</p>	<fieldset class=\"season\">	<label>Opens</label>  	";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.months;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "season_start_month", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "season_start_month", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.days;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "season_start_date", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "season_start_date", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "  <label>Closes</label>   ";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.months;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "season_end_month", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "season_end_month", stack1, {hash:{}});
  buffer += escapeExpression(stack1);
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.days;
  stack2 = depth0.model;
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "season_end_date", stack1, {hash:{}}) : helperMissing.call(depth0, "select", stack2, "season_end_date", stack1, {hash:{}});
  buffer += escapeExpression(stack1) + "  </field> </div> <div class=\"right\">	 <h3>Trip Schedule</h3>	  <p class=\"small\"><strong>Select the first day of the week or specific dates this trip can start.</strong> If clients arrive the night before the trip starts, the first day of activity is the day you should select.</p> 	  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.weekday_calendar, 'weekday_calendar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "		<h3>Start Times (Optional)</h3>		<div id=\"start-times\">		 <p></p>		 <div class=\"adder\">";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hours;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "hrs";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "h", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "h", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + ":";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.minutes;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "mins";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "m", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "m", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "<button class=\"newtime\">+</button></div>  	 </div> </div>		</div><div class=\"tab\"><div class=\"left\">	<h3>Guiding Order</h3>	 		";
  stack1 = depth0.guides;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(10, program10, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </div> <div class=\"right\">	<h3>Assistants/Tail Guides</h3> 	</div>	</div>  <div class=\"tab wider-left trip-pricing\"> <div class=\"left\">   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_pricing, 'trips_pricing', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"right\">	    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_rates, 'trips_rates', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "    ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_deposit_rules, 'trips_deposit_rules', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>  </div> <div class=\"tab wider-left\"> <div class=\"left\">   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_fees, 'trips_fees', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"right\">   <h3>About Fees</h3>   <div class=\"tip\"><p class=\"small\">We allow you to flexibly create any fee structure you want to add to any of your trips and lodging.      <br /><br />In exchange, we require that you abide by all federal and state laws <b>in addition to Flybook policy</b>. It is against our rules to charge     a client for any federal or state permit fees you pay (where applicable), or explicitly state any \"Flybook\", \"Online Booking\" fees.</p>    </div> </div>      </div>  <div class=\"tab wider-right\"> ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.progress_bar, 'progress_bar', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   <div class=\"left photos\">  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.photos, 'photos', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>      <div class=\"right map\">  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.location, 'location', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>   </div>  	<div class=\"tab three-column\"> <div class=\"left\">  <h3>Publish Settings</h3>	<p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "active", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "active", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>This is an active trip</label></p>	<p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "web_active", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "web_active", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Allow online reservations to be made</label></p>	<p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "published", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "published", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Publish this trip to the <a href=\"http://www.guideoutdoornetwork.com\" target=\"_blank\">gone.</a> network</label></p>		<h5>When booking online...</h5>	<p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "allow_time_select", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "allow_time_select", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Allow clients to select start time</label></p>	<p class=\"checkbox\">";
  stack1 = depth0.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "allow_guide_req", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "allow_guide_req", {hash:{}});
  buffer += escapeExpression(stack1) + "<label>Allow clients to request a guide</label></p> </div> <div class=\"center\">   <h3>Balance Collection</h3>	 <h5>Collect balances due</h5>  	<p class=\"radio\">      <input type=\"radio\" name=\"auto_collect_balances\" class=\"custom-auto\" value=\"2\">      <label>Automatically ";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "num balance-days";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "auto_collect_days_prior", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "auto_collect_days_prior", {hash:stack2});
  buffer += escapeExpression(stack1) + " day(s) prior</label>    </p>    <p class=\"radio\">      <input type=\"radio\" name=\"auto_collect_balances\" class=\"day-auto\" value=\"1\">      <label>Automatically on first day of the trip</label>    </p>    <p class=\"radio\">      <input type=\"radio\" name=\"auto_collect_balances\" class=\"no-auto\" value=\"0\">      <label>Manually</label>    </p>	 </div> <div class=\"right\">   <h3>Calendar Display</h3>   ";
  stack1 = depth0['package'];
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(15, program15, data),fn:self.program(13, program13, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "      </div>	</div><div class=\"tab wider-right\"> <div class=\"left\">	<h3>Documents</h3>	";
  stack1 = depth0.account;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.documents;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(20, program20, data),fn:self.program(17, program17, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   </div> <div class=\"right\">  <h3>Confirmation Letter</h3>   <p>The confirmation letter is sent to clients when you confirm their reservation.</p>  <fieldset> 	";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "confirmation_letter", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "confirmation_letter", {hash:{}});
  buffer += escapeExpression(stack1) + "	</fielset> </div></div>	</div>";
  stack1 = depth0.setup_complete;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(24, program24, data),fn:self.program(22, program22, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</form>  ";
  return buffer;});
templates['trips/help'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, self=this;

function program1(depth0,data) {
  
  
  return "<button class=\"close cancel\">Close</button>";}

function program3(depth0,data) {
  
  
  return "<button class=\"create\">Add Activity</button>";}

  buffer += "<h1>Help: Activities &amp; Trips</h1>";
  stack1 = depth0.help;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<p>Whether you guide month long expeditions to the north pole or run several small tours per day (or both!)   this is how you create availability.</p><p>Video here..</p><p class=\"small\">Still need more help? <a href=\"mailto:support@theflybook.com\">Contact FlyBook Support</a></p>";
  return buffer;});
templates['trips/list'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers;
  var buffer = "", stack1, foundHelper, functionType="function", escapeExpression=this.escapeExpression, self=this, helperMissing=helpers.helperMissing;

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li> ";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li> ";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "  <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div class=\"edit\"><span class=\"name\">";
  foundHelper = helpers.name;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.name; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div><button class=\"delete\">delete</button></li> ";
  return buffer;}

  buffer += "<h1>Activities &amp; Trips</h1><button class=\"help\">Help</button><button class=\"create\">New Activity</button><h3>Activities &amp; Trips</h3><ol id=\"trips\" class=\"list sortable\"> ";
  stack1 = depth0.active;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No active trips or activities at the moment", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)}) : helperMissing.call(depth0, "list", stack1, "No active trips or activities at the moment", {hash:{},inverse:self.noop,fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br /><h3>Packages</h3><ol id=\"trips\" class=\"list sortable\"> ";
  stack1 = depth0.packages;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No packages or multi-day trips at the moment", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)}) : helperMissing.call(depth0, "list", stack1, "No packages or multi-day trips at the moment", {hash:{},inverse:self.noop,fn:self.program(3, program3, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol><br /><h3>Inactive Trips</h3><ol id=\"inative-trips\" class=\"list sortable\"> ";
  stack1 = depth0.inactive;
  foundHelper = helpers.list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "No inactive trips, activities or packages at the moment", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)}) : helperMissing.call(depth0, "list", stack1, "No inactive trips, activities or packages at the moment", {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</ol>";
  return buffer;});
templates['trips/schedule'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, stack3, foundHelper, helperMissing=helpers.helperMissing, escapeExpression=this.escapeExpression, self=this, functionType="function";

function program1(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Bookings", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Bookings", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Schedule &amp; Capacity", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Schedule &amp; Capacity", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program3(depth0,data) {
  
  var buffer = "", stack1, foundHelper;
  buffer += "<li>";
  stack1 = {};
  stack1['class'] = "tab current";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Schedule &amp; Capacity", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Schedule &amp; Capacity", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li>";
  return buffer;}

function program5(depth0,data) {
  
  var buffer = "", stack1;
  buffer += "<div class=\"tab\"> <div class=\"left\">   <h3>Book A Client</h3>   <fieldset>        </fieldset>  </div> <div class=\"right\">  <h3>Reservations</h3>  ";
  stack1 = depth0.reservations;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(8, program8, data),fn:self.program(6, program6, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "   </div>      </div>";
  return buffer;}
function program6(depth0,data) {
  
  
  return "    ";}

function program8(depth0,data) {
  
  
  return "    <p>Currently no one has made reservations for this trip.</p>    <button class=\"trip-cancel del\">Cancel This Trip</button>  ";}

function program10(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "    <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div>";
  stack1 = depth0.id;
  stack2 = depth1.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{}}) : helperMissing.call(depth0, "checkbox", stack2, stack1, {hash:{}});
  buffer += escapeExpression(stack1) + " <span ";
  stack1 = depth0.is_available;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(13, program13, data),fn:self.program(11, program11, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div></li>     ";
  return buffer;}
function program11(depth0,data) {
  
  
  return " ";}

function program13(depth0,data) {
  
  
  return "style=\"color:#cc0000;\"";}

function program15(depth0,data,depth1) {
  
  var buffer = "", stack1, stack2, foundHelper;
  buffer += "    <li id=\"";
  foundHelper = helpers.id;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.id; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "\"><div>";
  stack1 = depth0.id;
  stack2 = depth1.model;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, stack1, {hash:{}}) : helperMissing.call(depth0, "checkbox", stack2, stack1, {hash:{}});
  buffer += escapeExpression(stack1) + " <span ";
  stack1 = depth0.is_available;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(18, program18, data),fn:self.program(16, program16, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += ">";
  foundHelper = helpers.nickname;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.nickname; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</span></div></li>     ";
  return buffer;}
function program16(depth0,data) {
  
  
  return " ";}

function program18(depth0,data) {
  
  
  return "style=\"color:#cc0000;\"";}

  buffer += "<form class=\"trip-schedule\" onsubmit=\"return false\"><fieldset>";
  stack1 = depth0.model;
  stack2 = {};
  stack2['class'] = "title";
  foundHelper = helpers.text_field;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "name", {hash:stack2}) : helperMissing.call(depth0, "text_field", stack1, "name", {hash:stack2});
  buffer += escapeExpression(stack1) + "</fieldset><ul class=\"tabs\">";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.program(3, program3, data),fn:self.program(1, program1, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Guides &amp; Staff", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Guides &amp; Staff", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Specific Pricing", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Specific Pricing", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li><li>";
  stack1 = {};
  stack1['class'] = "tab";
  foundHelper = helpers.link_nohref;
  stack1 = foundHelper ? foundHelper.call(depth0, "Notes", {hash:stack1}) : helperMissing.call(depth0, "link_nohref", "Notes", {hash:stack1});
  buffer += escapeExpression(stack1) + "</li></ul>  <div class=\"tabshell\">";
  stack1 = depth0.id;
  stack1 = helpers['if'].call(depth0, stack1, {hash:{},inverse:self.noop,fn:self.program(5, program5, data)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "<div class=\"tab three-column schedule\"> <div class=\"left\">  <h3>Start Date &amp; Time</h3>  <div id=\"start-cal\"></div>  <p class=\"at\">AT:</p>  <div class=\"adder\">";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hours;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "hrs";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_hr", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "start_hr", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + ":";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.minutes;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "mins";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "start_min", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "start_min", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</div> </div> <div class=\"center\">  <h3>End Date &amp; Time</h3>  <div id=\"end-cal\"></div>  <p class=\"at\">AT:</p>  <div class=\"adder\">";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.hours;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "hrs";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "end_hr", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "end_hr", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + ":";
  stack1 = depth0.model;
  stack1 = stack1 == null || stack1 === false ? stack1 : stack1.minutes;
  stack2 = depth0.model;
  stack3 = {};
  stack3['class'] = "mins";
  foundHelper = helpers.select;
  stack1 = foundHelper ? foundHelper.call(depth0, stack2, "end_min", stack1, {hash:stack3}) : helperMissing.call(depth0, "select", stack2, "end_min", stack1, {hash:stack3});
  buffer += escapeExpression(stack1) + "</div> </div> <div class=\"right\">  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_capacity, 'trips_capacity', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div></div>  <div class=\"tab\"> <p class=\"small\">&nbsp;&nbsp;Guides and staff members listed in <em style=\"color:#CC0000;background-color:#FFF\">red</em> have at least one day blacked out in the range you selected.</p>   <div class=\"left\">  <h3>Assign Guides</h3>  <ol class=\"list sortable checklist\" id=\"guides\">   ";
  stack1 = depth0.staff;
  foundHelper = helpers.filtered_list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "role", "guide,staff,manager", "No active guides, managers or staff right now.", {hash:{},inverse:self.noop,fn:self.programWithDepth(program10, data, depth0)}) : helperMissing.call(depth0, "filtered_list", stack1, "role", "guide,staff,manager", "No active guides, managers or staff right now.", {hash:{},inverse:self.noop,fn:self.programWithDepth(program10, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </ol> </div> <div class=\"col right\">  <h3>Assign Assistants</h3>  <ol class=\"list checklist\" id=\"assistants\">   ";
  stack1 = depth0.staff;
  foundHelper = helpers.filtered_list;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "role", "assistant", "No assistants available.", {hash:{},inverse:self.noop,fn:self.programWithDepth(program15, data, depth0)}) : helperMissing.call(depth0, "filtered_list", stack1, "role", "assistant", "No assistants available.", {hash:{},inverse:self.noop,fn:self.programWithDepth(program15, data, depth0)});
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "  </ol> </div>  </div><div class=\"tab three-column\"> <div class=\"left\">   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_pricing, 'trips_pricing', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div> <div class=\"center\">  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_deposit_rules, 'trips_deposit_rules', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>   <div class=\"right\">   ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.trips_rates, 'trips_rates', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += " </div>  </div> <div class=\"tab\"><h3>Private Account / Sales Notes</h3><fieldset>";
  stack1 = depth0.model;
  foundHelper = helpers.text_area;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "notes", {hash:{}}) : helperMissing.call(depth0, "text_area", stack1, "notes", {hash:{}});
  buffer += escapeExpression(stack1) + "</fieldset></div>  </div><div class=\"buttons-left\"> <button class=\"done\">Save Changes</button> <button class=\"cancel\">Cancel</button></div><br /><br /></form> ";
  return buffer;});
templates['users/login'] = template(function (Handlebars,depth0,helpers,partials,data) {
  helpers = helpers || Handlebars.helpers; partials = partials || Handlebars.partials;
  var buffer = "", stack1, stack2, foundHelper, functionType="function", escapeExpression=this.escapeExpression, helperMissing=helpers.helperMissing, self=this;


  buffer += "<div class=\"login-lefty\"><div class=\"login\">  <form>    <h2>";
  foundHelper = helpers.login_message;
  if (foundHelper) { stack1 = foundHelper.call(depth0, {hash:{}}); }
  else { stack1 = depth0.login_message; stack1 = typeof stack1 === functionType ? stack1() : stack1; }
  buffer += escapeExpression(stack1) + "</h2>    <fieldset>    ";
  stack1 = depth0.user;
  stack2 = {};
  stack2['placeholder'] = "Email Address";
  stack2['type'] = "email";
  foundHelper = helpers.input;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "email", {hash:stack2}) : helperMissing.call(depth0, "input", stack1, "email", {hash:stack2});
  buffer += escapeExpression(stack1) + "    ";
  stack1 = depth0.user;
  stack2 = {};
  stack2['placeholder'] = "Password";
  foundHelper = helpers.password;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "password", {hash:stack2}) : helperMissing.call(depth0, "password", stack1, "password", {hash:stack2});
  buffer += escapeExpression(stack1) + "    </fieldset>    <!--<p class=\"checkbox\">      ";
  stack1 = depth0.user;
  foundHelper = helpers.checkbox;
  stack1 = foundHelper ? foundHelper.call(depth0, stack1, "remember", {hash:{}}) : helperMissing.call(depth0, "checkbox", stack1, "remember", {hash:{}});
  buffer += escapeExpression(stack1) + "<label for=\"remember\">Remember me</label>    </p>-->    <button>Login</button>  </form>  ";
  stack1 = depth0;
  stack1 = self.invokePartial(partials.loader, 'loader', stack1, helpers, partials);;
  if(stack1 || stack1 === 0) { buffer += stack1; }
  buffer += "</div></div>";
  return buffer;});
