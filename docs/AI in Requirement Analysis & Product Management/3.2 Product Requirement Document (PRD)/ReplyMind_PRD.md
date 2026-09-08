# 3.2 Product Requirement Document (PRD) – ReplyMind

**Hệ thống hỗ trợ phản hồi khách hàng cho thương hiệu D2C (Direct-to-Consumer)**  
*Định hướng sản phẩm Web-first và thuộc nhóm AI & Automation*

---

### 3.2.1 Mục tiêu sản phẩm (Product Objectives)

* **Tối ưu thời gian xử lý:** Giảm 60-80% thời gian phản hồi các câu hỏi lặp lại cho đội ngũ CSKH D2C.
* **Đảm bảo chất lượng & Bản sắc thương hiệu:** AI tự động đề xuất câu phản hồi chính xác chính sách và chuẩn phong cách (Brand Tone) của thương hiệu.
* **Phát hiện ưu tiên:** Tự động phát hiện các tin nhắn tiêu cực, khẩn cấp hoặc khiếu nại để ưu tiên xử lý sớm nhất.
* **Cơ chế AI Co-pilot (Human-in-the-Loop):** `AI phân tích tin nhắn` $\rightarrow$ `AI đề xuất phản hồi` $\rightarrow$ `Nhân viên kiểm duyệt/chỉnh sửa` $\rightarrow$ `Gửi khách hàng`.

---

### 3.2.2 Đối tượng người dùng (Target Users)

1. **Nhân viên phản hồi (Agent):** Xem danh sách hội thoại, nhận gợi ý từ AI, chỉnh sửa và gửi phản hồi cho khách hàng chỉ với 1 click.
2. **Người quản lý CSKH (Manager):** Theo dõi các hội thoại, quản lý Knowledge Base, kiểm tra các vấn đề phổ biến và đánh giá hiệu quả làm việc.
3. **Người quản trị thương hiệu (Admin):** Cấu hình thông tin thương hiệu, thiết lập phong cách văn phong (Brand Tone), quản lý tài khoản nhân viên và theo dõi báo cáo tổng quan.

---

### 3.2.3 Phạm vi sản phẩm (Product Scope)

#### A. Trong phạm vi MVP (Minimum Viable Product)
1. **Quản lý hội thoại:** Danh sách hội thoại, nội dung tin nhắn, trạng thái xử lý và tìm kiếm.
2. **Phân tích AI:** Tự động phân tích Intent, Sentiment và Priority của tin nhắn.
3. **Knowledge Base:** Kho lưu trữ bài viết chính sách vận chuyển, đổi trả, hoàn tiền và FAQ thương hiệu.
4. **AI Reply Suggestion:** AI tạo câu trả lời gợi ý theo đúng tin nhắn, Knowledge Base và Brand Tone.
5. **Brand Tone Engine:** Cấu hình tone mặc định (Friendly, Professional, Casual, Formal).
6. **AI Feedback:** Thu thập đánh giá 👍 Helpful / 👎 Not Helpful kèm lý do từ nhân viên.
7. **Dashboard thống kê:** Báo cáo tổng số hội thoại, tỷ lệ xử lý, phân bổ Intent/Sentiment và chỉ số dùng AI.

#### B. Ngoài phạm vi MVP
* Tự động trả lời 100% không cần nhân viên kiểm duyệt (Auto-pilot).
* Tích hợp đa kênh mạng xã hội trực tiếp (Omnichannel APIs).
* Hệ thống CRM hoàn chỉnh và phân tích dữ liệu chuyên sâu.

---

### 3.2.4 Tính năng chi tiết (Detailed Feature Requirements)

* **F01. Quản lý hội thoại (Conversation Management):**
  * Xem danh sách hội thoại, xem chi tiết tin nhắn, lọc theo trạng thái (`UNHANDLED`, `RESOLVED`), tìm kiếm và đánh dấu đã xử lý.

