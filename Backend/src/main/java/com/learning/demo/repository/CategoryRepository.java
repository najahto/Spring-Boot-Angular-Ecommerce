package com.learning.demo.repository;

import com.learning.demo.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel ="category",path ="categories" )
public interface CategoryRepository extends JpaRepository<Category,Long> {

}
