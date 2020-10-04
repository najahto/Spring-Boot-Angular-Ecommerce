package com.learning.demo.repository;

import com.learning.demo.entity.Country;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.rest.core.annotation.RepositoryRestResource;
import org.springframework.web.bind.annotation.CrossOrigin;

@CrossOrigin
@RepositoryRestResource(collectionResourceRel ="countries",path ="countries" )
public interface CountryRepository extends JpaRepository<Country,Integer> {
}
