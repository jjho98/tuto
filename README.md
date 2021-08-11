# tuto
신입 유튜버들이 튜토리얼 영상을 올려 홍보하고 사용자들은 튜토리얼 영상을 보고 따라하며 취미, 적성을 탐구할 수 있습니다


## DB 스키마
Tutorial
=====
| 필드 | 타입 | 설명|
|---|:---:|---|
| 'title' | 'String' | 튜토리얼 제목 |
| 'content' | 'String' | 튜토리얼 설명 |
| 'videos' | '[Video]' | 튜토리얼 영상들 |
| 'thumbnail' | 'String' | 튜토리얼 대표 이미지 url |
