import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions,
	defaultArticleState,
} from 'src/constants/articleProps';
import { Separator } from '../separator';
import React from 'react';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	onSettingsChange: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [font, setFont] = useState(props.settings.fontFamilyOption);
	const [fontSize, setFontSize] = useState(props.settings.fontSizeOption);
	const [fontColor, setFontColor] = useState(props.settings.fontColor);
	const [contentWidth, setContentWidth] = useState(props.settings.contentWidth);
	const [backgroundColor, setBackgroundColor] = useState(
		props.settings.backgroundColor
	);
	const [isMenuOpen, setIsMenuOpen] = useState(false);

	const rootRef = useRef<HTMLDivElement>(null);

	const handleToggle = () => {
		setIsMenuOpen(!isMenuOpen);
	};

	const handleReset = () => {
		setFont(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setContentWidth(defaultArticleState.contentWidth);
		setBackgroundColor(defaultArticleState.backgroundColor);
	};

	const handleSubmit = (event?: React.FormEvent) => {
		props.onSettingsChange({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor,
			contentWidth,
			backgroundColor,
		});
		event?.preventDefault();
		handleToggle();
	};

	const handleOutsideClick = (event: MouseEvent) => {
		const { target } = event;
		if (
			target instanceof Node &&
			document.querySelector('article')?.contains(target)
		) {
			setIsMenuOpen(false);
		}
	};

	useEffect(() => {
		if (isMenuOpen) {
			window.addEventListener('click', handleOutsideClick);
		}

		return () => {
			window.removeEventListener('click', handleOutsideClick);
		};
	}, [setIsMenuOpen, isMenuOpen]);

	
	document.addEventListener('keydown', (event) => {
		if (event.key === 'Escape' && isMenuOpen) {
			handleToggle();
		}
	});

	return (
		<div ref={isMenuOpen ? rootRef : null}>
			<ArrowButton click={handleToggle} isOpen={isMenuOpen} />
			<aside
				className={
					styles.container + ' ' + (isMenuOpen ? styles.container_open : '')
				}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase dynamicLite>
						Задайте параметры
					</Text>
					<Select
						selected={font}
						options={fontFamilyOptions}
						title='Шрифт'
						onChange={(option: OptionType) => setFont(option)}
					/>
					<RadioGroup
						name='radio'
						selected={fontSize}
						options={fontSizeOptions}
						title='Размер шрифта'
						onChange={(option: OptionType) => setFontSize(option)}
					/>
					<Select
						selected={fontColor}
						options={fontColors}
						title='Цвет шрифта'
						onChange={(option: OptionType) => setFontColor(option)}
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						options={backgroundColors}
						title='Цвет фона'
						onChange={(option: OptionType) => setBackgroundColor(option)}
					/>
					<Select
						selected={contentWidth}
						options={contentWidthArr}
						title='Ширина контента'
						onChange={(option: OptionType) => setContentWidth(option)}
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
};
