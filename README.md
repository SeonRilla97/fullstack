# 코드로 배우는 리액트 실습 책

## 프로젝트 구조

```
/backend - Spring Boot 3.2.4
/docker - Mariadb 10.6
/frontend - React 18
```

# 목표 기간

```
 24.03.25 Start
 24.04.13 까지 1회독
```

### React

| Router

URL을 지정해준다.

1. lazy 와 Suspense : JPA의 지연로딩처럼, 필요할 때 렌더링 하는것을 의미한다.
2. Layout에 Outlet 설정을 통해 Router에서 페이지를 바꿔끼도록 할 수 있다. (IndexPage)
3. Router가 중첩되면 가독성의 향상을 위해 코드를 밖으로 빼는것이 좋다 todoRouter
4. Router에 의해 경로가 구분됐을 때 기본 페이지를 보여야 할 경우 (리다이렉트) - todoRouter - Navigate
5. Navigate / Link -> 그냥 이동 , useNavigate 는 처리 할거 하고 이동 하도록 설정 가능

- 사용하지 않은 모든 페이지를 렌더링 해놓고 사용할건가? (X) -> lazy / Suspense 로 해결
- 공통 Layout에서 특정 부분만 갈아 끼우는 방법 -> Outlet
  - children이 많아서 Router가 지저분해진다 -> children 내의 Router 정보만 외부로 빼낸다
  - 특정 RUL은 기본 경로로 리다이렉트 시키고 싶다 -> Navigate
    - Link, Navigate [정적 이동] useNavigate[동적 이동]
- 쿼리스트링의 상태를 다른페이지로 갔다가 빠져나올때도 동일하게 유지

### Spring

- JPA
- pageable & pageRequest 객체를 통한 페이징 처리
