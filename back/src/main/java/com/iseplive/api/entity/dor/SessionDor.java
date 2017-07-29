package com.iseplive.api.entity.dor;

import javax.persistence.Entity;
import javax.persistence.Id;
import java.util.Date;

/**
 * Created by Guillaume on 28/07/2017.
 * back
 */
@Entity
public class SessionDor {
    @Id
    private Long id;
    private Date firstTurn;
    private Date secondTurn;
    private Date result;
    private Boolean enabled;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getFirstTurn() {
        return firstTurn;
    }

    public void setFirstTurn(Date firstTurn) {
        this.firstTurn = firstTurn;
    }

    public Date getSecondTurn() {
        return secondTurn;
    }

    public void setSecondTurn(Date secondTurn) {
        this.secondTurn = secondTurn;
    }

    public Date getResult() {
        return result;
    }

    public void setResult(Date result) {
        this.result = result;
    }

    public Boolean getEnabled() {
        return enabled;
    }

    public void setEnabled(Boolean enabled) {
        this.enabled = enabled;
    }
}
