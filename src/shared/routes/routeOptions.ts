import UserPage from '../components/UserPage';
import MainPage from '../components/MainPage';
import NotFoundPage from '../components/NotFoundPage';

export default {
	routes: [
		{
			path: '/',
			component: MainPage,
			exact: true
		},
		{
			path: '/user/',
			component: UserPage,
			exact: false
		},
		{
			path: '*',
			component: NotFoundPage
		}
	]
};
