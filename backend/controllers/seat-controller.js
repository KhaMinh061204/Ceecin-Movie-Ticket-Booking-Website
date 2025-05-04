import SeatModel from '../models/seat-model.js';  // Import model Seat


export const getSeatsByRoom = async (req, res) => {
  const { roomId } = req.params;

  let seats;
  try {
    seats = await SeatModel.find({ roomId });
    console.log(seats.length);
  } catch (err) {
    return console.error(err);
  }

  if (!seats || seats.length === 0) {
    return res.status(404).json({ message: 'No seats found for this room.' });
  }

  return res.status(200).json({ seats });
};

export const updateStatusSeat = async (req, res) => {
  try {
    const seatId = req.params.id; // Lấy ID từ params
    const action = req.query.action; // Lấy action từ query (select hoặc confirm)
    const seat = await SeatModel.findById(seatId);
    console.log(seat)
    if (!seat) {
      return res.status(404).json({ message: 'Seat not found' });
    }

    let newStatus;

        if (action === 'select') {
          if (seat.status === 'selected') {
            newStatus = 'available';
          } else if (seat.status === 'available') {
            newStatus = 'selected';
          } else {
            // Không cho phép thay đổi trạng thái nếu ghế đã booked
            return res.status(400).json({ message: 'Cannot change status of booked seat' });
          }
        } else {
          return res.status(400).json({ message: 'Invalid action' });
        }
    
        // Cập nhật trạng thái ghế
        const updatedSeat = await SeatModel.findByIdAndUpdate(
          seatId,
          { status: newStatus }, // Cập nhật trạng thái ghế
          { new: true, runValidators: true } // Trả về bản ghi đã cập nhật và bật validate
        );
    
        res.status(200).json(updatedSeat);
      } catch (error) {
        res.status(500).json({ message: 'Server error', error });
      }
    };
    