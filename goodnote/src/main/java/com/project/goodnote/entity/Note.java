package com.project.goodnote.entity;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.project.goodnote.entity.Group;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

// Note.java
@Getter
@Setter
@Entity
@Table(name = "user_note")
public class Note {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String content;
    private LocalDateTime createdAt;

    @JsonBackReference // Prevents infinite recursion by referring back to the group entity
    @ManyToOne
    @JoinColumn(name = "group_id")
    private Group group;

}