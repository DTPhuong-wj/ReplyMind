# 4.1 USER FLOW – REPLYMIND

## 1. Mục tiêu chính và kết quả mà Agent mong muốn đạt được

Mục tiêu chính của Agent khi làm việc trong ReplyMind là:

- Xử lý tin nhắn khách hàng nhanh chóng mà vẫn chính xác.
- Nhận được gợi ý phản hồi do AI tạo ra dựa trên intent, sentiment, mức độ ưu tiên và thông tin từ Knowledge Base.
- Kiểm tra, chỉnh sửa và phê duyệt câu trả lời trước khi gửi.
- Gửi phản hồi phù hợp với tone thương hiệu và chính sách doanh nghiệp.
- Đảm bảo không có phản hồi nào được AI tự động gửi mà không có sự phê duyệt của Agent.

Kết quả thành công:

- Tin nhắn khách hàng được tiếp nhận và phản hồi trong thời gian ngắn.
- Câu trả lời được Agent kiểm tra và gửi đi với sự đồng thuận về tính chính xác, thương hiệu và tính phù hợp.
- Dữ liệu feedback, rating Helpful/Not Helpful và lý do được lưu lại để phục vụ kiểm soát chất lượng AI và dashboard.

---

## 2. Primary User Flow – Luồng người dùng chính

### Luồng chính dưới dạng bảng

| Bước | Hành động của Agent | Phản hồi của hệ thống | Quyết định / Điều kiện |
|---|---|---|---|
| 1 | Agent mở Inbox và chọn tin nhắn mới từ khách hàng, ví dụ: “Đơn LUM-88421 bị trừ tiền 2 lần!” | Hệ thống hiển thị hội thoại đầy đủ, thông tin khách hàng, đơn hàng, trạng thái đơn, và một cảnh báo/tín hiệu mới nhận tin nhắn | Nếu tin nhắn là mới và chưa được xử lý, hệ thống kích hoạt luồng AI. |
| 2 | Agent đọc nội dung tin nhắn và xác nhận cần xử lý | ReplyMind tự động phân tích Intent, Sentiment và Priority bằng AI (F02). Hệ thống hiển thị nhãn như: Refund request / Billing issue, Negative sentiment, High priority | Nếu intent rõ ràng, hệ thống tiếp tục. Nếu intent mơ hồ, Agent có thể bổ sung thông tin hoặc xem context. |
| 3 | Agent xem thông tin AI phân tích để hiểu mức độ khẩn cấp và tình huống | Hệ thống hiển thị tóm tắt: issue type, mức độ ưu tiên, cảm xúc khách hàng và biểu hiện rủi ro (ví dụ: churn risk, urgent issue) | Nếu Priority = cao hoặc Sentiment = tiêu cực mạnh, hệ thống ưu tiên xử lý nhanh hơn và có thể cảnh báo cần theo dõi. |
| 4 | Agent xem các tài liệu liên quan được AI truy vấn từ Knowledge Base bằng RAG (F03) | Hệ thống trả về các thông tin phù hợp từ KB: chính sách hoàn tiền, chính sách trừ tiền, xử lý trừ nhầm, SLA, quy trình giải quyết | Nếu KB có kết quả phù hợp, AI dùng làm cơ sở cho câu trả lời. Nếu không, Agent có thể tự kiểm tra hoặc chuyển xử lý. |
| 5 | Agent xem AI Reply Suggestion được tạo theo Brand Tone (F04, F05) | Hệ thống hiển thị bản soạn thảo phản hồi: lời chào, lời xin lỗi, giải thích nguyên nhân, thông tin xử lý, lời hứa hành động tiếp theo, tone tương ứng với thương hiệu | Nếu câu trả lời phù hợp, Agent tiếp tục review. Nếu không, Agent chỉnh sửa hoặc yêu cầu AI tạo lại. |
| 6 | Agent review câu trả lời và kiểm tra tính chính xác, độ phù hợp chính sách, độ tin cậy và tone thương hiệu | Hệ thống cung cấp bản preview, so sánh với chính sách KB, highlight các điểm cần xem lại, và có thể gợi ý các câu chỉnh sửa | Quyết định: Chấp nhận / Chỉnh sửa / Từ chối gợi ý và tự soạn. |
| 7 | Agent chọn một trong các hành động: Accept & Send, Edit before Send, hoặc Reject suggestion | Hệ thống chấp nhận thay đổi, cập nhật câu trả lời cuối cùng trong composer, hiển thị trạng thái “Ready to send” | AI không được phép tự động gửi. Agent là người quyết định cuối cùng. |
| 8 | Agent gửi phản hồi cho khách hàng bằng 1-Click Send (F01) | Hệ thống gửi phản hồi đến khách hàng và chuyển trạng thái hội thoại sang “Đã phản hồi / Chờ khách hàng xác nhận” | Sau khi gửi, Agent không còn quyền tự động tái tạo mà chỉ có thể theo dõi phản hồi tiếp theo. |
| 9 | Agent đánh giá chất lượng phản hồi AI (F06) | Hệ thống hiển thị câu hỏi: Helpful / Not Helpful? Nếu Not Helpful, cho phép chọn lý do và tự soạn phản hồi | Nếu đánh giá Helpful → lưu vào đánh giá AI. Nếu Not Helpful → lưu lý do, ghi nhận phản hồi thủ công, hỗ trợ cải thiện model. |
| 10 | Hệ thống ghi nhận dữ liệu để phục vụ Dashboard và kiểm soát chất lượng (F07) | Dữ liệu về intent, sentiment, priority, resolution path, feedback, thời gian xử lý, và hiệu suất AI được lưu vào analytics | Nếu dữ liệu đủ điều kiện, dashboard hiển thị KPI, hiệu suất Agent, và chất lượng AI. |

