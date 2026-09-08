# ReplyMind – Đặc tả Tính năng (Feature Specification)

## 3.5. Đặc tả Tính năng

## 3.5.1. Mục đích

Sau Product Discovery, PRD, Requirement Analysis và User Stories & Acceptance Criteria, phần Feature Specification mô tả chi tiết cách các chức năng của ReplyMind hoạt động.

Mỗi Feature được đặc tả theo cấu trúc:

```text
Feature Objective
        ↓
Actors
        ↓
Inputs
        ↓
System Behavior
        ↓
Outputs
        ↓
Business Rules
        ↓
Dependencies
```

Mục tiêu là tạo cầu nối giữa:

- Product Requirements.
- User Stories.
- Acceptance Criteria.
- Thiết kế hệ thống.
- Database.
- Frontend.
- Backend.
- Testing.

---

# 3.5.2. Tổng quan các Feature

| ID | Feature | Mục tiêu |
|---|---|---|
| FS01 | Authentication & Access | Xác thực và kiểm soát quyền truy cập |
| FS02 | Workspace Management | Quản lý dữ liệu theo từng thương hiệu |
| FS03 | Conversation Management | Quản lý hội thoại khách hàng |
| FS04 | AI Message Analysis | Phân tích Intent, Sentiment và Priority |
| FS05 | Knowledge Base | Quản lý nguồn kiến thức thương hiệu |
| FS06 | Brand Tone | Cấu hình phong cách giao tiếp |
| FS07 | AI Reply Suggestion | Tạo phản hồi AI gợi ý |
| FS08 | Human Review | Kiểm duyệt phản hồi trước khi gửi |
| FS09 | Dashboard | Theo dõi tổng quan hoạt động |

---

# FS01 – Authentication & Access Control

## 1. Feature Objective

Cho phép người dùng đăng nhập vào ReplyMind và truy cập các chức năng dựa trên Role được cấp.

## 2. Actors

- Admin.
- Manager.
- Agent.

## 3. Inputs

```text
Email
Password
```

## 4. System Behavior

```text
User opens Login Page
        ↓
Enter Email + Password
        ↓
Validate Input
        ↓
Authenticate User
        ↓
Identify Role + Workspace
        ↓
Create User Session
        ↓
Redirect to Application
```

## 5. Outputs

- Authentication thành công hoặc thất bại.
- User Session.
- Role Information.
- Workspace Context.

## 6. Business Rules

### BR01

Người dùng phải có tài khoản hợp lệ.

### BR02

Người dùng chưa đăng nhập không được truy cập các chức năng nội bộ.

### BR03

Sau khi đăng nhập, hệ thống xác định:

```text
User
Role
Workspace
```

### BR04

Người dùng chỉ được truy cập các chức năng phù hợp với Role.

## 7. Error Handling

| Tình huống | Hệ thống xử lý |
|---|---|
| Email trống | Hiển thị lỗi |
| Password trống | Hiển thị lỗi |
| Sai thông tin đăng nhập | Từ chối đăng nhập |
| Session không hợp lệ | Yêu cầu đăng nhập lại |

## 8. Dependencies

- User Database.
- Role Management.
- Workspace Management.

---

# FS02 – Workspace Management

## 1. Feature Objective

Quản lý dữ liệu ReplyMind theo từng thương hiệu D2C.

Workspace đại diện cho một Brand.

## 2. Actors

- Admin.

## 3. Workspace Data

```text
Workspace ID
Brand Name
Brand Tone
Created At
Updated At
```

## 4. System Behavior

```text
User Login
        ↓
Identify Workspace
        ↓
Load Workspace Context
        ↓
Load Related Data
```

Dữ liệu liên quan:

```text
Workspace
    │
    ├── Users
    ├── Customers
    ├── Conversations
    └── Knowledge Base
```

## 5. Outputs

Hệ thống hiển thị dữ liệu thuộc Workspace hiện tại.

## 6. Business Rules

### BR01 – Data Isolation

Dữ liệu của Workspace A không được hiển thị cho Workspace B.

### BR02 – Workspace Context

Mọi dữ liệu nghiệp vụ chính phải được liên kết với Workspace.

### BR03 – Access

User chỉ có thể truy cập Workspace được gán quyền.

## 7. Dependencies

- Authentication.
- User Roles.
- Conversation Management.
- Knowledge Base.

---

# FS03 – Conversation Management

## 1. Feature Objective

Cho phép Agent và Manager theo dõi, xem và xử lý các hội thoại của khách hàng.

## 2. Actors

- Agent.
- Manager.
- Admin.

## 3. Inputs

