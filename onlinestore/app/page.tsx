'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateProducts } from './features/products/product.slice';
import type { RootState } from './store';

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
		<section className='flex flex-wrap items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100'>
			{products &&
				products.length > 0 &&
				products?.map((item: any) => {
					return (
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
					);
				})}
		</section>
	);
};

export default Home;
