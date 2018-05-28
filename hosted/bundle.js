'use strict';

// Method stubs
var Projects = {};

//AJAX
var getProjects = function getProjects(data, e) {
  if (e) {
    e.preventDefault();
  }
  sendAjax('GET', '/projects', data, function (result) {
    console.dir(result);
    var content = document.querySelector('#mainContent');
    ReactDOM.render(React.createElement(Projects, { projects: result.projects }), content);
  });
  return false;
};

var getFeatured = function getFeatured() {
  return getProjects('?featured=true', null);
};

//React
var Project = function Project(props) {
  var project = props.project;
  var genList = function genList(label, arr, emptyMsg) {
    if (!arr) {
      return React.createElement(
        'p',
        null,
        React.createElement(
          'b',
          null,
          label,
          ':'
        ),
        ' ',
        emptyMsg
      );
    }
    var list = arr.map(function (str) {
      return _.unescape(str);
    });
    var listStr = list.join(', ');
    return React.createElement(
      'p',
      null,
      React.createElement(
        'b',
        null,
        label,
        ':'
      ),
      ' ',
      listStr
    );
  };

  //events
  var goToProject = function goToProject() {
    var loc = window.location;
    var newURL = loc.protocol + '//' + loc.host + '/project/' + project.name.short;
    console.log(newURL);
    //window.location.assign(newURL);
    window.location.href = newURL;
    console.dir(window);
    console.dir(window.location);

    return false;
  };
  /*
  const goToProject = () => {
    const newURL = `/project/${project.name.short}`;
    sendAjax('GET',newURL,null,function(){});
  };
  */
  //content
  var style = { cursor: 'pointer' };
  var img = '/assets/img/' + project.images.small;
  var languages = genList('Languages', project.languages, 'N/A');
  var details = [];
  details.push(genList('Skills', project.skills, "None"));
  details.push(genList('Teammates', project.teammates, "Individual Project"));

  return React.createElement(
    'div',
    { className: 'project', style: style, onClick: goToProject },
    React.createElement('img', { className: 'mainImage', src: img, alt: 'A screen-shot from the project.', title: '' }),
    React.createElement(
      'h2',
      null,
      React.createElement(
        'a',
        { href: 'Latin_Square_Solver.html' },
        'Latin Square Solver'
      ),
      React.createElement(
        'span',
        { 'class': 'plainTitle' },
        'Latin Square Solver'
      )
    ),
    React.createElement(
      'p',
      null,
      React.createElement(
        'b',
        null,
        'Time:'
      ),
      ' Feb 2017-Mar 2017'
    ),
    languages,
    React.createElement(
      'div',
      { 'class': 'details' },
      details
    )
  );
};

Projects = function Projects(props) {
  var projects = props.projects.map(function (proj) {
    return React.createElement(Project, { project: proj });
  });
  return React.createElement(
    'div',
    null,
    projects
  );
};

//Setup
var setup = function setup() {
  getFeatured();
};

window.onload = setup;
"use strict";

//Handles AJAX calls to the server - derived from sample code used in Rich Media II
var sendAjax = function sendAjax(type, action, data, success) {

  //const contentType = contType || "application/x-www-form-urlencoded; charset=UTF-8";

  $.ajax({
    cache: false,
    type: type,
    url: action,
    data: data,
    dataType: "json",
    contentType: "application/x-www-form-urlencoded; charset=UTF-8",
    success: success,
    error: function error(xhr, status, _error) {
      try {
        var messageObj = JSON.parse(xhr.responseText);
        console.log(messageObj.error);
      } catch (e) {
        console.log("An error has occured.");
      }
    }
  });
};