```text
Customer
Conversation
Messages
Status
Priority
```

## 4. Conversation Status

```text
New
Open
Pending
Resolved
```

## 5. System Behavior

### A. Load Inbox

```text
Open Inbox
        ↓
Load Workspace Conversations
        ↓
Sort / Filter
        ↓
Display Conversation List
```

### B. Open Conversation

```text
Select Conversation
        ↓
Load Customer Information
        ↓
Load Message History
        ↓
Load Status + Priority
        ↓
Load AI Analysis
```

### C. Update Status

```text
Agent selects Status
        ↓
Validate Permission
        ↓
Update Conversation
        ↓
Save Update Time
```

## 6. Outputs

Inbox hiển thị:

- Customer.
- Conversation Status.
- Priority.
- Latest Activity.

Conversation Detail hiển thị:

- Customer Information.
- Message History.
- AI Analysis.
- AI Suggested Reply.

## 7. Business Rules

### BR01

Conversation phải thuộc Workspace hiện tại.

### BR02

Conversation phải liên kết với một Customer.

### BR03

Message phải liên kết với một Conversation.

### BR04

Chỉ người dùng có quyền mới được cập nhật Status.

## 8. Dependencies

```text
Workspace
    ↓
Customer
    ↓
Conversation
    ↓
Messages
```

---

# FS04 – AI Message Analysis

## 1. Feature Objective

Phân tích nội dung Message để hỗ trợ Agent hiểu nhanh:

- Khách hàng đang cần gì.
- Khách hàng có thái độ như thế nào.
- Vấn đề có mức độ ưu tiên bao nhiêu.

## 2. Actors

- Agent.

## 3. Inputs

```text
Current Customer Message
+
Relevant Conversation Context
```

## 4. AI Analysis Components

### A. Intent Classification

Intent ban đầu:

```text
Order Status
Shipping
Delivery Issue
Product Question
Return
Refund
Complaint
```

### B. Sentiment Analysis

```text
Positive
Neutral
Negative
```

### C. Priority Detection

```text
Low
Medium
High
Urgent
```

## 5. System Behavior

```text
Customer Message
        ↓
Validate Message
        ↓
Send to AI Analysis Service
        ↓
Intent Classification
        +
Sentiment Analysis
        +
Priority Detection
        ↓
Store Analysis Result
        ↓
Display to Agent
```

## 6. Outputs

```text
Intent
Sentiment
Priority
```

Ví dụ:

```text
Customer Message:
"My package hasn't arrived and nobody has replied."

Intent: Delivery Issue
Sentiment: Negative
Priority: High
```

## 7. Business Rules

### BR01

AI Analysis phải liên kết với Message được phân tích.

### BR02

AI Analysis không tự động gửi nội dung đến Customer.

### BR03

Nếu AI Analysis thất bại, Agent vẫn có thể xử lý Conversation thủ công.

### BR04

Priority phải được hiển thị rõ trong Conversation hoặc Inbox.

## 8. Error Handling

Nếu AI Service lỗi:

```text
AI Analysis Failed
        ↓
Display Error State
        ↓
Agent continues manual handling
```

## 9. Dependencies

- Conversation Management.
- Message Data.
- AI Service.

---

# FS05 – Knowledge Base Management

## 1. Feature Objective

Cung cấp nguồn thông tin chính thức của thương hiệu để hỗ trợ AI tạo phản hồi chính xác.

## 2. Actors

- Admin.
- Manager.

## 3. Knowledge Entry

```text
Knowledge ID
Workspace ID
Title
Category
Content
Created At
Updated At
```

## 4. Categories

```text
Product Information
Shipping Policy
Return Policy
Refund Policy
FAQ
Other
```

## 5. Operations

```text
Create
Read
Update
Delete
```

## 6. System Behavior

### A. Create

```text
Open Knowledge Base
        ↓
Select Add Knowledge
        ↓
Enter Title
        ↓
Select Category
        ↓
Enter Content
        ↓
Validate Data
        ↓
Save
```

### B. Update

```text
Select Knowledge Entry
        ↓
Edit Content
        ↓
Save Changes
```

### C. Delete

```text
Select Knowledge Entry
        ↓
Delete
        ↓
Confirm Action
        ↓
Remove Entry
```

## 7. Outputs

Knowledge Entry được lưu trong Workspace và có thể được AI sử dụng khi tạo Suggested Reply.

## 8. Business Rules

### BR01

Knowledge Entry phải thuộc một Workspace.

### BR02

AI chỉ được sử dụng Knowledge Base thuộc Workspace hiện tại.

### BR03

