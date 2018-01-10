import UserPage from '../components/user_page/UserPage';
import MainPage from '../components/main_page/MainPage';
import EditPage from '../components/edit_page/EditPage';
import SearchPage from '../components/search_page/SearchPage';
import NotFoundPage from '../components/NotFoundPage';
import SignOutPage from '../components/SignOutPage';
import PageRoutes from '../routes/PageRoutes';

export default {
	routes: [
		{
			path: PageRoutes.main,
			component: MainPage,
			exact: true
		},
		{
			path: PageRoutes.user + '/:id',
			component: UserPage,
			exact: false
		},
		{
			path: PageRoutes.signOut,
			component: SignOutPage,
			exact: true
		},
		{
			path: PageRoutes.edit,
			component: EditPage,
			exact: true
		},
		{
			path: PageRoutes.search,
			component: SearchPage,
			exact: true
		},
		{
			path: '*',
			component: NotFoundPage
		}
	]
};
