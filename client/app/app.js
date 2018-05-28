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

//React
const Project = (props) => {
  const project = props.project;
  const genList = (label,arr,emptyMsg) => {
    if(!arr){
      return (<p><b>{label}:</b> {emptyMsg}</p>);
    }
    const list = arr.map((str) => _.unescape(str));
    const listStr = list.join(', ');
    return (<p><b>{label}:</b> {listStr}</p>);
  };
  
  //events
  const goToProject = () => {
    const loc = window.location;
    const newURL = `${loc.protocol}//${loc.host}/project/${project.name.short}`;
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
  const style = {cursor: 'pointer'};
  const img = `/assets/img/${project.images.small}`;
  let languages = genList('Languages',project.languages,'N/A');
  let details = [];
  details.push(genList('Skills',project.skills,"None"));
  details.push(genList('Teammates',project.teammates,"Individual Project"))

  
  return (
    <div className="project" style={style} onClick={goToProject}>
      <img className="mainImage" src={img} alt="A screen-shot from the project." title="" />
      <h2><a href="Latin_Square_Solver.html">Latin Square Solver</a><span class="plainTitle">Latin Square Solver</span></h2>
      <p><b>Time:</b> Feb 2017-Mar 2017</p>
      {languages}
      <div class="details">
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
const setup = () => {
  getFeatured();
};
      
window.onload = setup;