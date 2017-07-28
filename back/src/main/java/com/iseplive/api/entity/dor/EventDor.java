package com.iseplive.api.entity.dor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class EventDor {
    @Id
    private Long id;
    private Date firstTurn;
    private Date secondTurn;
    private Date result;
    private Boolean enabled;

}
