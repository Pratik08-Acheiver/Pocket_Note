package com.project.goodnote.service;

import com.project.goodnote.entity.Group;
import com.project.goodnote.entity.Note;
import com.project.goodnote.repo.GroupRepository;
import com.project.goodnote.repo.NoteRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
// NoteService.java
public class NoteService {
    @Autowired
    private GroupRepository groupRepository;
    @Autowired
    NoteRepository noteRepository;

    public List<Note> getNotesByGroupId(Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));
        return group.getNotes();
    }

    public Note addNoteToGroup(Long groupId, String content) {
        Group group = groupRepository.findById(groupId).orElseThrow(() -> new RuntimeException("Group not found"));
        Note note = new Note();
        note.setContent(content);
        note.setCreatedAt(LocalDateTime.now());
        note.setGroup(group);
        group.getNotes().add(note);
        groupRepository.save(group);
        return note;
    }
    public void deleteNoteById(Long id){
        noteRepository.deleteById(id);
    }

    public Note updateNote(Long noteId, Note note){
       Note note1  = noteRepository.findById(noteId).orElseThrow(() -> new RuntimeException(("Note not found")));
        note1.setContent(note.getContent());
        noteRepository.save(note1);

        return note1;
    }
}
