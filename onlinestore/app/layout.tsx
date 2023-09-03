// 'use client';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from './components/navbar';
import './globals.css';
import Providers from './providers';
import { StoreProvider } from './storeProvider';
const inter = Inter({ subsets: ['latin'] });
export const metadata: Metadata = {
	title: 'Online Store',
	description: 'Online Store Application',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang='en'>
			<body className={inter.className}>
				<Navbar />
				<StoreProvider>
					<Providers>{children}</Providers>
				</StoreProvider>
			</body>
		</html>
	);
}
