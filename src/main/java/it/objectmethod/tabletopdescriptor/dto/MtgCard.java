package it.objectmethod.tabletopdescriptor.dto;

import com.fasterxml.jackson.annotation.JsonInclude;
import com.fasterxml.jackson.annotation.JsonInclude.Include;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
// @JsonInclude(content = Include.NON_NULL)
public class MtgCard {

	@JsonProperty("CardID")
	@JsonInclude(value = Include.NON_NULL)
	private Long cardId;
	@JsonProperty("Name")
	@JsonInclude(value = Include.NON_NULL)
	private String name;
	@JsonProperty("Nickname")
	@JsonInclude(value = Include.NON_NULL)
	private String nickName;
	@JsonProperty("Description")
	@JsonInclude(value = Include.NON_NULL)
	private String description;
	@JsonProperty("Transform")
	@JsonInclude(value = Include.NON_NULL)
	private MtgTransform transform;
}
