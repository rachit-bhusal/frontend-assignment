'use client';

import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { ChangeEvent, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, updateProducts } from '../features/products/product.slice';
import { RootState } from '../store';

const Search = () => {
	const [datas, setDatas] = useState('');

	const { isLoading, error, data } = useQuery({
		queryKey: ['repoData'],
		queryFn: () => fetch('https://fakestoreapi.com/products').then((res) => res.json()),
	});
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(updateProducts(data));
	}, [data, dispatch]);

	const { searchResults } = useSelector((state: RootState) => state.products);

	const searchHandler = (e: any) => {
		e.preventDefault();
		dispatch(searchProducts(datas));
	};

	const dataHandler = (e: ChangeEvent<HTMLInputElement>) => {
		setDatas(e.target.value);
	};

	if (isLoading) return 'Loading...';

	if (error) return 'An error has occurred: ';
	return (
		<>
			<div className='flex items-center justify-center m-10 p-4'>
				<div className='flex border border-cyan-200 rounded'>
					<input
						onChange={dataHandler}
						type='text'
						className='block w-full px-4 py-2 text-blue-700 bg-white border rounded-md focus:border-cyan-400 focus:ring-cyan-300 focus:outline-none focus:ring focus:ring-opacity-40'
						placeholder='Search...'
					/>
					<button onClick={searchHandler} className='px-4 text-whit bg-cyan-500 border-l rounded '>
						Search
					</button>
				</div>
			</div>
			<div className='flex flex-wrap max-h-screen items-center justify-between'>
				{searchResults &&
					searchResults.map((item: any) => (
						<div key={item.id} className='rounded-lg overflow-hidden shadow-lg max-w-xs p-2 m-5'>
							<Link href={`/product/${item.id}`}>
								<Image
									className='w-full overflow-hidden object-cover'
									width={300}
									height={300}
									alt={item.id}
									src={item.image}
								/>
							</Link>
							<div className='px-6 py-4'>
								<div className='font-bold text-xl mb-2 line-clamp-2 text-center'>{item.title}</div>
								<p className='text-gray-700 text-base text-center'>${item.price}</p>
							</div>
						</div>
					))}
			</div>
		</>
	);
};

export default Search;
