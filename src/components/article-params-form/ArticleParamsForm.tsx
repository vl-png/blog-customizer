import { ArrowButton } from 'src/ui/arrow-button';
import { Button } from 'src/ui/button';
import { Text } from 'src/ui/text';
import { Separator } from 'src/ui/separator';
import { RadioGroup } from 'src/ui/radio-group';
import { useState, useEffect, useRef } from 'react';
import {
	fontFamilyOptions,
	fontSizeOptions,
	fontColors,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	ArticleStateType,
} from 'src/constants/articleProps';

import styles from './ArticleParamsForm.module.scss';
import { Select } from 'src/ui/select';

type ArticleParamsFormProps = {
	articleParams: ArticleStateType;
	setArticleParams: (props: ArticleStateType) => void;
};

export const ArticleParamsForm = ({
	articleParams,
	setArticleParams,
}: ArticleParamsFormProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const sidebarRef = useRef<HTMLDivElement>(null);

	const [fontFamilyOption, setFontFamily] = useState(
		articleParams.fontFamilyOption
	);
	const [fontSizeOption, setFontSize] = useState(articleParams.fontSizeOption);
	const [fontColor, setFontColor] = useState(articleParams.fontColor);
	const [backgroundColor, setBackgroundColor] = useState(
		articleParams.backgroundColor
	);
	const [contentWidth, setContentWidth] = useState(articleParams.contentWidth);

	const toggleForm = () => {
		setIsOpen((prev) => !prev);
	};

	useEffect(() => {
		const handleClickOutside = (event: MouseEvent) => {
			if (
				sidebarRef.current &&
				!sidebarRef.current.contains(event.target as Node)
			) {
				setIsOpen(false);
			}
		};

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [sidebarRef]);

	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		setArticleParams({
			fontFamilyOption: fontFamilyOption,
			fontSizeOption: fontSizeOption,
			fontColor: fontColor,
			backgroundColor: backgroundColor,
			contentWidth: contentWidth,
		});
	};

	const handleReset = () => {
		setArticleParams(defaultArticleState);
		setFontFamily(defaultArticleState.fontFamilyOption);
		setFontSize(defaultArticleState.fontSizeOption);
		setFontColor(defaultArticleState.fontColor);
		setBackgroundColor(defaultArticleState.backgroundColor);
		setContentWidth(defaultArticleState.contentWidth);
	};

	useEffect(() => {
		setFontFamily(articleParams.fontFamilyOption);
		setFontSize(articleParams.fontSizeOption);
		setFontColor(articleParams.fontColor);
		setBackgroundColor(articleParams.backgroundColor);
		setContentWidth(articleParams.contentWidth);
	}, [articleParams]);

	return (
		<>
			<ArrowButton isOpen={isOpen} onClick={toggleForm} />
			<aside
				className={
					isOpen
						? styles.container + ' ' + styles.container_open
						: styles.container
				}
				ref={sidebarRef}>
				<form
					className={styles.form}
					onSubmit={handleSubmit}
					onReset={handleReset}>
					<Text as='h2' size={31} weight={800} uppercase>
						Задайте параметры
					</Text>
					<Select
						selected={fontFamilyOption}
						onChange={setFontFamily}
						options={fontFamilyOptions}
						title='шрифт'
					/>
					<RadioGroup
						selected={fontSizeOption}
						name='radio'
						onChange={setFontSize}
						options={fontSizeOptions}
						title='размер шрифта'
					/>
					<Select
						selected={fontColor}
						onChange={setFontColor}
						options={fontColors}
						title='цвет шрифта'
					/>
					<Separator />
					<Select
						selected={backgroundColor}
						onChange={setBackgroundColor}
						options={backgroundColors}
						title='цвет фона'
					/>
					<Select
						selected={contentWidth}
						onChange={setContentWidth}
						options={contentWidthArr}
						title='ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' htmlType='reset' type='clear' />
						<Button title='Применить' htmlType='submit' type='apply' />
					</div>
				</form>
			</aside>
		</>
	);
};
