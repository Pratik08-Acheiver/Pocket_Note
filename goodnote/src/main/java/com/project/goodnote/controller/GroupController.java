package com.project.goodnote.controller;

import com.project.goodnote.entity.Group;
import com.project.goodnote.entity.Note;
import com.project.goodnote.service.GroupService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.Comparator;
import java.util.List;
import java.util.stream.Collectors;

// GroupController.java
@RestController
@RequestMapping("/api")
public class GroupController {
    @Autowired
    private GroupService groupService;

    @GetMapping("/groups/getAllGroup")
    public List<Group> getGroups() {
        List<Group> groups = groupService.getAllGroups();
        return groups.stream()
                .sorted((a,b)->  Long.compare(b.getId(),a.getId()))
                .collect(Collectors.toList());
    }

    @PostMapping("/groups/createGroup")
    public Group createGroup(@RequestBody Group group) {
        System.out.println(group.getId()+", "+group.getColor()+", "+group.getName() );
        return groupService.createGroup(group);
    }

    @DeleteMapping("/group/{id}")
    public void deleteGroup(@PathVariable Long id){
        if(id!=0){
            groupService.deleteGroupById(id);
        }
    }

    @PutMapping("/updategroup")
    public Group updateGroup(@RequestParam Long groupId, @RequestBody Group group){
        return groupService.updateGroup(groupId,group);
    }
}
