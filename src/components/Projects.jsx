import React from "react";
export default function Projects({ projects, helpers }) {
  const { Icon, Tags, ActionLink, SectionHead } = helpers;

  return (
    <section id="projects">
      <SectionHead title="Projects">Live deployments, source code, and project stories presented with a clear recruiter-friendly view.</SectionHead>
      <div className="project-grid">
        {projects.map((project) => (
          <article className={`project project-${project.visual} tone-${project.tone}`} data-reveal key={project.title}>
            <div className="project-art" aria-hidden="true">
              <div className="project-orbit">
                <span />
                <span />
                <span />
              </div>
              <div className="project-icon">
                <Icon name={project.visual} />
              </div>
              <div className="project-preview">
                <span />
                <span />
                <span />
              </div>
            </div>
            <div className="project-body">
              <span className="project-type">{project.type}</span>
              <h3>{project.title}</h3>
              <p>{project.text}</p>
              {project.role && <p className="project-role"><strong>My role:</strong> {project.role}</p>}
              {project.highlights && (
                <div className="project-highlights">
                  {project.highlights.map((item) => <span key={`${project.title}-${item}`}>{item}</span>)}
                </div>
              )}
              <Tags items={project.tags} />
              {project.actions && (
                <div className="action-row">
                  {project.actions.map((action) => <ActionLink {...action} key={`${project.title}-${action.label}`} />)}
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
