import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Select } from '../select/Select';
import { RadioGroup } from '../radio-group';
import { Text } from '../text';
import { ArticleStateType, OptionType } from 'src/constants/articleProps';

import {
	fontFamilyOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	fontSizeOptions
} from 'src/constants/articleProps';
import { Separator } from '../separator';

type ArticleParamsFormProps = {
	settings: ArticleStateType;
	onSettingsChange: (settings: ArticleStateType) => void;
};

export const ArticleParamsForm = (props: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const [font, setFont] = useState(props.settings.fontFamilyOption);
	const [fontSize, setFontSize] = useState(props.settings.fontSizeOption);
	const [fontColor, setFontColor] = useState(props.settings.fontColor);
	const [contentWidth, setContentWidth] = useState(props.settings.contentWidth);
	const [backgroundColor, setBackgroundColor] = useState(
		props.settings.backgroundColor
	);


	const handleOpen = () => {
		setIsOpen(!isOpen);
	};

	const handleReset = () => {
		setFont(props.settings.fontFamilyOption);
		setFontSize(props.settings.fontSizeOption);
		setFontColor(props.settings.fontColor);
		setContentWidth(props.settings.contentWidth);
		setBackgroundColor(props.settings.backgroundColor);
	};

	const handleSubmit = (event?: React.FormEvent) => {
		props.onSettingsChange({
			fontFamilyOption: font,
			fontSizeOption: fontSize,
			fontColor,
			contentWidth,
			backgroundColor
		});
		event?.preventDefault();
		handleOpen();
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
						<Button title='Сбросить' type='reset' onClick={handleReset}/>
						<Button title='Применить' type='submit' onClick={handleSubmit}/>
					</div>
				</form>
			</aside>
		</>
	);
};
