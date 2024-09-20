import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from '../separator';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<ArrowButton click={handleOpen} isOpen={isOpen} />
			<aside
				className={
					styles.container + ' ' + (isOpen ? styles.container_open : '')
				}>
				<form className={styles.form}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={defaultArticleState.fontFamilyOption}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						name='radio'
						selected={defaultArticleState.fontSizeOption}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={defaultArticleState.fontColor}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={defaultArticleState.backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={defaultArticleState.contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
