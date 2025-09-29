// Danh sách các tỉnh thành phố Việt Nam
export const vietnamProvinces = [
  { code: '01', name: 'Hà Nội' },
  { code: '02', name: 'TP. Hồ Chí Minh' },
  { code: '03', name: 'Đà Nẵng' },
  { code: '04', name: 'Hải Phòng' },
  { code: '05', name: 'Cần Thơ' },
  { code: '06', name: 'An Giang' },
  { code: '07', name: 'Bà Rịa - Vũng Tàu' },
  { code: '08', name: 'Bạc Liêu' },
  { code: '09', name: 'Bắc Giang' },
  { code: '10', name: 'Bắc Kạn' },
  { code: '11', name: 'Bắc Ninh' },
  { code: '12', name: 'Bến Tre' },
  { code: '13', name: 'Bình Dương' },
  { code: '14', name: 'Bình Phước' },
  { code: '15', name: 'Bình Thuận' },
  { code: '16', name: 'Cà Mau' },
  { code: '17', name: 'Cao Bằng' },
  { code: '18', name: 'Đắk Lắk' },
  { code: '19', name: 'Đắk Nông' },
  { code: '20', name: 'Điện Biên' },
  { code: '21', name: 'Đồng Nai' },
  { code: '22', name: 'Đồng Tháp' },
  { code: '23', name: 'Gia Lai' },
  { code: '24', name: 'Hà Giang' },
  { code: '25', name: 'Hà Nam' },
  { code: '26', name: 'Hà Tĩnh' },
  { code: '27', name: 'Hải Dương' },
  { code: '28', name: 'Hậu Giang' },
  { code: '29', name: 'Hòa Bình' },
  { code: '30', name: 'Hưng Yên' },
  { code: '31', name: 'Khánh Hòa' },
  { code: '32', name: 'Kiên Giang' },
  { code: '33', name: 'Kon Tum' },
  { code: '34', name: 'Lai Châu' },
  { code: '35', name: 'Lâm Đồng' },
  { code: '36', name: 'Lạng Sơn' },
  { code: '37', name: 'Lào Cai' },
  { code: '38', name: 'Long An' },
  { code: '39', name: 'Nam Định' },
  { code: '40', name: 'Nghệ An' },
  { code: '41', name: 'Ninh Bình' },
  { code: '42', name: 'Ninh Thuận' },
  { code: '43', name: 'Phú Thọ' },
  { code: '44', name: 'Phú Yên' },
  { code: '45', name: 'Quảng Bình' },
  { code: '46', name: 'Quảng Nam' },
  { code: '47', name: 'Quảng Ngãi' },
  { code: '48', name: 'Quảng Ninh' },
  { code: '49', name: 'Quảng Trị' },
  { code: '50', name: 'Sóc Trăng' },
  { code: '51', name: 'Sơn La' },
  { code: '52', name: 'Tây Ninh' },
  { code: '53', name: 'Thái Bình' },
  { code: '54', name: 'Thái Nguyên' },
  { code: '55', name: 'Thanh Hóa' },
  { code: '56', name: 'Thừa Thiên Huế' },
  { code: '57', name: 'Tiền Giang' },
  { code: '58', name: 'Trà Vinh' },
  { code: '59', name: 'Tuyên Quang' },
  { code: '60', name: 'Vĩnh Long' },
  { code: '61', name: 'Vĩnh Phúc' },
  { code: '62', name: 'Yên Bái' }
];

