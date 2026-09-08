# ReplyMind – Phân tích Yêu cầu (Requirement Analysis)

## 3.3. Phân tích Yêu cầu

### 3.3.1. Mục đích phân tích yêu cầu

Phân tích yêu cầu giúp chuyển ý tưởng sản phẩm ReplyMind thành các yêu cầu cụ thể, có thể phát triển và kiểm thử.

Quá trình phân tích được thực hiện theo ba bước:

```text
Extract
   ↓
Analyze
   ↓
Validate
```

- **Extract:** Xác định các yêu cầu từ Product Discovery và PRD.
- **Analyze:** Phân tích tính cần thiết, mối quan hệ, phụ thuộc và các yêu cầu còn thiếu.
- **Validate:** Kiểm tra yêu cầu có rõ ràng, khả thi và phù hợp với mục tiêu sản phẩm hay không.

Mục tiêu của phần này là xác định:

- Hệ thống cần làm gì.
- Người dùng nào cần chức năng đó.
- Các yêu cầu nào là bắt buộc cho MVP.
- Các yêu cầu nào còn thiếu hoặc cần xác nhận.
- Các chức năng phụ thuộc vào nhau như thế nào.

---

## 3.3.2. Nguồn yêu cầu

Các yêu cầu của ReplyMind được xác định từ:

- Product Discovery.
- Product Objectives.
- Target Users.
- Product Scope của MVP.
- Core Workflow của hệ thống.

Core Workflow:

```text
Customer Message
        ↓
AI Message Analysis
        ↓
Intent + Sentiment + Priority
        ↓
Knowledge Base Retrieval
        ↓
AI Reply Suggestion
        ↓
Human Review
        ↓
Send Response
```

Từ luồng trên, các nhóm yêu cầu chính được xác định gồm:

1. User & Workspace Management.
2. Conversation Management.
3. AI Message Analysis.
4. Knowledge Base Management.
5. AI Reply Suggestion.
6. Human Review.
7. Dashboard.

---

# 3.3.3. Phân loại yêu cầu

## A. Functional Requirements

Functional Requirements mô tả những chức năng hệ thống ReplyMind phải thực hiện.

### FR01 – Authentication

Hệ thống phải cho phép người dùng:

- Đăng ký tài khoản.
- Đăng nhập.
- Đăng xuất.
- Truy cập hệ thống theo quyền được cấp.

---

### FR02 – Workspace Management

Hệ thống phải hỗ trợ Workspace đại diện cho một thương hiệu D2C.

Mỗi Workspace có thể bao gồm:

- Brand Name.
- Brand Tone.
- Users.
- Customers.
- Conversations.
- Knowledge Base.

**Yêu cầu quan trọng:**

Dữ liệu của các Workspace phải được tách biệt.

---

### FR03 – Conversation Management

Agent phải có khả năng:

- Xem danh sách hội thoại.
- Mở một hội thoại.
- Xem lịch sử tin nhắn.
- Xem trạng thái hội thoại.
- Xem mức độ ưu tiên.
- Cập nhật trạng thái hội thoại.

Các trạng thái ban đầu có thể gồm:

```text
New
Open
Pending
Resolved
```

---

### FR04 – AI Intent Classification

Hệ thống phải phân tích nội dung tin nhắn để xác định mục đích của khách hàng.

Ví dụ:

```text
Customer Message:
"Where is my order?"

Intent:
Order Status
```

Một số Intent ban đầu:

- Order Status.
- Shipping.
- Delivery Issue.
- Product Question.
- Return.
- Refund.
- Complaint.

---

### FR05 – Sentiment Analysis

Hệ thống phải phân tích thái độ hoặc cảm xúc trong tin nhắn khách hàng.

Các kết quả ban đầu:

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

```text
"I have been waiting for two weeks. This is unacceptable."

→ Negative
```

---

### FR06 – Priority Detection

Hệ thống phải xác định mức độ ưu tiên của hội thoại.

Các mức ban đầu:

```text
Low
Medium
High
Urgent
```

Mục đích:

- Giúp Agent xử lý các vấn đề quan trọng trước.
- Hạn chế bỏ sót các khiếu nại hoặc vấn đề cần xử lý sớm.

---

### FR07 – Knowledge Base Management

Admin hoặc Manager phải có khả năng:

- Thêm Knowledge.
- Xem Knowledge.
- Chỉnh sửa Knowledge.
- Xóa Knowledge.

Knowledge Base có thể bao gồm:

- Product Information.
- Shipping Policy.
- Return Policy.
- Refund Policy.
- FAQ.

Mỗi Knowledge Entry có thể gồm:

```text
Title
Category
Content
Created At
Updated At
```

---

### FR08 – AI Reply Suggestion

Hệ thống phải cho phép AI tạo phản hồi gợi ý.

AI sử dụng:

```text
Customer Message
        +
Conversation History
        +
Knowledge Base
        +
Brand Tone
```

Kết quả:

