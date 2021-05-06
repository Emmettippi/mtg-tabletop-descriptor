package it.objectmethod.tabletopdescriptor.service;

import java.io.File;
import java.io.FileWriter;
import java.io.IOException;

import org.springframework.stereotype.Service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;

import it.objectmethod.tabletopdescriptor.dto.MtgContainer;

@Service
public class MtgService {

	ObjectMapper mapper = new ObjectMapper();

	public MtgContainer saveTableTopFile(MtgContainer obj) throws JsonProcessingException, IOException {
		File dirFile = new File("./output");
		File f = new File("./output/" + obj.getFileName());
		if (dirFile.isDirectory()) {
			dirFile.mkdirs();
		}
		if (f.createNewFile()) {
			FileWriter fw = new FileWriter(f);
			String jsonMtgObj = mapper.writeValueAsString(obj);
			fw.write(jsonMtgObj);
			fw.close();
		}

		return obj;
	}
}