* **F02. Phân tích tin nhắn bằng AI (Message AI Analysis):**
  * **Intent Classification (7 loại):** `ORDER_STATUS`, `SHIPPING`, `DELIVERY_ISSUE`, `RETURN`, `REFUND`, `PRODUCT_QUESTION`, `COMPLAINT`.
  * **Sentiment Analysis (3 mức):** `POSITIVE` (Tích cực), `NEUTRAL` (Trung lập), `NEGATIVE` (Tiêu cực).
  * **Priority Detection (4 mức):** `LOW`, `MEDIUM`, `HIGH`, `URGENT` (Khẩn cấp).

* **F03. Knowledge Base thương hiệu (Knowledge Base Management):**
  * Lưu trữ và quản lý bài viết chính sách (Vận chuyển, Đổi trả, Hoàn tiền, Thông số SP, FAQ). Quản trị viên có quyền Thêm, Sửa, Xóa thông tin.

* **F04. AI Reply Suggestion (Gợi ý phản hồi từ AI):**
  * AI sử dụng nội dung tin nhắn + Lịch sử hội thoại + Bài viết KB phù hợp + Brand Tone để tạo câu trả lời gợi ý. Hỗ trợ 1-Click Send và chỉnh sửa nhanh.

* **F05. Brand Tone (Cấu hình phong cách thương hiệu):**
  * Hỗ trợ 4 phong cách giọng văn: `Friendly` (Thân thiện), `Professional` (Chuyên nghiệp), `Casual` (Gần gũi, tự nhiên), `Formal` (Trang trọng).

* **F06. AI Feedback (Đánh giá chất lượng AI):**
  * Nhân viên đánh giá 👍 `Helpful` hoặc 👎 `Not Helpful` (kèm chọn lý do: *Incorrect information*, *Wrong tone*, *Not relevant*) để huấn luyện nâng cao chất lượng AI.

* **F07. Dashboard (Báo cáo thống kê):**
  * Hiển thị tổng số hội thoại, hội thoại chưa xử lý/đã xử lý, phân bổ Intent/Sentiment, tỷ lệ sử dụng AI (% Adoption Rate) và điểm chất lượng AI Helpful Score.

---

### 3.2.5 Yêu cầu phi chức năng (Non-Functional Requirements)

* **Hiệu suất (Performance):** Thao tác giao diện phản hồi nhanh (< 200ms); AI Suggestion được tạo trong thời gian hợp lý (< 2 giây).
* **Bảo mật (Security):** Bắt buộc đăng nhập hệ thống, mã hóa mật khẩu, phân quyền chặt chẽ (RBAC) và cách ly tuyệt đối dữ liệu giữa các thương hiệu D2C (Multi-tenant data isolation).
* **Khả năng mở rộng (Scalability):** Thiết kế sẵn sàng mở rộng thêm thương hiệu, thêm nhân viên và kết nối các kênh nhắn tin D2C.
* **Trải nghiệm người dùng (UX/UI):** Giao diện Web-first hiện đại, hiển thị nổi bật các tin nhắn ưu tiên cao (`URGENT`), thao tác 1-click đơn giản.

---

### 3.2.6 Tiêu chí hoàn thành (Acceptance Criteria)

* **Conversation:** Người dùng có thể xem, tìm kiếm và quản lý trạng thái hội thoại.
* **AI Analysis:** Phân tích chính xác Intent, Sentiment và Priority của tin nhắn đầu vào.
* **Knowledge Base:** Thêm, sửa, xóa thành công các bài viết chính sách thương hiệu.
* **AI Reply Suggestion:** AI tạo được gợi ý câu trả lời khớp nội dung KB và đúng Brand Tone đã cấu hình.
* **Human Review & Feedback:** Nhân viên chỉnh sửa được câu trả lời trước khi gửi và thực hiện đánh giá 👍 / 👎 cho AI.
* **Dashboard:** Quản lý xem được đầy đủ các chỉ số thống kê hoạt động CSKH và chất lượng AI.
