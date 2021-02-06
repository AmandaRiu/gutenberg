/**
 * External dependencies
 */
import classnames from 'classnames';
import { View, TextInput, Text } from 'react-native';

/**
 * WordPress dependencies
 */
import {
	useBlockProps,
	BlockControls,
	RichText,
} from '@wordpress/block-editor';
import { ToolbarGroup, Button, ToolbarButton } from '@wordpress/components';
import { search } from '@wordpress/icons';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';

/**
 * Internal dependencies
 */
import { buttonWithIcon, toggleLabel } from './icons';
import ButtonPositionDropdown from './button-position-dropdown';
import TextButton from './text-button';
import styles from './style.scss';

/**
 * Constants
 */
// eslint-disable-next-line no-unused-vars
const MIN_WIDTH = 220;

export default function SearchEdit( {
	className,
	attributes,
	setAttributes,
	// eslint-disable-next-line no-unused-vars
	toggleSelection,
	// eslint-disable-next-line no-unused-vars
	isSelected,
} ) {
	// eslint-disable-next-line no-unused-vars
	const [ buttonTextWidth, setButtonTextWidth ] = useState( 0 );

	const {
		label,
		showLabel,
		placeholder,
		// eslint-disable-next-line no-unused-vars
		width,
		// eslint-disable-next-line no-unused-vars
		widthUnit,
		align,
		buttonText,
		buttonPosition,
		buttonUseIcon,
	} = attributes;

	const getBlockClassNames = () => {
		return classnames(
			className,
			'button-inside' === buttonPosition
				? 'wp-block-search__button-inside'
				: undefined,
			'button-outside' === buttonPosition
				? 'wp-block-search__button-outside'
				: undefined,
			'no-button' === buttonPosition
				? 'wp-block-search__no-button'
				: undefined,
			'button-only' === buttonPosition
				? 'wp-block-search__button-only'
				: undefined,
			! buttonUseIcon && 'no-button' !== buttonPosition
				? 'wp-block-search__text-button'
				: undefined,
			buttonUseIcon && 'no-button' !== buttonPosition
				? 'wp-block-search__icon-button'
				: undefined
		);
	};

	const renderTextField = () => {
		return (
			<TextInput
				className="wp-block-search__input"
				style={ styles.searchTextInput }
				aria-label={ __( 'Optional placeholder text' ) }
				label={ null }
				value={ placeholder }
				placeholder={
					placeholder ? undefined : __( 'Optional placeholder…' )
				}
				onChangeText={ ( newVal ) =>
					setAttributes( { placeholder: newVal } )
				}
			/>
		);
	};

	const renderButton = () => {
		return (
			<View>
				{ buttonUseIcon && (
					<Button
						icon={ search }
						className="wp-block-search__button"
						style={ styles.searchButton }
					/>
				) }

				{ ! buttonUseIcon && (
					<TextButton
						value={ buttonText }
						onChange={ ( html ) =>
							setAttributes( { buttonText: html } )
						}
					/>
				) }
			</View>
		);
	};

	const handleBlockPositionChange = ( position ) => {
		setAttributes( {
			buttonPosition: position,
		} );
	};

	const controls = (
		<BlockControls>
			<ToolbarGroup>
				<ToolbarButton
					title={ __( 'Toggle search label' ) }
					icon={ toggleLabel }
					onClick={ () => {
						setAttributes( {
							showLabel: ! showLabel,
						} );
					} }
					isActive={ showLabel }
				/>

				<ButtonPositionDropdown
					selectedOption={ buttonPosition }
					onChange={ handleBlockPositionChange }
				/>

				{ 'no-button' !== buttonPosition && (
					<ToolbarButton
						title={ __( 'Use button with icon' ) }
						icon={ buttonWithIcon }
						onClick={ () => {
							setAttributes( {
								buttonUseIcon: ! buttonUseIcon,
							} );
						} }
						isActive={ buttonUseIcon }
					/>
				) }
			</ToolbarGroup>
		</BlockControls>
	);

	const blockProps = useBlockProps( {
		className: getBlockClassNames(),
	} );

	return (
		<View { ...blockProps }>
			{ controls }

			{ showLabel && (
				<RichText
					className="wp-block-search__label"
					aria-label={ __( 'Label text' ) }
					placeholder={ __( 'Add label…' ) }
					withoutInteractiveFormatting
					value={ label }
					onChange={ ( html ) => setAttributes( { label: html } ) }
				/>
			) }

			{ ( 'button-inside' === buttonPosition ||
				'button-outside' === buttonPosition ) && (
				<View style={ styles.searchBarContainer }>
					<View>{ renderTextField() }</View>
					<View>{ renderButton() }</View>
				</View>
			) }

			{ 'button-only' === buttonPosition && renderButton() }
			{ 'no-button' === buttonPosition && renderTextField() }
		</View>
	);
}
