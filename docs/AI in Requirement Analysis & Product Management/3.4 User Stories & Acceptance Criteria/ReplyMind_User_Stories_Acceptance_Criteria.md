# ReplyMind – User Stories & Acceptance Criteria

## 3.4. User Stories & Tiêu chí Chấp nhận

## 3.4.1. Mục đích

Sau khi xác định các yêu cầu chức năng, yêu cầu ngầm và phạm vi MVP ở phần **3.3 Phân tích Yêu cầu**, bước tiếp theo là chuyển các yêu cầu đó thành các hành vi cụ thể theo góc nhìn của người dùng.

User Story được sử dụng để xác định:

- Ai sử dụng chức năng?
- Người dùng cần thực hiện điều gì?
- Chức năng mang lại giá trị gì?

Cấu trúc sử dụng:

> **As a [Role], I want to [Action] so that [Value].**

Acceptance Criteria xác định các điều kiện cụ thể để kiểm tra một User Story đã được hoàn thành đúng yêu cầu hay chưa.

Cấu trúc chính được sử dụng:

> **Given [Context]**  
> **When [Action]**  
> **Then [Expected Result]**

---

# 3.4.2. User Roles

ReplyMind có ba nhóm người dùng chính:

| Role | Vai trò |
|---|---|
| **Admin** | Quản lý Workspace, người dùng, Knowledge Base, Brand Tone và Dashboard |
| **Manager** | Theo dõi hoạt động hỗ trợ khách hàng, quản lý Knowledge Base và xem Dashboard |
| **Agent** | Xử lý hội thoại, sử dụng AI Analysis và AI Reply Suggestion |

---

# 3.4.3. Epic 1 – Authentication & Workspace

## US01 – Đăng nhập hệ thống

> **As an Admin, Manager or Agent, I want to log in to the system so that I can access ReplyMind according to my assigned role.**

### Acceptance Criteria

**AC01**

**Given** người dùng đã có tài khoản  
**When** người dùng nhập email và mật khẩu hợp lệ  
**Then** hệ thống cho phép đăng nhập và chuyển người dùng vào Workspace phù hợp.

**AC02**

**Given** người dùng nhập email hoặc mật khẩu không hợp lệ  
**When** người dùng chọn đăng nhập  
**Then** hệ thống hiển thị thông báo lỗi và không cho phép truy cập.

---

## US02 – Truy cập theo Workspace

> **As a user, I want to access only my assigned Workspace so that I can work with the correct brand data.**

### Acceptance Criteria

**AC01**

**Given** người dùng thuộc Workspace A  
**When** người dùng truy cập hệ thống  
**Then** hệ thống chỉ hiển thị dữ liệu thuộc Workspace A.

**AC02**

**Given** người dùng thuộc Workspace A  
**When** người dùng cố truy cập dữ liệu Workspace B  
**Then** hệ thống từ chối quyền truy cập.

---

# 3.4.4. Epic 2 – Conversation Management

## US03 – Xem danh sách hội thoại

> **As an Agent, I want to view customer conversations so that I can identify and manage customer requests.**

### Acceptance Criteria

**AC01**

**Given** Agent đã đăng nhập  
**When** Agent mở Inbox  
**Then** hệ thống hiển thị danh sách Conversation thuộc Workspace.

**AC02**

Mỗi Conversation hiển thị tối thiểu:

- Customer.
- Trạng thái.
- Priority.
- Thời gian cập nhật gần nhất.

---

## US04 – Xem chi tiết hội thoại

> **As an Agent, I want to open a conversation so that I can understand the customer's message history and context.**

### Acceptance Criteria

**AC01**

**Given** Agent đang xem Inbox  
**When** Agent chọn một Conversation  
**Then** hệ thống hiển thị chi tiết Conversation.

**AC02**

Chi tiết Conversation bao gồm:

- Thông tin Customer.
- Lịch sử Messages.
- Status.
- Priority.
- AI Analysis nếu có.

---

## US05 – Cập nhật trạng thái hội thoại

> **As an Agent, I want to update the conversation status so that I can track the progress of customer support requests.**

### Acceptance Criteria

Agent có thể cập nhật trạng thái:

```text
New
Open
Pending
Resolved
```

**Given** Conversation đang tồn tại  
**When** Agent chọn một trạng thái hợp lệ  
**Then** hệ thống cập nhật trạng thái Conversation.

---

# 3.4.5. Epic 3 – AI Message Analysis

## US06 – Xác định Intent

> **As an Agent, I want AI to identify the customer's intent so that I can quickly understand what the customer needs.**

### Acceptance Criteria

**AC01**

**Given** Customer gửi một Message hợp lệ  
**When** hệ thống thực hiện AI Analysis  
**Then** hệ thống hiển thị một Intent cho Message.

