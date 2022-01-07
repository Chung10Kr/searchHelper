# Branslator

translation chrome extension
# started
[참고문서](https://developer.chrome.com/docs/extensions/mv3/getstarted/)

# setting

1. 크롬 chrome://extensions 이동
2. 개발자모드 활성화
3. Load unpacked 클릭하여 translator load

# Branch strategy

1. Check out from master branch
2. Coding & Test
3. PR on QA branch
4. QA branch Test
5. PR on Master branch

# Branch Naming rule
```
TRANS-issue number 
```

ex) TRANS-13

# Commit Message
```
 [date][workerName][issue Number]

 -message

 -messgae

 -messgae

 ex)

 [2021-12-30][crlee][TRANS-13]
 - 회원가입 아이디 중복체크 기능 개발
 - 단위테스트 수정
 ```