
## Getting Started

### Install lib
```
yarn install
```

### install json-server
```
npm i -g json-server
```

## Run
### json-server
```
json-server --watch db.json --port 9001
```
### nextjs
- production 환경에서만 ISR이 동작하기 때문에 build 후 실행해야 함
```
yarn build
yarn start
```


## URL
- Books list
```
http://localhost:9000/books
```
- Specific book with id
```
http://localhost:9000/books/${id}
```

## 참고 사이트
- https://velog.io/@seungchan__y/NextJS%EC%99%80-ISR