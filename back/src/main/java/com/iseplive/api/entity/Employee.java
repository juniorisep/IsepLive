package com.iseplive.api.entity;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class Employee {
    @Id
    private Long id;
    private String firstname;
    private String lastname;
}
