package it.objectmethod.tabletopdescriptor.dto;

import java.util.List;
import java.util.Map;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
public class MtgDeck extends MtgCard {

	@JsonProperty("Name")
	@JsonInclude(value = Include.NON_NULL)
	private String name;
	@JsonProperty("ContainedObjects")
	@JsonInclude(value = Include.NON_NULL)
	private List<MtgCard> cards;
	@JsonProperty("DeckIDs")
	@JsonInclude(value = Include.NON_NULL)
	private List<Long> ids;
	@JsonProperty("CustomDeck")
	@JsonInclude(value = Include.NON_NULL)
	private Map<String, MtgUrlCard> urlMapCard;
	@JsonProperty("Transform")
	@JsonInclude(value = Include.NON_NULL)
	private MtgTransform transform;
}
