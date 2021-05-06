package it.objectmethod.tabletopdescriptor.dto;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
@JsonIgnoreProperties(value = { "fileName" }, allowSetters = true)
public class MtgContainer {

	private String fileName;

	@JsonProperty("ObjectStates")
	private List<MtgDeck> objectStates;
}
