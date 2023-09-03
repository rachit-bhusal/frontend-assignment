'use client';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts, updateProducts } from './features/products/product.slice';
import type { RootState } from './store';

import { useEffect } from 'react';

const Home = () => {
	const products = useSelector((state: RootState) => state.products.products);
	const dispatch = useDispatch();
	const { isLoading, error, data } = useQuery({
		queryKey: ['repoData'],
		queryFn: () => fetch('https://fakestoreapi.com/products').then((res) => res.json()),
	});

	useEffect(() => {
		dispatch(updateProducts(data));
	}, [data, dispatch]);

	if (isLoading) return 'Loading...';

	if (error) return 'An error has occurred: ';

	return (
		<>
			{products &&
				products.map((item: any) => {
					return (
						<Link href={`/product/${item.id}`} key={item.id}>
							<div>
								<h1>{item.title}</h1>
								<p>{item.price}</p>
								<Image width={500} height={500} alt={item.id} src={item.image}></Image>
							</div>
						</Link>
					);
				})}
		</>
	);
};

export default Home;
