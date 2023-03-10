import Footer from './Footer';

interface LayoutProps {
	children: React.ReactNode;
}

export const Layout = ({ children }: LayoutProps) => {
	return (
		<div>
			{/* <Navbar /> */}
			{children}
			<Footer />
		</div>
	);
};
