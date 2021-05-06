package it.objectmethod.tatami.controller;

import java.io.IOException;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.fasterxml.jackson.core.JsonProcessingException;

import it.objectmethod.tatami.dto.MtgContainer;
import it.objectmethod.tatami.service.MtgService;

@RestController
@RequestMapping("/api/mtg")
public class MtgController {

	@Autowired
	private MtgService mtgService;

	@PostMapping("/save-tabletop-json")
	public MtgContainer saveTableTopFile(@Validated @RequestBody MtgContainer obj)
		throws JsonProcessingException, IOException {
		return this.mtgService.saveTableTopFile(obj);
	}
}
