export interface Book {
  id: string;
  title: string;
  author: string;
  year: number;
  category: string;
}

// Thông tin tham số để request API phân trang
export interface PageAble {
  page: number;       // số trang hiện tại (0-based hoặc 1-based tùy API)
  size: number;       // số item mỗi trang
  sort?: string;      // cột sắp xếp (vd: "title,asc")
}

// Kết quả trả về khi gọi API phân trang
export interface BookPagination {
  content: Book[];    // danh sách sách của trang hiện tại
  totalElements: number; // tổng số item
  totalPages: number;    // tổng số trang
  pageNumber: number;    // số trang hiện tại
  pageSize: number;      // số item mỗi trang
  last: boolean;         // có phải trang cuối không
  first: boolean;        // có phải trang đầu không
}
