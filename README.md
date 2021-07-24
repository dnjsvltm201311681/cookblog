# 트러블 슈팅

### ----------------------------------------------------

### 문제: 로그인유지가 되질않음

### 해결

```
Header을 header로 변경
```

### 의문

```
다른코드들은 Heders 로도 제대로 동작기능이 실행됨
MDN 사이트에서 찾아본 결과 HTTP 헤더는 대소문 구분하지 않는다고 써있음
그렇다면 왜 이것만 이런 현상이 일어나는 것일까?
생각할수 있는 가정은 에러부분만 jwt 토큰을 사용한다. 서버단에서
req.header은 사용가능하나, req.Header로 실행시에는 에러가 발생한다.
아마도 jwt방식은 header의 대소문을 구분하는것이 아닌가 싶다.
```

### ----------------------------------------------------

### 문제: postSaga에서 데이터가 존재하질 않음

### 해결

```
server에서 post부분에 auth 제거
```

### ----------------------------------------------------

### 문제: 페이지 이동시 한번 새로고침해야 넘어감

### 해결

```
history가 5버전이었다. history5는 아직도 connected-react-router와 호환이 부족하여, 4로 변경하니 해결
```

### ----------------------------------------------------

### 문제: 포스트 작성하면 데이터가 넘어가지 않고 완료됨

### 해결

```
서버에 포스트작성 router에서 auth를 미들웨어로 두고 있는데 이 미들웨어는 token값을 요구한다. 따라서 해당 값을 서버에 요청을 해야하기 때문에 프론트 postWrite.js에서 token값을 넘겨줬더니 문제해결
```
