package seon.full.mallapi.util;


import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Component
@RequiredArgsConstructor
@Slf4j
public class CustomFileUtil {

    @Value("${org.zerock.upload.path}")
    private String uploadPath;

    @PostConstruct
    public void init() {
        File tempFolder = new File(uploadPath);

        if(tempFolder.exists() == false) {
            tempFolder.mkdir();
        }

         uploadPath= tempFolder.getAbsolutePath();
        log.info("===========================");
        log.info(uploadPath);
    }

    public List<String> saveFiles(List<MultipartFile> files) throws IOException {
        if(files == null || files.size() ==0) {
            return List.of();
        }

        List<String> uploadNames = new ArrayList<>();

        for (MultipartFile multipartFile : files) {
            String savedName = UUID.randomUUID().toString() + "_" + multipartFile.getOriginalFilename();


            Path savepath = Paths.get(uploadPath, savedName);

            try {
                Files.copy(multipartFile.getInputStream(), savepath);

                String contentType = multipartFile.getContentType();

                
                if(contentType != null && contentType.startsWith("image")){
                    //이미지 일 경우, 썸네일로 제작 (용량 낮추기)
                    Path thumbnailPath = Paths.get(uploadPath, "s_" + savedName);

                    Thumbnails.of(savepath.toFile())
                            .size(200, 200)
                            .toFile(thumbnailPath.toFile());
                }
                uploadNames.add(savedName);
            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }
        return uploadNames;
    }
}