---

## 3. Luồng chính dạng mô tả tuần tự

Bắt đầu → Agent nhận tin nhắn mới trong Inbox → AI phân tích Intent / Sentiment / Priority → AI truy vấn Knowledge Base bằng RAG → AI tạo AI Reply Suggestion theo Brand Tone → Agent Review → Chấp nhận / Chỉnh sửa / Từ chối → Gửi phản hồi bằng 1-Click Send → Thành công → Feedback và lưu dữ liệu cho Dashboard

Cụ thể hơn:

Bắt đầu → Nhận tin nhắn → Đọc và xác định nhu cầu → AI phân tích → AI dò KB → AI tạo draft → Agent review → Agent chấp nhận/chỉnh sửa → Agent gửi → Khách hàng nhận phản hồi → Agent đánh giá Helpful / Not Helpful → Lưu dữ liệu cho Dashboard → Thành công

---

## 4. Phân biệt vai trò AI và Human Agent

### Vai trò của AI
- Phân tích intent, sentiment và priority của tin nhắn khách hàng.
- Truy vấn Knowledge Base theo RAG để tìm thông tin chính sách, quy trình và tài liệu hỗ trợ.
- Áp dụng Brand Tone đã cấu hình cho thương hiệu.
- Đề xuất câu trả lời gợi ý dựa trên dữ liệu và quy tắc.
- Khuyến nghị điều hướng xử lý khi tin nhắn phức tạp hoặc rủi ro cao.

### Vai trò của Human Agent
- Đọc và hiểu bối cảnh tin nhắn trong hội thoại thực tế.
- Kiểm tra độ chính xác và tính hợp lệ của câu trả lời AI.
- Chỉnh sửa nội dung theo tình huống thực tế, thông tin cá nhân hóa, hoặc trường hợp ngoại lệ.
- Quyết định cuối cùng trước khi gửi phản hồi.
- Đánh giá phản hồi AI và cung cấp feedback để cải thiện hệ thống.

### Ràng buộc quan trọng
- AI không được phép tự động gửi phản hồi thay Agent.
- Agent vẫn là người chịu trách nhiệm cuối cùng với chất lượng phản hồi khách hàng.

---

## 5. Điểm bắt đầu và trạng thái thành công

### Điểm bắt đầu
- Agent đăng nhập vào ReplyMind Inbox và có một tin nhắn mới hoặc đang mở một cuộc hội thoại đang chờ phản hồi.
- Tin nhắn mới có thể là khiếu nại, hỏi thông tin, vấn đề thanh toán, hủy đơn, đổi trả, câu hỏi vận chuyển, v.v.

### Trạng thái thành công
- Tin nhắn đã được xử lý bằng AI gợi ý và Agent đã phê duyệt.
- Câu trả lời đã được gửi thành công đến khách hàng.
- Feedback AI đã được lưu lại.
- Dữ liệu xử lý đã được ghi nhận vào dashboard phục vụ giám sát hiệu suất và cải tiến QA.

---

## 6. Thông tin / bằng chứng hỗ trợ cho luồng này

Các thông tin và bằng chứng được cung cấp trực tiếp từ đề bài hỗ trợ cho luồng trên:

- ReplyMind là hệ thống SaaS hỗ trợ phản hồi khách hàng bằng AI cho thương hiệu D2C.
- Agent là người dùng mục tiêu và mục tiêu của họ là xử lý nhanh và chính xác tin nhắn khách hàng bằng AI Reply Suggestion.
- Bối cảnh cho thấy Agent đang làm việc trên ReplyMind Inbox và nhận được tin nhắn mới từ khách hàng.
- Yêu cầu chức năng chính bao gồm: F01 Quản lý hội thoại, F02 AI phân tích Intent / Sentiment / Priority, F03 RAG truy vấn Knowledge Base, F04 AI Reply Suggestion, F05 Brand Tone, F06 AI Feedback, F07 ghi dữ liệu dashboard.
- Các yêu cầu cho luồng cho thấy Agent kiểm tra/chỉnh sửa câu trả lời trước khi gửi, lưu feedback và không cho phép AI tự động gửi.
- Ví dụ tin nhắn “Đơn LUM-88421 bị trừ tiền 2 lần!” phù hợp với luồng xử lý khiếu nại thanh toán có mức độ ưu tiên cao và cần truy vấn KB.

