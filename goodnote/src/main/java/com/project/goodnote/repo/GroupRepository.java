package com.project.goodnote.repo;

import com.project.goodnote.entity.Group;
import org.springframework.data.jpa.repository.JpaRepository;

// GroupRepository.java
public interface GroupRepository extends JpaRepository<Group, Long> {}