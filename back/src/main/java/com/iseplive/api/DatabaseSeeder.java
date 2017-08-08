package com.iseplive.api;

import com.iseplive.api.entity.*;
import com.iseplive.api.dao.student.*;
import com.iseplive.api.dao.club.*;
import com.iseplive.api.dao.event.*;
import com.iseplive.api.dao.media.*;
import com.iseplive.api.dao.poll.*;
import com.iseplive.api.dao.post.*;
import com.iseplive.api.entity.user.Student;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.lang.reflect.Array;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

@Service
public class DatabaseSeeder {

    @Autowired
    private StudentRepository StudentRepository;

    @Autowired
    private ClubRepository ClubRepository;

    @Autowired
    private EventRepository EventRepository;

    @Autowired
    private MediaRepository MediaRepository;

    @Autowired
    private PollRepository PollRepository;

    @Autowired
    private PostRepository PostRepository;

    public void seedDatabase() {
        if (isDatabaseSeeded()) {
            System.out.println("Database is already seeded. Exiting seeder.");
            return;
        }

        runSeedDatabase();

        System.out.println("Database successfully initialized ! Exiting seeder \uD83D\uDC4D");
    }

    private boolean isDatabaseSeeded() {
        Student user = StudentRepository.findOne(1L);
        // if it's found, the database is already seeded
        return user != null;
    }
    private void runSeedDatabase() {
        // TODO
    }
}
