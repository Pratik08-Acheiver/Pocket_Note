package com.project.goodnote.controller;


import com.project.goodnote.entity.Note;
import com.project.goodnote.service.NoteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;

// NoteController.java
@RestController
@RequestMapping("/api")
public class NoteController {
    @Autowired
    private NoteService noteService;

    @GetMapping("/notes/{groupId}")
    public List<Note> getNotesByGroup(@PathVariable Long groupId) {
        List<Note> notes = noteService.getNotesByGroupId(groupId);
        return notes.isEmpty() ? Collections.emptyList() : notes;
    }

    @PostMapping("/notes")
    public Note addNote(@RequestParam Long groupId, @RequestParam String content) {
        return noteService.addNoteToGroup(groupId, content);
    }
    @DeleteMapping("/note/{id}")
    public void deleteNode(@PathVariable Long id){
        noteService.deleteNoteById(id);
    }

    @PutMapping("/updatenote")
    public Note updateNote(@RequestParam Long noteId, @RequestBody Note note){
        System.out.println(noteId+", Note controller "+ note.toString());
        return noteService.updateNote(noteId,note);
    }

}

