/* eslint-disable react/prop-types */
import React from "react";

const ProjectView = ({ project }) => {
  return (
    <div>
      <h3>{project.projectName}</h3>
      <p><strong>Technology Used:</strong> {project.technologyUse}</p>
      <p><strong>Short Description:</strong> {project.shortDes}</p>
      <p><strong>Description:</strong> {project.Des}</p>
      <p><strong>Image Link:</strong> <a href={project.image}>{project.image}</a></p>
      <p><strong>Notes:</strong> {project.notes}</p>
      <div>
        <h4>All Pages</h4>
        <ul>
          {project.allPage.map((page, index) => (
            <li key={index}>{page}</li>
          ))}
        </ul>
      </div>
      <div>
        <h4>All Features</h4>
        <ul>
          {project.allFeature.map((feature, index) => (
            <li key={index}>{feature}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ProjectView;