Các Intent ban đầu có thể gồm:

```text
Order Status
Shipping
Delivery Issue
Product Question
Return
Refund
Complaint
```

**AC02**

AI Analysis phải được liên kết với Message được phân tích.

---

## US07 – Phân tích Sentiment

> **As an Agent, I want to see the customer's sentiment so that I can understand the customer's attitude and choose an appropriate response.**

### Acceptance Criteria

**Given** Message được AI phân tích  
**When** Sentiment Analysis hoàn thành  
**Then** hệ thống hiển thị một trong các giá trị:

```text
Positive
Neutral
Negative
```

Ví dụ:

```text
"I love this product!"

→ Positive
```

---

## US08 – Xác định Priority

> **As an Agent, I want the system to identify conversation priority so that I can handle important customer issues first.**

### Acceptance Criteria

**AC01**

Hệ thống hiển thị một trong các mức Priority:

```text
Low
Medium
High
Urgent
```

**AC02**

**Given** một Conversation có Priority cao  
**When** Agent xem Inbox  
**Then** Priority của Conversation phải được hiển thị rõ ràng.

---

# 3.4.6. Epic 4 – Knowledge Base Management

## US09 – Thêm Knowledge

> **As an Admin or Manager, I want to add knowledge to the Knowledge Base so that AI can use official brand information when generating replies.**

### Acceptance Criteria

Admin hoặc Manager có thể tạo Knowledge Entry với:

```text
Title
Category
Content
```

Các Category ban đầu:

```text
Product Information
Shipping Policy
Return Policy
Refund Policy
FAQ
Other
```

**Given** dữ liệu bắt buộc hợp lệ  
**When** Admin hoặc Manager lưu Knowledge Entry  
**Then** hệ thống tạo Knowledge Entry thuộc Workspace hiện tại.

---

## US10 – Chỉnh sửa Knowledge

> **As an Admin or Manager, I want to update knowledge so that AI uses the latest brand information.**

### Acceptance Criteria

**Given** Knowledge Entry tồn tại  
**When** Admin hoặc Manager chỉnh sửa nội dung và chọn Save  
**Then** hệ thống cập nhật Knowledge Entry.

---

## US11 – Xóa Knowledge

> **As an Admin or Manager, I want to remove outdated knowledge so that AI does not use incorrect information.**

### Acceptance Criteria

**Given** Knowledge Entry tồn tại  
**When** người dùng có quyền chọn Delete  
**Then** hệ thống yêu cầu xác nhận trước khi xóa.

---

# 3.4.7. Epic 5 – Brand Tone

## US12 – Thiết lập Brand Tone

> **As an Admin or Manager, I want to configure the brand tone so that AI-generated replies match the communication style of the brand.**

### Acceptance Criteria

Người dùng có quyền có thể chọn một Brand Tone:

```text
Friendly
Professional
Casual
Formal
```

**Given** Brand Tone được thay đổi  
**When** Admin hoặc Manager lưu cấu hình  
**Then** AI sử dụng Brand Tone mới cho các Suggested Reply tiếp theo.

---

# 3.4.8. Epic 6 – AI Reply Suggestion

## US13 – Tạo AI Suggested Reply

> **As an Agent, I want AI to generate a reply suggestion so that I can respond to customers faster.**

### Acceptance Criteria

**AC01**

**Given** Conversation có Customer Message  
**When** Agent yêu cầu AI tạo phản hồi  
**Then** hệ thống tạo một Suggested Reply.

**AC02**

AI Reply có thể sử dụng:

```text
Customer Message
+
Conversation History
+
Knowledge Base
+
Brand Tone
```

**AC03**

Suggested Reply phải được hiển thị riêng với Customer Message.

---

## US14 – Sử dụng Knowledge Base khi tạo phản hồi

> **As an Agent, I want AI to use relevant brand knowledge so that the suggested reply is based on accurate information.**

### Acceptance Criteria

**Given** Knowledge Base có thông tin phù hợp  
**When** AI tạo Suggested Reply  
**Then** phản hồi phải ưu tiên sử dụng thông tin từ Knowledge Base.

**Given** hệ thống không tìm thấy thông tin phù hợp  
**When** AI tạo phản hồi  
**Then** AI không được tự tạo chính sách chính thức của thương hiệu như một sự thật đã được xác nhận.

---

# 3.4.9. Epic 7 – Human Review

## US15 – Chỉnh sửa AI Suggested Reply

> **As an Agent, I want to edit the AI-generated reply so that I can control the final response sent to the customer.**

### Acceptance Criteria

**Given** AI đã tạo Suggested Reply  
**When** Agent chỉnh sửa nội dung  
**Then** Agent có thể thay đổi nội dung trước khi gửi.

---

## US16 – Regenerate AI Reply

