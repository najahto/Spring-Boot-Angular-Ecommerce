package com.learning.demo.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity
public class State {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;

    private String name;

    @ManyToOne
    @JoinColumn(name="countrey_id")
     private Country country;
}
