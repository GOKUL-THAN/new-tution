# Database Design — Global Minds Academy

Database: **PostgreSQL** via **Prisma 5 ORM**.

## Entity Groups & Relationships

### Users & Authentication

```
User
  ├── Session[]              (1:many — JWT sessions)
  ├── StudentProfile?        (1:1 optional)
  ├── TeacherProfile?        (1:1 optional)
  ├── ParentProfile?         (1:1 optional)
  ├── Enrolment[]
  ├── LessonProgress[]
  ├── TestAttempt[]
  ├── AssignmentSubmission[]
  ├── Doubt[]
  ├── DoubtReply[]
  ├── Bookmark[]
  ├── Notification[]
  ├── NotificationPreference[]
  ├── Enquiry[]              (as handler)
  ├── AuditLog[]
  ├── Course[]               (as creator)
  ├── Question[]             (as author)
  ├── Review[]
  ├── AttendanceRecord[]     (as marker)
  └── StudyPlan[]

StudentProfile
  ├── User (1:1)
  ├── Board? (many:1)
  ├── Class? (many:1)
  ├── ParentStudent[]        (join with ParentProfile)
  └── AttendanceRecord[]

TeacherProfile
  ├── User (1:1)
  ├── Course[]               (courses taught)
  ├── LiveSession[]
  └── Assignment[]

ParentProfile
  ├── User (1:1)
  └── ParentStudent[]        (join with StudentProfile)
```

### Curriculum Structure

```
Board (CBSE, ICSE, ISC, TN State Board, TN Matriculation)
  ├── BoardClass[]           (many:many with Class)
  ├── BoardSubject[]         (many:many with Subject)
  └── StudentProfile[]

Class (1–12)
  ├── BoardClass[]
  ├── ClassSubject[]         (many:many with Subject)
  └── StudentProfile[]

Subject
  ├── BoardSubject[]
  ├── ClassSubject[]
  ├── Chapter[]
  ├── Course[]
  ├── Question[]
  └── Resource[]

Chapter → Topic (hierarchy)
```

### Courses & Learning

```
Course
  ├── Board? (many:1)
  ├── Class? (many:1)
  ├── Subject? (many:1)
  ├── TeacherProfile? (instructor)
  ├── User (creator)
  ├── CourseModule[]
  ├── Enrolment[]
  ├── Review[]
  └── Test[]

CourseModule → Lesson[]
Lesson → LessonProgress[], LessonResource[]
Enrolment → Order? (payment link)
```

### Assessments

```
Question
  ├── QuestionOption[]       (MCQ options, isCorrect flag)
  └── TestQuestion[]

Test
  ├── TestSection[]
  ├── TestQuestion[]
  └── TestAttempt[]

TestAttempt → AttemptResponse[]
```

---

## Enum Values

### UserRole
`STUDENT | PARENT | TEACHER | MENTOR | CONTENT_EDITOR | ACADEMIC_ADMIN | FINANCE_ADMIN | SUPER_ADMIN`

### AccountStatus
`PENDING_VERIFICATION | ACTIVE | SUSPENDED | DEACTIVATED`

### CourseStatus
`DRAFT | REVIEW | PUBLISHED | ARCHIVED`

### CourseLevel
`BEGINNER | INTERMEDIATE | ADVANCED | ALL_LEVELS`

### QuestionType
`SINGLE_MCQ | MULTI_MCQ | NUMERICAL | INTEGER | TRUE_FALSE | MATCH | ASSERTION_REASON | SHORT_ANSWER | LONG_ANSWER`

### DifficultyLevel
`EASY | MEDIUM | HARD | VERY_HARD`

---

## Key Indexes

| Model | Index | Purpose |
|---|---|---|
| User | `email` | Login lookup |
| User | `role`, `status` | Admin filtering |
| Session | `token` | Cookie verification |
| Course | `slug` | URL routing |
| Course | `status` | Filtering published |
| Course | `boardId, classId, subjectId` | Catalogue filtering |
| Question | `subjectId, chapterId` | Question bank filtering |
| Question | `type`, `difficulty`, `isPublished` | Filter & search |
| TestAttempt | `testId, userId` | Student result lookup |
| Enquiry | `status`, `createdAt` | CRM filtering |
| Order | `orderNo`, `userId`, `status` | Payment lookup |

---

## Data Rules

- **Prices in paise** (INR minor units). `Course.price = 49900` means ₹499.00.
- `User.passwordHash` — bcrypt, 12 rounds. **Never returned in API responses.**
- `User.resetToken`, `User.verifyToken` — **Never returned in API responses.**
- `Lesson.duration` — stored in minutes.
- `TestAttempt.timeSpentSec` — stored in seconds.
- `AttendanceRecord.date` — `@db.Date` (date only, no time component).
- All monetary `Order.amount` values are in paise (INR).

---

## Migrations

During development use `npx prisma db push` (schema-first, no migration files).
Before production, switch to `npx prisma migrate dev` to generate versioned migration files.
