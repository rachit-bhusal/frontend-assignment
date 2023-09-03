'use client';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useParams } from 'next/navigation';

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
		<div className='flex flex-col justify-center items-center w-full p-2'>
			{data && (
				<div className='flex flex-col items-center p-4 m-4 shadow-xl w-1/2 rounded-3xl'>
					<Image className='object-cover' width={300} height={300} alt={data.id} src={data.image} />
					<div className='text-center w-full p-10 flex flex-col justify-between items-center'>
						<h1 className='m-5 text-2xl text-black'>{data.title}</h1>
						<p className='p-10 text-gray-600 font-serif text-xl'>{data.description}</p>
						<p className='font-mono text-xl border-2 w-1/2'>${data.price}</p>
					</div>
				</div>
			)}
		</div>
	);
};

export default ProductDetails;
