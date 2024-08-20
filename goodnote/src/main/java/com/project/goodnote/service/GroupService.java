package com.project.goodnote.service;

import com.project.goodnote.entity.Group;
import com.project.goodnote.repo.GroupRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

// GroupService.java
@Service
public class GroupService {
    @Autowired
    private GroupRepository groupRepository;

//    public Group getGroupById(long id){
//       return groupRepository.getById(id);
//    }
    public List<Group> getAllGroups() {
        return groupRepository.findAll();
    }

    public Group createGroup(Group group) {
        return groupRepository.save(group);
    }

    public void deleteGroupById(Long id){
        groupRepository.deleteById(id);
    }

    public Group updateGroup(Long groupId, Group group){
        Group group1 = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Cannot find group id"));

        group1.setName(group.getName());
        groupRepository.save(group1);
        return group1;
    }
}