> **As an Agent, I want to regenerate an AI reply so that I can receive another suggested response when the first suggestion is not suitable.**

### Acceptance Criteria

**Given** Suggested Reply đã được tạo  
**When** Agent chọn Regenerate  
**Then** hệ thống yêu cầu AI tạo một Suggested Reply mới.

---

## US17 – Phê duyệt và gửi phản hồi

> **As an Agent, I want to approve the final response before sending it so that AI cannot send messages automatically without human review.**

### Acceptance Criteria

**AC01**

**Given** Agent đã có nội dung phản hồi cuối cùng  
**When** Agent chọn Send  
**Then** hệ thống gửi nội dung đó đến Customer.

**AC02**

Trong phạm vi MVP:

> AI không được tự động gửi phản hồi mà không có hành động xác nhận của Agent.

---

# 3.4.10. Epic 8 – Dashboard

## US18 – Xem tổng quan hoạt động

> **As a Manager or Admin, I want to view customer support statistics so that I can monitor support activities.**

### Acceptance Criteria

Dashboard hiển thị tối thiểu:

```text
Total Conversations
Open Conversations
Resolved Conversations
High Priority Conversations
AI Suggestions Generated
```

**Given** người dùng có quyền Manager hoặc Admin  
**When** mở Dashboard  
**Then** hệ thống hiển thị dữ liệu thuộc Workspace hiện tại.

---

# 3.4.11. Tổng hợp User Stories

| ID | Role | User Story | Epic |
|---|---|---|---|
| US01 | All Users | Đăng nhập hệ thống | Authentication |
| US02 | All Users | Truy cập đúng Workspace | Workspace |
| US03 | Agent | Xem danh sách Conversation | Conversation |
| US04 | Agent | Xem chi tiết Conversation | Conversation |
| US05 | Agent | Cập nhật trạng thái | Conversation |
| US06 | Agent | Xem Intent | AI Analysis |
| US07 | Agent | Xem Sentiment | AI Analysis |
| US08 | Agent | Xem Priority | AI Analysis |
| US09 | Admin/Manager | Thêm Knowledge | Knowledge Base |
| US10 | Admin/Manager | Chỉnh sửa Knowledge | Knowledge Base |
| US11 | Admin/Manager | Xóa Knowledge | Knowledge Base |
| US12 | Admin/Manager | Thiết lập Brand Tone | Brand Settings |
| US13 | Agent | Tạo AI Suggested Reply | AI Reply |
| US14 | Agent | AI sử dụng Knowledge Base | AI Reply |
| US15 | Agent | Chỉnh sửa Suggested Reply | Human Review |
| US16 | Agent | Regenerate Suggested Reply | Human Review |
| US17 | Agent | Approve và Send Reply | Human Review |
| US18 | Admin/Manager | Xem Dashboard | Dashboard |

---

# 3.4.12. Liên kết với Requirement Analysis

User Stories được xây dựng trực tiếp từ các nhóm yêu cầu trong phần 3.3.

```text
Requirement Analysis
        ↓
Functional Requirement
        ↓
User Story
        ↓
Acceptance Criteria
        ↓
Testable Behavior
```

Ví dụ:

| Requirement | User Story | Acceptance Criteria |
|---|---|---|
| FR04 – Intent Classification | US06 | AI hiển thị Intent |
| FR05 – Sentiment Analysis | US07 | AI hiển thị Positive/Neutral/Negative |
| FR06 – Priority Detection | US08 | AI hiển thị Priority |
| FR07 – Knowledge Base | US09–US11 | CRUD Knowledge |
| FR08 – AI Reply | US13–US14 | Tạo Suggested Reply dựa trên dữ liệu liên quan |
| FR09 – Human Review | US15–US17 | Edit, Regenerate, Approve và Send |
| FR10 – Brand Tone | US12 | Thiết lập phong cách thương hiệu |
| FR11 – Dashboard | US18 | Hiển thị các chỉ số cơ bản |

---

# 3.4.13. Tóm tắt

User Stories và Acceptance Criteria giúp chuyển các yêu cầu của ReplyMind thành những hành vi có thể phát triển và kiểm thử.

Luồng logic của hệ thống được thể hiện như sau:

```text
Customer gửi Message
        ↓
Agent mở Conversation
        ↓
AI phân tích:
Intent + Sentiment + Priority
        ↓
AI truy xuất Knowledge Base
        ↓
AI tạo Suggested Reply
        ↓
Agent Review
        ↓
Edit / Regenerate
        ↓
Approve
        ↓
Send
```

Các User Stories trong phần này sẽ là đầu vào trực tiếp cho:

> **3.5. Feature Specification**

Trong phần tiếp theo, mỗi nhóm chức năng sẽ được đặc tả chi tiết theo:

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