```text
Suggested Reply
```

Mục tiêu là giúp Agent giảm thời gian soạn phản hồi.

---

### FR09 – Human Review

AI không được tự động gửi phản hồi trong phạm vi MVP.

Agent phải có khả năng:

- Xem AI Suggested Reply.
- Chỉnh sửa nội dung.
- Yêu cầu tạo lại phản hồi.
- Phê duyệt phản hồi.
- Gửi phản hồi.

Luồng:

```text
AI Suggestion
      ↓
Agent Review
      ↓
Edit / Regenerate
      ↓
Approve
      ↓
Send
```

---

### FR10 – Brand Tone

Admin hoặc Manager có thể thiết lập phong cách giao tiếp của thương hiệu.

Các lựa chọn ban đầu:

- Friendly.
- Professional.
- Casual.
- Formal.

Brand Tone được sử dụng khi AI tạo phản hồi.

**Brand Tone quyết định cách diễn đạt, không thay đổi thông tin thực tế từ Knowledge Base.**

---

### FR11 – Dashboard

Manager hoặc Admin có thể xem các thông tin tổng quan:

- Total Conversations.
- Open Conversations.
- Resolved Conversations.
- High Priority Conversations.
- AI Suggestions Generated.

---

# 3.3.4. Implicit Requirements

Ngoài các yêu cầu được xác định trực tiếp, ReplyMind còn có một số yêu cầu ngầm cần được xem xét.

## IR01 – Data Isolation

Mỗi thương hiệu D2C phải có dữ liệu riêng.

Ví dụ:

```text
Brand A
 ├── Customers
 ├── Conversations
 └── Knowledge Base

Brand B
 ├── Customers
 ├── Conversations
 └── Knowledge Base
```

Brand A không được truy cập dữ liệu của Brand B.

---

## IR02 – Conversation Context

AI không nên chỉ dựa vào một tin nhắn cuối cùng.

AI cần có khả năng sử dụng:

- Tin nhắn hiện tại.
- Một phần lịch sử hội thoại liên quan.

Điều này giúp AI hiểu ngữ cảnh tốt hơn.

---

## IR03 – Knowledge Accuracy

AI Reply Suggestion cần ưu tiên thông tin từ Knowledge Base.

Nếu không tìm thấy thông tin phù hợp:

- AI không nên tự tạo chính sách thương hiệu.
- Agent cần có quyền kiểm tra và trả lời thủ công.

---

## IR04 – Permission Control

Mỗi Role có quyền khác nhau.

### Admin

Có thể:

- Quản lý Workspace.
- Quản lý Users.
- Quản lý Knowledge Base.
- Thiết lập Brand Tone.
- Xem Dashboard.

### Manager

Có thể:

- Theo dõi Conversations.
- Quản lý Knowledge Base.
- Xem Dashboard.

### Agent

Có thể:

- Xem Conversations.
- Xem AI Analysis.
- Sử dụng AI Reply.
- Chỉnh sửa và gửi phản hồi.

Agent không nên có quyền quản trị Workspace.

---

## IR05 – AI Failure Handling

Nếu dịch vụ AI không hoạt động:

- Conversation vẫn phải hiển thị.
- Agent vẫn có thể xem tin nhắn.
- Agent vẫn có thể trả lời thủ công.

AI là công cụ hỗ trợ, không được làm hệ thống Customer Support ngừng hoạt động hoàn toàn.

---

# 3.3.5. Phân tích Dependencies

Các chức năng trong ReplyMind có sự phụ thuộc với nhau.

## Dependency 1 – AI Reply Suggestion

```text
AI Reply Suggestion
        │
        ├── Customer Message
        ├── Conversation History
        ├── Knowledge Base
        └── Brand Tone
```

Do đó, AI Reply không nên được xây dựng độc lập hoàn toàn.

---

## Dependency 2 – AI Analysis

```text
Customer Message
        ↓
AI Analysis
        ↓
Intent
Sentiment
Priority
```

AI Analysis phụ thuộc vào sự tồn tại của Message.

---

## Dependency 3 – Knowledge Base

```text
Workspace
    ↓
Knowledge Base
    ↓
AI Retrieval
    ↓
AI Reply
```

Knowledge Base thuộc một Workspace cụ thể.

---

## Dependency 4 – Conversation

```text
Workspace
    ↓
Customer
    ↓
Conversation
    ↓
Messages
```

Mỗi Conversation cần liên kết với Customer và Workspace.

---

# 3.3.6. Gap Analysis

Gap Analysis được sử dụng để xác định những điểm chưa đủ rõ trước khi triển khai.

## Gap 1 – Cách xác định Priority

Cần quyết định:

- Priority hoàn toàn do AI xác định?
- Hay sử dụng Rule-based kết hợp AI?

Ví dụ Rule:

```text
Refund + Negative Sentiment
        ↓
High Priority
```

Quyết định này cần được xác nhận trước khi phát triển.

---

## Gap 2 – Agent có được sửa AI Analysis không?

