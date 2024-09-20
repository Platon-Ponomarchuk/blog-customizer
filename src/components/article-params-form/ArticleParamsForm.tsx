import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';

import styles from './ArticleParamsForm.module.scss';
import { useState } from 'react';
import { Select } from '../select/Select';
import { fontFamilyOptions } from 'src/constants/articleProps';

export const ArticleParamsForm = () => {
	const [isOpen, setIsOpen] = useState(false);

	const handleOpen = () => {
		setIsOpen(!isOpen);
	}

	return (
		<>
			<ArrowButton click={handleOpen} isOpen={isOpen} />
			<aside className={styles.container + ' ' + (isOpen ? styles.container_open : '')}>
				<form className={styles.form}>
					<Select selected={fontFamilyOptions[0]} options={fontFamilyOptions} title="Шрифт"/>
					<Select selected={fontFamilyOptions[0]} options={fontFamilyOptions} title="Шрифт"/>
					<Select selected={fontFamilyOptions[0]} options={fontFamilyOptions} title="Шрифт"/>
					<Select selected={fontFamilyOptions[0]} options={fontFamilyOptions} title="Шрифт"/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</>
	);
};
