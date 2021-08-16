# tuto
신입 유튜버들이 튜토리얼 영상을 올려 홍보하고 사용자들은 튜토리얼 영상을 보고 따라하며 취미, 적성을 탐구할 수 있습니다
<br/>
<br/>

# DB 스키마

Category
=====
| 필드 | 타입 | 설명|
|:---:|:---:|:---:|
| 'name' | 'String' | 카테고리명 |

Tutorial
=====
| 필드 | 타입 | 설명|
|:---:|:---:|:---:|
| 'title' | 'String' | 튜토리얼 제목 |
| 'content' | 'String' | 튜토리얼 설명 |
| 'category' | 'String' | 카테고리 |
| 'lectures' | '[Lecture]' | 튜토리얼 영상들 |
| 'thumbnail' | 'String' | 튜토리얼 대표 이미지 url |
| 'tutor' | 'ObjectId' | 튜터 오브젝트 id |
| 'tutees' | '[ObjectId]' | 튜티 id 배열(수강생들) |
| '
<br/>

Lecture
===
처음 Lecture 등록 시 유튜브 api 사용해서 제목이랑 영상 시간 받아와서 POST 메소드로 데이터에 같이 보내주세요
| 필드 | 타입 | 설명|
|:---:|:---:|:---:|
| 'embed' | 'String' | 유튜브 embed 태그 |
| 'title' | 'String' | 유튜브 영상 제목 |
| 'duration' | 'Number' | 유튜브 영상 길이(시간) |
<br/>

User
===
| 필드 | 타입 | 설명|
|:---:|:---:|:---:|
| 'email' | 'String' | 이메일 |
| 'password' | 'String' | 패스워드 |
| 'nickname' | 'String' | 닉네임(1글자 ~ 10글자) | 
| 'thumbnail' | 'String' | 유저 썸네일 |
| 'message' | 'String' | 상태 메시지 |
| 'takingTutorials' | '[ObjectId]' | 듣고 있는 튜토리얼들 |
| 'takenTutorials' | '[ObjectId]' | 완료한 튜토리얼들 |
| 'uploadedTutorials' | '[ObjectId]' | 업로드한 튜토리얼들 |
| 'recommendation' | 'String' | 추천 카테고리 |
<br/>

Assignment
===
| 필드 | 타입 | 설명|
|:---:|:---:|:---:|
| 'lecture' | 'ObjectId' | 대응되는 강의 id |
| 'author' | 'ObjectId' | 유저 id |
| 'content' | 'String' | 적고 싶은 말 |
| 'images' | '[String]' | 첨부한 이미지 url들 |
| 'comments' | '[ObjectId]' | 댓글 id들 배열 |
<br/>

Comment
===
| 필드 | 타입 | 설명|
|:---:|:---:|:---:|
| 'assignment' | 'ObjectId' | 대응되는 과제 id |
| 'author' | 'ObjectId' | 유저 id |
| 'content'| 'String' | 댓글 내용 |
| 'subComments' | '[Comment]' | 대댓글 객체 배열 |
<br/>

SubComment
===
| 필드 | 타입 | 설명|
|:---:|:---:|:---:|
| 'author' | 'ObjectId' | 유저 id |
| 'referenceAuthor' | 'ObjectId' | 대댓글 대상 유저 |
| 'comment' | 'ObjectId' | 댓글 id |
| 'content'| 'String' | 대댓글 내용 |
