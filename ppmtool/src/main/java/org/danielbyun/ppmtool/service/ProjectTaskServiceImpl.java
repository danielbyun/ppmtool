package org.danielbyun.ppmtool.service;

import lombok.extern.slf4j.Slf4j;
import org.danielbyun.ppmtool.model.Backlog;
import org.danielbyun.ppmtool.model.ProjectTask;
import org.danielbyun.ppmtool.repository.BacklogRepository;
import org.danielbyun.ppmtool.repository.ProjectRepository;
import org.danielbyun.ppmtool.repository.ProjectTaskRepository;
import org.springframework.stereotype.Service;

@Slf4j
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
    public ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask) {
        //Exceptions: Project not found

        //PTs to be added to a specific project, project != null, BL exists
        Backlog backlog = backlogRepository.findByProjectIdentifier(projectIdentifier);
        //set the bl to pt
        projectTask.setBacklog(backlog);
        //we want our project sequence to be like this: IDPRO-1  IDPRO-2  ...100 101
        Integer BacklogSequence = backlog.getPTSequence();
        // Update the BL SEQUENCE
        BacklogSequence++;

        backlog.setPTSequence(BacklogSequence);

        //Add Sequence to Project Task
        projectTask.setProjectSequence(projectIdentifier + "-" + BacklogSequence);
        projectTask.setProjectIdentifier(projectIdentifier);

        log.info("ProjectTask: " + projectTask);

        //INITIAL status when status is null
        if (projectTask.getStatus() == "" || projectTask.getStatus() == null) {
            projectTask.setStatus("TO_DO");
        }
        //INITIAL priority when priority null
        // in the future we need projectTask.getPriority() == 0 to handle the form
        if (projectTask.getPriority() == null) {
            projectTask.setPriority(3);
        }

        return projectTaskRepository.save(projectTask);
    }

    @Override
    public Iterable<ProjectTask> findBacklogById(String backlog_id) {
        return projectTaskRepository.findByProjectIdentifierOrderByPriority(backlog_id);
    }
}