Ví dụ AI dự đoán:

```text
Intent: Product Question
```

Nhưng Agent nhận thấy đây thực chất là:

```text
Complaint
```

Cần quyết định Agent có thể sửa Intent, Sentiment hoặc Priority hay không.

---

## Gap 3 – Knowledge Base Input

MVP cần xác định Knowledge Base hỗ trợ:

- Chỉ nhập Text.
- Hay Upload Document/PDF.

Để giữ phạm vi MVP đơn giản, phiên bản đầu có thể ưu tiên Text-based Knowledge Base.

---

## Gap 4 – Conversation Assignment

Cần xác định:

- Một Conversation thuộc một Agent.
- Hay nhiều Agent có thể cùng xử lý.

MVP có thể bắt đầu với:

```text
One Conversation
        ↓
One Assigned Agent
```

---

## Gap 5 – AI Reply Output

Cần xác định AI tạo:

- Một phản hồi duy nhất.
- Hay nhiều lựa chọn phản hồi.

MVP nên ưu tiên:

```text
One Suggested Reply
```

để đơn giản hóa giao diện và luồng Human Review.

---

# 3.3.7. Non-functional Requirements

## NFR01 – Performance

Các thao tác cơ bản cần phản hồi trong thời gian phù hợp.

Ví dụ:

- Mở Inbox.
- Mở Conversation.
- Lưu Knowledge Base.

AI Reply có thể mất nhiều thời gian hơn các thao tác thông thường, nhưng cần hiển thị trạng thái xử lý.

---

## NFR02 – Security

Hệ thống cần:

- Yêu cầu Authentication.
- Phân quyền theo Role.
- Tách dữ liệu giữa các Workspace.
- Bảo vệ dữ liệu người dùng.

---

## NFR03 – Reliability

Nếu AI Service gặp lỗi:

- Core Conversation System vẫn hoạt động.
- Không mất dữ liệu tin nhắn.
- Agent vẫn có thể phản hồi thủ công.

---

## NFR04 – Scalability

Thiết kế cần cho phép mở rộng:

- Nhiều Workspace.
- Nhiều Users.
- Nhiều Conversations.
- Nhiều Knowledge Entries.

---

## NFR05 – Usability

Giao diện cần:

- Đơn giản.
- Dễ đọc.
- Hiển thị rõ AI Analysis.
- Hiển thị rõ Priority.
- Giảm số thao tác khi Agent phản hồi.

---

# 3.3.8. Requirement Priority

## Must Have

Các yêu cầu bắt buộc cho MVP:

```text
Authentication
Workspace
Conversation Management
AI Intent Classification
Sentiment Analysis
Priority Detection
Knowledge Base CRUD
AI Reply Suggestion
Human Review
Basic Dashboard
```

---

## Should Have

Các yêu cầu có giá trị nhưng có thể phát triển sau:

```text
Conversation Assignment
Customer Tags
AI Feedback
Multiple Reply Styles
Agent chỉnh sửa AI Analysis
```

---

## Could Have

Các yêu cầu mở rộng:

```text
Multi-language
Knowledge Base Document Upload
Multiple AI Reply Options
Advanced Analytics
```

---

## Out of Scope

Không nằm trong phạm vi MVP:

```text
Full CRM
Automatic AI Reply
Shopify Integration
Facebook Integration
Instagram Integration
WhatsApp Integration
Advanced Business Intelligence
AI Self-training
```

---

# 3.3.9. Tóm tắt Requirement Analysis

```text
Product Discovery
        ↓
PRD
        ↓
Extract Requirements
        ↓
Functional Requirements
        +
Implicit Requirements
        ↓
Analyze Dependencies
        ↓
Gap Analysis
        ↓
Prioritize
        ↓
Validate
        ↓
User Stories & Acceptance Criteria
```

## Kết luận

Phân tích yêu cầu cho thấy ReplyMind không chỉ bao gồm chức năng tạo phản hồi bằng AI.

Để sản phẩm hoạt động đúng mục tiêu, hệ thống cần kết hợp:

1. **Conversation Management** để quản lý ngữ cảnh khách hàng.
2. **AI Analysis** để hiểu nội dung và mức độ quan trọng của tin nhắn.
3. **Knowledge Base** để cung cấp thông tin chính xác của thương hiệu.
4. **Brand Tone** để đảm bảo phong cách giao tiếp nhất quán.
5. **AI Reply Suggestion** để hỗ trợ Agent phản hồi nhanh hơn.
6. **Human Review** để con người kiểm soát phản hồi cuối cùng.

Các yêu cầu này sẽ là đầu vào trực tiếp cho phần tiếp theo:

> **3.4. User Stories & Acceptance Criteria**

Mục tiêu của bước tiếp theo là chuyển các yêu cầu thành những hành vi cụ thể theo góc nhìn của từng người dùng và xác định điều kiện có thể kiểm thử để xác nhận tính năng đã hoạt động đúng.
