import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Message from "../layouts/Message";
import Container from "../layouts/Container";
import Loading from "../layouts/Loading";
import LinkButton from "../layouts/LinkButton";
import styles from "./Projects.module.css";
import ProjectCard from "../projects/ProjectCard";

function Projects() {
  const [projects, setProjects] = useState([]);
  const [removeLoading, setRemoveLoading] = useState(false);

  const location = useLocation();
  let message = "";
  if (location.state) {
    message = location.state.message;
  }

  useEffect(() => {
    setTimeout(() => {
      fetch("http://localhost:5000/projects", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((resp) => resp.json())
        .then((data) => {
          setProjects(data);
          setRemoveLoading(true);
        })
        .catch((err) => console.log(err));
    }, 500);
  }, []);

  return (
    <div className={styles.project_container}>
      <div className={styles.title_container}>
        <h1>Meus Projetos</h1>
        <LinkButton to="/NewProject" text="Criar Projeto" />
      </div>
      {message && <Message type="success" msg={message} />}
      <Container customClass="start">
        {projects.length > 0 &&
          projects.map((project) => (
            <ProjectCard
              name={project.name}
              id={project.id}
              budget={parseFloat(project.budget).toLocaleString("pt-BR")}
              category={project.category.name}
              key={project.id}
            />
          ))}
        {!removeLoading && <Loading />}
        {!removeLoading && projects.length === 0 &&(
          <p>Nao há projetos cadastrados!</p>
        )}
      </Container>
    </div>
  );
}

export default Projects;
