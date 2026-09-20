# 4.2 ALTERNATIVE USER FLOWS – REPLYMIND

## 1. Mục đích

Dựa trên Primary User Flow của ReplyMind, phần này khám phá các luồng thay thế khi Agent xử lý các tình huống thực tế khác nhau trong Inbox. Mỗi luồng đều giữ nguyên nguyên tắc: AI hỗ trợ, Human Agent vẫn là người quyết định cuối cùng, và phản hồi chỉ được gửi sau khi Agent kiểm tra và phê duyệt.

---

## 2. Bối cảnh 1 — AI Suggestion phù hợp

### Tình huống:
AI tìm thấy thông tin phù hợp trong Knowledge Base, câu trả lời khớp với Brand Tone và chính sách của thương hiệu. Đây là trường hợp hiệu quả nhất của hệ thống.

### Luồng:
Bắt đầu → Agent mở tin nhắn mới → AI phân tích Intent / Sentiment / Priority → AI truy vấn Knowledge Base → AI tạo AI Reply Suggestion phù hợp → Agent Review → Chấp nhận → Gửi → Thành công

### Điểm khác với Primary Flow:
- Không cần chỉnh sửa lớn.
- Agent chủ yếu thực hiện review nhanh và xác nhận.
- AI đóng vai trò chính trong việc tạo draft.

### Lợi ích:
- Tăng tốc độ xử lý tin nhắn.
- Giảm thời gian thao tác của Agent.
- Duy trì tính nhất quán theo Brand Tone và chính sách.

### Trade-off / Rủi ro:
- Nếu Knowledge Base không đầy đủ hoặc dữ liệu cũ, AI có thể đưa ra câu trả lời “đúng hình thức nhưng không chính xác về nội dung”.
- Agent có thể bị quá tin vào AI và bỏ qua kiểm tra sơ bộ.

---

## 3. Bối cảnh 2 — AI Suggestion cần chỉnh sửa

### Tình huống:
AI tạo ra một câu trả lời hợp lệ nhưng cần được chỉnh sửa về cách diễn đạt, mức độ lịch sự, hoặc thêm thông tin cá nhân hóa cho khách hàng.

### Luồng:
Bắt đầu → Agent đọc tin nhắn → AI phân tích và đề xuất draft → Agent Review → Agent chỉnh sửa nội dung / cá nhân hóa / loại bỏ thông tin thừa → Gửi → Thành công

### Điểm khác với Primary Flow:
- Không ở trạng thái “Accept as is”; Agent phải sửa trước khi gửi.
- Luồng này đòi hỏi nhiều tương tác hơn giữa Agent và AI draft.

### Lợi ích:
- Câu trả lời vẫn nhanh hơn so với viết thủ công hoàn toàn.
- Agent có thể tùy chỉnh dựa trên bối cảnh thực tế và khuyến nghị cá nhân hóa.
- Giảm nguy cơ sai lệch về tone và thông tin.

### Trade-off / Rủi ro:
- Nếu Agent chỉnh sửa quá nhiều, lợi ích của AI có thể bị giảm.
- Nếu UI không hỗ trợ sửa dễ dàng, Agent có thể mất thời gian hơn so với viết tay.

---

## 4. Bối cảnh 3 — AI Suggestion không phù hợp

### Tình huống:
AI tạo ra thông tin sai, tone không phù hợp, thiếu ngữ cảnh, hoặc không giải quyết đúng vấn đề khách hàng đang gặp.

### Luồng:
Bắt đầu → Agent nhận tin nhắn → AI phân tích / đề xuất draft → Agent Review → Không Helpful → Chọn lý do (Incorrect Info / Wrong Tone / Không phù hợp với tình huống / Không đủ thông tin) → Tự soạn phản hồi → Gửi → Thành công

### Điểm khác với Primary Flow:
- Agent không sử dụng draft AI làm cơ sở.
- Cần thêm bước feedback và chọn nguyên nhân không hữu ích.
- Đây là luồng cần human intervention cao nhất khi AI không đáp ứng đủ.

### Lợi ích:
- Giữ chất lượng phản hồi tốt và tránh gửi sai thông tin.
- Thu thập dữ liệu feedback để cải thiện AI và KB.
- Tăng khả năng kiểm soát chất lượng qua lý do không hữu ích.

### Trade-off / Rủi ro:
- Tăng thời gian xử lý tin nhắn.
- Nếu AI sai thường xuyên, Agent sẽ mất niềm tin và có thể không dùng tiếp.
- Nếu không có cơ chế ghi nhận nguyên nhân rõ ràng, khó cải thiện model.

---

## 5. Bối cảnh 4 — Tin nhắn có mức độ ưu tiên cao

