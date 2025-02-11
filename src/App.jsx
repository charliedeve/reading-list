import { useState } from 'react';
import './App.css';
import books from './books.json';

function App() {
	const [availableBook, setAvailableBook] = useState(books.library);
	const [readList, setReadList] = useState([]);
	const [bookFilter, setBookFilter] = useState('Todos');
	const [searchBook, setSearchBook] = useState('');

	// Filter function to filter books, returns a filtered array
	const filteredBooks =
		bookFilter === 'Todos'
			? availableBook
			: availableBook.filter((item) => item.book.gender === bookFilter);

	const getFilter = (e) => {
		setBookFilter(e.target.value);
	};

	// Add selected book to reading list and delete it from filtered books
	const addBookList = (item) => {
		setReadList([...readList, item]);
		setAvailableBook(availableBook.filter((indice) => indice != item)); // Avoids duplicated books in reading list
		console.log(readList);
	};

	// Delete book from reading list and add it to available books
	const deleteBookFromList = (item) => {
		setReadList([...readList.filter((indice) => indice != item)]);
		setAvailableBook([...availableBook, item]);
	};

	//Search a book by title
	const handleSearch = () => {
		searchBook == ''
			? setAvailableBook(books.library)
			: setAvailableBook(
					availableBook.filter(
						(item) => item.book.title.toLowerCase() == searchBook.toLowerCase(),
					),
				);
	};

	return (
		<>
			<div className='pb-5'>
				<h2> {filteredBooks.length} Libros disponibles</h2>
				<h2>{readList.length} en la lista de lectura</h2>
				<input
					type='text'
					onChange={(e) => {
						setSearchBook(e.target.value);
					}}
				/>
				<button onClick={handleSearch}>Buscar libro</button>
				<br />
				<select
					name='filter'
					id='filter'
					onChange={(e) => {
						getFilter(e);
					}}
				>
					<option value=''>Selecciona una opcion</option>
					<option value='Todos'>Todos</option>
					<option value='Fantasía'>Fantasia</option>
					<option value='Ciencia ficción'>Ciencia ficcion</option>
					<option value='Zombies'>Zombies</option>
					<option value='Terror'>Terror</option>
				</select>
			</div>
			<div className='w-6'>
				<div className='grid'>
					{filteredBooks.map((item, index) => (
						<div
							className='col-6 h-16rem w-3 cursor-pointer'
							key={index}
							onClick={() => {
								addBookList(item);
							}}
						>
							<img src={item.book.cover} alt={item.book.title} width='150px' />
						</div>
					))}
				</div>
			</div>
			<div className='absolute top-0 right-0 border-1 border-round-md border-50 max-w-30rem bg-white-alpha-20'>
				<h1>Lista de lectura</h1>
				<div className='grid'>
					{readList.map((item, index) => (
						<div
							className='col-4 cursor-pointer'
							key={index}
							onClick={() => {
								deleteBookFromList(item);
							}}
						>
							<img src={item.book.cover} alt={item.book.title} width='150px' />
						</div>
					))}
				</div>
			</div>
		</>
	);
}

export default App;
