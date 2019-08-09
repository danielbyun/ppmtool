package org.danielbyun.ppmtool.repository;

import org.danielbyun.ppmtool.model.ProjectTask;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProjectTaskRepository extends JpaRepository<ProjectTask, Long> {
}
