import { ArrowButton } from 'components/arrow-button';
import { Button } from 'components/button';
import { SyntheticEvent, useRef, useState } from 'react';
import clsx from 'clsx';
import styles from './ArticleParamsForm.module.scss';
import { RadioGroup } from '../radio-group';
import {
	ArticleStateType,
	OptionType,
	backgroundColors,
	contentWidthArr,
	defaultArticleState,
	fontColors,
	fontFamilyOptions,
	fontSizeOptions,
} from 'src/constants/articleProps';
import { Select } from '../select';
import { Separator } from '../separator';
import { useOutsideClickClose } from '../select/hooks/useOutsideClickClose';

type ArticleParamsProps = {
	currentArticleState: ArticleStateType;
	setCurrentArticleState: (date: ArticleStateType) => void;
};

export function ArticleParamsForm({
	currentArticleState,
	setCurrentArticleState,
}: ArticleParamsProps) {
	const [isOpenParams, setIsOpenParams] = useState(false);
	const rootRef = useRef(null);
	const [selectArticleState, setSelectArticleState] =
		useState<ArticleStateType>(currentArticleState);

	function onClick() {
		if (!isOpenParams) {
			setIsOpenParams(true);
		} else {
			setIsOpenParams(false);
		}
	}

	useOutsideClickClose({
		isOpen: isOpenParams,
		rootRef,
		onClose: () => {
			setIsOpenParams;
		},
		onChange: setIsOpenParams,
	});

	function handleChange(name: keyof ArticleStateType, value: OptionType) {
		setSelectArticleState({
			...selectArticleState,
			[name]: value,
		});
	}

	function handleResetForm() {
		setSelectArticleState(defaultArticleState);
		setCurrentArticleState(defaultArticleState);
	}

	function handleSubmitForm(e: SyntheticEvent) {
		e.preventDefault();
		setCurrentArticleState(selectArticleState);
	}

	return (
		<div ref={rootRef}>
			<ArrowButton onClick={onClick} isOpen={isOpenParams} />
			<aside
				className={clsx(
					styles.container,
					isOpenParams && styles.container_open
				)}>
				<form
					onReset={handleResetForm}
					onSubmit={(e) => {
						handleSubmitForm(e);
					}}
					className={styles.form}>
					<p className={styles.paragraph}>Задайте параметры</p>
					<Select
						selected={selectArticleState.fontFamilyOption}
						onChange={(value) => handleChange('fontFamilyOption', value)}
						options={fontFamilyOptions}
						title='Шрифт'
					/>
					<RadioGroup
						selected={selectArticleState.fontSizeOption}
						name='radio'
						onChange={(value) => handleChange('fontSizeOption', value)}
						options={fontSizeOptions}
						title='Размер шрифта'
					/>
					<Select
						selected={selectArticleState.fontColor}
						onChange={(value) => handleChange('fontColor', value)}
						options={fontColors}
						title='Цвет шрифта'
					/>
					<Separator />
					<Select
						selected={selectArticleState.backgroundColor}
						onChange={(value) => handleChange('backgroundColor', value)}
						options={backgroundColors}
						title='Цвет фона'
					/>
					<Select
						selected={selectArticleState.contentWidth}
						onChange={(value) => handleChange('contentWidth', value)}
						options={contentWidthArr}
						title='Ширина контента'
					/>
					<div className={styles.bottomContainer}>
						<Button title='Сбросить' type='reset' />
						<Button title='Применить' type='submit' />
					</div>
				</form>
			</aside>
		</div>
	);
}
