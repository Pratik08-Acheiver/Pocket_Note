package com.project.goodnote.repo;

import com.project.goodnote.entity.Note;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

// NoteRepository.java
public interface NoteRepository extends JpaRepository<Note, Long> {
    List<Note> findByGroupId(Long groupId);
}