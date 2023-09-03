'use client';

import { updateProducts } from '@/app/features/products/product.slice';
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import { useDispatch, useSelector } from 'react-redux';

const ProductDetails = () => {
	const { id } = useParams();

	const { isLoading, error, data } = useQuery({
		queryKey: ['repoData'],
		queryFn: () => fetch(`https://fakestoreapi.com/products/${id}`).then((res) => res.json()),
	});

	if (isLoading) return 'Loading...';

	if (error) return 'An error has occurred: ';

	console.log(id);

	return (
		<>
			{data && (
				<div>
					<h1>{data.title}</h1>
					<p>{data.price}</p>
					<p>{data.description}</p>
				</div>
			)}
		</>
	);
};

export default ProductDetails;
