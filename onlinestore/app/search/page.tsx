'use client';

import { useQuery } from '@tanstack/react-query';
import { ChangeEvent, MouseEventHandler, useEffect, useState } from 'react';
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
			{searchResults && searchResults.map((item: any) => <div key={item.id}>{item.title}</div>)}
			<input onChange={dataHandler} type='text' />
			<button onClick={searchHandler}>Search</button>
		</>
	);
};

export default Search;
