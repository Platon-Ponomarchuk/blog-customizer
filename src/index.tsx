import { createRoot } from 'react-dom/client';
import { StrictMode, CSSProperties, useState } from 'react';
import clsx from 'clsx';

import { Article } from './components/article/Article';
import { ArticleParamsForm } from './components/article-params-form/ArticleParamsForm';
import { defaultArticleState, OptionType, ArticleStateType } from './constants/articleProps';

import './styles/index.scss';
import styles from './styles/index.module.scss';

const domNode = document.getElementById('root') as HTMLDivElement;
const root = createRoot(domNode);

const App = () => {
	const [settings, setSettings] = useState({
		fontFamilyOption: defaultArticleState.fontFamilyOption,
		fontSizeOption: defaultArticleState.fontSizeOption,
		fontColor: defaultArticleState.fontColor,
		contentWidth: defaultArticleState.contentWidth,
		backgroundColor: defaultArticleState.backgroundColor,
	});
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const handleToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleClose = () => {
		setIsMenuOpen(false);
	};

	return (
		<div
			className={clsx(styles.main)}
			style={
				{
					'--font-family': settings.fontFamilyOption.value,
					'--font-size': settings.fontSizeOption.value,
					'--font-color': settings.fontColor.value,
					'--container-width': settings.contentWidth.value,
					'--bg-color': settings.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm
				settings={settings}
				onSettingsChange={(settings: ArticleStateType) => setSettings(settings)}
				handleToggle={handleToggle}
				isMenuOpen={isMenuOpen}
			/>
			<Article handleClose={handleClose}/>
		</div>
	);
};

root.render(
	<StrictMode>
		<App />
	</StrictMode>
);
