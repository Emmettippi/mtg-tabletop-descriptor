package it.objectmethod.tabletopdescriptor.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.Data;

@Data
// @JsonInclude(content = Include.NON_NULL)
public class MtgTransform {

	@JsonProperty("posX")
	private Double posX;
	@JsonProperty("posY")
	private Double posY;
	@JsonProperty("posZ")
	private Double posZ;
	@JsonProperty("rotX")
	private Double rotX;
	@JsonProperty("rotY")
	private Double rotY;
	@JsonProperty("rotZ")
	private Double rotZ;
	@JsonProperty("scaleX")
	private Double scaleX;
	@JsonProperty("scaleY")
	private Double scaleY;
	@JsonProperty("scaleZ")
	private Double scaleZ;
}
