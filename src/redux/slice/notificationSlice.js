const initialState = {
  items: [],
  unreadCount: 0,
  pagination: {
    pageNumber: 1,
    pageSize: 10,
    totalCount: 0,
    totalPages: 0,
  },
  loading: false,
  error: null,

  lastFetchedAt: null,
};
