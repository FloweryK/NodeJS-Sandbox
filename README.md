# NodeJS-Sandbox

| 디렉토리명                 | 설명                                                         | 날짜             |
| -------------------------- | ------------------------------------------------------------ | ---------------- |
| HelloWorld                 | Node.js를 처음 사용해보고, express로 서버를 만들어보고, MySQL에서 데이터를 읽어보는 프로젝트 | 2021.04.26~04.30 |
| OpenTutorials-WEB2-Node.js | 생활코딩 WEB2 - Node.js 스터디                               | 2021.05.04~      |



### 2021-04-26

- node.js를 처음 시작했다. 
- npm, nvm으로 package 관리하는 법을 알았다.



### 2021-04-27

- express로 API 서버 만드는 법을 알았다. 
- GET, DELETE, POST API 만들고, 파라미터를 설정하는 법을 알았다.



### 2021-04-29

- 라우팅으로 API를 관리하는 법을 배웠다. express-generator를 많이 참고하고있다.
- 아직 DB랑 연동하는 법은 모르겠다.



### 2021-04-30

- MySQL의 DB에서 데이터를 읽어오는 API를 만들 수 있게 되었다 (routes/memo.js).
- express를 express-generator 없이 쓰면서 routes 디렉토리를 만들었다.
- POSTMAN 쓰는 법을 알았다.
- 아직 www 디렉토리는 어떻게 작동하는지 모르겠다. 



### 2021-05-03

- 생활코딩 WEB1-HTML에서 HTML 읽는 법, 쓰는 법을 배웠다. 
- 생활코딩 WEB2-Node.js 공부를 시작했다. WEB3-express에 MySQL을 사용해보고싶어서 순서대로 공부 할 생각이다.



### 2021-05-04

스터디를 시작했다. 계속 문서를 지웠다 만들었다해서 머리가 조금 복잡하다.

**자바스크립트**

- Javascript의 문법 적당히를 배웠다.
- var는 붙이지 않는 이유를 아는게 아니라면, var을 붙인다.

**노드**

- node.js에서 `response.end`에 올라가는게 실제 브라우저에서 보이는 정보다.

- url 구성

  ![https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a772e840-13c6-4380-8e90-c9c1d2447ea6/asdfasdf.png](https://s3-us-west-2.amazonaws.com/secure.notion-static.com/a772e840-13c6-4380-8e90-c9c1d2447ea6/asdfasdf.png)

- 쿼리 스트링 사용법

  - url은 `request.url`로 불러온다.
  - url은 `url.parse`를 이용해서 쿼리 스트링을 분리할 수 있다. → parse는 deprecated
  - 이걸 `response.end`에 넣어서 쿼리에 넣은 값을 보여주는 웹 어플리케이션을 만들 수 있다(!!)



### 2021-05-07

**11. App 제작 - 동적인 웹페이지 만들기**

- Query string에 따라 동적인 페이지를 만들 수 있게 되었다.

**12. Node.js의 파일 읽기 기능**

- fs를 이용해서 fileread를 할 수 있다.
- 파일 내용을 `fs.readFile`로 읽어서 표시할 수 있다. 이걸 이용해서 디렉토리를 체계적이고 간단하게 할 수 있다.

**18. Node.js 콘솔에서의 입력값**

- node에 console에서 파라미터를 줄 때는 `process.argv`를 사용하면 된다.

**19. App 제작 - Not Found 구현, 홈페이지 구현**

- url을 파싱하면 다음과 같은 내용이 들어있다.

  ```json
  Url {
    protocol: null,
    slashes: null,
    auth: null,
    host: null,
    port: null,
    hostname: null,
    hash: null,
    search: '?id=HTML',
    query: [Object: null prototype] { id: 'HTML' },
    pathname: '/',
    path: '/?id=HTML',
    href: '/?id=HTML'
  }
  ```

- 전통적 약속: 제대로 된 pathname을 줬을 경우 200을, 아니면 404를 준다.

- 404를 줘야 할 경우 not found 페이지를 따로 만들어서 불러오는 것을 해봤다!

- 강좌보다 더 간단하게 할 수 있는 방법이 있을 것 같아서... 중복을 없애고 컨디션을 넣었다.

**23. Node.js에서 파일목록 알아내기**

- 파일 목록은 `fs.readdir`를 사용하면 된다. 파이썬의 `os.listdir`과 똑같다.