package com.iseplive.api.dao.student;

import com.iseplive.api.entity.user.Role;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

/**
 * Created by Guillaume on 08/08/2017.
 * back
 */
@Repository
public interface RoleRepository extends CrudRepository<Role, Long> {
}