Chỉ Admin hoặc Manager có quyền quản lý Knowledge Base.

### BR04

Knowledge không được để trống Title hoặc Content.

## 9. Dependencies

- Workspace Management.
- Authentication.
- Permission Control.
- AI Reply Suggestion.

---

# FS06 – Brand Tone

## 1. Feature Objective

Thiết lập phong cách giao tiếp để AI tạo phản hồi phù hợp với hình ảnh của thương hiệu.

## 2. Actors

- Admin.
- Manager.

## 3. Inputs

Brand Tone:

```text
Friendly
Professional
Casual
Formal
```

## 4. System Behavior

```text
Admin/Manager selects Brand Tone
        ↓
Save Workspace Setting
        ↓
Store Brand Tone
        ↓
AI Reply Engine loads Brand Tone
        ↓
Generate response using selected style
```

## 5. Output

Brand Tone ảnh hưởng đến:

- Cách xưng hô.
- Mức độ thân thiện.
- Cách diễn đạt.
- Mức độ trang trọng.

## 6. Business Rules

### BR01

Brand Tone thuộc cấu hình của Workspace.

### BR02

Brand Tone ảnh hưởng đến cách diễn đạt, không thay đổi dữ kiện thực tế.

Ví dụ:

```text
Knowledge:
Delivery takes 3–5 business days.
```

Friendly:

```text
Hi! Your order should arrive within about 3–5 business days 😊
```

Professional:

```text
Thank you for contacting us. Delivery typically takes 3–5 business days.
```

## 7. Dependencies

- Workspace.
- AI Reply Suggestion.

---

# FS07 – AI Reply Suggestion

## 1. Feature Objective

Tạo phản hồi gợi ý để hỗ trợ Agent trả lời khách hàng nhanh hơn.

## 2. Actors

- Agent.

## 3. Inputs

```text
Customer Message
+
Conversation History
+
Relevant Knowledge Base
+
Brand Tone
```

## 4. System Behavior

```text
Agent opens Conversation
        ↓
Request AI Reply
        ↓
Collect Message Context
        ↓
Retrieve Relevant Knowledge
        ↓
Load Brand Tone
        ↓
Generate Suggested Reply
        ↓
Return Suggestion to Agent
```

## 5. Outputs

```text
AI Suggested Reply
```

## 6. Example

### Customer Message

```text
Where is my order?
```

### Knowledge Base

```text
Standard shipping takes 3–5 business days.
```

### Brand Tone

```text
Friendly
```

### Suggested Reply

```text
Hi! Thanks for reaching out 😊 Standard shipping usually takes around 3–5 business days.
```

## 7. Business Rules

### BR01

AI Reply không được tự động gửi đến Customer.

### BR02

Suggested Reply phải được Agent review.

### BR03

AI nên ưu tiên thông tin từ Knowledge Base.

### BR04

Nếu không có Knowledge phù hợp, AI không được tự tạo chính sách thương hiệu như một thông tin đã được xác nhận.

### BR05

Suggested Reply phải được hiển thị tách biệt với Customer Message.

## 8. Error Handling

Nếu AI Reply Generation thất bại:

- Hiển thị trạng thái lỗi.
- Không mất Conversation.
- Agent vẫn có thể trả lời thủ công.
- Agent có thể thử Generate lại.

## 9. Dependencies

```text
Conversation
        ↓
Messages
        +
Knowledge Base
        +
Brand Tone
        ↓
AI Reply Engine
```

---

# FS08 – Human Review

## 1. Feature Objective

Đảm bảo Agent kiểm soát phản hồi cuối cùng trước khi gửi đến Customer.

## 2. Actors

- Agent.

## 3. Inputs

```text
AI Suggested Reply
```

## 4. Available Actions

```text
View
Edit
Regenerate
Approve
Send
```

## 5. System Behavior

```text
AI Suggested Reply
        ↓
Agent Review
        ↓
┌─────────────────────┐
│                     │
Edit              Regenerate
│                     │
└──────────┬──────────┘
           ↓
        Approve
           ↓
         Send
```

## 6. Outputs

```text
Final Response
```

## 7. Business Rules

### BR01

AI không được tự động gửi phản hồi trong MVP.

### BR02

Agent có thể chỉnh sửa Suggested Reply.

### BR03

Nội dung gửi đến Customer là nội dung cuối cùng do Agent xác nhận.

### BR04

Agent có thể yêu cầu AI tạo lại Suggested Reply.

## 8. Dependencies

- Conversation Management.
- AI Reply Suggestion.
- Permission Control.

---

# FS09 – Dashboard

## 1. Feature Objective

