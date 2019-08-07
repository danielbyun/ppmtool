package org.danielbyun.ppmtool.service;

import org.danielbyun.ppmtool.model.Project;

public interface ProjectService {
    Project saveOrUpdate(Project project);
}
