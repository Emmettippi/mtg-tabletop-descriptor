package it.objectmethod.tabletopdescriptor.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
// @JsonInclude(content = Include.NON_NULL)
public class MtgUrlCard {

	@JsonProperty("FaceURL")
	private String faceUrl;
	@JsonProperty("BackURL")
	private String backUrl;
	@JsonProperty("NumHeight")
	private Long numHeigth;
	@JsonProperty("NumWidth")
	private Long numWidth;
	@JsonProperty("BackIsHidden")
	private Boolean backIsHidden;
}
