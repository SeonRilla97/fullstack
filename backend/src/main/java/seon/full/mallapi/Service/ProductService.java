package seon.full.mallapi.Service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seon.full.mallapi.dto.PageRequestDTO;
import seon.full.mallapi.dto.PageResponseDTO;
import seon.full.mallapi.dto.ProductDTO;

@Transactional
public interface ProductService {
    PageResponseDTO<ProductDTO> getList(PageRequestDTO pageRequestDTO);
}
