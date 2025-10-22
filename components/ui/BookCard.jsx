const BookCard = ({ book }) => {
  return (
    <div className="card-gradient group hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      
      <div className="relative overflow-hidden">
        <img 
          src={book.imageUrl} 
          alt={book.title} 
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 backdrop-blur-sm rounded-full p-2">
            <svg className="icon-sm text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="text-base font-poppins font-bold text-gray-900 mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors duration-200">
          {book.title}
        </h3>
        
        <p className="text-xs font-roboto font-medium text-blue-600 mb-2 flex items-center gap-1">
          <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
          </svg>
          {book.author}
        </p>
        
        <p className="text-gray-600 font-roboto text-xs leading-relaxed line-clamp-2 mb-3">
          {book.description}
        </p>
      </div>
    </div>
  );
};

export default BookCard;