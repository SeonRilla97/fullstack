package seon.full.mallapi.Service;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import seon.full.mallapi.domain.Todo;
import seon.full.mallapi.dto.PageRequestDTO;
import seon.full.mallapi.dto.PageResponseDTO;
import seon.full.mallapi.dto.TodoDTO;
import seon.full.mallapi.repository.TodoRepository;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@Slf4j
@Transactional
@RequiredArgsConstructor
public class TodoServiceImpl implements TodoService{
    private final ModelMapper modelMapper;
    private final TodoRepository todoRepository;

    @Override
    public Long register(TodoDTO todoDTO) {
        log.info("........");

        Todo todo = modelMapper.map(todoDTO, Todo.class);
        Todo savedTodo = todoRepository.save(todo);

        return savedTodo.getTno();
    }

    @Override
    public TodoDTO get(Long tno) {
        Optional<Todo> todoOptional = todoRepository.findById(tno);

        Todo todo = todoOptional.orElseThrow();
        return modelMapper.map(todo, TodoDTO.class);
    }

    @Override
    public void modify(TodoDTO todoDTO) {
        Optional<Todo> todoOptional = todoRepository.findById(todoDTO.getTno());
        Todo todo = todoOptional.orElseThrow();

        todo.changeDueDate(todoDTO.getDueDate());
        todo.changeComplete(todoDTO.isComplete());
        todo.changeTitle(todoDTO.getTitle());

        todoRepository.save(todo);
    }

    @Override
    public void delete(Long tno) {
         todoRepository.deleteById(tno);
    }

    @Override
    public PageResponseDTO<TodoDTO> list(PageRequestDTO pageRequestDTO) {
        //Pageable 선언
        Pageable pageable = PageRequest.of(
                pageRequestDTO.getPage(),
                pageRequestDTO.getSize(),
                Sort.by("tno").descending());

        //조회
        Page<Todo> result = todoRepository.findAll(pageable);

        //todo List 생성
        List<TodoDTO> dtoList = result.getContent().stream()
                .map(todo -> modelMapper.map(todo, TodoDTO.class))
                .collect(Collectors.toList());

        long totalCount = result.getTotalElements();

        PageResponseDTO<TodoDTO> responseDTO = PageResponseDTO.<TodoDTO>withAll()
                .dtoList(dtoList)
                .pageRequestDTO(pageRequestDTO)
                .totalCount(totalCount)
                .build();

        return responseDTO;

    }
}
