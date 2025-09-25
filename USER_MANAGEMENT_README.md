# User Management System

## Tổng quan
Hệ thống quản lý người dùng đã được tích hợp vào dashboard admin với đầy đủ các tính năng CRUD (Create, Read, Update, Delete) tương tự như quản lý sản phẩm.

## Tính năng chính

### 1. Danh sách người dùng (UserList)
- **Xem danh sách**: Hiển thị tất cả người dùng với thông tin cơ bản
- **Tìm kiếm**: Tìm kiếm theo tên, email, hoặc ID
- **Lọc**: Lọc theo vai trò (User/Admin)
- **Phân trang**: Hiển thị 10 người dùng mỗi trang
- **Chọn nhiều**: Checkbox để chọn nhiều người dùng cùng lúc
- **Xóa hàng loạt**: Xóa nhiều người dùng đã chọn
- **Avatar mặc định**: Hiển thị chữ cái đầu của tên với gradient màu sắc

### 2. Tạo người dùng mới (UserCreate)
- **Form đầy đủ**: First name, Last name, Email, Mobile, Role, Status
- **Upload avatar**: Tải lên ảnh đại diện (tùy chọn)
- **Validation**: Kiểm tra email trùng lặp
- **Mật khẩu tự động**: Tạo mật khẩu ngẫu nhiên cho người dùng mới

### 3. Chỉnh sửa người dùng (UserEdit)
- **Load dữ liệu**: Tự động tải thông tin người dùng hiện tại
- **Cập nhật thông tin**: Sửa đổi tất cả thông tin người dùng
- **Thay đổi avatar**: Upload ảnh mới hoặc xóa ảnh cũ
- **Xóa ảnh cũ**: Tự động xóa ảnh cũ trên Cloudinary khi upload ảnh mới

### 4. Quản lý trạng thái
- **Block/Unblock**: Chặn hoặc bỏ chặn người dùng
- **Thay đổi vai trò**: Chuyển đổi giữa User và Admin
- **Xóa người dùng**: Xóa vĩnh viễn người dùng khỏi hệ thống

## Cấu trúc file

### Frontend
```
client/src/
├── components/
│   ├── Admin/
│   │   └── UserForm.jsx          # Form tạo/sửa người dùng
│   └── Avatar.jsx                # Component avatar mặc định
├── pages/private/Users/
│   ├── UserList.jsx              # Danh sách người dùng
│   ├── UserCreate.jsx            # Tạo người dùng mới
│   └── UserEdit.jsx              # Chỉnh sửa người dùng
└── apis/
    └── user.js                   # API calls cho user management
```

### Backend
```
server/
├── controllers/
│   └── user.js                   # Logic xử lý user management
├── models/
│   └── user.js                   # Schema người dùng (đã cập nhật)
└── routes/
    └── user.js                   # API routes cho admin
```

## API Endpoints

### Admin User Management
- `GET /api/user/admin/users` - Lấy danh sách người dùng
- `GET /api/user/admin/:userId` - Lấy thông tin người dùng theo ID
- `POST /api/user/admin/create` - Tạo người dùng mới
- `PUT /api/user/admin/:userId` - Cập nhật người dùng
- `DELETE /api/user/admin/:userId` - Xóa người dùng
- `PUT /api/user/admin/:userId/toggle-block` - Chặn/bỏ chặn người dùng

## Tính năng Avatar mặc định

### Component Avatar
- **Tự động tạo**: Hiển thị chữ cái đầu của tên
- **Gradient màu**: Màu sắc dựa trên tên người dùng
- **Nhiều kích thước**: xs, sm, md, lg, xl, 2xl
- **Border tùy chọn**: Có thể bật/tắt viền
- **Fallback**: Hiển thị "U" nếu không có tên

### Cách sử dụng
```jsx
import Avatar from '../components/Avatar';

// Cơ bản
<Avatar src={user.avatar} name={user.name} />

// Với tùy chọn
<Avatar 
  src={user.avatar} 
  name={user.name} 
  size="lg" 
  showBorder={true} 
/>
```

## Cập nhật Database

### User Model
- Thêm field `firstName`, `lastName` (tương thích ngược với `firstname`, `lastname`)
- Thêm field `avatar` để lưu URL ảnh đại diện
- Tự động map dữ liệu cũ sang format mới

## Bảo mật
- **Admin only**: Tất cả API đều yêu cầu quyền admin
- **Token verification**: Xác thực JWT token
- **Role checking**: Kiểm tra vai trò admin
- **File upload**: Sử dụng Cloudinary để lưu trữ ảnh an toàn

## Cách sử dụng

1. **Truy cập**: Đăng nhập với tài khoản admin
2. **Vào Users**: Click vào "Users" trong sidebar admin
3. **Quản lý**: Sử dụng các nút Create, Edit, Delete, Block/Unblock
4. **Tìm kiếm**: Sử dụng thanh tìm kiếm và bộ lọc
5. **Upload avatar**: Click "Choose File" trong form tạo/sửa

## Lưu ý
- Mật khẩu mới được tạo tự động cho người dùng mới
- Ảnh cũ sẽ tự động bị xóa khi upload ảnh mới
- Tất cả thay đổi đều được lưu vào database
- Hệ thống tương thích với dữ liệu cũ (firstname/lastname)
