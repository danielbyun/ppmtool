package org.danielbyun.ppmtool.service;

import lombok.extern.slf4j.Slf4j;
import org.danielbyun.ppmtool.exception.ProjectIDException;
import org.danielbyun.ppmtool.model.Backlog;
import org.danielbyun.ppmtool.model.Project;
import org.danielbyun.ppmtool.repository.BacklogRepository;
import org.danielbyun.ppmtool.repository.ProjectRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Slf4j
@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;
    private final BacklogRepository backlogRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository, BacklogRepository backlogRepository) {
        this.projectRepository = projectRepository;
        this.backlogRepository = backlogRepository;
    }

    @Override
    public Project saveOrUpdate(Project project) {
        String identifier = project.getProjectIdentifier().toUpperCase();
        try {
            project.setProjectIdentifier(identifier);

            // on save, the ID will be null.
            // on update the ID will not be null
            if (project.getId() == null) {
                // create backlog on save only
                Backlog backlog = new Backlog();
                project.setBacklog(backlog);
                backlog.setProject(project);
                backlog.setProjectIdentifier(identifier);
            } else if (project.getId() != null) { // updating
                project.setBacklog(backlogRepository.findByProjectIdentifier(identifier));
            }

            return projectRepository.save(project);
        } catch (Exception e) {
            throw new ProjectIDException("Project ID: " + project.getProjectIdentifier().toUpperCase() + " already " +
                    "exists");
        }
    }

    @Override
    public Project findByProjectIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier);

        if (project == null) {
            throw new ProjectIDException("Project ID: " + projectIdentifier + " does not exist");
        }

        return project;
    }

    @Override
    public List<Project> findAllProjects() {
        return projectRepository.findAll();
    }

    @Override
    public void deleteProjectByIdentifier(String projectIdentifier) {
        Project project = projectRepository.findByProjectIdentifier(projectIdentifier.toUpperCase());

        if (project == null) {
            throw new ProjectIDException("Cannot delete Project with ID: '" + projectIdentifier + "'. This project " +
                    "does not exist");
        }

        projectRepository.delete(project);
    }
}
