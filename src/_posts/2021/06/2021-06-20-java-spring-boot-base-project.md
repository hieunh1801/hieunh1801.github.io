---
# top: true
category: technology
tags:
    - java spring boot
date: 2021-06-20
title: Java Spring Boot CRUD Rest API Service - Base Project
---

Hướng dẫn phát triển hoàn thiện base project cho một dự án API cho backend

# Project Notebook part 1
<TOC />

## Khởi tạo dự án với  [start.spring.io](https://start.spring.io/)

## Cấu hình database và global app

```yaml
# Cổng của thiết bị
server.port=8080

# để none trong môi trường production
# tự động cập nhật lại model trong db cho phù hợp với cả model
# Tìm hiểu thêm các cấp độ auto trong JPA
spring.jpa.hibernate.ddl-auto=update

# database information
spring.datasource.url=jdbc:mysql://localhost:3306/notes_v1
spring.datasource.username=root
spring.datasource.password=123456aA@

# hiển thị lệnh sql khi truy vấn
spring.jpa.show-sql=true

# format lệnh sql khi truy vấn
spring.jpa.properties.hibernate.format_sql=true
```
## Cấu hình swagger

- Swagger: là documentation cho API, dùng để hiển thị input, output cho API
- Tại sao lại cần swagger: khi project càng lớn, ta chia team backend và frontend. Khi đó làm sao để diễn tả lại API cho frontend hiểu? thay vì ngồi viết document cho từng phần thì ta sử dụng swagger làm doc luôn

- Cấu hình swagger cho Java Spring Boot

### Bước 1: Tải dependency

```xml
<!-- FILE: pom.xml -->
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger2</artifactId>
    <version>2.9.2</version>
</dependency>
<dependency>
    <groupId>io.springfox</groupId>
    <artifactId>springfox-swagger-ui</artifactId>
    <version>2.9.2</version>
</dependency>
```

### Bước 2: Cấu hình thông số cho swagger

```java
// FILE: configs/Swagger2Config.java
package com.hieunh.note.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import springfox.documentation.builders.ApiInfoBuilder;
import springfox.documentation.builders.PathSelectors;
import springfox.documentation.builders.RequestHandlerSelectors;
import springfox.documentation.service.ApiInfo;
import springfox.documentation.service.Contact;
import springfox.documentation.spi.DocumentationType;
import springfox.documentation.spring.web.plugins.Docket;
import springfox.documentation.swagger2.annotations.EnableSwagger2;

@Configuration
@EnableSwagger2
public class Swagger2Config {
    @Bean
    public Docket api() {
        return new Docket(DocumentationType.SWAGGER_2).select()
                .apis(RequestHandlerSelectors.basePackage("com.hieunh.note.controller"))
                .paths(PathSelectors.regex("/.*"))
                .build()
                .apiInfo(apiEndPointsInfo());
    }

    private ApiInfo apiEndPointsInfo() {
        return new ApiInfoBuilder().title("Notes")
                .description("Notes Rest API")
                .contact(new Contact("hieunh", "", "hieunh1801@gmail.com"))
                .license("Apache 2.0")
                .licenseUrl("http://www.apache.org/licenses/LICENSE-2.0.html")
                .version("1.0.0")
                .build();
    }
}

```


## Cấu hình CORS

```java
// FILE configs/CorsConfiguration.java
@Configuration
public class CorsConfiguration 
{
    @Bean
    public WebMvcConfigurer corsConfigurer() 
    {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**").allowedOrigins("http://localhost:8080");
            }
        };
    }
}
```

## Cấu hình loombook
- Loombook là một thư viện giúp auto gen các thành phần của class thông qua các anotation
- Tại sao cần loombook: khi code dự án OOP ta luôn phải code các thành phần getter, setter, builder, toString, equalAndHashCode .... Loombook sinh ra để ta đỡ phải code mấy cái đó. Hết!
- Cài đặt loombook tích hợp với IntelIJ

### Bước 1: Cài đặt dependency
```xml
<!-- FILE: pom.xml -->
<!-- https://mvnrepository.com/artifact/org.projectlombok/lombok -->
<dependency>
    <groupId>org.projectlombok</groupId>
    <artifactId>lombok</artifactId>
    <version>1.18.4</version>
    <scope>provided</scope>
</dependency>
```

### Bước 2: Cài loombook plugin cho IntelIJ
- Loombook sẽ tự thêm các hàm getter, setter khi build (trước khi nó thành file jar)
- IntelIJ chỉ hiểu những code hiện tại ta đang có => để nó hiểu được loombook => cài plugin

::: tip
- Step 1: File > Setting > Plugins > Search loombook > install

- Step 2: Restart IDE

- Step 3: File > Setting > Other Setting > Lombok Plugin > Enable Lombok plugin for this project > Apply

- Step 4: File > Setting > Build, Execution, Deployment > Complier > Annotation Processors > Apply

:::
### Bước 3: Các anotation thông dụng