### Tình huống:
Tin nhắn có Sentiment Negative và Priority High/Urgent. Ví dụ: khách hàng nói “đơn hàng bị trừ tiền 2 lần” hoặc có dấu hiệu phàn nàn mạnh, có nguy cơ churn, hoặc có vấn đề cần xử lý ngay.

### Luồng:
Bắt đầu → Agent nhận tin nhắn ưu tiên cao → AI phân tích Sentiment / Priority / Risk → Hệ thống cảnh báo khẩn cấp → Agent xem thêm context và thông tin KB → AI đề xuất reply theo mức ưu tiên → Agent Review cẩn thận → Chấp nhận hoặc chỉnh sửa → Gửi phản hồi nhanh nhưng chính xác → Thành công

### Điểm khác với Primary Flow:
- Priority cao làm tăng mức độ quan sát và kiểm tra trước khi gửi.
- Hệ thống cần ưu tiên và có thể cảnh báo sớm hơn.
- Có thể cần thêm bước rà soát khẩn cấp, điều phối, hoặc escalation nếu tình huống quá nghiêm trọng.

### Lợi ích:
- Giảm rủi ro phản hồi chậm hoặc sai khi khách hàng đang bất mãn.
- Hỗ trợ Agent xử lý tình huống nhạy cảm đúng mức ưu tiên.
- Tăng độ tin cậy của hệ thống trong trường hợp tin nhắn quan trọng.

### Trade-off / Rủi ro:
- Nếu hệ thống cảnh báo quá nhiều, Agent có thể bị quá tải và mất tập trung.
- Nếu Priority được đánh giá sai, phản hồi có thể bị xử lý quá chậm hoặc quá mức.
- Các trường hợp High Priority có thể cần thêm review thủ công hơn mức bình thường.

---

## 6. Bối cảnh 5 — Người dùng có nhu cầu khác nhau

### 6.1 Tin nhắn đơn giản, có câu trả lời rõ ràng trong KB

#### Tình huống:
Tin nhắn yêu cầu thông tin phổ biến mà KB đã cung cấp sẵn. Ví dụ: thời gian giao hàng, chính sách đổi trả cơ bản, trạng thái thanh toán đơn giản.

#### Luồng:
Bắt đầu → Agent đọc tin nhắn → AI truy vấn KB → AI trả về gợi ý rõ ràng → Agent Review → Chấp nhận → Gửi → Thành công

#### Điểm khác với Primary Flow:
- Agent cần ít can thiệp hơn.
- Đây là luồng tối ưu nhất cho hiệu quả và tốc độ.

#### Lợi ích:
- Xử lý nhanh.
- Tăng throughput cho Agent.
- Giảm workload thủ công.

#### Trade-off / Rủi ro:
- Có thể bỏ qua các trường hợp phức tạp nhưng “bề ngoài” giống đơn giản.
- Nếu AI dùng mẫu quá cố định, câu trả lời có thể quá máy móc.

### 6.2 Tin nhắn phức tạp cần Agent kiểm tra thêm

#### Tình huống:
Khách hàng có nhiều câu hỏi gắn với đơn hàng, cuộc trò chuyện dài, hoặc cần tham vấn thêm thông tin ngoài KB.

#### Luồng:
Bắt đầu → Agent đọc nội dung phức tạp → AI phân tích context → AI đề xuất draft → Agent kiểm tra thêm dữ liệu đơn hàng / hội thoại trước đó / trạng thái hệ thống → Chỉnh sửa / bổ sung → Gửi → Thành công

#### Điểm khác với Primary Flow:
- Agent cần làm thêm bước xác minh thông tin liên quan.
- AI chỉ đóng vai trò hỗ trợ, không thay thế quyết định.

#### Lợi ích:
- Bảo vệ chất lượng phản hồi trong trường hợp khó.
- Giảm sai sót do thiếu thông tin.

#### Trade-off / Rủi ro:
- Tăng thời gian xử lý.
- Nếu Agent phải kiểm tra quá nhiều context, hiệu quả AI bị giảm.

### 6.3 Tin nhắn mà Knowledge Base không cung cấp đủ thông tin

#### Tình huống:
Khách hàng hỏi về trường hợp bên ngoài chính sách hoặc cần quyết định theo tình huống cụ thể.

#### Luồng:
Bắt đầu → Agent đọc tin nhắn → AI không tìm thấy thông tin phù hợp trong KB → Agent đánh giá cần thêm thông tin / handoff / tự soạn → Chọn phản hồi dựa trên quy tắc nội bộ hoặc chuyển lên người phụ trách → Gửi → Thành công

#### Điểm khác với Primary Flow:
- Không có AI draft hoàn chỉnh, hoặc draft rất yếu.
- Agent phải lao vào bước tự soạn / escalate.

#### Lợi ích:
- Tránh các phản hồi sai lệch vì AI cố gắng “đoán”.
- Tăng tính an toàn và chính xác cho trường hợp chưa có dữ liệu.

