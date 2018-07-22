// Method stubs
let FilterForm = {};
let Projects = {};

//AJAX
const getProjects = (data,e) => {
  if(e){
    e.preventDefault();
  }
  sendAjax('GET','/projects',data,function(result){
    const elem = document.querySelector('#projectList');
    ReactDOM.render(<Projects projects={result.projects} />,elem);
  });
  return false;
};

const getFilters = () => {
  return sendAjax('GET','/filters',null,function(result){
    const elem = document.querySelector('#filters');
    ReactDOM.render(<FilterForm languages={result.languages} skills={result.skills} />,elem);
    const checkboxes = document.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(function(checkbox){
      checkbox.checked = true;
    });
  });
}

const getFeatured = () => getProjects('featured=true',null);

//Events
const goToProject = (proj) => {
  const loc = window.location;
  const newURL = `${loc.protocol}//${loc.host}/project/${proj.name.short}`;
  window.location.href = newURL;
  
  return false;
};

//Changes the style of a project as it is hovered over.
const onProjectHover = function(projId){
  const project = document.querySelector(`#${projId}`);
  
  if(project){
    project.style.boxShadow = "2px 2px 5px #aaa";
    project.style.backgroundColor = "#e0e0ef";
    
    const projImg = project.querySelector(".mainImage");
    const projDetails = project.querySelector(".details");
    if(projImg && projDetails){
    	projImg.style.width = projImg.naturalWidth+"px";
    	projImg.style.height = "0px";
    	projDetails.style.height = "200px";
    }
  }
};

//Restores the style of the project to its default.
const onProjectOut = function(projId){
  const project = document.querySelector(`#${projId}`);
  
  if(project){
    project.style.boxShadow = "3px 3px 5px #999";
    project.style.backgroundColor = "#f0f0f0";
    
    const projImg = project.querySelector(".mainImage");
    const projDetails = project.querySelector(".details");
    if(projImg && projDetails){
      projImg.style.width = projImg.naturalWidth+"px";
      projImg.style.height = "200px";
      projDetails.style.height = "0px";
    }
  }
};

//React
FilterForm = (props) => {
  const langs = props.languages.map((lang) => {
    return (<p><input type="checkbox" name="languages" value={lang}/>{lang}</p>);
  });
  const skills = props.skills.map((skill) => {
    return (<p><input type="checkbox" name="skills" value={skill}/>{skill}</p>);
  });
  
  const submit = (e) => getProjects($("#filtersForm").serialize(),e);
  
  return (
    <form id="filtersForm" name="filtersForm"
      onSubmit={submit}
      action='/projects'
      method='GET'
      >
      <p><input type="checkbox" name="featured" value="true"/>Only featured projects</p>
      <label htmlFor="languages">Languages:</label>
      {langs}
      <label htmlFor="skills">Other Skills:</label>
      <p><input type="checkbox" name="skills" value="None"/>None</p>
      {skills}
      <input type="submit" value="Filter" />
    </form>
  );
}

const Project = (props) => {
  const project = props.project;
  const genList = (label,arr,emptyMsg) => {
    if(!arr || arr.length == 0){
      return (<p><b>{label}:</b> {emptyMsg}</p>);
    }
    const list = arr.map((str) => _.unescape(str));
    const listStr = list.join(', ');
    return (<p><b>{label}:</b> {listStr}</p>);
  };
  
  //content
  const projId = `proj-${project.name.short}`;
  //const style = {cursor: 'pointer'};
  let style = (props.style)?props.style:{};
  style.cursor = 'pointer';
  const img = `/assets/img/${project.images.small}`;
  let languages = genList('Languages',project.languages,'N/A');
  let details = [];
  const {name} = project;
  const start = project.startDate;
  const end = project.endDate;
  details.push(genList('Skills',project.skills,"None"));
  details.push(genList('Teammates',project.teammates,"Individual Project"));
  
  
  const onClick = () => goToProject(project);
  const onHover = () => onProjectHover(projId);
  const onOut = () => onProjectOut(projId);
  
  return (
    <div id={projId} className="project contentItem" style={style} onClick={onClick} onMouseOver={onHover} onMouseOut={onOut}>
      <img className="mainImage" src={img} alt="A screen-shot from the project." title="" />
      <h2><a href={name.short}></a><span class="plainTitle">{name.full}</span></h2>
      <p><b>Time:</b> {start.month} {start.year}-{end.month} {end.year}</p>
      {languages}
      <div className="details">
        {details}
      </div>
    </div>
  );
};

Projects = (props) => {
  const projects = props.projects.map((proj,index) => {
    let float = { float: ((index%2)?'right':'left')}
    return (<Project project={proj} style={float}/>);
  });
  return (
    <div>
      {projects}
    </div>
  );  
};

//Setup
const setup = function(){
  getFeatured();
  getFilters();
};
      
window.onload = setup;