import clsx from 'clsx';
import { type CSSProperties, useState } from 'react';

import { Article } from '../article/Article';
import { defaultArticleState } from '../../constants/articleProps';
import { ArticleParamsForm } from '../article-params-form/ArticleParamsForm';

import styles from '../../styles/index.module.scss';

export const App = () => {
	const [articleParams, setArticleParams] = useState(defaultArticleState);
	return (
		<main
			className={clsx(styles.main)}
			style={
				{
					'--font-family': articleParams.fontFamilyOption.value,
					'--font-size': articleParams.fontSizeOption.value,
					'--font-color': articleParams.fontColor.value,
					'--container-width': articleParams.contentWidth.value,
					'--bg-color': articleParams.backgroundColor.value,
				} as CSSProperties
			}>
			<ArticleParamsForm setArticleParams={setArticleParams} />
			<Article />
		</main>
	);
};
