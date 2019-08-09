package org.danielbyun.ppmtool.service;

import org.danielbyun.ppmtool.model.ProjectTask;
import org.danielbyun.ppmtool.repository.BacklogRepository;
import org.danielbyun.ppmtool.repository.ProjectRepository;
import org.danielbyun.ppmtool.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;

@Service
public class ProjectTaskServiceImpl implements ProjectTaskService {
    private final BacklogRepository backlogRepository;
    private final ProjectTaskRepository projectTaskRepository;

    public ProjectTaskServiceImpl(BacklogRepository backlogRepository, ProjectRepository projectRepository,
                                  ProjectTaskRepository projectTaskRepository) {
        this.backlogRepository = backlogRepository;
        this.projectTaskRepository = projectTaskRepository;
    }


    @Override
    public ProjectTask addProjectTask() {
        // PTS to be added to a specific project, project != null, BL exists
        // set the BL to PT
        // we want our project sequence to be like this IDPRO-1, IDPRO-2
        // update the BL sequence

        // INITIAL priority when priority is null
        // INITIAL status when status is null

        return null;
    }
}
