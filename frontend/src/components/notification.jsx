import React from 'react'; 
function Notification() {
    const notifications = [
      {
        date: "12/12/2024",
        message: "Bạn đã thanh toán thành công 2 vé xem phim Công từ Bạc Liêu",
        icon: "🔔",
      },
      {
        date: "10/12/2024",
        message: "Giáng sinh đến rồi! Hàng ngàn ưu đãi đang chờ bạn đó!",
        icon: "🔔",
      },
      {
        date: "10/12/2024",
        message: "Thứ 4 vui vẻ, GẤP ĐÔI quà tặng VNPAY-QR. Tặng bạn ưu đãi khủng áp dụng...",
        icon: "🔔",
      },
      { date: "10/12/2024", message: "MOANA 2 COMBO", icon: "🔔" },
      {
        date: "10/12/2024",
        message: "Xem LINH MIÊU, ngàn voucher cực chill",
        icon: "🔕",
      },
      {
        date: "10/12/2024",
        message: "DANH SÁCH CÁC RẠP PHỤC VỤ MÓN ĂN NÓNG",
        icon: "🔕",
      },
    ];
  
    return (
      <section
        className="gap20 flex f-col"
        style={{ transform: "translateY(-100px)", padding: "0 5%" }}
      >
        {notifications.map((note, index) => (
          <div
            key={index}
            className="flex f-col cenhor w-100 mb-15"
            style={{
              border: "1px solid white",
              borderRadius: "5px",
              backgroundColor: "#ffffff3d",
              padding: "10px 15px",
              display: "inline-block", // Đảm bảo chiều rộng tự động điều chỉnh theo nội dung
              width: "auto",  // Tự động co giãn theo nội dung
              margin: "10px", // Giữ khoảng cách giữa các thông báo
            }}
          >
            <div
              className="flex w-100"
              style={{
                borderBottom: "1px solid white",
                fontSize: "14px",
                color: "white",
                paddingBottom: "5px",
                marginBottom: "5px",
                textAlign: "center", // Canh giữa ngày
              }}
            >
              <p style={{ fontSize: "16px", fontWeight: "bold" }}>{note.date}</p>
            </div>
            <div
              className="flex"
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                color: "white",
              }}
            >
              <span style={{ fontSize: "18px", color: "#ff5c8d" }}>
                {note.icon}
              </span>
              <p style={{ fontSize: "14px", margin: 0 }}>{note.message}</p>
            </div>
          </div>
        ))}
      </section>
    );
  }
  
  export default Notification;
  