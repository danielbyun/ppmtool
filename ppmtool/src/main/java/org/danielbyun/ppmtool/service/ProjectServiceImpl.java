package org.danielbyun.ppmtool.service;

import lombok.extern.slf4j.Slf4j;
import org.danielbyun.ppmtool.model.Project;
import org.danielbyun.ppmtool.repository.ProjectRepository;
import org.springframework.stereotype.Service;

@Slf4j
@Service
public class ProjectServiceImpl implements ProjectService {
    private final ProjectRepository projectRepository;

    public ProjectServiceImpl(ProjectRepository projectRepository) {
        this.projectRepository = projectRepository;
    }

    @Override
    public Project saveOrUpdate(Project project) {
        return projectRepository.save(project);
    }
}
