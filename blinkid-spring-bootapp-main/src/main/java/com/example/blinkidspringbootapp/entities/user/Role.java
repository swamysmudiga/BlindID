package com.example.blinkidspringbootapp.entities.user;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;


@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "roles")
public class Role {


    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Id
    private long id;

    private ERole name;

    public Role(ERole name) {
        this.name = name;
    }

}
