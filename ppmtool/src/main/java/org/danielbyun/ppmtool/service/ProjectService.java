package org.danielbyun.ppmtool.service;

import org.danielbyun.ppmtool.model.Project;

import java.util.List;

public interface ProjectService {
    Project saveOrUpdate(Project project, String username);
    Project findByProjectIdentifier(String projectIdentifier);
    List<Project> findAllProjects();
    void deleteProjectByIdentifier(String projectIdentifier);
}