// Danh sách các quận/huyện cho các thành phố lớn
export const districts = {
  '01': [ // Hà Nội
    'Quận Ba Đình','Quận Hoàn Kiếm','Quận Tây Hồ','Quận Long Biên','Quận Cầu Giấy',
    'Quận Đống Đa','Quận Hai Bà Trưng','Quận Hoàng Mai','Quận Thanh Xuân',
    'Huyện Sóc Sơn','Huyện Đông Anh','Huyện Gia Lâm','Quận Nam Từ Liêm',
    'Quận Bắc Từ Liêm','Huyện Thanh Trì','Huyện Mê Linh','Quận Hà Đông',
    'Thị xã Sơn Tây','Huyện Ba Vì','Huyện Phúc Thọ','Huyện Đan Phượng',
    'Huyện Hoài Đức','Huyện Quốc Oai','Huyện Thạch Thất','Huyện Chương Mỹ',
    'Huyện Thanh Oai','Huyện Thường Tín','Huyện Phú Xuyên','Huyện Ứng Hòa','Huyện Mỹ Đức'
  ],
  '02': [ // TP. Hồ Chí Minh
    'Quận 1','Quận 3','Quận 4','Quận 5','Quận 6','Quận 7','Quận 8','Quận 10','Quận 11','Quận 12',
    'Quận Bình Tân','Quận Bình Thạnh','Quận Gò Vấp','Quận Phú Nhuận','Quận Tân Bình','Quận Tân Phú',
    'TP. Thủ Đức','Huyện Bình Chánh','Huyện Cần Giờ','Huyện Củ Chi','Huyện Hóc Môn','Huyện Nhà Bè'
  ],
  '03': [ // Đà Nẵng
    'Quận Hải Châu','Quận Thanh Khê','Quận Sơn Trà','Quận Ngũ Hành Sơn','Quận Liên Chiểu',
    'Quận Cẩm Lệ','Huyện Hòa Vang','Huyện Hoàng Sa'
  ],
  '04': [ // Hải Phòng
    'Quận Hồng Bàng','Quận Ngô Quyền','Quận Lê Chân','Quận Hải An','Quận Kiến An',
    'Quận Dương Kinh','Quận Đồ Sơn','Huyện An Dương','Huyện An Lão','Huyện Kiến Thụy',
    'Huyện Thủy Nguyên','Huyện Tiên Lãng','Huyện Vĩnh Bảo','Huyện Cát Hải','Huyện Bạch Long Vĩ'
  ],
  '05': [ // Cần Thơ
    'Quận Ninh Kiều','Quận Bình Thủy','Quận Cái Răng','Quận Ô Môn','Quận Thốt Nốt',
    'Huyện Cờ Đỏ','Huyện Phong Điền','Huyện Thới Lai','Huyện Vĩnh Thạnh'
  ],
  '06': [ // An Giang
    'TP. Long Xuyên','TP. Châu Đốc','Thị xã Tân Châu','Huyện An Phú','Huyện Châu Phú',
    'Huyện Châu Thành','Huyện Chợ Mới','Huyện Phú Tân','Huyện Thoại Sơn','Huyện Tri Tôn','Huyện Tịnh Biên'
  ],
  '07': [ // Bà Rịa - Vũng Tàu
    'TP. Bà Rịa','TP. Vũng Tàu','Thị xã Phú Mỹ','Huyện Châu Đức','Huyện Đất Đỏ',
    'Huyện Long Điền','Huyện Xuyên Mộc','Huyện Côn Đảo'
  ],
  '08': [ // Bạc Liêu
    'TP. Bạc Liêu','Thị xã Giá Rai','Huyện Đông Hải','Huyện Hòa Bình',
    'Huyện Hồng Dân','Huyện Phước Long','Huyện Vĩnh Lợi'
  ],
  '09': [ // Bắc Giang
    'TP. Bắc Giang','Huyện Hiệp Hòa','Huyện Lạng Giang','Huyện Lục Nam',
    'Huyện Lục Ngạn','Huyện Sơn Động','Huyện Tân Yên','Huyện Việt Yên','Huyện Yên Dũng','Huyện Yên Thế'
  ],
  '10': [ // Bắc Kạn
    'TP. Bắc Kạn','Huyện Ba Bể','Huyện Bạch Thông','Huyện Chợ Đồn',
    'Huyện Chợ Mới','Huyện Na Rì','Huyện Ngân Sơn','Huyện Pác Nặm'
  ],
  '11': [ // Bắc Ninh
    'TP. Bắc Ninh','Thị xã Từ Sơn','Huyện Gia Bình','Huyện Lương Tài',
    'Huyện Quế Võ','Huyện Thuận Thành','Huyện Tiên Du','Huyện Yên Phong'
  ],
  '12': [ // Bến Tre
    'TP. Bến Tre','Huyện Ba Tri','Huyện Bình Đại','Huyện Châu Thành','Huyện Chợ Lách',
    'Huyện Giồng Trôm','Huyện Mỏ Cày Bắc','Huyện Mỏ Cày Nam','Huyện Thạnh Phú'
  ],
  '13': [ // Bình Dương
    'TP. Thủ Dầu Một','TP. Dĩ An','TP. Thuận An','TP. Tân Uyên','TP. Bến Cát',
    'Huyện Bắc Tân Uyên','Huyện Bàu Bàng','Huyện Phú Giáo','Huyện Dầu Tiếng'
  ],
  '14': [ // Bình Phước
    'TP. Đồng Xoài','TP. Phước Long','TP. Bình Long','Huyện Bù Đăng','Huyện Bù Đốp',
    'Huyện Bù Gia Mập','Huyện Chơn Thành','Huyện Đồng Phú','Huyện Hớn Quản','Huyện Lộc Ninh','Huyện Phú Riềng'
  ],
  '15': [ // Bình Thuận
    'TP. Phan Thiết','Thị xã La Gi','Huyện Bắc Bình','Huyện Đức Linh','Huyện Hàm Tân',
    'Huyện Hàm Thuận Bắc','Huyện Hàm Thuận Nam','Huyện Phú Quý','Huyện Tánh Linh','Huyện Tuy Phong'
  ],
  '16': [ // Cà Mau
    'TP. Cà Mau','Huyện Cái Nước','Huyện Đầm Dơi','Huyện Năm Căn',
    'Huyện Ngọc Hiển','Huyện Phú Tân','Huyện Thới Bình','Huyện Trần Văn Thời','Huyện U Minh'
  ],
  '17': [ // Cao Bằng
    'TP. Cao Bằng','Huyện Bảo Lạc','Huyện Bảo Lâm','Huyện Hạ Lang','Huyện Hà Quảng',
    'Huyện Hòa An','Huyện Nguyên Bình','Huyện Quảng Hòa','Huyện Thạch An','Huyện Trùng Khánh'
  ],
  '18': [ // Đắk Lắk
    'TP. Buôn Ma Thuột','Thị xã Buôn Hồ','Huyện Buôn Đôn','Huyện Cư Kuin','Huyện Cư M’gar',
    'Huyện Ea H’leo','Huyện Ea Kar','Huyện Ea Súp','Huyện Krông Ana','Huyện Krông Bông',
    'Huyện Krông Buk','Huyện Krông Năng','Huyện Krông Pắc','Huyện Lắk','Huyện M’đrăk'
  ],
  '19': [ // Đắk Nông
    'TP. Gia Nghĩa','Huyện Cư Jút','Huyện Đắk Glong','Huyện Đắk Mil','Huyện Đắk R’lấp',
    'Huyện Đắk Song','Huyện Krông Nô','Huyện Tuy Đức'
  ],
    '20': [ // Điện Biên
    'TP. Điện Biên Phủ','Thị xã Mường Lay','Huyện Điện Biên','Huyện Điện Biên Đông',
    'Huyện Mường Ảng','Huyện Mường Chà','Huyện Mường Nhé','Huyện Nậm Pồ','Huyện Tủa Chùa','Huyện Tuần Giáo'
  ],
  '21': [ // Đồng Nai
    'TP. Biên Hòa','TP. Long Khánh','Huyện Cẩm Mỹ','Huyện Định Quán',
    'Huyện Long Thành','Huyện Nhơn Trạch','Huyện Tân Phú','Huyện Thống Nhất','Huyện Trảng Bom','Huyện Vĩnh Cửu','Huyện Xuân Lộc'
  ],
  '22': [ // Đồng Tháp
    'TP. Cao Lãnh','TP. Sa Đéc','TP. Hồng Ngự','Huyện Cao Lãnh','Huyện Châu Thành',
    'Huyện Hồng Ngự','Huyện Lai Vung','Huyện Lấp Vò','Huyện Tam Nông','Huyện Tân Hồng','Huyện Thanh Bình','Huyện Tháp Mười'
  ],
  '23': [ // Gia Lai
    'TP. Pleiku','Thị xã An Khê','Thị xã Ayun Pa','Huyện Chư Păh','Huyện Chư Prông',
    'Huyện Chư Pưh','Huyện Chư Sê','Huyện Đăk Đoa','Huyện Đăk Pơ','Huyện Đức Cơ',
    'Huyện Ia Grai','Huyện Ia Pa','Huyện KBang','Huyện Kông Chro','Huyện Krông Pa','Huyện Mang Yang','Huyện Phú Thiện'
  ],
  '24': [ // Hà Giang
    'TP. Hà Giang','Huyện Bắc Mê','Huyện Bắc Quang','Huyện Đồng Văn','Huyện Hoàng Su Phì',
    'Huyện Mèo Vạc','Huyện Quang Bình','Huyện Quản Bạ','Huyện Vị Xuyên','Huyện Xín Mần','Huyện Yên Minh'
  ],
  '25': [ // Hà Nam
    'TP. Phủ Lý','Thị xã Duy Tiên','Huyện Bình Lục','Huyện Kim Bảng',
    'Huyện Lý Nhân','Huyện Thanh Liêm'
  ],
  '26': [ // Hà Tĩnh
    'TP. Hà Tĩnh','Thị xã Hồng Lĩnh','Thị xã Kỳ Anh','Huyện Cẩm Xuyên',
    'Huyện Can Lộc','Huyện Đức Thọ','Huyện Hương Khê','Huyện Hương Sơn','Huyện Kỳ Anh',
    'Huyện Lộc Hà','Huyện Nghi Xuân','Huyện Thạch Hà','Huyện Vũ Quang'
  ],
  '27': [ // Hải Dương
    'TP. Hải Dương','TP. Chí Linh','Huyện Bình Giang','Huyện Cẩm Giàng','Huyện Gia Lộc',
    'Huyện Kim Thành','Huyện Kinh Môn','Huyện Nam Sách','Huyện Ninh Giang','Huyện Thanh Hà',
    'Huyện Thanh Miện','Huyện Tứ Kỳ'
  ],
  '28': [ // Hậu Giang
    'TP. Vị Thanh','TP. Ngã Bảy','Thị xã Long Mỹ','Huyện Châu Thành','Huyện Châu Thành A',
    'Huyện Long Mỹ','Huyện Phụng Hiệp','Huyện Vị Thủy'
  ],
  '29': [ // Hòa Bình
    'TP. Hòa Bình','Huyện Cao Phong','Huyện Đà Bắc','Huyện Kim Bôi','Huyện Lạc Sơn',
    'Huyện Lạc Thủy','Huyện Lương Sơn','Huyện Mai Châu','Huyện Tân Lạc','Huyện Yên Thủy'
  ],
  '30': [ // Hưng Yên
    'TP. Hưng Yên','Thị xã Mỹ Hào','Huyện Ân Thi','Huyện Khoái Châu','Huyện Kim Động',
    'Huyện Phù Cừ','Huyện Tiên Lữ','Huyện Văn Giang','Huyện Văn Lâm','Huyện Yên Mỹ'
  ],
  '31': [ // Khánh Hòa
    'TP. Nha Trang','TP. Cam Ranh','Thị xã Ninh Hòa','Huyện Cam Lâm',
    'Huyện Diên Khánh','Huyện Khánh Sơn','Huyện Khánh Vĩnh','Huyện Trường Sa','Huyện Vạn Ninh'
  ],
  '32': [ // Kiên Giang
    'TP. Rạch Giá','TP. Hà Tiên','TP. Phú Quốc','Huyện An Biên','Huyện An Minh',
    'Huyện Châu Thành','Huyện Giang Thành','Huyện Giồng Riềng','Huyện Gò Quao','Huyện Hòn Đất',
    'Huyện Kiên Hải','Huyện Kiên Lương','Huyện Tân Hiệp','Huyện U Minh Thượng','Huyện Vĩnh Thuận'
  ],
  '33': [ // Kon Tum
    'TP. Kon Tum','Huyện Đăk Glei','Huyện Đăk Hà','Huyện Đăk Tô','Huyện Ia H’Drai',
    'Huyện Kon Plông','Huyện Kon Rẫy','Huyện Ngọc Hồi','Huyện Sa Thầy','Huyện Tu Mơ Rông'
  ],
  '34': [ // Lai Châu
    'TP. Lai Châu','Huyện Mường Tè','Huyện Nậm Nhùn','Huyện Phong Thổ',
    'Huyện Sìn Hồ','Huyện Tam Đường','Huyện Tân Uyên','Huyện Than Uyên'
  ],
  '35': [ // Lâm Đồng
    'TP. Đà Lạt','TP. Bảo Lộc','Huyện Bảo Lâm','Huyện Cát Tiên','Huyện Đạ Huoai',
    'Huyện Đạ Tẻh','Huyện Đam Rông','Huyện Di Linh','Huyện Đức Trọng','Huyện Lạc Dương','Huyện Lâm Hà'
  ],
  '36': [ // Lạng Sơn
    'TP. Lạng Sơn','Huyện Bắc Sơn','Huyện Bình Gia','Huyện Cao Lộc','Huyện Chi Lăng',
    'Huyện Đình Lập','Huyện Hữu Lũng','Huyện Lộc Bình','Huyện Tràng Định','Huyện Văn Lãng','Huyện Văn Quan'
  ],
  '37': [ // Lào Cai
    'TP. Lào Cai','Thị xã Sa Pa','Huyện Bát Xát','Huyện Bảo Thắng','Huyện Bảo Yên',
    'Huyện Bắc Hà','Huyện Mường Khương','Huyện Si Ma Cai','Huyện Văn Bàn'
  ],
  '38': [ // Long An
    'TP. Tân An','Thị xã Kiến Tường','Huyện Bến Lức','Huyện Cần Đước','Huyện Cần Giuộc',
    'Huyện Châu Thành','Huyện Đức Hòa','Huyện Đức Huệ','Huyện Mộc Hóa','Huyện Tân Hưng',
    'Huyện Tân Thạnh','Huyện Tân Trụ','Huyện Thạnh Hóa','Huyện Thủ Thừa','Huyện Vĩnh Hưng'
  ],
  '39': [ // Nam Định
    'TP. Nam Định','Huyện Giao Thủy','Huyện Hải Hậu','Huyện Mỹ Lộc','Huyện Nam Trực',
    'Huyện Nghĩa Hưng','Huyện Trực Ninh','Huyện Vụ Bản','Huyện Xuân Trường','Huyện Ý Yên'
  ],
  '40': [ // Nghệ An
    'TP. Vinh','Thị xã Cửa Lò','Thị xã Hoàng Mai','Thị xã Thái Hòa',
    'Huyện Anh Sơn','Huyện Con Cuông','Huyện Diễn Châu','Huyện Đô Lương','Huyện Hưng Nguyên',
    'Huyện Kỳ Sơn','Huyện Nam Đàn','Huyện Nghi Lộc','Huyện Nghĩa Đàn','Huyện Quế Phong',
    'Huyện Quỳ Châu','Huyện Quỳ Hợp','Huyện Quỳnh Lưu','Huyện Tân Kỳ','Huyện Thanh Chương',
    'Huyện Tương Dương','Huyện Yên Thành'
  ],
  '41': [ // Ninh Bình
    'TP. Ninh Bình','TP. Tam Điệp','Huyện Gia Viễn','Huyện Hoa Lư','Huyện Kim Sơn',
    'Huyện Nho Quan','Huyện Yên Khánh','Huyện Yên Mô'
  ],
  '42': [ // Ninh Thuận
    'TP. Phan Rang - Tháp Chàm','Huyện Bác Ái','Huyện Ninh Hải','Huyện Ninh Phước',
    'Huyện Ninh Sơn','Huyện Thuận Bắc','Huyện Thuận Nam'
  ],
  '43': [ // Phú Thọ
    'TP. Việt Trì','Thị xã Phú Thọ','Huyện Cẩm Khê','Huyện Đoan Hùng','Huyện Hạ Hòa',
    'Huyện Lâm Thao','Huyện Phù Ninh','Huyện Tam Nông','Huyện Tân Sơn','Huyện Thanh Ba',
    'Huyện Thanh Sơn','Huyện Thanh Thủy','Huyện Yên Lập'
  ],
  '44': [ // Phú Yên
    'TP. Tuy Hòa','Thị xã Sông Cầu','Huyện Đông Hòa','Huyện Đồng Xuân','Huyện Phú Hòa',
    'Huyện Sơn Hòa','Huyện Sông Hinh','Huyện Tây Hòa','Huyện Tuy An'
  ],
  '45': [ // Quảng Bình
    'TP. Đồng Hới','Thị xã Ba Đồn','Huyện Bố Trạch','Huyện Quảng Ninh','Huyện Lệ Thủy',
    'Huyện Minh Hóa','Huyện Quảng Trạch','Huyện Tuyên Hóa'
  ],
  '46': [ // Quảng Nam
    'TP. Tam Kỳ','TP. Hội An','Thị xã Điện Bàn','Huyện Bắc Trà My','Huyện Đại Lộc',
    'Huyện Đông Giang','Huyện Duy Xuyên','Huyện Hiệp Đức','Huyện Nam Giang','Huyện Nam Trà My',
    'Huyện Nông Sơn','Huyện Núi Thành','Huyện Phú Ninh','Huyện Phước Sơn','Huyện Quế Sơn',
    'Huyện Tây Giang','Huyện Thăng Bình','Huyện Tiên Phước'
  ],
  '47': [ // Quảng Ngãi
    'TP. Quảng Ngãi','Thị xã Đức Phổ','Huyện Ba Tơ','Huyện Bình Sơn','Huyện Lý Sơn',
    'Huyện Minh Long','Huyện Mộ Đức','Huyện Nghĩa Hành','Huyện Sơn Hà','Huyện Sơn Tây',
    'Huyện Sơn Tịnh','Huyện Trà Bồng','Huyện Tư Nghĩa','Huyện Tây Trà'
  ],
  '48': [ // Quảng Ninh
    'TP. Hạ Long','TP. Cẩm Phả','TP. Móng Cái','TP. Uông Bí','Thị xã Đông Triều','Thị xã Quảng Yên',
    'Huyện Ba Chẽ','Huyện Bình Liêu','Huyện Cô Tô','Huyện Đầm Hà','Huyện Hải Hà',
    'Huyện Hoành Bồ','Huyện Tiên Yên','Huyện Vân Đồn'
  ],
  '49': [ // Quảng Trị
    'TP. Đông Hà','Thị xã Quảng Trị','Huyện Cam Lộ','Huyện Cồn Cỏ','Huyện Đa Krông',
    'Huyện Gio Linh','Huyện Hải Lăng','Huyện Hướng Hóa','Huyện Triệu Phong','Huyện Vĩnh Linh'
  ],
  '50': [ // Sóc Trăng
    'TP. Sóc Trăng','Thị xã Ngã Năm','Thị xã Vĩnh Châu','Huyện Cù Lao Dung','Huyện Kế Sách',
    'Huyện Long Phú','Huyện Mỹ Tú','Huyện Mỹ Xuyên','Huyện Thạnh Trị','Huyện Trần Đề',
    'Huyện Châu Thành'
  ],
  '51': [ // Sơn La
    'TP. Sơn La','Huyện Bắc Yên','Huyện Mai Sơn','Huyện Mộc Châu','Huyện Mường La',
    'Huyện Phù Yên','Huyện Quỳnh Nhai','Huyện Sông Mã','Huyện Sốp Cộp','Huyện Thuận Châu','Huyện Vân Hồ','Huyện Yên Châu'
  ],
  '52': [ // Tây Ninh
    'TP. Tây Ninh','Thị xã Trảng Bàng','Thị xã Hòa Thành','Huyện Bến Cầu','Huyện Châu Thành',
    'Huyện Dương Minh Châu','Huyện Gò Dầu','Huyện Tân Biên','Huyện Tân Châu'
  ],
  '53': [ // Thái Bình
    'TP. Thái Bình','Huyện Đông Hưng','Huyện Hưng Hà','Huyện Kiến Xương','Huyện Quỳnh Phụ',
    'Huyện Thái Thụy','Huyện Tiền Hải','Huyện Vũ Thư'
  ],
  '54': [ // Thái Nguyên
    'TP. Thái Nguyên','TP. Sông Công','TP. Phổ Yên','Huyện Đại Từ','Huyện Định Hóa',
    'Huyện Đồng Hỷ','Huyện Phú Bình','Huyện Phú Lương','Huyện Võ Nhai'
  ],
  '55': [ // Thanh Hóa
    'TP. Thanh Hóa','TP. Sầm Sơn','Thị xã Bỉm Sơn','Thị xã Nghi Sơn','Huyện Bá Thước',
    'Huyện Cẩm Thủy','Huyện Đông Sơn','Huyện Hà Trung','Huyện Hậu Lộc','Huyện Hoằng Hóa',
    'Huyện Lang Chánh','Huyện Mường Lát','Huyện Nga Sơn','Huyện Ngọc Lặc','Huyện Như Thanh',
    'Huyện Như Xuân','Huyện Nông Cống','Huyện Quan Hóa','Huyện Quan Sơn','Huyện Quảng Xương',
    'Huyện Thạch Thành','Huyện Thiệu Hóa','Huyện Thọ Xuân','Huyện Thường Xuân','Huyện Triệu Sơn',
    'Huyện Vĩnh Lộc','Huyện Yên Định'
  ],
  '56': [ // Thừa Thiên Huế
    'TP. Huế','Thị xã Hương Thủy','Thị xã Hương Trà','Thị xã A Lưới','Huyện Nam Đông',
    'Huyện Phong Điền','Huyện Phú Lộc','Huyện Phú Vang','Huyện Quảng Điền'
  ],
  '57': [ // Tiền Giang
    'TP. Mỹ Tho','Thị xã Cai Lậy','Thị xã Gò Công','Huyện Cái Bè','Huyện Cai Lậy',
    'Huyện Châu Thành','Huyện Chợ Gạo','Huyện Gò Công Đông','Huyện Gò Công Tây','Huyện Tân Phú Đông','Huyện Tân Phước'
  ],
  '58': [ // Trà Vinh
    'TP. Trà Vinh','Thị xã Duyên Hải','Huyện Càng Long','Huyện Cầu Kè','Huyện Cầu Ngang',
    'Huyện Châu Thành','Huyện Duyên Hải','Huyện Tiểu Cần','Huyện Trà Cú'
  ],
  '59': [ // Tuyên Quang
    'TP. Tuyên Quang','Huyện Chiêm Hóa','Huyện Hàm Yên','Huyện Lâm Bình',
    'Huyện Na Hang','Huyện Sơn Dương','Huyện Yên Sơn'
  ],
  '60': [ // Vĩnh Long
    'TP. Vĩnh Long','Thị xã Bình Minh','Huyện Bình Tân','Huyện Long Hồ','Huyện Mang Thít',
    'Huyện Tam Bình','Huyện Trà Ôn','Huyện Vũng Liêm'
  ],
  '61': [ // Vĩnh Phúc
    'TP. Vĩnh Yên','TP. Phúc Yên','Huyện Bình Xuyên','Huyện Lập Thạch','Huyện Sông Lô',
    'Huyện Tam Đảo','Huyện Tam Dương','Huyện Vĩnh Tường','Huyện Yên Lạc'
  ],
  '62': [ // Yên Bái
    'TP. Yên Bái','Thị xã Nghĩa Lộ','Huyện Lục Yên','Huyện Mù Cang Chải','Huyện Trạm Tấu',
    'Huyện Trấn Yên','Huyện Văn Chấn','Huyện Văn Yên','Huyện Yên Bình'
  ],
  

};







