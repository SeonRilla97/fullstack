package seon.full.mallapi.controller;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;
import seon.full.mallapi.dto.ProductDTO;
import seon.full.mallapi.util.CustomFileUtil;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@Slf4j
@RequestMapping("api/products")
public class ProductController {

    private final CustomFileUtil fileUtil;

    /**
     * 상품 등록 / POST
     */
    @PostMapping("/")
    public Map<String, String> register (ProductDTO productDTO) throws IOException {
        log.info("register: " + productDTO);

        List<MultipartFile> files = productDTO.getFiles();

        List<String> uploadFileNames = fileUtil.saveFiles(files);

        productDTO.setUploadFileNames(uploadFileNames);

        log.info("Upload FIle Name : " + uploadFileNames);

        return Map.of("RESULT", "SUCCESS");
    }
}