=> Đây là bằng chứng đủ để xây dựng luồng người dùng tập trung vào “Agent đọc tin nhắn → AI hỗ trợ → Agent review → Agent gửi”.

---

## 7. Giả định đã được đưa ra

Các giả định hợp lý dựa trên đề bài:

- Agent có quyền truy cập vào Inbox và có thể xem tin nhắn khách hàng cùng context đơn hàng liên quan.
- AI có thể truy cập dữ liệu khách hàng và Knowledge Base phù hợp để phân tích và gợi ý.
- Brand Tone đã được cấu hình sẵn cho từng thương hiệu D2C.
- AI có thể phân tích intent, sentiment và priority từ nội dung tin nhắn.
- Agent muốn xử lý nhanh nhưng vẫn phải duyệt câu trả lời trước khi gửi.
- Feedback Helpful / Not Helpful sẽ được ghi nhận và đem vào cải thiện AI và QA.

---

## 8. Giả định cần Human Agent hoặc Product Team kiểm tra

Các giả định sau cần được xác minh rõ bởi Agent/Team Product trước khi triển khai thực tế:

- Mức độ độ tin cậy của AI phân tích intent/sentiment/priority đối với tiếng Việt và các trường hợp nhắn tin ngắn, thiếu ngữ cảnh.
- Kiến thức và dữ liệu Knowledge Base có đầy đủ để hỗ trợ các tình huống phức tạp hay không.
- Có cần xác thực quyền truy cập data khách hàng và dữ liệu đơn hàng trong từng brand hay không.
- Brand Tone có được định nghĩa rõ và thực thi ổn định trong các tình huống khẩn cấp, khiếu nại, hay phản hồi cảm xúc mạnh.
- AI có nên hiển thị “gợi ý chỉnh sửa” dựa trên điểm cần xem lại hay không, hoặc chỉ hiển thị bản draft đơn giản.
- Nếu Agent đánh giá Not Helpful, hệ thống có cần yêu cầu Agent tự soạn hoặc cho phép tạo tiếp draft mới không.
- Thời gian phản hồi tối ưu và SLA cho từng mức độ ưu tiên cần được định nghĩa cụ thể.
- Có cần có cơ chế ngoại lệ cho các trường hợp rủi ro pháp lý, chính sách bảo mật, hoặc khuyến nghị nhân sự xử lý.
- Cần có kiểm soát “handoff” khi tin nhắn quá phức tạp hoặc khách hàng có mức độ nguy hiểm cao.

---

## 9. Phân biệt rõ giữa thông tin được cung cấp, giả định và đề xuất của AI

### A. Thông tin được cung cấp (Given)
- ReplyMind là SaaS AI hỗ trợ phản hồi khách hàng.
- Người dùng mục tiêu là Agent CSKH.
- Agent cần xử lý nhanh và chính xác.
- Các chức năng F01–F07 đã được liệt kê.
- Không cho phép AI tự động gửi thay Agent.
- Feedback được lưu để nâng cấp AI và dashboard.

### B. Giả định (Assumption)
- AI có thể phân tích tri thức từ tin nhắn ngắn và context liên quan.
- KB và data thương hiệu đã có sẵn và cập nhật đủ.
- Agent sẽ chấp nhận cơ chế review trước khi gửi.
- Một số trường hợp cần chỉnh sửa thủ công hoặc tạo lại AI draft.

### C. Đề xuất của AI / đề xuất thiết kế
- Luồng nên bắt đầu bằng Inbox → AI Analysis → KB retrieval → Draft response → Human Review → Send.
- Nên tách rõ “AI suggestion” và “Agent final decision”.
- Nên có 1-Click Send nhưng chỉ khi Agent đã phê duyệt.
- Nên có cơ chế feedback Helpful/Not Helpful với lý do rõ ràng.
- Nên có trạng thái “AI draft generated”, “Agent edited”, “Sent”, “Queued for follow-up” để dễ theo dõi dữ liệu dashboard.

---

## 10. Kết luận ngắn

Luồng người dùng chính của ReplyMind nên được thiết kế theo mô hình “AI hỗ trợ – Human phê duyệt – Agent gửi”. Đây là mô hình hợp lý cho môi trường CSKH D2C vì nó kết hợp tốc độ xử lý của AI với sự kiểm soát chất lượng và trách nhiệm của con người. Điều quan trọng là AI chỉ đóng vai trò hỗ trợ, không thay thế quyết định của Agent, đồng thời thu thập feedback để cải thiện hiệu suất và QA liên tục.