Cung cấp thông tin tổng quan về hoạt động hỗ trợ khách hàng trong Workspace.

## 2. Actors

- Admin.
- Manager.

## 3. Metrics

Dashboard hiển thị tối thiểu:

```text
Total Conversations
Open Conversations
Resolved Conversations
High Priority Conversations
AI Suggestions Generated
```

## 4. System Behavior

```text
User opens Dashboard
        ↓
Identify Workspace
        ↓
Collect Workspace Statistics
        ↓
Calculate Metrics
        ↓
Display Dashboard
```

## 5. Outputs

Dashboard hiển thị:

- Tổng số Conversation.
- Số Conversation đang xử lý.
- Số Conversation đã hoàn thành.
- Số Conversation Priority cao.
- Số AI Suggested Reply đã được tạo.

## 6. Business Rules

### BR01

Dashboard chỉ hiển thị dữ liệu thuộc Workspace hiện tại.

### BR02

Chỉ Admin và Manager có quyền truy cập Dashboard.

## 7. Dependencies

- Workspace.
- Conversation Management.
- AI Reply Suggestion.

---

# 3.5.3. Feature Dependencies

Mối quan hệ giữa các Feature:

```text
Authentication
      ↓
Workspace
      ↓
┌───────────────────────────────┐
│                               │
Conversation                Knowledge Base
│                               │
Messages                    Brand Tone
│                               │
└───────────────┬───────────────┘
                ↓
         AI Message Analysis
                ↓
        Intent / Sentiment /
             Priority
                ↓
        AI Reply Suggestion
                ↓
          Human Review
                ↓
             Send
                ↓
           Dashboard
```

---

# 3.5.4. Feature Priority cho MVP

## Must Have

| Feature | Lý do |
|---|---|
| Authentication | Kiểm soát truy cập |
| Workspace | Tách dữ liệu thương hiệu |
| Conversation Management | Core workflow |
| AI Message Analysis | Giá trị AI cốt lõi |
| Knowledge Base | Nguồn thông tin thương hiệu |
| Brand Tone | Đảm bảo phong cách phản hồi |
| AI Reply Suggestion | Giá trị chính của ReplyMind |
| Human Review | Giảm rủi ro AI |
| Basic Dashboard | Theo dõi hoạt động |

## Future Scope

Các Feature chưa nằm trong MVP:

```text
Multi-channel Integration
Automatic Reply
Full CRM
Advanced Analytics
AI Feedback Learning
Document/PDF Knowledge Upload
Multiple AI Reply Options
```

---

# 3.5.5. Traceability

| Product Objective | Requirement | User Story | Feature |
|---|---|---|---|
| Kiểm soát truy cập | FR01 | US01 | FS01 |
| Tách dữ liệu thương hiệu | FR02 | US02 | FS02 |
| Quản lý hội thoại | FR03 | US03–US05 | FS03 |
| Hiểu nhu cầu khách hàng | FR04 | US06 | FS04 |
| Hiểu cảm xúc khách hàng | FR05 | US07 | FS04 |
| Xác định mức ưu tiên | FR06 | US08 | FS04 |
| Quản lý thông tin thương hiệu | FR07 | US09–US11 | FS05 |
| Giữ phong cách thương hiệu | FR10 | US12 | FS06 |
| Tạo phản hồi nhanh hơn | FR08 | US13–US14 | FS07 |
| Kiểm soát phản hồi AI | FR09 | US15–US17 | FS08 |
| Theo dõi hoạt động | FR11 | US18 | FS09 |

---

# 3.5.6. Tổng kết Feature Specification

Feature Specification chuyển các yêu cầu sản phẩm thành các hành vi cụ thể có thể được triển khai.

Core Workflow của ReplyMind:

```text
Customer Message
        ↓
Conversation Management
        ↓
AI Message Analysis
(Intent + Sentiment + Priority)
        ↓
Knowledge Base Retrieval
        +
Brand Tone
        ↓
AI Reply Suggestion
        ↓
Human Review
        ↓
Final Response
        ↓
Customer
```

Các Feature được xây dựng xoay quanh nguyên tắc:

> **AI hỗ trợ Agent xử lý khách hàng nhanh hơn và nhất quán hơn, nhưng con người vẫn kiểm soát phản hồi cuối cùng trong phạm vi MVP.**

Phần Feature Specification là đầu vào trực tiếp cho các bước tiếp theo của quá trình phát triển:

```text
Feature Specification
        ↓
System Architecture
        ↓
Database Design
        ↓
API Design
        ↓
UI/UX Design
        ↓
Implementation
        ↓
Testing
```
