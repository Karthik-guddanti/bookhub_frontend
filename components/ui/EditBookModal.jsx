import { useState, useEffect } from 'react';
import bookService from '../../services/book.services';

const EditBookModal = ({ book, onClose, onBookUpdated }) => {
  const [title, setTitle] = useState(book.title);
  const [author, setAuthor] = useState(book.author);
  const [description, setDescription] = useState(book.description);
  const [imageUrl, setImageUrl] = useState(book.imageUrl);
  
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setTitle(book.title);
    setAuthor(book.author);
    setDescription(book.description);
    setImageUrl(book.imageUrl);
  }, [book]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const updatedData = { title, author, description, imageUrl };
      const updatedBook = await bookService.updateBook(book._id, updatedData);
      
      onBookUpdated(updatedBook); // Pass the updated book back to the dashboard
      onClose(); // Close the modal
    } catch (err) {
      setError(err.toString());
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50" onClick={onClose}>
      <div className="bg-white p-8 rounded-lg w-full max-w-lg mx-4 shadow-xl" onClick={(e) => e.stopPropagation()}>
        <h2 className="text-2xl font-poppins font-bold text-gray-900 mb-6">Edit Book</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="edit-title" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Title</label>
            <input 
              type="text" 
              id="edit-title" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="edit-author" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Author</label>
            <input 
              type="text" 
              id="edit-author" 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
            />
          </div>
          <div>
            <label htmlFor="edit-description" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Description</label>
            <textarea 
              id="edit-description" 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400 min-h-20 resize-vertical"
            />
          </div>
          <div>
            <label htmlFor="edit-imageUrl" className="block text-sm font-poppins font-semibold text-gray-700 mb-2">Image URL</label>
            <input 
              type="text" 
              id="edit-imageUrl" 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
              required 
              className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-blue-500 focus:ring-2 focus:ring-blue-100 transition-all duration-300 outline-none bg-white hover:border-gray-400"
            />
          </div>
          {error && <p className="text-red-600 text-sm mt-4">{error}</p>}
          <div className="flex gap-4 justify-end mt-6">
            <button 
              type="button" 
              onClick={onClose} 
              className="px-6 py-2 bg-gray-500 hover:bg-gray-600 text-white rounded-lg font-poppins transition-colors duration-200"
            >
              Cancel
            </button>
            <button 
              type="submit" 
              className="px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-poppins transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed" 
              disabled={loading}
            >
              {loading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditBookModal;