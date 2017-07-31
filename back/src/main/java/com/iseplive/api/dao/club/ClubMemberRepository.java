package com.iseplive.api.dao.club;

import com.iseplive.api.entity.club.ClubMember;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 30/07/2017.
 * back
 */
@Repository
public interface ClubMemberRepository extends CrudRepository<ClubMember, Long> {
}
