package com.iseplive.api.entity.dor;

import javax.persistence.Entity;
import javax.persistence.Id;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class QuestionDor {
    @Id
    private Long id;
    private Integer position;
    private String title;

    private Boolean enableEvent;
    private Boolean enableClub;
    private Boolean enableStudent;
    private Boolean enableEmployee;
    private Boolean enableParty;
    private Integer promo;
}
