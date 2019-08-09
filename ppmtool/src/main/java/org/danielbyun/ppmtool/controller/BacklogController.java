package org.danielbyun.ppmtool.controller;

import lombok.extern.slf4j.Slf4j;
import org.danielbyun.ppmtool.model.ProjectTask;
import org.danielbyun.ppmtool.service.MapValidationErrorService;
import org.danielbyun.ppmtool.service.ProjectTaskService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Slf4j
@RestController
@RequestMapping("/api/backlog")
@CrossOrigin
public class BacklogController {
    private final ProjectTaskService projectTaskService;
    private final MapValidationErrorService mapValidationErrorService;

    public BacklogController(ProjectTaskService projectTaskService,
                             MapValidationErrorService mapValidationErrorService) {
        this.projectTaskService = projectTaskService;
        this.mapValidationErrorService = mapValidationErrorService;
    }

    @PostMapping("/{backlog_id}")
    public ResponseEntity<?> addProjectTaskToBacklog(@Valid @RequestBody ProjectTask projectTask,
                                                     BindingResult result, @PathVariable String backlog_id) {
        ResponseEntity<?> errorMap = mapValidationErrorService.MapValidationService(result);

        if (errorMap != null) {
            return errorMap;
        }
        log.info("new project: " + projectTask.toString());
        projectTaskService.addProjectTask(backlog_id, projectTask);

        return new ResponseEntity<>(projectTask, HttpStatus.CREATED);
    }

    @GetMapping("/{backlog_id}")
    public Iterable<ProjectTask> getProjectBacklog(@PathVariable String backlog_id) {
        return projectTaskService.findBacklogById(backlog_id);
    }
}