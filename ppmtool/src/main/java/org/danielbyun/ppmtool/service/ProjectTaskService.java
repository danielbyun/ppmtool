package org.danielbyun.ppmtool.service;

import org.danielbyun.ppmtool.model.ProjectTask;

public interface ProjectTaskService {
    ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask);
}
