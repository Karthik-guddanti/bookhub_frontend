
import  { useState, useEffect } from 'react';
import bookService from '../services/book.services';
import EditBookModal from '../components/ui/EditBookModal'; 
const AdminDashboard = () => {
  const [myBooks, setMyBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  useEffect(() => {
    const fetchMyBooks = async () => {
      try {
        setLoading(true);
        setError(null);
        const books = await bookService.getMyBooks();
        setMyBooks(books);
      } catch (err) {
        setError(err.toString());
      } finally {
        setLoading(false);
      }
    };
    fetchMyBooks();
  }, []);

  const handleAddBook = async (e) => {
    e.preventDefault();
    try {
      const newBook = await bookService.addBook({ title, author, description, imageUrl });
      setMyBooks([newBook, ...myBooks]);
      setTitle('');
      setAuthor('');
      setDescription('');
      setImageUrl('');
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await bookService.deleteBook(bookId);
      setMyBooks(myBooks.filter((book) => book._id !== bookId));
    } catch (err) {
      setError(err.toString());
    }
  };

  const handleOpenEditModal = (book) => {
    setSelectedBook(book);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedBook(null);
  };

  const handleBookUpdated = (updatedBook) => {
    setMyBooks(
      myBooks.map((book) =>
        book._id === updatedBook._id ? updatedBook : book
      )
    );
  };

  const styles = {
    container: { display: 'flex', gap: '2rem', padding: '2rem' },
    formContainer: { flex: 1, padding: '1.5rem', border: '1px solid #ccc', borderRadius: '8px' },
    listContainer: { flex: 2 },
    formGroup: { marginBottom: '1rem' },
    label: { display: 'block', marginBottom: '0.5rem' },
    input: { width: '100%', padding: '0.5rem', boxSizing: 'border-box' },
    textarea: { width: '100%', padding: '0.5rem', minHeight: '80px', boxSizing: 'border-box' },
    button: { width: '100%', padding: '0.75rem', backgroundColor: '#28a745', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' },
    bookItem: { display: 'flex', gap: '1rem', padding: '1rem', border: '1px solid #eee', marginBottom: '1rem', borderRadius: '8px' },
    bookImg: { width: '80px', height: '120px', objectFit: 'cover' },
    bookInfo: { flex: 1 },
    bookActions: { display: 'flex', flexDirection: 'column', gap: '0.5rem' }, // <-- NEW
    editButton: { backgroundColor: '#007bff', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' }, // <-- NEW
    deleteButton: { backgroundColor: '#dc3545', color: 'white', border: 'none', padding: '0.5rem 1rem', borderRadius: '4px', cursor: 'pointer' },
    error: { color: 'red', marginTop: '1rem' },
  };

  return (
    <div className="flex gap-8 p-8 min-h-screen bg-gray-50">
      {/* --- ADD BOOK FORM --- */}
      <div className="flex-1 p-6 border border-gray-300 rounded-lg bg-white shadow-md">
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">Add a New Book</h2>
        <form onSubmit={handleAddBook} className="space-y-4">
          <div>
            <label htmlFor="title" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Title</label>
            <input 
              type="text" 
              id="title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="author" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Author</label>
            <input 
              type="text" 
              id="author" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="description" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              id="description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400 min-h-20 resize-vertical"
            />
          </div>
          <div>
            <label htmlFor="imageUrl" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Image URL</label>
            <input 
              type="text" 
              id="imageUrl" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
            />
          </div>
          <button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-500 to-green-600 hover:shadow-lg hover:shadow-green-500/25 text-white font-poppins font-medium py-3 px-6 rounded-lg transition-all duration-300 hover:-translate-y-1 transform"
          >
            Add Book
          </button>
        </form>
      </div>

      {/* --- LIST OF ADMIN'S BOOKS --- */}
      <div className="flex-2">
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">My Added Books</h2>
        {loading && <p className="text-gray-600">Loading...</p>}
        {error && <p className="text-red-600 mt-4">{error}</p>}
        <div className="space-y-4">
          {!loading && !error && myBooks.length === 0 && (
            <p className="text-gray-600 text-center py-8">You haven't added any books yet.</p>
          )}
          
          {myBooks.map((book) => (
            <div key={book._id} className="flex gap-4 p-4 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300">
              <img src={book.imageUrl} alt={book.title} className="w-20 h-28 object-cover rounded-lg" />
              <div className="flex-1">
                <h3 className="text-lg font-poppins font-bold text-gray-900 mb-1">{book.title}</h3>
                <p className="text-sm font-roboto text-gray-600 mb-2">by {book.author}</p>
                <p className="text-sm font-roboto text-gray-700 line-clamp-3">{book.description.substring(0, 100)}...</p>
              </div>
              <div className="flex flex-col gap-2">
                <button 
                  onClick={() => handleOpenEditModal(book)} 
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg text-sm font-poppins transition-colors duration-200"
                >
                  Edit
                </button>
                <button 
                  onClick={() => handleDeleteBook(book._id)} 
                  className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg text-sm font-poppins transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* --- RENDER THE MODAL --- */}
      {isModalOpen && selectedBook && (
        <EditBookModal
          book={selectedBook}
          onClose={handleCloseModal}
          onBookUpdated={handleBookUpdated}
        />
      )}
    </div>
  );
};

export default AdminDashboard;