```md
- @Data
    - get set for each property
    - equals
    - hasCode
    - toString 
- Constructor
    - @NoArgsConstructor: Hàm khởi tạo rỗng, đã đề cập ở trên
    - @AllArgsConstructor: Hàm khởi tạo chứa tất cả thuộc tính, ví dụ Champion(String name, String type)
    - @RequiredArgsConstructor: Hàm khởi tạo theo yêu cầu. Bạn chỉ muốn hàm khởi tạo có vài thuộc tính do bạn chọn thôi, thì bạn thêm final trước thuộc tính trong class, nó sẽ tự sinh ra Constructor như thế.
- @Getter/@Setter
- @ToString và @EqualsAndHashCode
- @Builder
```
## Cấu hình modelMapper (để convert giữa các kiểu dữ liệu)

- ModelMapper: là một thư viện giúp ta convert giữa các instance của class có cùng trường
- Tại sao lại cần ModelMapper? Tại vì có quá nhiều đối tượng mà ta cần xử lý, transform data
    + DTO: output của API
    + Form: input của api
    + entity: là các class đại diện cho các table trong database (mỗi entity là một table)
    + domain model: là các bussiness class

### Bước 1: Thêm dependency
```xml
<!-- FILE: pom.xml -->
<dependency>
    <groupId>org.modelmapper</groupId>
    <artifactId>modelmapper</artifactId>
    <version>2.3.0</version>
</dependency>
```

### Bước 2: Cấu hình

```java
// FILE: configs/ModelMapperConfig.java
package com.hieunh.note.config;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class ModelMapperConfig {

    @Bean
    public ModelMapper modelMapper() {
        ModelMapper modelMapper = new ModelMapper();
        // TODO: read more about strategies
        modelMapper.getConfiguration().setMatchingStrategy(MatchingStrategies.STRICT);
        return  modelMapper;
    }
}
```


### Bước 3: Sử dụng như thế nào
``` java
// FILE: NoteServiceImpl
package com.hieunh.note.service;

import com.hieunh.note.model.dto.NoteDto;
import com.hieunh.note.model.entity.Note;
import com.hieunh.note.model.form.NoteForm;
import com.hieunh.note.repository.NoteRepository;
import lombok.Data;
import org.hibernate.criterion.Order;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
@Data
public class NoteServiceImpl implements NoteService {

    @Autowired
    NoteRepository noteRepository;

    @Autowired
    ModelMapper modelMapper;

    private NoteDto convertNoteToNoteDto(Note note) {
        return modelMapper.map(note, NoteDto.class);
    }

    private List<NoteDto> convertNotesToNoteDtos(List<Note> notes) {
        List<NoteDto> noteDtos = new ArrayList<>();
        notes.forEach(note -> {
            noteDtos.add(modelMapper.map(note, NoteDto.class));
        });
        return noteDtos;
    }

    @Override
    public List<NoteDto> getAll() {
        List<Note> notes = noteRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
        return this.convertNotesToNoteDtos(notes);
    }

    @Override
    public NoteDto getById(Long id) {
        Note note = noteRepository.getById(id);
        return modelMapper.map(note, NoteDto.class);
    }

    @Override
    public NoteDto insert(NoteForm noteForm) {
        Note note = Note.builder()
                .title(noteForm.getTitle())
                .content(noteForm.getContent())
                .build();
        Note createdNote = noteRepository.save(note);
        return this.convertNoteToNoteDto(createdNote);
    }

    @Override
    public NoteDto update(Long id, NoteForm noteForm) {
        Note note = noteRepository.getById(id);
        note.setTitle(noteForm.getTitle());
        note.setContent(noteForm.getContent());
        Note updatedNote = noteRepository.save(note);
        return this.convertNoteToNoteDto(updatedNote);
    }

    @Override
    public NoteDto deleteById(Long id) {
        Note note = noteRepository.getById(id);
        noteRepository.deleteById(note.getId());
        return this.convertNoteToNoteDto(note);
    }
}
```
## Cấu hình các lớp ErrorHandler

```java

@ControllerAdvice
public class ExceptionHelper {
    private static final Logger logger = LoggerFactory.getLogger(ExceptionHelper.class);
    @ExceptionHandler(value = { InvalidInputException.class })
    public ResponseEntity<Object> handleInvalidInputException(InvalidInputException ex) {
        LOGGER.error("Invalid Input Exception: ",ex.getMessage());
        return new ResponseEntity<Object>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { Unauthorized.class })
    public ResponseEntity<Object> handleUnauthorizedException(Unauthorized ex) {
        LOGGER.error("Unauthorized Exception: ",ex.getMessage());
        return new ResponseEntity<Object>(ex.getMessage(),HttpStatus.BAD_REQUEST);
    }

    @ExceptionHandler(value = { BusinessException.class })
    public ResponseEntity<Object> handleBusinessException(BusinessException ex) {
        LOGGER.error("Business Exception: ",ex.getMessage());
        return new ResponseEntity<Object>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
    
    @ExceptionHandler(value = { Exception.class })
    public ResponseEntity<Object> handleException(Exception ex) {
        LOGGER.error("Exception: ",ex.getMessage());
        return new ResponseEntity<Object>(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
    }
}
```
## Cấu hình logger
