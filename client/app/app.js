// Method stubs
let Projects = {};

//AJAX
const getProjects = (data,e) => {
  if(e){
    e.preventDefault();
  }
  sendAjax('GET','/projects',data,function(result){
    console.dir(result);
    const content = document.querySelector('#mainContent');
    ReactDOM.render(<Projects projects={result.projects} />,content);
  });
  return false;
};

const getFeatured = () => getProjects('?featured=true',null);

//Events
const goToProject = (proj) => {
  const loc = window.location;
  const newURL = `${loc.protocol}//${loc.host}/project/${proj.name.short}`;
  console.log(newURL);
  window.location.href = newURL;
  console.dir(window);
  console.dir(window.location);
  
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
  const style = {cursor: 'pointer'};
  const img = `/assets/img/${project.images.small}`;
  let languages = genList('Languages',project.languages,'N/A');
  let details = [];
  details.push(genList('Skills',project.skills,"None"));
  details.push(genList('Teammates',project.teammates,"Individual Project"));
  
  const onClick = () => goToProject(project);
  const onHover = () => onProjectHover(projId);
  const onOut = () => onProjectOut(projId);
  
  return (
    <div id={projId} className="project" style={style} onClick={onClick} onMouseOver={onHover} onMouseOut={onOut}>
      <img className="mainImage" src={img} alt="A screen-shot from the project." title="" />
      <h2><a href="Latin_Square_Solver.html">Latin Square Solver</a><span class="plainTitle">Latin Square Solver</span></h2>
      <p><b>Time:</b> Feb 2017-Mar 2017</p>
      {languages}
      <div className="details">
        {details}
      </div>
    </div>
  );
};

Projects = (props) => {
  const projects = props.projects.map((proj) => (<Project project={proj} />));
  return (
    <div>
      {projects}
    </div>
  );  
};

//Setup
const setup = function(){
  getFeatured();
};
      
window.onload = setup;