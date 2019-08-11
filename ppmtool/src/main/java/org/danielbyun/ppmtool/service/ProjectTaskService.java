package org.danielbyun.ppmtool.service;

import org.danielbyun.ppmtool.model.ProjectTask;

public interface ProjectTaskService {
    ProjectTask addProjectTask(String projectIdentifier, ProjectTask projectTask);
    Iterable<ProjectTask> findBacklogById(String backlog_id);
    ProjectTask findPTBYProjectSequence(String backlog_id, String pt_id);
}
