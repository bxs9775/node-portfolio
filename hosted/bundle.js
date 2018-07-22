'use strict';

// Method stubs
var FilterForm = {};
var Projects = {};

//AJAX
var getProjects = function getProjects(data, e) {
  if (e) {
    e.preventDefault();
  }
  sendAjax('GET', '/projects', data, function (result) {
    var elem = document.querySelector('#projectList');
    ReactDOM.render(React.createElement(Projects, { projects: result.projects }), elem);
  });
  return false;
};

var getFilters = function getFilters() {
  return sendAjax('GET', '/filters', null, function (result) {
    var elem = document.querySelector('#filters');
    ReactDOM.render(React.createElement(FilterForm, { languages: result.languages, skills: result.skills }), elem);
    var checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function (checkbox) {
      checkbox.checked = true;
    });
  });
};

var getFeatured = function getFeatured() {
  return getProjects('featured=true', null);
};

//Events
var goToProject = function goToProject(proj) {
  var loc = window.location;
  var newURL = loc.protocol + '//' + loc.host + '/project/' + proj.name.short;
  window.location.href = newURL;

  return false;
};

//Changes the style of a project as it is hovered over.
var onProjectHover = function onProjectHover(projId) {
  var project = document.querySelector('#' + projId);

  if (project) {
    project.style.boxShadow = "2px 2px 5px #aaa";
    project.style.backgroundColor = "#e0e0ef";

    var projImg = project.querySelector(".mainImage");
    var projDetails = project.querySelector(".details");
    if (projImg && projDetails) {
      projImg.style.width = projImg.naturalWidth + "px";
      projImg.style.height = "0px";
      projDetails.style.height = "200px";
    }
  }
};

//Restores the style of the project to its default.
var onProjectOut = function onProjectOut(projId) {
  var project = document.querySelector('#' + projId);

  if (project) {
    project.style.boxShadow = "3px 3px 5px #999";
    project.style.backgroundColor = "#f0f0f0";

    var projImg = project.querySelector(".mainImage");
    var projDetails = project.querySelector(".details");
    if (projImg && projDetails) {
      projImg.style.width = projImg.naturalWidth + "px";
      projImg.style.height = "200px";
      projDetails.style.height = "0px";
    }
  }
};

//React
FilterForm = function FilterForm(props) {
  var langs = props.languages.map(function (lang) {
    return React.createElement(
      'p',
      null,
      React.createElement('input', { type: 'checkbox', name: 'languages', value: lang }),
      lang
    );
  });
  var skills = props.skills.map(function (skill) {
    return React.createElement(
      'p',
      null,
      React.createElement('input', { type: 'checkbox', name: 'skills', value: skill }),
      skill
    );
  });

  var submit = function submit(e) {
    return getProjects($("#filtersForm").serialize(), e);
  };

  return React.createElement(
    'form',
    { id: 'filtersForm', name: 'filtersForm',
      onSubmit: submit,
      action: '/projects',
      method: 'GET'
    },
    React.createElement(
      'p',
      null,
      React.createElement('input', { type: 'checkbox', name: 'featured', value: 'true' }),
      'Only featured projects'
    ),
    React.createElement(
      'label',
      { htmlFor: 'languages' },
      'Languages:'
    ),
    langs,
    React.createElement(
      'label',
      { htmlFor: 'skills' },
      'Other Skills:'
    ),
    React.createElement(
      'p',
      null,
      React.createElement('input', { type: 'checkbox', name: 'skills', value: 'None' }),
      'None'
    ),
    skills,
    React.createElement('input', { type: 'submit', value: 'Filter' })
  );
};

var Project = function Project(props) {
  var project = props.project;
  var genList = function genList(label, arr, emptyMsg) {
    if (!arr || arr.length == 0) {
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

  //content
  var projId = 'proj-' + project.name.short;
  //const style = {cursor: 'pointer'};
  var style = props.style ? props.style : {};
  style.cursor = 'pointer';
  var img = '/assets/img/' + project.images.small;
  var languages = genList('Languages', project.languages, 'N/A');
  var details = [];
  var name = project.name;

  var start = project.startDate;
  var end = project.endDate;
  details.push(genList('Skills', project.skills, "None"));
  details.push(genList('Teammates', project.teammates, "Individual Project"));

  var onClick = function onClick() {
    return goToProject(project);
  };
  var onHover = function onHover() {
    return onProjectHover(projId);
  };
  var onOut = function onOut() {
    return onProjectOut(projId);
  };

  return React.createElement(
    'div',
    { id: projId, className: 'project contentItem', style: style, onClick: onClick, onMouseOver: onHover, onMouseOut: onOut },
    React.createElement('img', { className: 'mainImage', src: img, alt: 'A screen-shot from the project.', title: '' }),
    React.createElement(
      'h2',
      null,
      React.createElement('a', { href: name.short }),
      React.createElement(
        'span',
        { 'class': 'plainTitle' },
        name.full
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
      ' ',
      start.month,
      ' ',
      start.year,
      '-',
      end.month,
      ' ',
      end.year
    ),
    languages,
    React.createElement(
      'div',
      { className: 'details' },
      details
    )
  );
};

Projects = function Projects(props) {
  var projects = props.projects.map(function (proj, index) {
    var float = { float: index % 2 ? 'right' : 'left' };
    return React.createElement(Project, { project: proj, style: float });
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
  getFilters();
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
