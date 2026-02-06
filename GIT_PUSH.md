# Git 푸시 방법 (기존 방식)

이 프로젝트는 **상위 폴더(HP)** 에서 Git이 관리됩니다. GitHub 저장소에 반영하려면 아래 순서대로 진행하세요.

---

## 저장소 정보

- **원격 주소**: https://github.com/SIJackLee/HP
- **브랜치**: `main`
- **작업 위치**: `HP` 폴더 (seongil-site의 상위 폴더)

---

## 푸시 절차

### 1. 터미널에서 HP 폴더로 이동

```powershell
cd "c:\Users\jack3\OneDrive\Desktop\HP"
```

### 2. 변경 사항 확인

```powershell
git status
```

- `seongil-site/` 안의 수정·추가 파일이 목록에 보이면 정상입니다.

### 3. 스테이징 (전체 추가)

```powershell
git add .
```

- 새 파일만 넣으려면: `git add seongil-site/경로/파일명`

### 4. 커밋

```powershell
git commit -m "커밋 메시지"
```

예시:
- `git commit -m "제품 이미지 추가 및 content.js 연동"`
- `git commit -m "테스팅 가이드 추가"`

### 5. 푸시

```powershell
git push origin main
```

- 처음 한 번만 upstream 설정: `git push -u origin main`

---

## 한 번에 실행 (PowerShell)

```powershell
cd "c:\Users\jack3\OneDrive\Desktop\HP"
git add .
git commit -m "업데이트 내용 요약"
git push origin main
```

---

## 주의사항

1. **seongil-site 안에 .git이 있으면 안 됨**  
   - 있으면 `seongil-site`가 서브모듈로 인식되어 실제 파일이 올라가지 않을 수 있습니다.  
   - `seongil-site\.git` 폴더가 있으면 삭제한 뒤, `git rm --cached seongil-site` 후 다시 `git add seongil-site/` 하세요.

2. **인증**  
   - 푸시 시 GitHub 로그인 또는 Personal Access Token이 필요할 수 있습니다.

3. **pull 먼저**  
   - 다른 곳에서도 수정했다면: `git pull origin main` 후 `git push origin main` 하세요.

---

## 요약

| 단계 | 명령어 |
|------|--------|
| 이동 | `cd "c:\Users\jack3\OneDrive\Desktop\HP"` |
| 추가 | `git add .` |
| 커밋 | `git commit -m "메시지"` |
| 푸시 | `git push origin main` |

이 방식이 현재 사용 중인 **기존 Git 푸시 방식**입니다.