#### Trade-off / Rủi ro:
- Tăng thời gian xử lý.
- Nếu không có lộ trình handoff rõ ràng, có thể tạo tình trạng chậm phản hồi.

---

## 7. Bảng tổng hợp Alternative User Flows

| Bối cảnh | Tình trạng AI | Hành động của Agent | Kết quả | Trade-off |
|---|---|---|---|---|
| AI phù hợp | AI tìm thấy thông tin đúng, tone đúng | Review → Chấp nhận → Gửi | Phản hồi nhanh, phù hợp, hiệu quả cao | Rủi ro nếu Agent quá tin AI và bỏ qua review |
| Cần chỉnh sửa | AI tạo draft nhưng cần sửa | Review → Chỉnh sửa → Gửi | Phản hồi vẫn nhanh nhưng có cá nhân hóa | Nếu sửa quá nhiều, mất hiệu quả AI |
| Không phù hợp | AI đưa ra thông tin sai hoặc tone không phù hợp | Not Helpful → Chọn lý do → Tự soạn → Gửi | Chất lượng phản hồi đảm bảo, AI được feedback | Tăng thời gian xử lý |
| Priority cao | AI có thể gợi ý nhanh nhưng cần xác minh cẩn thận | Review sâu hơn, ưu tiên xử lý, kiểm tra lại chính sách | Giảm rủi ro khi khách hàng đang khó chịu | Có thể làm chậm phản hồi nếu check quá nhiều |
| Thiếu thông tin | KB không đủ dữ liệu | Tự soạn / escalade / cần thêm context | Tránh trả lời sai | Tăng thời gian và workload |

---

## 8. Trả lời các câu hỏi

### 1) Luồng nào cần ít sự can thiệp của Agent nhất?
Luồng AI phù hợp cần ít sự can thiệp nhất. Đây là trường hợp AI tìm được thông tin đúng, tone phù hợp và Agent chỉ cần review nhanh rồi chấp nhận và gửi.

### 2) Luồng nào cần Human Review nhiều nhất?
Luồng AI không phù hợp và luồng tin nhắn Priority cao cần Human Review nhiều nhất. Trong cả hai trường hợp, Agent phải kiểm tra chi tiết, xác minh thông tin, và đôi khi tự soạn phản hồi.

### 3) Những giả định nào cần được kiểm chứng?
Các giả định cần kiểm chứng bao gồm:
- AI có thể phân tích intent, sentiment và priority chính xác trong các tình huống thực tế.
- Knowledge Base có đầy đủ dữ liệu và cập nhật cho các tình huống phổ biến.
- Brand Tone có thể được áp dụng nhất quán trong các answers AI tạo ra.
- Agent cần có quyền Review và chỉnh sửa trước khi gửi.
- Feedback Helpful/Not Helpful và lý do không phù hợp sẽ được ghi nhận đúng cách.

> Lưu ý: Đây là giả định nếu không có bằng chứng thực tế từ dữ liệu hoặc nghiên cứu người dùng.

### 4) Cần dữ liệu thực tế nào để xác nhận các Alternative Flows này?
Cần các dữ liệu sau để xác nhận tính khả thi của các Alternative Flows:
- Tỷ lệ tin nhắn nào AI suggestion phù hợp / cần chỉnh sửa / không phù hợp.
- Tỷ lệ tin nhắn theo mức độ Priority và Sentiment.
- Hiệu suất của Knowledge Base trong việc trả về thông tin đúng cho từng loại vấn đề.
- Thời gian xử lý trung bình cho từng loại luồng.
- Tỷ lệ Agent chấp nhận, chỉnh sửa hoặc tự soạn phản hồi.
- Tỷ lệ Not Helpful và các lý do phổ biến: Incorrect Info, Wrong Tone, không phù hợp tình huống, không đủ thông tin.
- Dữ liệu về sự cố hoặc escalations khi KB thiếu thông tin.

> Không có dữ liệu nghiên cứu người dùng được cung cấp trong yêu cầu, nên các thông tin trên là giả định cần được kiểm chứng bằng dữ liệu sản phẩm thực tế hoặc phân tích hội thoại trong hệ thống.

---

## 9. Kết luận

Các Alternative User Flows cho ReplyMind cho thấy AI đóng vai trò rất mạnh trong việc giảm thời gian xử lý, nhưng vai trò của Human Agent luôn quan trọng trong các tình huống cần xác minh, chỉnh sửa hoặc tự soạn phản hồi. Sự khác biệt lớn nhất giữa các luồng là mức độ phụ thuộc vào AI và mức độ kiểm tra cần thiết trước khi gửi. Vì vậy, thiết kế tốt nhất là giữ AI ở vị trí hỗ trợ, không tự động gửi, và cho phép Agent dễ dàng review, chỉnh sửa, hoặc thay thế draft bằng phản hồi thủ công khi cần.
